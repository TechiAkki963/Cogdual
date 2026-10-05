'use client';

import { useEffect, useState } from 'react';

const KEY = 'cogdual-consent-v1';

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(!localStorage.getItem(KEY));
  }, []);

  if (!visible) return null;

  const save = (choice: 'essential' | 'optional') => {
    localStorage.setItem(KEY, choice);
    setVisible(false);
  };

  return (
    <aside className="consent-banner" aria-label="Privacy preferences">
      <p>
        We use essential browser storage for preferences and PWA behaviour. Optional analytics are not loaded unless the site is configured to use them.
      </p>
      <div className="consent-banner__actions">
        <button type="button" className="button button--quiet" onClick={() => save('essential')}>
          Essential only
        </button>
        <button type="button" className="button button--ink" onClick={() => save('optional')}>
          Allow optional
        </button>
      </div>
    </aside>
  );
}
