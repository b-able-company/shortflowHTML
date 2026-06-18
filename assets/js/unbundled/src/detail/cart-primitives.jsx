// Shared UI primitives for the cart + proposal flow.
// Reuses BASE_TOKENS / POSTER_TONES / shade / HeartIcon from existing files.

// ─── Top nav (cart icon + count) ─────────────────────────────
function CartTopNav({ t = BASE_TOKENS, active = 'content', cartCount = 0, onCartClick }) {
  const items = [
    { k: 'content', label: '콘텐츠' },
    { k: 'dashboard', label: '대시보드' },
    { k: 'guide', label: '이용가이드' },
  ];
  return (
    <header style={{
      borderBottom: `0.5px solid ${t.line}`, background: t.surface,
      height: 64, display: 'flex', alignItems: 'center',
      position: 'sticky', top: 0, zIndex: 20,
    }}>
      <div style={{ width: '100%', maxWidth: 1180, margin: '0 auto', padding: '0 40px', display: 'flex', alignItems: 'center', gap: 36, whiteSpace: 'nowrap' }}>
        <div style={{
          fontWeight: 800, fontSize: 22, letterSpacing: -0.8,
          fontStyle: 'italic', fontFamily: t.sans,
        }}>
          <span style={{ color: '#111827' }}>short</span><span style={{ color: '#CBD5E1' }}>flow</span>
        </div>
        <nav style={{ display: 'flex', gap: 26 }}>
          {items.map((it) => (
            <div key={it.k} style={{
              fontSize: 14, cursor: 'pointer',
              color: it.k === active ? '#E85D2C' : '#6B7280',
              fontWeight: it.k === active ? 600 : 400,
            }}>{it.label}</div>
          ))}
        </nav>
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 16, color: '#6B7280', fontSize: 14 }}>
          <button onClick={onCartClick} style={{
            position: 'relative', height: 36, padding: '0 12px',
            borderRadius: 10, border: `0.5px solid ${t.line}`,
            background: t.surface, cursor: 'pointer',
            display: 'inline-flex', alignItems: 'center', gap: 8,
            fontFamily: t.sans, fontSize: 13, color: t.ink, fontWeight: 500,
          }}>
            <CartIcon size={15} />
            <span>장바구니</span>
            <span style={{
              fontFamily: t.mono, fontSize: 11, fontWeight: 600,
              background: '#E85D2C', color: '#fff',
              minWidth: 18, height: 18, padding: '0 5px',
              borderRadius: 9, display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              letterSpacing: 0,
            }}>{cartCount}</span>
          </button>
          <span style={{ color: t.ink, fontWeight: 500, fontSize: 14 }}>{PLATFORM_NAME}</span>
        </div>
      </div>
    </header>
  );
}

function CartIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 4h2l2.2 11.3a2 2 0 0 0 2 1.7h8.1a2 2 0 0 0 2-1.6L21 8H6" />
      <circle cx="9.5" cy="20" r="1.3" />
      <circle cx="17" cy="20" r="1.3" />
    </svg>
  );
}

function TrashIcon({ size = 14, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 6h18" />
      <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      <path d="M19 6l-1.2 13a2 2 0 0 1-2 1.8H8.2a2 2 0 0 1-2-1.8L5 6" />
    </svg>
  );
}

function CheckIcon({ size = 12, color = '#fff', weight = 2.2 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 12 12" fill="none" stroke={color} strokeWidth={weight} strokeLinecap="round" strokeLinejoin="round">
      <path d="M2.2 6.4l2.5 2.5 5-5.5" />
    </svg>
  );
}

function SendIcon({ size = 14, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 2 11 13" />
      <path d="m22 2-7 20-4-9-9-4 20-7z" />
    </svg>
  );
}

function CloseIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 6 6 18M6 6l12 12"/>
    </svg>
  );
}

