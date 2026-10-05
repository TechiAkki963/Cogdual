'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ContactIcon, HomeIcon, JobsIcon, ServicesIcon } from '@/components/icons';

const items = [
  { id: 'home', label: 'Home', href: '/#home', Icon: HomeIcon },
  { id: 'services', label: 'Services', href: '/#services', Icon: ServicesIcon },
  { id: 'jobs', label: 'Jobs', href: '/#jobs', Icon: JobsIcon },
  { id: 'contact', label: 'Contact', href: '/#contact', Icon: ContactIcon },
] as const;

export function MobileNav() {
  const pathname = usePathname();
  const [active, setActive] = useState<(typeof items)[number]['id']>(pathname === '/' ? 'home' : 'services');

  useEffect(() => {
    if (pathname !== '/') {
      setActive('services');
      return;
    }

    const sections = items
      .map((item) => document.getElementById(item.id))
      .filter((section): section is HTMLElement => Boolean(section));
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActive(visible.target.id as typeof active);
      },
      { rootMargin: '-15% 0px -65% 0px', threshold: [0.01, 0.25, 0.5] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [pathname]);

  return (
    <nav className="mobile-nav" aria-label="Mobile navigation">
      {items.map(({ id, href, label, Icon }) => (
        <Link
          key={id}
          href={href}
          className={active === id ? 'mobile-nav__item is-active' : 'mobile-nav__item'}
          aria-current={active === id ? 'page' : undefined}
        >
          <Icon className="mobile-nav__icon" />
          <span>{label}</span>
        </Link>
      ))}
    </nav>
  );
}
