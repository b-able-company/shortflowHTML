// Small shared UI primitives used across all dashboard variants.

function Poster({ tone = 'rose', size = 44, label = '포스터' }) {
  const t = POSTER_TONES[tone] || POSTER_TONES.rose;
  return (
    <div style={{
      width: size, height: Math.round(size * 1.4), borderRadius: 6,
      background: `linear-gradient(160deg, ${t.bg} 0%, ${t.bg} 55%, ${shade(t.bg, -8)} 100%)`,
      display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
      padding: '4px 2px',
      fontFamily: BASE_TOKENS.mono, fontSize: 8, color: t.ink,
      letterSpacing: 0.3, flexShrink: 0,
      boxShadow: 'inset 0 0 0 0.5px rgba(0,0,0,0.08)',
    }}>{label}</div>
  );
}

function shade(hex, amt) {
  const c = hex.replace('#', '');
  const num = parseInt(c, 16);
  const r = Math.max(0, Math.min(255, (num >> 16) + amt));
  const g = Math.max(0, Math.min(255, ((num >> 8) & 0xff) + amt));
  const b = Math.max(0, Math.min(255, (num & 0xff) + amt));
  return '#' + ((r << 16) | (g << 8) | b).toString(16).padStart(6, '0');
}

function Badge({ kind, children, t = BASE_TOKENS }) {
  const map = {
    rs:       { bg: t.rsTint, fg: t.rsInk },
    mg:       { bg: t.mgTint, fg: t.mgInk },
    paid:     { bg: t.paidTint, fg: t.paid },
    upcoming: { bg: t.upcomingTint, fg: t.upcoming },
    neutral:  { bg: '#EEECE6', fg: t.inkMute },
  };
  const s = map[kind] || map.neutral;
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 4,
      padding: '2px 7px', borderRadius: 999,
      background: s.bg, color: s.fg,
      fontFamily: t.mono, fontSize: 11, fontWeight: 500,
      letterSpacing: 0.2, lineHeight: '16px', whiteSpace: 'nowrap',
    }}>{children}</span>
  );
}

function Card({ children, style = {}, t = BASE_TOKENS }) {
  return (
    <div style={{
      background: t.surface, border: `0.5px solid ${t.line}`,
      borderRadius: 14, padding: 14, ...style,
    }}>{children}</div>
  );
}

function Divider({ t = BASE_TOKENS, style = {} }) {
  return <div style={{ height: 0.5, background: t.line, ...style }} />;
}

function Label({ children, t = BASE_TOKENS, style = {} }) {
  return (
    <div style={{
      fontFamily: t.sans, fontSize: 11, fontWeight: 500,
      color: t.inkMute, textTransform: 'uppercase', letterSpacing: 0.6,
      ...style,
    }}>{children}</div>
  );
}

function Money({ value, size = 26, t = BASE_TOKENS, color, weight = 600 }) {
  const neg = value === 0 || value == null;
  return (
    <span style={{
      fontFamily: t.mono, fontSize: size, fontWeight: weight,
      color: color || (neg ? t.inkFaint : t.ink),
      letterSpacing: -0.5,
      fontVariantNumeric: 'tabular-nums',
    }}>{fmt(value)}</span>
  );
}

function Chevron({ dir = 'right', size = 12, color = '#9CA0A6' }) {
  const rot = { right: 0, down: 90, left: 180, up: 270 }[dir];
  return (
    <svg width={size} height={size} viewBox="0 0 12 12" style={{ transform: `rotate(${rot}deg)`, transition: 'transform .2s' }}>
      <path d="M4 2l4 4-4 4" stroke={color} strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

Object.assign(window, { Poster, Badge, Card, Divider, Label, Money, Chevron, shade });
