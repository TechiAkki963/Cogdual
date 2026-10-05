import Link from 'next/link';

export default function OfflinePage() {
  return (
    <main id="main-content" className="offline-page shell">
      <p className="section-kicker">Offline</p>
      <h1>Your connection dropped.</h1>
      <p>
        The Cogdual app is still installed, but this page needs a network connection to load fresh jobs or submit a form.
      </p>
      <Link className="button button--gold" href="/">Try the home page</Link>
    </main>
  );
}
