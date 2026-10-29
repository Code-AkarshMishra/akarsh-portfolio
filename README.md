# Akarsh Mishra — Portfolio

A responsive portfolio built with Next.js App Router, React, TypeScript, Tailwind CSS and Framer Motion. It presents a curated, repository-linked project catalogue, academic and professional information, GitHub contribution activity, certificates and a service enquiry form.

## Contact workflow

The service enquiry form submits directly without email OTP. The server validates the request, applies same-origin, honeypot and timing checks, and uses optional Upstash rate limiting with an in-process fallback. It reports integration failures instead of showing false success. SMTP notifications and private Google Sheets recording require server-side environment variables.

Configure these variables in the deployment platform's secret manager:

- `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`
- `CONTACT_TO`
- `GOOGLE_SHEETS_SPREADSHEET_ID`, `GOOGLE_SERVICE_ACCOUNT_EMAIL`, `GOOGLE_PRIVATE_KEY`

See [Environment setup](docs/environment-setup.md) for step-by-step Gmail, Google Sheets, Upstash and Vercel configuration.

Never put credentials in client code or commit them to the repository. Share the spreadsheet only with the required service account.

## Local development

```bash
npm install
npm run dev
```

Production build and preview:

```bash
npm run build
npm run start
```

## Project catalogue and SEO

`lib/project-catalog.ts` is the canonical source for categories, priority, descriptions, repository links, verified repository creation dates and project detail pages. Dates refer to GitHub repository creation metadata, not project completion. The sitemap is generated from this catalogue. `public/llms.txt` contains public portfolio information only.

GitHub public repository totals include forks. Contribution data depends on GitHub's public data and may be temporarily unavailable; private activity is not represented. No recent-commit feed is displayed.
