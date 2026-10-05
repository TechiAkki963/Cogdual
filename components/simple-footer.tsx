import Link from 'next/link';
import { ExternalIcon } from '@/components/icons';
import { company, footerLinks } from '@/lib/data';

export function SimpleFooter() {
  return (
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
          </nav>
        </div>
        <div className="site-footer__bottom">
          <span>© {new Date().getFullYear()} Cogdual Infotech Solutions</span>
          <a href={`mailto:${company.email}`}>{company.email}</a>
        </div>
      </div>
    </footer>
  );
}
