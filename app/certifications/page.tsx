import type { Metadata } from 'next';
import Link from 'next/link';
import { ContactForm } from '@/components/forms/contact-form';
import { ArrowIcon, ExternalIcon } from '@/components/icons';
import { SimpleFooter } from '@/components/simple-footer';
import { certificationBrands, certificationVoucherTypes } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Global Certifications',
  description: 'Explore Cogdual certification pathways and e-learning, practice, exam and bundle voucher options.',
};

export default function CertificationsPage() {
  return (
    <main id="main-content">
      <section className="subpage-hero">
        <div className="shell subpage-hero__grid">
          <div>
            <p className="section-kicker">Global certification</p>
            <h1>Build recognised proof of skill for the role you want.</h1>
            <p className="subpage-hero__copy">
              Cogdual helps students and professionals navigate certification options from established technology and business brands, with voucher formats for learning, practice and exams.
            </p>
            <div className="hero__actions">
              <a className="button button--gold" href="#certification-enquiry">Ask about a certification</a>
              <Link className="button button--quiet" href="/#jobs">See open positions</Link>
            </div>
          </div>
          <div className="brand-board" aria-label="Popular certification brands">
            <p>Popular certification brands</p>
            <div className="brand-board__grid">
              {certificationBrands.map((brand) => <strong key={brand}>{brand}</strong>)}
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell split-heading">
          <div>
            <p className="section-kicker">Voucher options</p>
            <h2 className="section-heading">Choose the support you actually need.</h2>
          </div>
          <p className="section-copy">Availability depends on the certification selected. Cogdual confirms current pricing after you share the exact title, voucher type and quantity.</p>
        </div>
        <div className="voucher-list shell">
          {certificationVoucherTypes.map((item, index) => (
            <article key={item.title}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <div><h3>{item.title}</h3><p>{item.description}</p></div>
            </article>
          ))}
        </div>
      </section>

      <section className="section section--surface">
        <div className="shell certification-path">
          <div>
            <p className="section-kicker">A simpler decision flow</p>
            <h2 className="section-heading">Start with the outcome, not the catalogue.</h2>
          </div>
          <ol>
            <li><span>1</span><div><strong>Pick the role or skill</strong><p>Identify what you want the credential to prove.</p></div></li>
            <li><span>2</span><div><strong>Shortlist the certification</strong><p>Choose the exact certification title from the relevant brand.</p></div></li>
            <li><span>3</span><div><strong>Select voucher format</strong><p>E-learning, practice, exam or a bundle, depending on availability.</p></div></li>
            <li><span>4</span><div><strong>Request pricing</strong><p>Send the title, voucher type and number of vouchers required.</p></div></li>
          </ol>
        </div>
      </section>

      <section className="section" id="certification-enquiry">
        <div className="shell contact-grid">
          <div className="editorial-callout">
            <p className="section-kicker">Certification enquiry</p>
            <h2>Tell Cogdual exactly what you need.</h2>
            <p>In your message, include the certification title, voucher type and quantity. The team can then confirm the applicable option and pricing.</p>
            <a className="text-link" href="https://cogdual.com/global-certification" target="_blank" rel="noreferrer">
              View the current Cogdual certification catalogue <ExternalIcon className="icon-inline" />
            </a>
          </div>
          <div className="contact-form-wrap">
            <h3>Request certification details</h3>
            <ContactForm />
          </div>
        </div>
      </section>
      <SimpleFooter />
    </main>
  );
}
