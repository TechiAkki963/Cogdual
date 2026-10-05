import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy information for the Cogdual careers and enquiry experience.',
};

export default function PrivacyPage() {
  return (
    <main id="main-content" className="legal-page shell">
      <p className="section-kicker">Privacy</p>
      <h1>Privacy Policy</h1>
      <p>Last updated: 4 October 2026</p>

      <h2>What we collect</h2>
      <p>
        When you apply for a role, we collect the contact details, role selection, message and resume you submit. Business enquiries and launch notifications collect only the information shown in those forms.
      </p>

      <h2>Why we use it</h2>
      <p>
        Application information is used to review candidacy and contact you about relevant opportunities. Enquiry information is used to respond to your request. Launch-notification emails are used only to contact you about the upcoming Cogdual HRMS platform.
      </p>

      <h2>Resume storage</h2>
      <p>
        Resumes are designed to be stored in private object storage. Access is limited to authorised recruitment workflows and short-lived review links. Production storage, retention and deletion periods must be finalised before launch.
      </p>

      <h2>Security and abuse prevention</h2>
      <p>
        The forms use server-side validation, rate limiting, a hidden anti-bot field and Cloudflare Turnstile when production keys are configured.
      </p>

      <h2>Your choices</h2>
      <p>
        You may contact hrservices@cogdual.com to ask about your submitted information or request deletion where applicable. The site stores a small local preference for the cookie/consent banner and PWA behaviour.
      </p>

      <h2>Contact</h2>
      <p>Questions about privacy can be sent to hrservices@cogdual.com.</p>
    </main>
  );
}
