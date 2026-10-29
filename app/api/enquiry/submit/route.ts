import { createHmac } from 'node:crypto';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';
import { NextResponse } from 'next/server';
import { generateEnquiryId } from '@/lib/enquiry-store';
import { appendEnquiryToGoogleSheet, updateEnquiryEmailStatus } from '@/lib/google-sheets';
import { sendAdminEnquiryNotification, sendVisitorConfirmationEmail } from '@/lib/smtp';
import { normalizeIndianMobile, VALID_SERVICES } from '@/lib/enquiry-validation';

export const runtime = 'nodejs';

const localSubmissions = new Map<string, number[]>();

function getRequester(request: Request) {
  return request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
}

export async function POST(request: Request) {
  try {
    const origin = request.headers.get('origin');
    if (origin && origin !== new URL(request.url).origin) {
      return NextResponse.json({ message: 'This form can only be submitted from the portfolio website.' }, { status: 403 });
    }
    if (process.env.NODE_ENV === 'production') {
      const now = Date.now();
      const requester = getRequester(request);
      const redisConfigured = Boolean(
        process.env.UPSTASH_REDIS_REST_URL &&
        process.env.UPSTASH_REDIS_REST_TOKEN &&
        process.env.RATE_LIMIT_HASH_SECRET
      );
      if (redisConfigured) {
        try {
          const limiter = new Ratelimit({
            redis: Redis.fromEnv(),
            limiter: Ratelimit.slidingWindow(4, '1 h'),
            prefix: 'akarsh-portfolio:enquiry',
            analytics: false,
          });
          const identity = createHmac('sha256', process.env.RATE_LIMIT_HASH_SECRET!)
            .update(requester)
            .digest('hex');
          const limit = await limiter.limit(identity);
          if (!limit.success) {
            const retryAfter = Math.max(1, Math.ceil((limit.reset - now) / 1_000));
            return NextResponse.json({ message: 'Hourly enquiry limit reached. Please try again later.' }, {
              status: 429,
              headers: { 'Retry-After': String(retryAfter) },
            });
          }
        } catch (error) {
          console.warn('[API Submit Enquiry] Durable rate limit unavailable; using instance fallback.', error);
        }
      }
      const recent = (localSubmissions.get(requester) ?? []).filter((time) => now - time < 60 * 60 * 1000);
      if (recent.length >= 4) {
        return NextResponse.json({ message: 'Hourly enquiry limit reached. Please try again later.' }, {
          status: 429,
          headers: { 'Retry-After': String(Math.max(1, Math.ceil((recent[0] + 60 * 60 * 1000 - now) / 1000))) },
        });
      }
      recent.push(now);
      localSubmissions.set(requester, recent);
    }
    const contentLength = Number(request.headers.get('content-length') ?? 0);
    if (contentLength > 16_000) {
      return NextResponse.json({ message: 'Payload too large.' }, { status: 413 });
    }

    const body = await request.json();

    // Honeypot check
    if (body.website && typeof body.website === 'string' && body.website.trim()) {
      return NextResponse.json({ message: 'Invalid submission.' }, { status: 400 });
    }

    // Bot timing check (minimum 1.2 seconds)
    if (typeof body.elapsedMs === 'number' && body.elapsedMs < 1000) {
      return NextResponse.json(
        { message: 'Please take a moment to review your enquiry before submitting.' },
        { status: 400 }
      );
    }

    const name = typeof body.name === 'string' ? body.name.trim() : '';
    const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';
    const rawMobile = typeof body.mobile === 'string' ? body.mobile.trim() : '';
    const requestedService = typeof body.requestedService === 'string' ? body.requestedService.trim() : '';
    const reason = typeof body.reason === 'string' ? body.reason.trim() : '';
    const additionalEnquiry = typeof body.additionalEnquiry === 'string' ? body.additionalEnquiry.trim() : '';
    const consent = body.consent === true;
    const sourcePage = typeof body.sourcePage === 'string' ? body.sourcePage.trim() : 'Portfolio Direct';

    // 1. Validate Full Name
    if (!name || name.length < 2 || name.length > 100) {
      return NextResponse.json(
        { message: 'Please provide a valid full name (2–100 characters).' },
        { status: 400 }
      );
    }

    // 2. Validate Indian Mobile
    const normalizedMobile = normalizeIndianMobile(rawMobile);
    if (!normalizedMobile) {
      return NextResponse.json(
        { message: 'Please provide a valid 10-digit Indian mobile number (e.g. 9876543210).' },
        { status: 400 }
      );
    }

    // 3. Validate Email Format
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
    if (!email || !emailRegex.test(email) || email.length > 254) {
      return NextResponse.json(
        { message: 'Please enter a valid, reachable email address.' },
        { status: 400 }
      );
    }

    // 4. Validate Requested Service
    if (!requestedService || !VALID_SERVICES.includes(requestedService as (typeof VALID_SERVICES)[number])) {
      return NextResponse.json(
        { message: 'Please select a valid service option from the dropdown.' },
        { status: 400 }
      );
    }

    // 5. Validate Reason for Enquiry
    if (!reason || reason.length < 10 || reason.length > 3000) {
      return NextResponse.json(
        { message: 'Please describe your enquiry (at least 10 characters).' },
        { status: 400 }
      );
    }

    // 6. Additional Enquiry length check
    if (additionalEnquiry.length > 3000) {
      return NextResponse.json(
        { message: 'Additional enquiry description is too long (maximum 3,000 characters).' },
        { status: 400 }
      );
    }

    // 7. Validate Consent
    if (!consent) {
      return NextResponse.json(
        { message: 'You must grant explicit consent to be contacted regarding this enquiry.' },
        { status: 400 }
      );
    }

    // Generate unique Enquiry Reference ID
    const enquiryId = generateEnquiryId();
    const nowIso = new Date().toISOString();

    const enquiryData = {
      enquiryId,
      name,
      email,
      mobile: normalizedMobile,
      requestedService,
      reason,
      additionalEnquiry: additionalEnquiry || undefined,
      consent: true,
      consentTimestamp: nowIso,
      submissionTimestamp: nowIso,
      sourcePage,
    };

    // Record first so a Sheets outage cannot send a notification for an unrecorded enquiry.
    const sheetsResult = await appendEnquiryToGoogleSheet(enquiryData, 'Pending');
    if (!sheetsResult.success) {
      console.error('[API Submit Enquiry] Delivery incomplete:', {
        enquiryId,
        sheetRecorded: false,
        notificationSent: false,
      });
      return NextResponse.json({
        message: 'We could not save your enquiry to the private sheet, so no notification email was sent. Please try again later.',
        recorded: false,
        notificationSent: false,
      }, { status: 502 });
    }

    const adminEmailResult = await sendAdminEnquiryNotification(enquiryData);
    const emailStatusUpdated = await updateEnquiryEmailStatus(
      sheetsResult.rowNumber,
      adminEmailResult.success ? 'Sent' : 'Failed'
    );
    if (!adminEmailResult.success) {
      console.error('[API Submit Enquiry] Email notification failed after recording:', { enquiryId, emailStatusUpdated });
      return NextResponse.json({
        message: `Your enquiry was recorded (reference ${enquiryId}), but the notification email could not be sent. Please do not submit it again.`,
        recorded: true,
        notificationSent: false,
        enquiryId,
      }, { status: 502 });
    }
    if (!emailStatusUpdated) {
      console.warn('[API Submit Enquiry] Email was sent, but the sheet delivery status could not be updated:', { enquiryId });
    }

    // A visitor receipt is optional. Failure does not undo the safely recorded enquiry.
    const visitorEmailResult = await sendVisitorConfirmationEmail(enquiryData);

    return NextResponse.json({
      success: true,
      enquiryId,
      name,
      requestedService,
      googleSheetsRecorded: sheetsResult.success,
      emailNotificationsSent: adminEmailResult.success,
      visitorConfirmationSent: visitorEmailResult.success,
      message: `Thank you, ${name}! Your enquiry has been received and recorded. Reference ID: ${enquiryId}.${visitorEmailResult.success ? ` A confirmation email has been sent to ${email}.` : ''}`,
    });
  } catch (error: unknown) {
    console.error('[API Submit Enquiry] Internal error:', error);
    return NextResponse.json(
      { message: 'An unexpected error occurred while processing your enquiry. Please try again.' },
      { status: 500 }
    );
  }
}

