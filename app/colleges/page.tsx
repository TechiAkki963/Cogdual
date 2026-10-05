import type { Metadata } from 'next';
import { ContactForm } from '@/components/forms/contact-form';
import { SimpleFooter } from '@/components/simple-footer';
import { vconnectPrograms } from '@/lib/data';

export const metadata: Metadata = {
  title: 'VConnect · Industry–Academia',
  description: 'Industry speakers, faculty development, event judging and curriculum guidance for colleges through Cogdual VConnect.',
};

export default function CollegesPage() {
  return (
    <main id="main-content">
      <section className="subpage-hero subpage-hero--campus">
        <div className="shell subpage-hero__grid">
          <div>
            <p className="section-kicker">VConnect · Academia meets industry</p>
            <h1>Bring current industry experience into the classroom.</h1>
            <p className="subpage-hero__copy">VConnect helps colleges access working professionals for student sessions, faculty development, event assessment and curriculum guidance.</p>
            <div className="hero__actions"><a className="button button--gold" href="#college-enquiry">Plan a programme</a></div>
          </div>
          <div className="campus-quote"><span>Industry context</span><strong>→</strong><span>Academic learning</span><strong>→</strong><span>Career readiness</span></div>
        </div>
      </section>

      <section className="section">
        <div className="shell programme-list">
          {vconnectPrograms.map((program, index) => (
            <article key={program.title}>
              <div className="programme-list__index">{String(index + 1).padStart(2, '0')}</div>
              <div><h2>{program.title}</h2><p>{program.description}</p><small>{program.meta}</small></div>
            </article>
          ))}
        </div>
      </section>

      <section className="section section--surface">
        <div className="shell travel-note">
          <div><p className="section-kicker">Engagement planning</p><h2 className="section-heading">Virtual or in-person, scoped before delivery.</h2></div>
          <p>For in-person programmes, travel, food and lodging arrangements are handled with the institution where applicable. Flight or train booking requirements are agreed based on the speaker’s base location and travel distance.</p>
        </div>
      </section>

      <section className="section" id="college-enquiry">
        <div className="shell contact-grid">
          <div className="editorial-callout"><p className="section-kicker">College enquiry</p><h2>Tell us the audience, format and outcome you want.</h2><p>Include the programme type, expected audience size, preferred date or window, and whether you prefer virtual or in-person delivery.</p></div>
          <div className="contact-form-wrap"><h3>Plan a VConnect engagement</h3><ContactForm /></div>
        </div>
      </section>
      <SimpleFooter />
    </main>
  );
}
