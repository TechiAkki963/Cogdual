import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Cogdual Infotech Solutions — Comprehensive HR & Career Solutions';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#0b1f33',
          color: '#fbf8f1',
          padding: '70px 76px',
          fontFamily: 'Georgia, serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 18, fontSize: 34 }}>
          <div style={{ width: 22, height: 22, borderRadius: 999, background: '#daa520' }} />
          Cogdual Infotech Solutions
        </div>
        <div style={{ fontSize: 82, lineHeight: 0.98, maxWidth: 940, letterSpacing: -3 }}>
          Comprehensive HR & Career Solutions
        </div>
        <div style={{ fontFamily: 'Arial, sans-serif', color: '#d9e4ee', fontSize: 28 }}>
          Careers · Recruitment · Industry–academia · Certification · Workforce support
        </div>
      </div>
    ),
    size,
  );
}
