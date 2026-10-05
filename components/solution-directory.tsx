import Link from 'next/link';
import { ArrowIcon, ExternalIcon } from '@/components/icons';
import { solutions } from '@/lib/data';

export function SolutionDirectory() {
  return (
    <div className="solution-directory">
      {solutions.map((solution, index) => (
        <article className="solution-row" key={solution.title}>
          <div className="solution-row__index" aria-hidden="true">{String(index + 1).padStart(2, '0')}</div>
          <div className="solution-row__body">
            <p className="solution-row__audience">{solution.audience}</p>
            <h3>{solution.title}</h3>
            <p>{solution.description}</p>
          </div>
          {solution.external ? (
            <a className="solution-row__action" href={solution.href} target="_blank" rel="noreferrer" aria-label={`Open ${solution.title}`}>
              <ExternalIcon />
            </a>
          ) : (
            <Link className="solution-row__action" href={solution.href} aria-label={`Explore ${solution.title}`}>
              <ArrowIcon />
            </Link>
          )}
        </article>
      ))}
    </div>
  );
}
