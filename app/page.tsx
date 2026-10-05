import Link from 'next/link';
import { ContactForm } from '@/components/forms/contact-form';
import { NotifyForm } from '@/components/forms/notify-form';
import { ArrowIcon, ExternalIcon, MailIcon, MapIcon, PhoneIcon } from '@/components/icons';
import { Jobs } from '@/components/jobs';
import { ServiceCarousel } from '@/components/service-carousel';
import { SolutionDirectory } from '@/components/solution-directory';
import {
  audienceRoutes,
  certificationBrands,
  company,
  footerLinks,
  jobs,
} from '@/lib/data';

function jobJsonLd(job: (typeof jobs)[number]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'JobPosting',
    title: job.title,
    description: job.summary,
    employmentType: 'FULL_TIME',
    hiringOrganization: {
      '@type': 'Organization',
      name: company.name,
      sameAs: 'https://cogdual.com',
    },
    ...(job.mode === 'Remote'
      ? {
          jobLocationType: 'TELECOMMUTE',
          applicantLocationRequirements: { '@type': 'Country', name: 'India' },
        }
      : {}),
  };
}

export default function HomePage() {
  const organizationJsonLd = {
    '@context': 'https://schema.org',
    '@type': ['Organization', 'LocalBusiness'],
    name: company.name,
    url: 'https://cogdual.com',
    email: company.email,
    telephone: company.phoneHref,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Door No. 5 Sath Sangam Road, SS Colony',
      addressLocality: company.city,
      addressRegion: company.region,
      postalCode: company.postalCode,
      addressCountry: company.country,
    },
    sameAs: [company.linkedin],
  };

  return (
    <main id="main-content">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      {jobs.map((job) => (
        <script
          key={job.id}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jobJsonLd(job)) }}
        />
      ))}

      <section className="hero" id="home">
        <div className="shell hero__grid">
          <div className="hero-copy">
            <p className="hero__tagline">{company.tagline}</p>
            <h1>Build skills. Find talent. Move careers forward.</h1>
            <p className="hero__promise">
              Cogdual connects careers, certification, recruitment and workforce support in one practical ecosystem for people, employers and colleges.
            </p>
            <div className="hero__actions">
              <Link className="button button--gold" href="#jobs">
                See open positions <ArrowIcon className="icon-inline" />
              </Link>
              <Link className="button button--quiet" href="/employers">
                Hire through us
              </Link>
            </div>
            <p className="hero__trust">
              Recruitment · Global certifications · VConnect · Corporate training · Payroll · Career opportunities
            </p>
          </div>

          <div className="hero-visual hero-visual--ecosystem" aria-label="Cogdual career and workforce ecosystem">
            <div className="ecosystem-orbit ecosystem-orbit--one" />
            <div className="ecosystem-orbit ecosystem-orbit--two" />
            <div className="ecosystem-core">
              <span>Cogdual</span>
              <strong>Career & workforce ecosystem</strong>
            </div>
            <span className="ecosystem-node ecosystem-node--jobs">Jobs</span>
            <span className="ecosystem-node ecosystem-node--cert">Certify</span>
            <span className="ecosystem-node ecosystem-node--hire">Hire</span>
            <span className="ecosystem-node ecosystem-node--campus">Campus</span>
          </div>
        </div>
      </section>

      <section className="section section--route">
        <div className="shell">
          <div className="route-heading">
            <p className="section-kicker">Start with your goal</p>
            <h2 className="section-heading">Four clear ways into Cogdual.</h2>
          </div>
          <div className="audience-route-grid">
            {audienceRoutes.map((route) => (
              <Link className="audience-route" href={route.href} key={route.title}>
                <h3>{route.title}</h3>
                <p>{route.description}</p>
                <span>{route.action} <ArrowIcon /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--tight hrms-section" id="hrms">
        <div className="shell">
          <div className="launch-card">
            <div className="launch-card__layout">
              <div>
                <p className="launch-card__status">Launching soon · for startups</p>
                <h2>A unified HRMS without enterprise overhead.</h2>
                <p className="launch-card__copy">
                  Bring resume screening, interviews, background checks, digital offers, onboarding and payroll into one operating layer built for lean teams and startup budgets.
                </p>
                <ul className="feature-strip" aria-label="HRMS capabilities">
                  <li>Resume screening</li>
                  <li>Interview workflow</li>
                  <li>Background checks</li>
                  <li>Digital offers</li>
                  <li>Onboarding</li>
                  <li>Payroll</li>
                </ul>
              </div>
              <div className="launch-card__form">
                <h3>Join the launch list</h3>
                <p>We’ll contact you when early access is ready.</p>
                <NotifyForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="services">
        <div className="shell service-heading-row">
          <div>
            <p className="section-kicker">Core pathways</p>
            <h2 className="section-heading">Different needs, one connected career ecosystem.</h2>
          </div>
          <p className="service-heading-row__note">Swipe or scroll to explore</p>
        </div>
        <div className="shell">
          <ServiceCarousel />
        </div>
      </section>

      <section className="section section--surface" id="certifications-preview">
        <div className="shell certification-preview">
          <div className="certification-preview__copy">
            <p className="section-kicker">Global certification</p>
            <h2 className="section-heading">Turn learning into recognised proof of skill.</h2>
            <p className="section-copy">
              Cogdual supports certification journeys with e-learning, practice and exam voucher options from established global brands.
            </p>
            <div className="brand-cloud" aria-label="Certification brands">
              {certificationBrands.map((brand) => <span key={brand}>{brand}</span>)}
            </div>
            <Link href="/certifications" className="button button--ink certification-preview__button">
              Explore certifications <ArrowIcon className="icon-inline" />
            </Link>
          </div>
          <div className="certification-preview__steps" aria-label="Certification pathway">
            <div><span>01</span><strong>Choose your certification</strong><p>Match the credential to the role or skill you are working toward.</p></div>
            <div><span>02</span><strong>Select voucher type</strong><p>E-learning, practice, exam or bundle options depending on availability.</p></div>
            <div><span>03</span><strong>Enquire and prepare</strong><p>Share the exact certification title and quantity so Cogdual can confirm pricing.</p></div>
          </div>
        </div>
      </section>

      <section className="section" id="all-solutions">
        <div className="shell directory-layout">
          <div className="directory-intro">
            <p className="section-kicker">Complete portfolio</p>
            <h2 className="section-heading">Everything Cogdual offers, without making you hunt for it.</h2>
            <p className="section-copy">
              Recruitment, certification, campus engagement, training, payroll and Cogdual’s learning and gifting ventures are organised by outcome rather than buried in long pages.
            </p>
          </div>
          <SolutionDirectory />
        </div>
      </section>

      <section className="section section--about" id="about">
        <div className="shell about-editorial">
          <div>
            <p className="section-kicker">About Cogdual</p>
            <h2 className="section-heading">A bridge between capability and opportunity.</h2>
            <p className="section-copy">
              Based in Madurai, Cogdual works across the career lifecycle: helping people become more job-ready, helping organisations find and support talent, and helping institutions bring current industry context into learning.
            </p>
          </div>
          <div className="about-blocks about-blocks--three">
            <article className="about-block">
              <h3>Mission</h3>
              <p>Connect people, organisations and institutions with practical services that improve employability and workforce outcomes.</p>
            </article>
            <article className="about-block">
              <h3>Values</h3>
              <p>Integrity, useful expertise, transparency and respectful collaboration across every engagement.</p>
            </article>
            <article className="about-block">
              <h3>Results</h3>
              <p>Clearer hiring decisions, stronger career readiness and partnerships designed for sustainable growth.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="section" id="jobs">
        <div className="shell">
          <div className="jobs-header">
            <div>
              <p className="section-kicker">Open positions</p>
              <h2 className="section-heading">Find the role that fits your next move.</h2>
            </div>
            <p className="section-copy">
              Pick a role, attach your resume and send your application from the same screen. No account required.
            </p>
          </div>
          <Jobs />
        </div>
      </section>

      <section className="section" id="contact">
        <div className="shell contact-grid">
          <div className="contact-panel">
            <p className="section-kicker contact-panel__kicker">Talk to Cogdual</p>
            <h2>Hiring, certification, campus programmes or HR support?</h2>
            <p>Send an enquiry, call directly, or visit the Madurai office.</p>
            <div className="contact-links">
              <a className="contact-link" href={`tel:${company.phoneHref}`}>
                <PhoneIcon />
                <span><strong>{company.phoneDisplay}</strong><small>Tap to call</small></span>
              </a>
              <a className="contact-link" href={`mailto:${company.email}`}>
                <MailIcon />
                <span><strong>{company.email}</strong><small>Tap to email</small></span>
              </a>
              <a className="contact-link" href={company.mapUrl} target="_blank" rel="noreferrer">
                <MapIcon />
                <span><strong>{company.address}</strong><small>Open map</small></span>
              </a>
            </div>
          </div>

          <div className="contact-form-wrap">
            <h3>Tell us what you need</h3>
            <ContactForm />
          </div>
        </div>
      </section>

      <footer className="site-footer">
        <div className="shell">
          <div className="site-footer__grid">
            <div className="site-footer__about">
              <p className="section-kicker">Cogdual Infotech Solutions</p>
              <p>Comprehensive HR, career, certification and industry–academia services from Madurai.</p>
            </div>
            <nav className="site-footer__links" aria-label="Footer links">
              {footerLinks.map((link) => {
                const external = link.href.startsWith('http');
                return external ? (
                  <a key={link.label} href={link.href} target="_blank" rel="noreferrer">
                    {link.label} <ExternalIcon className="icon-inline" />
                  </a>
                ) : (
                  <Link key={link.label} href={link.href}>{link.label}</Link>
                );
              })}
              <a href={company.linkedin} target="_blank" rel="noreferrer">LinkedIn <ExternalIcon className="icon-inline" /></a>
              <a href={company.youtubeSearch} target="_blank" rel="noreferrer">Vettrikanavugal on YouTube <ExternalIcon className="icon-inline" /></a>
            </nav>
          </div>
          <div className="site-footer__bottom">
            <span>© {new Date().getFullYear()} Cogdual Infotech Solutions</span>
            <span>{company.city}, India</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
