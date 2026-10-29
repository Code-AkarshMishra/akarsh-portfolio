export type EnquiryData = {
  enquiryId: string;
  name: string;
  email: string;
  mobile: string;
  requestedService: string;
  reason: string;
  additionalEnquiry?: string;
  consent: boolean;
  consentTimestamp: string;
  submissionTimestamp: string;
  sourcePage?: string;
};

export function generateAdminEnquiryEmailTemplate(enquiry: EnquiryData) {
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Service Enquiry Received</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f0f4f8; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1e293b;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #f0f4f8; padding: 40px 10px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" max-width="640" cellspacing="0" cellpadding="0" border="0" style="max-width: 640px; background-color: #ffffff; border-radius: 16px; border: 1px solid #cbd5e1; overflow: hidden; box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.08);">
          <!-- Branded Top Banner -->
          <tr>
            <td style="background: linear-gradient(135deg, #0284c7 0%, #4f46e5 50%, #9333ea 100%); padding: 32px 30px; text-align: left;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td>
                    <span style="display: inline-block; background-color: rgba(255, 255, 255, 0.2); border-radius: 20px; padding: 4px 12px; font-size: 11px; font-weight: 700; color: #ffffff; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 8px;">
                      ✦ Verified Service Enquiry
                    </span>
                    <h1 style="margin: 0; font-size: 24px; font-weight: 800; color: #ffffff; letter-spacing: -0.5px;">New Service Enquiry Received</h1>
                    <p style="margin: 6px 0 0; font-size: 14px; color: rgba(255, 255, 255, 0.9);">
                      Requested Service: <strong>${escapeHtml(enquiry.requestedService)}</strong>
                    </p>
                  </td>
                  <td align="right" valign="top">
                    <span style="font-family: monospace; font-size: 11px; background-color: #ffffff; color: #0284c7; padding: 6px 12px; border-radius: 8px; font-weight: 700; display: inline-block;">
                      ${escapeHtml(enquiry.enquiryId)}
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Summary Highlights Bar -->
          <tr>
            <td style="background-color: #f8fafc; border-bottom: 1px solid #e2e8f0; padding: 16px 30px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td style="font-size: 12px; color: #64748b;">
                    <strong>Verification:</strong> <span style="color: #16a34a; font-weight: 700;">✓ Server validated (no email OTP)</span>
                  </td>
                  <td align="right" style="font-size: 12px; color: #64748b;">
                    <strong>Submitted:</strong> ${escapeHtml(enquiry.submissionTimestamp)}
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Structured Details Table -->
          <tr>
            <td style="padding: 30px;">
              <h2 style="margin: 0 0 16px; font-size: 15px; font-weight: 700; color: #334155; text-transform: uppercase; letter-spacing: 0.5px;">
                Client & Project Information
              </h2>
              
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; margin-bottom: 24px;">
                <tr style="background-color: #f8fafc; border-bottom: 1px solid #e2e8f0;">
                  <td style="padding: 12px 18px; font-size: 13px; font-weight: 600; color: #64748b; width: 35%;">Full Name</td>
                  <td style="padding: 12px 18px; font-size: 14px; font-weight: 700; color: #0f172a;">${escapeHtml(enquiry.name)}</td>
                </tr>
                <tr style="border-bottom: 1px solid #e2e8f0;">
                  <td style="padding: 12px 18px; font-size: 13px; font-weight: 600; color: #64748b;">Email Address</td>
                  <td style="padding: 12px 18px; font-size: 14px; font-weight: 600; color: #0284c7;">
                    <a href="mailto:${escapeHtml(enquiry.email)}" style="color: #0284c7; text-decoration: none;">${escapeHtml(enquiry.email)}</a>
                    <span style="display: inline-block; background-color: #dcfce7; color: #15803d; font-size: 10px; font-weight: 700; padding: 2px 6px; border-radius: 4px; margin-left: 8px;">VERIFIED</span>
                  </td>
                </tr>
                <tr style="background-color: #f8fafc; border-bottom: 1px solid #e2e8f0;">
                  <td style="padding: 12px 18px; font-size: 13px; font-weight: 600; color: #64748b;">Mobile Number</td>
                  <td style="padding: 12px 18px; font-size: 14px; font-weight: 700; color: #0f172a; font-family: monospace;">
                    <a href="tel:+91${escapeHtml(enquiry.mobile)}" style="color: #0f172a; text-decoration: none;">+91 ${escapeHtml(enquiry.mobile)}</a>
                  </td>
                </tr>
                <tr style="border-bottom: 1px solid #e2e8f0;">
                  <td style="padding: 12px 18px; font-size: 13px; font-weight: 600; color: #64748b;">Requested Service</td>
                  <td style="padding: 12px 18px; font-size: 14px; font-weight: 700; color: #4338ca;">
                    ${escapeHtml(enquiry.requestedService)}
                  </td>
                </tr>
                <tr style="background-color: #f8fafc; border-bottom: 1px solid #e2e8f0;">
                  <td style="padding: 12px 18px; font-size: 13px; font-weight: 600; color: #64748b;">Contact Consent</td>
                  <td style="padding: 12px 18px; font-size: 12px; color: #16a34a; font-weight: 600;">
                    ✓ Explicit consent granted at ${escapeHtml(enquiry.consentTimestamp)}
                  </td>
                </tr>
                ${enquiry.sourcePage ? `<tr>
                  <td style="padding: 12px 18px; font-size: 13px; font-weight: 600; color: #64748b;">Source Page</td>
                  <td style="padding: 12px 18px; font-size: 12px; color: #64748b;">${escapeHtml(enquiry.sourcePage)}</td>
                </tr>` : ''}
              </table>

              <!-- Reason for Enquiry Section -->
              <h3 style="margin: 0 0 8px; font-size: 13px; font-weight: 700; color: #334155; text-transform: uppercase;">
                Reason for Enquiry & Project Scope
              </h3>
              <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-left: 4px solid #0284c7; border-radius: 8px; padding: 16px 20px; font-size: 14px; line-height: 22px; color: #1e293b; margin-bottom: 24px; white-space: pre-wrap;">
                ${escapeHtml(enquiry.reason)}
              </div>

              ${enquiry.additionalEnquiry ? `
              <h3 style="margin: 0 0 8px; font-size: 13px; font-weight: 700; color: #334155; text-transform: uppercase;">
                Additional Enquiry Details (Budget / Timeline / Tech)
              </h3>
              <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-left: 4px solid #9333ea; border-radius: 8px; padding: 16px 20px; font-size: 14px; line-height: 22px; color: #1e293b; margin-bottom: 28px; white-space: pre-wrap;">
                ${escapeHtml(enquiry.additionalEnquiry)}
              </div>
              ` : ''}

              <!-- Call to Action Button -->
              <div style="text-align: center; margin: 32px 0 16px;">
                <a href="mailto:${escapeHtml(enquiry.email)}?subject=Re: Service Enquiry [${escapeHtml(enquiry.enquiryId)}] - ${encodeURIComponent(enquiry.requestedService)}"
                   style="display: inline-block; background: linear-gradient(135deg, #0284c7 0%, #4f46e5 100%); color: #ffffff; text-decoration: none; font-weight: 700; font-size: 15px; padding: 14px 32px; border-radius: 12px; box-shadow: 0 4px 14px rgba(2, 132, 199, 0.35);">
                  Reply to ${escapeHtml(enquiry.name)} →
                </a>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #f8fafc; border-top: 1px solid #e2e8f0; padding: 20px 30px; text-align: center; font-size: 12px; color: #64748b;">
              Recorded into Google Sheets · Akarsh Mishra Portfolio Service System
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  const text = `NEW SERVICE ENQUIRY RECEIVED
Enquiry ID: ${enquiry.enquiryId}
Timestamp: ${enquiry.submissionTimestamp}
Verification: No email OTP; consent and server-side validation recorded

Client Details:
- Name: ${enquiry.name}
- Email: ${enquiry.email}
- Mobile: +91 ${enquiry.mobile}
- Requested Service: ${enquiry.requestedService}
- Contact Consent: Granted at ${enquiry.consentTimestamp}

Reason for Enquiry:
${enquiry.reason}

${enquiry.additionalEnquiry ? `Additional Details:\n${enquiry.additionalEnquiry}\n` : ''}

Reply to: ${enquiry.email}`;

  return { html, text };
}

