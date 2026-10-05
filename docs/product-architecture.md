# Cogdual Product Architecture

## Product definition

Cogdual should be treated as a multi-line career and workforce platform rather than a recruitment-only marketing site.

### Core audience journeys

1. **Job seekers / students** — find a role, apply quickly, discover recognised certification options.
2. **Employers / startups** — hire freshers, lateral professionals and leaders; enquire about corporate training, payroll and the upcoming HRMS.
3. **Colleges / institutions** — book VConnect industry speakers, faculty development, event judging and curriculum guidance; explore certification programmes.
4. **Secondary consumer/business audiences** — discover Kidzora learning products and Corporate Gifts without allowing these ventures to dilute the primary HR/career navigation.

## Information architecture

```text
Home
├── Goal router
│   ├── Find a job
│   ├── Get certified
│   ├── Hire talent
│   └── College programmes
├── HRMS launch
├── Core pathways
├── Certification preview
├── Complete solution directory
├── About / trust
├── Jobs
└── Contact

/certifications
├── Brand catalogue summary
├── Voucher formats
├── Decision pathway
└── Certification enquiry

/employers
├── Fresher / entry-level hiring
├── Experienced / lateral hiring
├── Executive / leadership search
├── Corporate training
├── Payroll outsourcing
├── Recruitment commercial bands
└── Employer enquiry

/colleges
├── Student guest lectures
├── Faculty development
├── Event judging / panels
├── Curriculum guidance
├── Engagement planning
└── College enquiry
```

## Product principles

- Route by **user intent** before presenting the service catalogue.
- Keep jobs and application flow available within one tap from mobile navigation.
- Treat certifications as a first-class product journey, not a small marketing card.
- Group recruitment, training and payroll under Employer Solutions because they share the same buyer and commercial relationship.
- Keep VConnect distinct because colleges have different language, buying criteria and engagement logistics.
- Keep Kidzora and Corporate Gifts visible but secondary to prevent brand/navigation dilution.
- Preserve publicly stated commercial information where useful, but keep non-standard services enquiry-led.
- Keep all public content in typed data so jobs/services can move to a CMS without component rewrites.

## Domain model

```text
Organisation
├── ServiceLine
│   ├── RecruitmentService
│   ├── TrainingService
│   ├── PayrollService
│   ├── CertificationProgramme
│   ├── VConnectProgramme
│   └── Venture
├── JobOpening
├── CandidateApplication
├── BusinessEnquiry
├── CertificationEnquiry
├── CollegeEnquiry
└── LaunchInterest
```

### RecruitmentService

- kind: fresher | lateral | executive
- audience: employer
- commercial model
- minimum/maximum experience where applicable
- description
- active status

### CertificationProgramme

- brand
- title
- voucher types
- catalogue reference
- pricing status (normally enquiry-led)
- active status

### VConnectProgramme

- type: guest-lecture | faculty-development | judging | curriculum-guidance
- delivery mode: virtual | in-person
- duration
- expected capacity
- travel requirements

### JobOpening

- stable id / slug
- title
- employment type
- work mode
- location
- description
- skills
- active status
- publish / expiry dates when known

## Technical architecture

### Rendering

- Next.js App Router.
- Server Components by default.
- Client Components only for forms, application sheet, filters, consent, Turnstile, PWA registration and active mobile navigation.
- Typed content layer in `lib/data.ts`, ready for a headless CMS migration.

### Form boundary

```text
Browser
  ├── Turnstile
  ├── React Hook Form + Zod
  ├── /api/contact
  ├── /api/notify
  └── application upload flow
       ├── /api/upload-url
       ├── private direct S3 upload
       └── /api/apply

Server
  ├── Zod validation again
  ├── honeypot
  ├── distributed rate limiting
  ├── Turnstile verification
  ├── S3 object verification
  └── Resend email delivery
```

### Resume security

The browser uploads directly to a private S3 bucket through a short-lived presigned POST. This avoids proxying the 5 MB file through a Vercel Function body limit. The API validates metadata before issuing the upload policy and verifies the resulting object before accepting the application.

Before production at scale add malware scanning and a documented retention lifecycle.

## Navigation model

### Mobile / tablet

Persistent four-item bottom bar:

- Home
- Services
- Jobs
- Contact

The top bar keeps the brand and a single Apply action. Secondary journeys are reached through the Services surface, not additional bottom tabs.

### Desktop

Top navigation exposes:

- Services
- Certifications
- Employers
- Colleges
- Jobs
- Contact

## SEO model

- Organization + LocalBusiness structured data on home.
- JobPosting data for open jobs where verified fields exist.
- Dedicated metadata for Certifications, Employers and Colleges.
- Sitemap entries for first-class product routes.
- Avoid inventing dates, salary, workplace location or credential details that have not been verified.

## Recommended next phases

### Phase A — launch foundation

- Finalise service/job copy.
- Configure S3, Resend, Turnstile and Upstash.
- Add exact certification catalogue data.
- Confirm job office locations and real job descriptions.
- Run accessibility, Playwright and Lighthouse gates.

### Phase B — operational CMS

Move editable content from `lib/data.ts` to a simple CMS:

- publish/unpublish jobs
- certification catalogue
- VConnect programmes
- pricing/commercial notes
- service copy

### Phase C — lightweight CRM / lead routing

Persist enquiries and route by topic:

- careers
- recruitment
- certification
- college/VConnect
- payroll/training
- HRMS interest

Add status, assignee, response SLA and source attribution.

### Phase D — HRMS product separation

The future HRMS should become its own authenticated application boundary rather than growing inside the marketing/careers site. Share design tokens and identity, but keep auth, tenant data, payroll and workforce workflows in a separate product surface and security model.
