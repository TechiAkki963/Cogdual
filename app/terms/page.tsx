import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms',
  description: 'Terms for using the Cogdual careers and enquiry experience.',
};

export default function TermsPage() {
  return (
    <main id="main-content" className="legal-page shell">
      <p className="section-kicker">Terms</p>
      <h1>Terms of Use</h1>
      <p>Last updated: 4 October 2026</p>

      <h2>Using this site</h2>
      <p>
        You may use this site to explore Cogdual services, view open roles, submit a job application and send business or college enquiries. Do not use the forms for unlawful, abusive, automated or misleading submissions.
      </p>

      <h2>Job information</h2>
      <p>
        Openings may change or close without notice. Submitting an application does not guarantee an interview, offer or employment. Final role details, location, compensation and employment terms are confirmed during the recruitment process.
      </p>

      <h2>External services</h2>
      <p>
        Some service, social and store links open pages operated on cogdual.com or third-party platforms. Their own terms and privacy practices may apply.
      </p>

      <h2>Availability</h2>
      <p>
        Cogdual aims to keep the site useful and available, but uninterrupted access is not guaranteed. Features may be changed to improve security, performance or service quality.
      </p>

      <h2>Contact</h2>
      <p>Questions about these terms can be sent to hrservices@cogdual.com.</p>
    </main>
  );
}
