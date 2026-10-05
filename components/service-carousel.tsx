import Link from 'next/link';
import { ArrowIcon, ExternalIcon } from '@/components/icons';
import { services } from '@/lib/data';

export function ServiceCarousel() {
  return (
    <div className="service-scroller" aria-label="Cogdual service pathways">
      {services.map((service, index) => {
        const external = service.href.startsWith('http');
        const content = (
          <>
            {service.linkLabel}
            {external ? <ExternalIcon className="icon-inline" /> : <ArrowIcon className="icon-inline" />}
          </>
        );
        return (
          <article className="service-panel" key={service.title}>
            <div className="service-panel__number">0{index + 1}</div>
            <p className="service-panel__audience">For {service.audience}</p>
            <h3>{service.title}</h3>
            <p>{service.description}</p>
            {external ? (
              <a href={service.href} target="_blank" rel="noreferrer" className="text-link">
                {content}
              </a>
            ) : (
              <Link href={service.href} className="text-link">
                {content}
              </Link>
            )}
          </article>
        );
      })}
    </div>
  );
}