function ChevronIcon({ dir = 'down', size = 14, color = 'currentColor' }) {
  const rot = { right: -90, down: 0, left: 90, up: 180 }[dir];
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" style={{ transform: `rotate(${rot}deg)`, transition: 'transform .2s' }}>
      <path d="M4 6l4 4 4-4" stroke={color} strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ─── Form atoms ───────────────────────────────────────────────
function Field({ label, hint, required, children, t = BASE_TOKENS, style = {} }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, ...style }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
        <span style={{ fontSize: 12.5, fontWeight: 600, color: t.ink, letterSpacing: -0.1 }}>{label}</span>
        {required && <span style={{ color: '#E85D2C', fontSize: 12 }}>*</span>}
        {hint && <span style={{ fontSize: 11.5, color: t.inkFaint, marginLeft: 'auto', fontFamily: t.mono }}>{hint}</span>}
      </div>
      {children}
    </div>
  );
}

function ReadonlyField({ value, t = BASE_TOKENS, mono = false }) {
  return (
    <div style={{
      height: 38, padding: '0 12px', borderRadius: 8,
      background: t.surfaceAlt, border: `0.5px solid ${t.line}`,
      display: 'flex', alignItems: 'center',
      fontFamily: mono ? t.mono : t.sans, fontSize: 13.5, color: t.inkMute,
    }}>{value}</div>
  );
}

function TextInput({ value, onChange, placeholder, t = BASE_TOKENS, mono = false, suffix, prefix }) {
  return (
    <div style={{
      height: 38, padding: '0 12px', borderRadius: 8,
      background: t.surface, border: `0.5px solid ${t.lineStrong}`,
      display: 'flex', alignItems: 'center', gap: 6,
      transition: 'border-color .12s',
    }}>
      {prefix && <span style={{ fontSize: 12, color: t.inkMute, fontFamily: t.mono, fontWeight: 500 }}>{prefix}</span>}
      <input
        value={value || ''}
        onChange={(e) => onChange && onChange(e.target.value)}
        placeholder={placeholder}
        style={{
          flex: 1, border: 'none', outline: 'none', background: 'transparent',
          fontFamily: mono ? t.mono : t.sans, fontSize: 13.5, color: t.ink,
          height: '100%', padding: 0,
        }}
      />
      {suffix && <span style={{ fontSize: 12, color: t.inkMute, fontFamily: t.mono }}>{suffix}</span>}
    </div>
  );
}

function TextArea({ value, onChange, placeholder, t = BASE_TOKENS, rows = 3 }) {
  return (
    <textarea
      value={value || ''}
      onChange={(e) => onChange && onChange(e.target.value)}
      placeholder={placeholder}
      rows={rows}
      style={{
        width: '100%', padding: '10px 12px', borderRadius: 8,
        background: t.surface, border: `0.5px solid ${t.lineStrong}`,
        fontFamily: t.sans, fontSize: 13.5, color: t.ink, resize: 'none',
        outline: 'none', lineHeight: 1.5,
      }}
    />
  );
}

function Select({ value, onChange, options, t = BASE_TOKENS, placeholder }) {
  return (
    <div style={{
      position: 'relative', height: 38, padding: '0 36px 0 12px', borderRadius: 8,
      background: t.surface, border: `0.5px solid ${t.lineStrong}`,
      display: 'flex', alignItems: 'center',
      fontFamily: t.sans, fontSize: 13.5, color: value ? t.ink : t.inkFaint,
      cursor: 'pointer',
    }}>
      <span>{value || placeholder || '선택'}</span>
      <span style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', color: t.inkMute, pointerEvents: 'none' }}>
        <ChevronIcon dir="down" size={14} />
      </span>
    </div>
  );
}

function RadioChip({ active, onClick, children, t = BASE_TOKENS }) {
  return (
    <button onClick={onClick} style={{
      height: 36, padding: '0 14px', borderRadius: 8,
      border: active ? '0.5px solid transparent' : `0.5px solid ${t.lineStrong}`,
      background: active ? '#E85D2C' : t.surface,
      color: active ? '#fff' : t.ink,
      fontFamily: t.sans, fontSize: 13, fontWeight: active ? 600 : 500,
      cursor: 'pointer', whiteSpace: 'nowrap', transition: 'all .12s',
    }}>{children}</button>
  );
}

function RadioGroup({ value, onChange, options, t = BASE_TOKENS }) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
      {options.map((o) => (
        <RadioChip key={o} active={value === o} onClick={() => onChange && onChange(o)} t={t}>{o}</RadioChip>
      ))}
    </div>
  );
}