export function generateVisitorConfirmationEmailTemplate(enquiry: EnquiryData) {
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Service Enquiry Received - Akarsh Mishra</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f6f8fb; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1e293b;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #f6f8fb; padding: 40px 10px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" max-width="600" cellspacing="0" cellpadding="0" border="0" style="max-width: 600px; background-color: #ffffff; border-radius: 16px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);">
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #0ea5e9 0%, #6366f1 100%); padding: 32px 30px; text-align: center;">
              <h1 style="margin: 0; font-size: 24px; font-weight: 800; color: #ffffff; letter-spacing: -0.5px;">Akarsh Mishra</h1>
              <p style="margin: 6px 0 0; font-size: 13px; color: rgba(255, 255, 255, 0.9); font-weight: 500; text-transform: uppercase; letter-spacing: 1px;">Enquiry Receipt Acknowledged</p>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 36px 32px;">
              <p style="margin: 0 0 16px; font-size: 16px; line-height: 24px; color: #334155;">Hello <strong>${escapeHtml(enquiry.name)}</strong>,</p>
              <p style="margin: 0 0 20px; font-size: 15px; line-height: 24px; color: #475569;">
                Thank you for reaching out regarding <strong>${escapeHtml(enquiry.requestedService)}</strong>. Your enquiry has been verified and registered successfully.
              </p>

              <!-- Reference Card -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; margin: 24px 0;">
                <tr>
                  <td style="padding: 20px;">
                    <div style="font-size: 11px; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 1px;">Enquiry Reference</div>
                    <div style="font-family: monospace; font-size: 18px; font-weight: 800; color: #0284c7; margin: 4px 0 16px;">${escapeHtml(enquiry.enquiryId)}</div>
                    
                    <div style="font-size: 13px; color: #334155; margin-bottom: 8px;">
                      <strong>Service:</strong> ${escapeHtml(enquiry.requestedService)}
                    </div>
                    <div style="font-size: 13px; color: #334155; margin-bottom: 8px;">
                      <strong>Contact:</strong> +91 ${escapeHtml(enquiry.mobile)} · ${escapeHtml(enquiry.email)}
                    </div>
                    <div style="font-size: 13px; color: #334155;">
                      <strong>Status:</strong> <span style="color: #16a34a; font-weight: 600;">Verified &amp; Recorded</span>
                    </div>
                  </td>
                </tr>
              </table>

              <p style="margin: 0 0 16px; font-size: 14px; line-height: 22px; color: #475569;">
                I will personally review your project requirements, scope, and technical needs, and follow up directly with you via email or phone.
              </p>

              <div style="margin-top: 32px; padding-top: 20px; border-top: 1px solid #e2e8f0;">
                <p style="margin: 0; font-size: 14px; font-weight: 700; color: #0f172a;">Best regards,</p>
                <p style="margin: 4px 0 0; font-size: 14px; color: #475569;">
                  <strong>Akarsh Mishra</strong><br>
                  Full-Stack Developer · B.Tech CSE, SRMU Lucknow<br>
                  <a href="mailto:akarshmishra3145@gmail.com" style="color: #0284c7; text-decoration: none;">akarshmishra3145@gmail.com</a>
                </p>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #f8fafc; border-top: 1px solid #e2e8f0; padding: 20px 30px; text-align: center; font-size: 12px; color: #64748b;">
              <a href="https://code-akarshmishra.vercel.app" style="color: #0284c7; text-decoration: none; font-weight: 600;">Visit Portfolio</a> · 
              <a href="https://github.com/Code-AkarshMishra" style="color: #0284c7; text-decoration: none; font-weight: 600;">GitHub Profile</a> · 
              <a href="https://www.linkedin.com/in/code-akarshmishra/" style="color: #0284c7; text-decoration: none; font-weight: 600;">LinkedIn</a>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  const text = `Service Enquiry Acknowledged - Akarsh Mishra

Hello ${enquiry.name},

Thank you for reaching out regarding ${enquiry.requestedService}. Your enquiry has been received and verified.

Reference ID: ${enquiry.enquiryId}
Service: ${enquiry.requestedService}
Status: Verified & Recorded

I will review your requirements and follow up with you directly.

Best regards,
Akarsh Mishra
Full-Stack Developer
Email: akarshmishra3145@gmail.com
Portfolio: https://code-akarshmishra.vercel.app`;

  return { html, text };
}

function escapeHtml(str: string): string {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

