# Cogdual Infotech Solutions — mobile-first HR, career and certification app

Production-oriented Next.js 15 / React 19 implementation for Cogdual Infotech Solutions. The product is architected around the full public Cogdual portfolio: careers and recruitment, global certifications, VConnect industry–academia programmes, corporate training, payroll outsourcing, Kidzora, Corporate Gifts and the upcoming startup HRMS.

See [`docs/product-architecture.md`](docs/product-architecture.md) for the full information architecture, domain model and staged product roadmap.

## Design system

- **Deep ink navy:** `#0B1F33` — primary text, high-trust surfaces and dark CTAs.
- **Cogdual gold:** `#DAA520` — accent fills, borders and icons; not used for small text on white.
- **Warm off-white:** `#FBF8F1` — primary light background.
- **Muted tones:** `#586777` and `#62716A` — supporting copy and metadata.
- **Dark mode:** token overrides based on `#07131F`, `#0D2133`, `#F4EEE4` and higher-contrast secondary text.
- **Spacing:** 4px scale.
- **Radii:** varied geometry rather than an identical-card system.
- **Display type:** Lora via `next/font`.
- **Body/UI type:** Inter via `next/font`.

## Mobile-first information architecture

```text
Top: Cogdual                                      Apply

Hero
  Build skills. Find talent. Move careers forward.
  [See open positions] [Hire through us]

Start with your goal
  [Looking for a job]
  [Get certified]
  [Need to hire]
  [Represent a college]

Launching soon · Startup HRMS

Core pathways · horizontal snap
  Employer Solutions
  Global Certification
  VConnect
  Ventures

Global certification preview
Complete solution directory
About / trust
Jobs + filter chips + application bottom sheet
Contact / enquiry
Footer

Bottom: Home · Services · Jobs · Contact
```

The app avoids a generic stock-photo + identical-card template. The home page first routes by user intent, then exposes the broader portfolio through editorial lists and focused subpages.

## First-class routes

- `/` — audience router, HRMS, service portfolio, certification preview, jobs and contact.
- `/certifications` — IBM, Meta, Cisco, Microsoft, Adobe and Tally pathway summary; e-learning, practice, exam and bundle voucher models; enquiry path.
- `/employers` — fresher, lateral and executive hiring; corporate training; payroll; published recruitment fee bands; enquiry path.
- `/colleges` — VConnect student sessions, faculty development, event judging and curriculum guidance; planning notes and enquiry path.
- `/privacy`
- `/terms`
- `/offline`

Kidzora and Corporate Gifts remain linked to their existing Cogdual pages until they are migrated into this application.

## Architecture

```text
app/
  api/
    apply/route.ts
    contact/route.ts
    notify/route.ts
    upload-url/route.ts
  certifications/page.tsx
  colleges/page.tsx
  employers/page.tsx
  offline/page.tsx
  privacy/page.tsx
  terms/page.tsx
  globals.css
  tokens.css
  layout.tsx
  manifest.ts
  opengraph-image.tsx
  page.tsx
  robots.ts
  sitemap.ts
components/
  forms/
  application-sheet.tsx
  cookie-banner.tsx
  icons.tsx
  jobs.tsx
  mobile-nav.tsx
  pwa-register.tsx
  service-carousel.tsx
  simple-footer.tsx
  site-header.tsx
  solution-directory.tsx
  turnstile.tsx
docs/
  product-architecture.md
lib/
  data.ts
  email.ts
  rate-limit.ts
  request.ts
  s3.ts
  schemas.ts
  turnstile.ts
  upload-token.ts
public/
  icon.svg
  maskable-icon.svg
  sw.js
tests/
  apply.spec.ts
```

Server Components are the default. Client JavaScript is limited to jobs/application interaction, forms, Turnstile, consent, active mobile navigation and PWA registration.

## Resume upload architecture

The allowed resume size is 5 MB, which is larger than Vercel Functions' 4.5 MB request body limit. The app therefore requests a short-lived S3 presigned POST from `/api/upload-url`, uploads directly from the browser to a private S3 bucket, then submits metadata to `/api/apply`. The server verifies the stored object before emailing HR.

This keeps the 5 MB promise functional instead of relying on a server upload route that would reject larger valid files.

## Local setup

1. Install Node.js 20.9+.
2. Run `npm install`.
3. Copy `.env.example` to `.env.local`.
4. Configure local service credentials as needed.
5. Run `npm run dev`.
6. Open `http://localhost:3000`.

## Production environment variables

- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_TURNSTILE_SITE_KEY`
- `TURNSTILE_SECRET_KEY`
- `RESEND_API_KEY`
- `RESEND_FROM`
- `AWS_REGION`
- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`
- `AWS_S3_BUCKET`
- `UPSTASH_REDIS_REST_URL`
- `UPSTASH_REDIS_REST_TOKEN`
- `UPLOAD_SIGNING_SECRET`

Generate `UPLOAD_SIGNING_SECRET` with at least 32 random bytes, for example `openssl rand -base64 48`.

## Infrastructure configuration

### S3

- Block all public access.
- Scope the app IAM principal to the required application object prefix.
- Allow the direct POST from production and local development origins through bucket CORS.
- Add a lifecycle rule for resume retention.
- Add malware scanning before recruiter downloads at production scale.

### Resend

- Verify a Cogdual sending domain.
- Use a restricted production API key.
- Configure `RESEND_FROM` with a verified sender.
- Enquiries/applications are sent to `hrservices@cogdual.com` with submitter `Reply-To` where applicable.

### Turnstile

- Create a production widget for the deployment hostname.
- Configure public and secret keys.
- Tokens are re-verified server-side.

### Upstash

Production endpoints use distributed rate limiting. The local process fallback is for development only.

## Quality gates

```bash
npm run lint
npm run typecheck
npm run build
npm run test:e2e
```

Then run Lighthouse mobile against the actual Vercel preview and verify the target 95+ score under production networking.

## Deployment

1. Import `TechiAkki963/Cogdual` into Vercel.
2. Use Node.js 20+.
3. Add environment variables.
4. Configure S3, Resend, Turnstile and Upstash.
5. Deploy Preview.
6. Run typecheck, build, Playwright, accessibility and Lighthouse checks.
7. Test the resume flow on a real mid-range Android device and Safari/iOS.
8. Promote only after legal/privacy copy, retention and delivery flows are accepted.

## Launch checklist

- [ ] S3 bucket/IAM/CORS configured.
- [ ] Resume retention policy approved and lifecycle rule enabled.
- [ ] Malware scanning enabled for uploaded resumes.
- [ ] Resend production domain and API key configured.
- [ ] Turnstile production hostname and keys configured.
- [ ] Upstash Redis configured.
- [ ] Privacy Policy and Terms legally reviewed, including applicable DPDP obligations.
- [ ] Exact certification catalogue data imported and periodically maintained.
- [ ] Real job descriptions, publish/expiry dates and office locations confirmed before enriching JobPosting metadata.
- [ ] Canonical Vettrikanavugal YouTube channel URL confirmed.
- [ ] CMS chosen if non-developers require job/certification publishing workflows.
- [ ] Analytics decision made before adding optional tracking.
- [ ] First networked `npm install` completed and `package-lock.json` committed.
- [ ] Next.js 16 migration planned because Next.js 15 is a maintenance line.

## Current validation note

The source has been syntax/transpile-checked across all TypeScript/TSX files. This execution environment could not complete `npm install` against the package registry, so a genuine dependency-backed `next build`, full typecheck and Playwright run remain mandatory in CI/Vercel before release.
