import nodemailer from 'nodemailer';
import {
  generateAdminEnquiryEmailTemplate,
  generateVisitorConfirmationEmailTemplate,
  type EnquiryData,
} from './email-templates';

export type SmtpSendResult = {
  success: boolean;
  messageId?: string;
  error?: string;
  code?: string;
};

function getSmtpConfig() {
  const host = process.env.SMTP_HOST || 'smtp.gmail.com';
  const port = Number(process.env.SMTP_PORT || 465);
  const user = process.env.SMTP_USER || '';
  const pass = process.env.SMTP_PASS || '';
  const contactTo = process.env.CONTACT_TO || '';

  const isConfigured = Boolean(user && pass && contactTo && pass !== 'replace_with_google_app_password');

  return { host, port, user, pass, contactTo, isConfigured };
}

function createTransporter() {
  const config = getSmtpConfig();
  if (!config.isConfigured) {
    return null;
  }

  return nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.port === 465, // implicit TLS
    auth: {
      user: config.user,
      pass: config.pass,
    },
    connectionTimeout: 15_000,
    greetingTimeout: 10_000,
    socketTimeout: 20_000,
  });
}

/**
 * Send the enquiry notification to the explicitly configured recipient.
 */
export async function sendAdminEnquiryNotification(
  enquiry: EnquiryData
): Promise<SmtpSendResult> {
  const config = getSmtpConfig();

  if (!config.isConfigured) {
    console.error('[SMTP] SMTP is not configured; enquiry notification was not sent.');
    return { success: false, error: 'SMTP is not configured' };
  }

  const transporter = createTransporter();
  if (!transporter) {
    return { success: false, error: 'SMTP transporter unavailable' };
  }

  const { html, text } = generateAdminEnquiryEmailTemplate(enquiry);

  try {
    const info = await transporter.sendMail({
      from: `"Portfolio Enquiry" <${config.user}>`,
      to: config.contactTo,
      replyTo: `"${enquiry.name}" <${enquiry.email}>`,
      subject: `[New Enquiry] ${enquiry.requestedService} - from ${enquiry.name} (${enquiry.enquiryId})`,
      text,
      html,
    });

    return {
      success: true,
      messageId: info.messageId,
    };
  } catch (error: unknown) {
    const err = error as { message?: string; code?: string };
    console.error('[SMTP] Error sending admin enquiry notification:', err.message, err.code);
    return {
      success: false,
      error: err.message || 'Failed to deliver enquiry notification email to admin',
      code: err.code,
    };
  }
}

/**
 * Send confirmation email acknowledging receipt to visitor
 */
export async function sendVisitorConfirmationEmail(
  enquiry: EnquiryData
): Promise<SmtpSendResult> {
  const config = getSmtpConfig();

  if (!config.isConfigured) {
    console.error('[SMTP] SMTP is not configured; visitor confirmation was not sent.');
    return { success: false, error: 'SMTP is not configured' };
  }

  const transporter = createTransporter();
  if (!transporter) {
    return { success: false, error: 'SMTP transporter unavailable' };
  }

  const { html, text } = generateVisitorConfirmationEmailTemplate(enquiry);

  try {
    const info = await transporter.sendMail({
      from: `"Akarsh Mishra" <${config.user}>`,
      to: enquiry.email,
      replyTo: `"Akarsh Mishra" <akarshmishra3145@gmail.com>`,
      subject: `Enquiry Received: ${enquiry.requestedService} [Ref: ${enquiry.enquiryId}]`,
      text,
      html,
    });

    return {
      success: true,
      messageId: info.messageId,
    };
  } catch (error: unknown) {
    const err = error as { message?: string; code?: string };
    console.error('[SMTP] Error sending visitor confirmation email:', err.message, err.code);
    return {
      success: false,
      error: err.message || 'Failed to deliver confirmation email to visitor',
      code: err.code,
    };
  }
}

