# Environment setup

Keep credentials in a local `.env.local` file and your hosting provider's secret/environment-variable settings. Never commit `.env.local`, paste secrets into chat, or add a `NEXT_PUBLIC_` prefix to these keys. Restart the local server after changing them.

## 1. SMTP email notifications

This project uses Nodemailer with SMTP. For Gmail:

1. Sign in to the Gmail account that will send portfolio notifications and enable 2-Step Verification.
2. Create an App Password in Google Account security settings. Google may hide this option for managed/workspace accounts or accounts using security keys only. App passwords require 2-Step Verification and Google describes them as less secure than Sign in with Google; use a dedicated sending account if possible. See [Google's app-password guide](https://support.google.com/mail/answer/185833?hl=en).
3. Set `SMTP_HOST=smtp.gmail.com`, `SMTP_PORT=465`, and `SMTP_USER` to that sending account.
4. Put the generated app password in `SMTP_PASS` (remove spaces if Google displays them grouped).
5. Set `CONTACT_TO` to the mailbox where you want to receive enquiries. It may be the sender mailbox or another mailbox.

The visitor email is used as Reply-To after server validation. It is not used as the sender address. There is no email OTP step.

## 2. Private Google Sheets recording

1. In [Google Cloud Console](https://console.cloud.google.com/), create/select a project and enable the **Google Sheets API** under APIs & Services.
2. Create a service account under IAM & Admin. Create a JSON key for it and store that JSON file privately. Google's guides: [create a service account](https://cloud.google.com/iam/docs/service-accounts-create) and [create a service-account key](https://cloud.google.com/iam/docs/keys-create-delete).
3. Create a spreadsheet and name its first worksheet tab `Sheet1` (the server appends rows to this tab).
4. Copy the spreadsheet ID from its URL: `https://docs.google.com/spreadsheets/d/SPREADSHEET_ID/edit`.
5. Share the spreadsheet with the service account's `client_email`, granting Editor access. Do not enable public link sharing.
6. Set `GOOGLE_SHEETS_SPREADSHEET_ID` to that ID, `GOOGLE_SERVICE_ACCOUNT_EMAIL` to `client_email`, and `GOOGLE_PRIVATE_KEY` to `private_key` from the downloaded JSON.

The private key may be entered as one quoted value with literal `\n` sequences between lines, as shown in `.env.example`, or entered as a multiline secret in a hosting dashboard. Never commit the downloaded JSON key.

The application appends enquiry rows to `Sheet1`. Add headers to row 1 before the first enquiry: Enquiry ID, Timestamp, Name, Mobile, Email, Verification Status (no OTP), Requested Service, Reason, Additional Details, Consent, Consent Timestamp, Source Page, Processing Status, Email Status, Follow-up Status.

## 3. Optional distributed rate limiting

The app has an in-memory fallback. In-memory limits are per server process and are not shared across serverless instances. For shared limits, create an Upstash Redis database and copy its REST URL and REST token from the database details page; see [Upstash's Redis connection guide](https://upstash.com/docs/redis/howto/connect-with-upstash-redis).

Set `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN`. Generate a separate random hash secret for `RATE_LIMIT_HASH_SECRET`, for example with Node.js:

```powershell
node -e "console.log(require('node:crypto').randomBytes(32).toString('hex'))"
```

Keep the secret private. Do not reuse your Google or SMTP credential.

## 4. Local and production values

For local work, copy the safe template to `.env.local` and replace each placeholder with your own values. Do not overwrite an existing `.env` until you have backed it up and know which values it contains. For production on Vercel, add the variables in **Project Settings → Environment Variables**, select the correct environments, save, and redeploy. Vercel applies changed variables to new deployments; see [Vercel's environment-variable guide](https://vercel.com/docs/environment-variables/managing-environment-variables).

The old `APP_URL` and `EMAIL_VERIFICATION_*` entries were removed from the example because the current code does not use them; contact submission does not use OTP.
