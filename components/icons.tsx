import type { SVGProps } from 'react';

export function LogoMark(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 40 40" fill="none" aria-hidden="true" {...props}>
      <path d="M10 7.5A14.5 14.5 0 1 0 28 30" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
      <path d="M30 32.5A14.5 14.5 0 1 0 12 10" stroke="currentColor" strokeWidth="4" strokeLinecap="round" opacity=".45" />
      <circle cx="20" cy="20" r="3.5" fill="currentColor" />
    </svg>
  );
}

function IconBase(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    />
  );
}

export function HomeIcon(props: SVGProps<SVGSVGElement>) {
  return <IconBase {...props}><path d="m3 11 9-8 9 8" /><path d="M5 10v10h14V10" /><path d="M9 20v-6h6v6" /></IconBase>;
}

export function ServicesIcon(props: SVGProps<SVGSVGElement>) {
  return <IconBase {...props}><rect x="3" y="4" width="18" height="6" rx="2" /><rect x="3" y="14" width="8" height="6" rx="2" /><rect x="13" y="14" width="8" height="6" rx="2" /></IconBase>;
}

export function JobsIcon(props: SVGProps<SVGSVGElement>) {
  return <IconBase {...props}><rect x="3" y="7" width="18" height="13" rx="2" /><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /><path d="M3 12h18" /></IconBase>;
}

export function ContactIcon(props: SVGProps<SVGSVGElement>) {
  return <IconBase {...props}><path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z" /></IconBase>;
}

export function ArrowIcon(props: SVGProps<SVGSVGElement>) {
  return <IconBase {...props}><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></IconBase>;
}

export function CloseIcon(props: SVGProps<SVGSVGElement>) {
  return <IconBase {...props}><path d="m6 6 12 12" /><path d="M18 6 6 18" /></IconBase>;
}

export function PhoneIcon(props: SVGProps<SVGSVGElement>) {
  return <IconBase {...props}><path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.79 19.79 0 0 1 3.09 5.18 2 2 0 0 1 5.08 3h3a2 2 0 0 1 2 1.72c.12.9.33 1.78.62 2.63a2 2 0 0 1-.45 2.11L9 10.71a16 16 0 0 0 4.29 4.29l1.25-1.25a2 2 0 0 1 2.11-.45c.85.29 1.73.5 2.63.62A2 2 0 0 1 22 16.92z" /></IconBase>;
}

export function MailIcon(props: SVGProps<SVGSVGElement>) {
  return <IconBase {...props}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></IconBase>;
}

export function MapIcon(props: SVGProps<SVGSVGElement>) {
  return <IconBase {...props}><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></IconBase>;
}

export function UploadIcon(props: SVGProps<SVGSVGElement>) {
  return <IconBase {...props}><path d="M12 16V4" /><path d="m7 9 5-5 5 5" /><path d="M5 20h14" /></IconBase>;
}

export function CheckIcon(props: SVGProps<SVGSVGElement>) {
  return <IconBase {...props}><path d="m5 12 4 4L19 6" /></IconBase>;
}

export function ExternalIcon(props: SVGProps<SVGSVGElement>) {
  return <IconBase {...props}><path d="M14 4h6v6" /><path d="M10 14 20 4" /><path d="M20 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h5" /></IconBase>;
}
