'use client';

import { useMemo, useState } from 'react';
import { ApplicationSheet } from '@/components/application-sheet';
import { ArrowIcon } from '@/components/icons';
import { jobs } from '@/lib/data';

type Filter = 'All' | 'Remote' | 'Office';

export function Jobs() {
  const [filter, setFilter] = useState<Filter>('All');
  const [selectedRole, setSelectedRole] = useState('');
  const visibleJobs = useMemo(
    () => jobs.filter((job) => filter === 'All' || job.mode === filter),
    [filter],
  );

  return (
    <>
      <div className="job-filters" role="group" aria-label="Filter open positions">
        {(['All', 'Remote', 'Office'] as Filter[]).map((item) => (
          <button
            type="button"
            key={item}
            className={filter === item ? 'filter-chip is-active' : 'filter-chip'}
            aria-pressed={filter === item}
            onClick={() => setFilter(item)}
          >
            {item}
          </button>
        ))}
      </div>

      <div className="jobs-list">
        {visibleJobs.map((job) => (
          <article className="job-row" key={job.id}>
            <div className="job-row__main">
              <div className="job-row__meta">
                <span>{job.locationLabel}</span>
                <span aria-hidden="true">·</span>
                <span>Full time</span>
              </div>
              <h3>{job.title}</h3>
              <p>{job.summary}</p>
              <ul className="skill-list" aria-label={`${job.title} skills`}>
                {job.skills.map((skill) => <li key={skill}>{skill}</li>)}
              </ul>
            </div>
            <button className="job-apply" type="button" onClick={() => setSelectedRole(job.title)}>
              Apply
              <ArrowIcon />
            </button>
          </article>
        ))}
      </div>

      <ApplicationSheet
        open={Boolean(selectedRole)}
        initialRole={selectedRole}
        onClose={() => setSelectedRole('')}
      />
    </>
  );
}
