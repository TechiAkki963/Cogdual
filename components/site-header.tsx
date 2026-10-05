import Link from 'next/link';
import { LogoMark } from '@/components/icons';

const nav = [
  { label: 'Services', href: '/#services' },
  { label: 'Certifications', href: '/certifications' },
  { label: 'Employers', href: '/employers' },
  { label: 'Colleges', href: '/colleges' },
  { label: 'Jobs', href: '/#jobs' },
  { label: 'Contact', href: '/#contact' },
];

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="site-header__inner shell">
        <Link href="/#home" className="brand" aria-label="Cogdual Infotech Solutions home">
          <LogoMark className="brand__mark" />
          <span className="brand__name">Cogdual</span>
        </Link>

        <nav className="desktop-nav" aria-label="Primary navigation">
          {nav.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>

        <Link href="/#jobs" className="button button--compact button--gold">
          Apply
        </Link>
      </div>
    </header>
  );
}
