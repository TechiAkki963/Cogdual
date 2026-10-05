import type { Metadata } from 'next';
import Link from 'next/link';
import { ContactForm } from '@/components/forms/contact-form';
import { ArrowIcon } from '@/components/icons';
import { SimpleFooter } from '@/components/simple-footer';
import { recruitmentFeeBands } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Employer Solutions',
  description: 'Recruitment, executive search, corporate training and payroll support from Cogdual Infotech Solutions.',
};

const employerSolutions = [
  { id: 'fresher-hiring', title: 'Fresher / entry-level hiring', body: 'A focused sourcing, screening and shortlisting process for graduate and early-career hiring programmes.' },
  { id: 'lateral-hiring', title: 'Experienced / lateral hiring', body: 'Role-specific recruitment across IT and non-IT functions for professionals who can contribute with less ramp-up time.' },
  { id: 'executive-search', title: 'Executive / leadership search', body: 'A discreet search path for senior leaders where capability, strategic fit and organisational context matter as much as the résumé.' },
  { id: 'corporate-training', title: 'Corporate training', body: 'Custom communication, behavioural and leadership development programmes shaped around the organisation and participant group.' },
  { id: 'payroll', title: 'Payroll outsourcing', body: 'Operational payroll support with tax advisory and submissions, compensation and benefits support, and statutory compliance assistance.' },
  { id: 'it-business-partnering', title: 'IT business partnering', body: 'A requirement-led business engagement referenced in Cogdual’s current service commercials. The exact technology scope and delivery model should be agreed during discovery rather than assumed on the public site.' },
] as const;

export default function EmployersPage() {
  return (
    <main id="main-content">
      <section className="subpage-hero subpage-hero--employer">
        <div className="shell subpage-hero__grid">
          <div>
            <p className="section-kicker">Employer solutions</p>
            <h1>Hire well, support people better, and reduce HR operating friction.</h1>
            <p className="subpage-hero__copy">Cogdual supports employers from first-job hiring through lateral and leadership recruitment, then extends into training and payroll operations.</p>
            <div className="hero__actions">
              <a href="#employer-enquiry" className="button button--gold">Start an enquiry <ArrowIcon className="icon-inline" /></a>
              <Link href="/#jobs" className="button button--quiet">View current roles</Link>
            </div>
          </div>
          <div className="employer-statements">
            <div><strong>3</strong><span>recruitment levels</span></div>
            <div><strong>2</strong><span>workforce support lines</span></div>
            <div><strong>1</strong><span>partner across the hiring lifecycle</span></div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell employer-solution-list">
          {employerSolutions.map((solution, index) => (
            <article id={solution.id} key={solution.id}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <div><h2>{solution.title}</h2><p>{solution.body}</p></div>
            </article>
          ))}
        </div>
      </section>

      <section className="section section--surface">
        <div className="shell split-heading">
          <div>
            <p className="section-kicker">Published recruitment commercials</p>
            <h2 className="section-heading">Transparent fee bands for lateral and leadership hiring.</h2>
          </div>
          <p className="section-copy">Corporate training, payroll outsourcing and other specialised engagements are scoped and priced against the requirement.</p>
        </div>
        <div className="fee-table shell" role="table" aria-label="Recruitment fee bands">
          {recruitmentFeeBands.map((band) => (
            <div className="fee-row" role="row" key={band.label}>
              <div role="cell"><strong>{band.label}</strong><span>Basis: {band.basis}</span></div>
              <div role="cell">{band.fee}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="section" id="employer-enquiry">
        <div className="shell contact-grid">
          <div className="editorial-callout">
            <p className="section-kicker">Talk to the recruitment team</p>
            <h2>Share the role, hiring volume or workforce problem.</h2>
            <p>Cogdual can route the enquiry to recruitment, executive search, training or payroll support without making you choose an internal department first.</p>
          </div>
          <div className="contact-form-wrap"><h3>Employer enquiry</h3><ContactForm /></div>
        </div>
      </section>
      <SimpleFooter />
    </main>
  );
}
