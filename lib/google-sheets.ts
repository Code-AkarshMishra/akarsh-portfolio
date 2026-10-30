import { google } from 'googleapis';
import type { EnquiryData } from './email-templates';

export type AppendSheetResult = {
  success: boolean;
  rowNumber?: number;
  error?: string;
  isConfigured: boolean;
};

export async function appendEnquiryToGoogleSheet(
  enquiry: EnquiryData,
  emailNotificationStatus: 'Sent' | 'Failed' | 'Pending' = 'Sent'
): Promise<AppendSheetResult> {
  const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;
  const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  let privateKey = process.env.GOOGLE_PRIVATE_KEY;

  if (
    !spreadsheetId ||
    !clientEmail ||
    !privateKey ||
    spreadsheetId === 'replace_with_spreadsheet_id'
  ) {
    console.error('[Google Sheets] Credentials are not configured; enquiry was not recorded.');
    return {
      success: false,
      isConfigured: false,
    };
  }

  // Handle newlines in private key string
  if (privateKey.includes('\\n')) {
    privateKey = privateKey.replace(/\\n/g, '\n');
  }

  try {
    const auth = new google.auth.JWT({
      email: clientEmail,
      key: privateKey,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });

    // Ensure header row exists or simply append row to Sheet1 / Enquiries
    const rowValues = [
      enquiry.enquiryId,
      enquiry.submissionTimestamp,
      enquiry.name,
      enquiry.mobile,
      enquiry.email,
      'Consent recorded (no email OTP)',
      enquiry.requestedService,
      enquiry.reason,
      enquiry.additionalEnquiry || 'N/A',
      enquiry.consent ? 'Yes (Explicit Consent)' : 'No',
      enquiry.consentTimestamp,
      enquiry.sourcePage || 'Portfolio (Direct)',
      'Verified & Processed',
      emailNotificationStatus,
      'New (Pending Follow-up)',
    ];

    const response = await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: 'Sheet1!A:O',
      // Treat visitor content as literal text to prevent spreadsheet formula injection.
      valueInputOption: 'RAW',
      insertDataOption: 'INSERT_ROWS',
      requestBody: {
        values: [rowValues],
      },
    });

    const updatedRange = response.data.updates?.updatedRange ?? '';
    const rowNumber = Number(updatedRange.match(/![A-Z]+(\d+):/)?.[1]);
    return {
      success: true,
      rowNumber: Number.isFinite(rowNumber) && rowNumber > 0 ? rowNumber : undefined,
      isConfigured: true,
    };
  } catch (error: unknown) {
    const err = error as { message?: string; code?: number };
    console.error('[Google Sheets] Failed to append enquiry row:', err.message);
    return {
      success: false,
      error: err.message || 'Failed to append to Google Sheets',
      isConfigured: true,
    };
  }
}

export async function updateEnquiryEmailStatus(
  rowNumber: number | undefined,
  status: 'Sent' | 'Failed'
): Promise<boolean> {
  const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;
  const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  let privateKey = process.env.GOOGLE_PRIVATE_KEY;
  if (!spreadsheetId || !clientEmail || !privateKey || !rowNumber) return false;

  if (privateKey.includes('\\n')) privateKey = privateKey.replace(/\\n/g, '\n');
  try {
    const auth = new google.auth.JWT({
      email: clientEmail,
      key: privateKey,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });
    const sheets = google.sheets({ version: 'v4', auth });
    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: `Sheet1!N${rowNumber}`,
      valueInputOption: 'RAW',
      requestBody: { values: [[status]] },
    });
    return true;
  } catch (error: unknown) {
    const err = error as { message?: string };
    console.error('[Google Sheets] Could not update email delivery status:', err.message);
    return false;
  }
}

