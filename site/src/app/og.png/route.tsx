import { ImageResponse } from 'next/og';

const SITE = {
  name: 'Virginia Page & Co. Hair Studio',
  title: 'Virginia Page & Co. Hair Studio | Rolesville, NC',
  subtitle: 'Expert cuts, color, highlights, Brazilian blowouts, and salon care in downtown Rolesville.',
  eyebrow: 'Rolesville hair studio • book online',
  accent: '#C9A24A',
  bg: '#181411',
  bg2: '#6F4E37',
  fg: '#FFF8EA',
  muted: '#F2D7A4',
};

function clean(value: string | null, fallback: string, max = 118) {
  const text = (value || fallback).replace(/\s+/g, ' ').trim();
  return text.length > max ? `${text.slice(0, max - 1)}…` : text;
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const title = clean(url.searchParams.get('title'), SITE.title, 76);
  const subtitle = clean(url.searchParams.get('description'), SITE.subtitle, 132);

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: `radial-gradient(circle at 82% 18%, ${SITE.accent}55 0, transparent 30%), linear-gradient(135deg, ${SITE.bg} 0%, ${SITE.bg2} 100%)`,
          color: SITE.fg,
          padding: 72,
          fontFamily: 'Arial, sans-serif',
        }}
      >
        <div style={{ display: 'flex', fontSize: 30, letterSpacing: 7, textTransform: 'uppercase', color: SITE.muted }}>
          {SITE.eyebrow}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24, maxWidth: 900 }}>
          <div style={{ display: 'flex', fontSize: 78, lineHeight: 0.98, fontWeight: 900, letterSpacing: -2 }}>{title}</div>
          <div style={{ display: 'flex', fontSize: 38, lineHeight: 1.18, color: SITE.muted, maxWidth: 820 }}>{subtitle}</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 26 }}>
          <div style={{ display: 'flex', color: SITE.muted }}>vahair.studio</div>
          <div style={{ display: 'flex', color: SITE.fg, fontWeight: 800 }}>{SITE.name}</div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