function Toggle({ value, onChange, options, t = BASE_TOKENS }) {
  return (
    <div style={{
      display: 'inline-flex', padding: 3, borderRadius: 9,
      background: t.surfaceAlt, border: `0.5px solid ${t.line}`,
    }}>
      {options.map((o) => (
        <button key={o} onClick={() => onChange && onChange(o)} style={{
          height: 30, padding: '0 14px', borderRadius: 7, border: 'none',
          background: value === o ? t.surface : 'transparent',
          color: value === o ? t.ink : t.inkMute,
          fontFamily: t.mono, fontSize: 12, fontWeight: 600,
          cursor: 'pointer', boxShadow: value === o ? '0 1px 3px rgba(0,0,0,0.06), 0 0 0 0.5px rgba(0,0,0,0.04)' : 'none',
          letterSpacing: 0.3, transition: 'all .12s',
        }}>{o}</button>
      ))}
    </div>
  );
}

function Checkbox({ checked, onChange, size = 18, indeterminate = false }) {
  const bg = checked || indeterminate ? '#E85D2C' : '#fff';
  return (
    <div onClick={() => onChange && onChange(!checked)} style={{
      width: size, height: size, borderRadius: 5,
      background: bg,
      border: checked || indeterminate ? 'none' : '1.2px solid #C9C7C0',
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      cursor: 'pointer', flexShrink: 0, transition: 'all .12s',
    }}>
      {indeterminate ? (
        <div style={{ width: size * 0.5, height: 2, background: '#fff', borderRadius: 1 }} />
      ) : checked ? (
        <CheckIcon size={Math.round(size * 0.66)} weight={2.4} />
      ) : null}
    </div>
  );
}

function PrimaryButton({ children, onClick, height = 44, full, t = BASE_TOKENS, icon, style = {}, disabled }) {
  return (
    <button onClick={onClick} disabled={disabled} style={{
      height, padding: '0 22px', borderRadius: 10,
      border: 'none', background: disabled ? '#D4D2CB' : '#E85D2C',
      color: '#fff', fontFamily: t.sans, fontSize: 14, fontWeight: 600,
      cursor: disabled ? 'not-allowed' : 'pointer',
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
      width: full ? '100%' : undefined, letterSpacing: -0.1,
      transition: 'background .12s',
      ...style,
    }}>
      {icon}
      {children}
    </button>
  );
}

function GhostButton({ children, onClick, height = 44, t = BASE_TOKENS, icon, style = {} }) {
  return (
    <button onClick={onClick} style={{
      height, padding: '0 18px', borderRadius: 10,
      border: `0.5px solid ${t.lineStrong}`, background: t.surface,
      color: t.ink, fontFamily: t.sans, fontSize: 14, fontWeight: 500,
      cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 6,
      ...style,
    }}>
      {icon}
      {children}
    </button>
  );
}

// ─── Item row pieces ──────────────────────────────────────────
function ItemPoster({ tone, size = 64, ratio = 1.4, label }) {
  const tt = POSTER_TONES[tone] || POSTER_TONES.rose;
  return (
    <div style={{
      width: size, height: Math.round(size * ratio),
      borderRadius: 6, flexShrink: 0,
      background: `linear-gradient(160deg, ${tt.bg} 0%, ${shade(tt.bg, -12)} 100%)`,
      boxShadow: 'inset 0 0 0 0.5px rgba(0,0,0,0.08)',
      display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
      padding: '4px 4px', color: tt.ink,
      fontFamily: BASE_TOKENS.mono, fontSize: 8, letterSpacing: 0.3,
      textAlign: 'center', lineHeight: 1.1,
    }}>{label || '포스터'}</div>
  );
}

Object.assign(window, {
  CartTopNav, CartIcon, TrashIcon, CheckIcon, SendIcon, CloseIcon, ChevronIcon,
  Field, ReadonlyField, TextInput, TextArea, Select,
  RadioChip, RadioGroup, Toggle, Checkbox,
  PrimaryButton, GhostButton, ItemPoster,
});
