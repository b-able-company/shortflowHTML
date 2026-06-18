// 새 콘텐츠 생성 — 폼 필드 프리미티브 (디자인 시스템 톤에 맞춤)
// 모든 컴포넌트는 t(BASE_TOKENS)를 받음.

const ACCENT = '#E85D2C';
const ACCENT_SOFT = '#FFF1EC';

// ─── 라벨 + 힌트 래퍼 ──────────────────────────────────
function Field({ label, hint, required, optional, children, t, span }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 7, gridColumn: span ? `span ${span}` : 'auto', minWidth: 0 }}>
      {label && (
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 7 }}>
          <span style={{ fontFamily: t.sans, fontSize: 12.5, fontWeight: 600, color: t.ink, letterSpacing: -0.1, whiteSpace: 'nowrap' }}>{label}</span>
          {required && <span style={{ color: ACCENT, fontSize: 12, fontWeight: 700 }}>*</span>}
          {optional && <span style={{ fontFamily: t.sans, fontSize: 11, color: t.inkFaint }}>선택</span>}
          {hint && <span style={{ fontFamily: t.sans, fontSize: 11, color: t.inkFaint, marginLeft: 'auto' }}>{hint}</span>}
        </div>
      )}
      {children}
    </div>
  );
}

const inputBase = (t) => ({
  width: '100%', height: 36, padding: 0, borderRadius: 0,
  border: 'none', background: 'transparent',
  fontFamily: t.sans, fontSize: 13.5, color: t.ink, outline: 'none',
  transition: 'color .12s',
});

// ─── 텍스트 입력 ───────────────────────────────────────
function TextInput({ value, onChange, placeholder, t, mono }) {
  const [foc, setFoc] = React.useState(false);
  return (
    <input
      value={value || ''} placeholder={placeholder}
      onChange={(e) => onChange && onChange(e.target.value)}
      onFocus={() => setFoc(true)} onBlur={() => setFoc(false)}
      style={{
        ...inputBase(t),
        fontFamily: mono ? t.mono : t.sans,
        boxShadow: 'none',
      }} />
  );
}

// ─── 숫자 입력 (+ 접미사) ──────────────────────────────
function NumberInput({ value, onChange, suffix, t, placeholder }) {
  const [foc, setFoc] = React.useState(false);
  return (
    <div style={{
      ...inputBase(t), display: 'flex', alignItems: 'center',
      boxShadow: 'none',
    }}>
      <input
        type="text" inputMode="numeric" pattern="[0-9]*" value={value ?? ''} placeholder={placeholder}
        onChange={(e) => {
          const digits = e.target.value.replace(/[^0-9]/g, '');
          onChange && onChange(digits === '' ? null : Number(digits));
        }}
        onFocus={() => setFoc(true)} onBlur={() => setFoc(false)}
        style={{ flex: 1, border: 'none', outline: 'none', background: 'transparent', fontFamily: t.mono, fontSize: 13.5, color: t.ink, minWidth: 0 }} />
      {suffix && <span style={{ fontFamily: t.sans, fontSize: 12.5, color: t.inkFaint, marginLeft: 'auto', paddingLeft: 10, whiteSpace: 'nowrap' }}>{suffix}</span>}
    </div>
  );
}

// ─── 날짜 입력 ─────────────────────────────────────────
function DateInput({ value, onChange, t }) {
  const [foc, setFoc] = React.useState(false);
  return (
    <input
      type="date" value={value || ''}
      onChange={(e) => onChange && onChange(e.target.value)}
      onFocus={() => setFoc(true)} onBlur={() => setFoc(false)}
      style={{
        ...inputBase(t), fontFamily: t.mono, color: value ? t.ink : t.inkFaint,
        boxShadow: 'none',
      }} />
  );
}

// ─── 멀티라인 ──────────────────────────────────────────
function TextArea({ value, onChange, placeholder, rows = 3, t }) {
  const [foc, setFoc] = React.useState(false);
  return (
    <textarea
      value={value || ''} placeholder={placeholder} rows={rows}
      onChange={(e) => onChange && onChange(e.target.value)}
      onFocus={() => setFoc(true)} onBlur={() => setFoc(false)}
      style={{
        ...inputBase(t), height: 'auto', padding: '8px 0', resize: 'vertical', lineHeight: 1.55,
        boxShadow: 'none',
      }} />
  );
}

// ─── 세그먼트(짧은 enum) ───────────────────────────────
function EnumSegment({ options, value, onChange, t, wrap }) {
  return (
    <div style={{
      display: wrap ? 'flex' : 'inline-flex', flexWrap: wrap ? 'wrap' : 'nowrap', gap: 4,
      background: t.surfaceAlt, border: `0.5px solid ${t.line}`, borderRadius: 7, padding: 4, width: 'fit-content', maxWidth: '100%',
    }}>
      {options.map((o) => {
        const sel = value === o.v;
        return (
          <button key={o.v} onClick={() => onChange && onChange(o.v)} style={{
            border: 'none', cursor: 'pointer', borderRadius: 5, padding: '8px 14px',
            background: sel ? t.surface : 'transparent',
            color: sel ? t.ink : t.inkMute,
            fontFamily: t.sans, fontSize: 13, fontWeight: sel ? 700 : 500, whiteSpace: 'nowrap',
            boxShadow: sel ? '0 1px 2px rgba(0,0,0,0.06)' : 'none',
            transition: 'all .12s',
          }}>{o.label}</button>
        );
      })}
    </div>
  );
}

function InlineRadioChoice({ options, value, onChange, t }) {
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 18, minHeight: 36 }}>
      {options.map((o) => {
        const sel = value === o.v;
        return (
          <button key={o.v} onClick={() => onChange && onChange(o.v)} style={{
            display: 'inline-flex', alignItems: 'center', gap: 7, border: 'none', background: 'transparent',
            padding: 0, cursor: 'pointer', fontFamily: t.sans, fontSize: 13.5,
            fontWeight: sel ? 700 : 500, color: sel ? t.ink : t.inkMute, whiteSpace: 'nowrap',
          }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 14, height: 14, borderRadius: 999, border: `1px solid ${sel ? ACCENT : t.lineStrong}`, background: t.surface }}>
              {sel && <span style={{ width: 6, height: 6, borderRadius: 999, background: ACCENT }} />}
            </span>
            {o.label}
          </button>
        );
      })}
    </div>
  );
}

// ─── 드롭다운(긴 목록) ─────────────────────────────────
function SelectMenu({ options, value, onChange, t, placeholder }) {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (!open) return;
    const h = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, [open]);
  const cur = options.find((o) => o.v === value);
  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <button onClick={() => setOpen((o) => !o)} style={{
        ...inputBase(t), display: 'flex', alignItems: 'center', cursor: 'pointer', textAlign: 'left',
        boxShadow: 'none',
      }}>
        <span style={{ flex: 1, color: cur ? t.ink : t.inkFaint }}>{cur ? cur.label : (placeholder || '선택')}</span>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={t.inkFaint} strokeWidth="2.2"><path d="M6 9l6 6 6-6" strokeLinecap="round" /></svg>
      </button>
      {open && (
        <div style={{
          position: 'absolute', top: 40, left: 0, right: 0, zIndex: 30,
          background: t.surface, border: `0.5px solid ${t.line}`, borderRadius: 7,
          boxShadow: '0 12px 30px rgba(0,0,0,0.14)', padding: 5, maxHeight: 240, overflow: 'auto',
        }}>
          {options.map((o) => (
            <div key={o.v} onClick={() => { onChange && onChange(o.v); setOpen(false); }} style={{
              padding: '9px 11px', borderRadius: 5, cursor: 'pointer',
              fontFamily: t.sans, fontSize: 13, fontWeight: o.v === value ? 700 : 500,
              color: o.v === value ? ACCENT : t.ink, background: o.v === value ? ACCENT_SOFT : 'transparent',
            }}>{o.label}</div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── 멀티 칩 (장르 등) ─────────────────────────────────
function ChipMulti({ options, value = [], onChange, t }) {
  const toggle = (c) => {
    const has = value.includes(c);
    onChange && onChange(has ? value.filter((x) => x !== c) : [...value, c]);
  };
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
      {options.map((o) => {
        const sel = value.includes(o.c);
        return (
          <button key={o.c} onClick={() => toggle(o.c)} style={{
            cursor: 'pointer', borderRadius: 12, padding: '7px 14px',
            border: `0.5px solid ${sel ? ACCENT : t.lineStrong}`,
            background: sel ? ACCENT_SOFT : t.surface,
            color: sel ? ACCENT : t.inkMute,
            fontFamily: t.sans, fontSize: 12.5, fontWeight: sel ? 700 : 500,
            display: 'inline-flex', alignItems: 'center', gap: 6, transition: 'all .12s',
          }}>
            {o.label}
          </button>
        );
      })}
    </div>
  );
}

// ─── 태그 입력 (기선공개 플랫폼) ──────────────────────
function TagInput({ value = [], onChange, suggestions = [], placeholder, t }) {
  const [draft, setDraft] = React.useState('');
  const add = (v) => {
    const x = (v || draft).trim();
    if (!x || value.includes(x)) { setDraft(''); return; }
    onChange && onChange([...value, x]);
    setDraft('');
  };
  const remove = (x) => onChange && onChange(value.filter((v) => v !== x));
  const avail = suggestions.filter((s) => !value.includes(s));
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
      <div style={{
        ...inputBase(t), height: 'auto', minHeight: 36, display: 'flex', flexWrap: 'wrap', gap: 7, alignItems: 'center', padding: '5px 0',
      }}>
        {value.map((x) => (
          <span key={x} style={{
            display: 'inline-flex', alignItems: 'center', gap: 6, padding: '4px 6px 4px 11px', borderRadius: 5,
            background: t.surfaceAlt, border: `0.5px solid ${t.line}`, fontFamily: t.sans, fontSize: 12.5, color: t.ink,
          }}>
            {x}
            <button onClick={() => remove(x)} style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: t.inkFaint, padding: 0, display: 'inline-flex' }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" /></svg>
            </button>
          </span>
        ))}
        <input
          value={draft} placeholder={value.length ? '' : placeholder}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); add(); } if (e.key === 'Backspace' && !draft && value.length) remove(value[value.length - 1]); }}
          style={{ flex: 1, minWidth: 80, border: 'none', outline: 'none', background: 'transparent', fontFamily: t.sans, fontSize: 13, color: t.ink }} />
      </div>
      {avail.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {avail.map((s) => (
            <button key={s} onClick={() => add(s)} style={{
              cursor: 'pointer', borderRadius: 10, padding: '4px 11px', border: `0.5px dashed ${t.lineStrong}`,
              background: 'transparent', color: t.inkMute, fontFamily: t.sans, fontSize: 11.5, fontWeight: 500,
            }}>+ {s}</button>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── 토글 스위치 ───────────────────────────────────────
function ToggleSwitch({ value, onChange, t, onLabel = '예', offLabel = '아니오' }) {
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 11 }}>
      <button onClick={() => onChange && onChange(!value)} style={{
        width: 46, height: 26, borderRadius: 999, border: 'none', cursor: 'pointer', position: 'relative',
        background: value ? ACCENT : t.lineStrong, transition: 'background .15s', padding: 0,
      }}>
        <span style={{
          position: 'absolute', top: 3, left: value ? 23 : 3, width: 20, height: 20, borderRadius: 999,
          background: '#FFF', boxShadow: '0 1px 3px rgba(0,0,0,0.2)', transition: 'left .15s',
        }} />
      </button>
      <span style={{ fontFamily: t.sans, fontSize: 13, fontWeight: 600, color: value ? t.ink : t.inkMute }}>
        {value ? onLabel : offLabel}
      </span>
    </div>
  );
}

// ─── 섹션 카드 ─────────────────────────────────────────
function SectionCard({ title, desc, step, children, t, id }) {
  return (
    <section id={id} style={{
      background: t.surface, border: `0.5px solid ${t.line}`, borderRadius: 12, padding: '24px 26px 28px',
      scrollMarginTop: 90,
    }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 24, paddingBottom: 0, borderBottom: 'none' }}>
        {step != null && (
          <span style={{
            flexShrink: 0, width: 26, height: 26, borderRadius: 6, background: ACCENT_SOFT, color: ACCENT,
            fontFamily: t.mono, fontSize: 13, fontWeight: 700, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginTop: 1,
          }}>{step}</span>
        )}
        <div>
          <h2 style={{ margin: 0, fontFamily: t.sans, fontSize: 17, fontWeight: 700, color: t.ink, letterSpacing: -0.4 }}>{title}</h2>
          {desc && <div style={{ fontFamily: t.sans, fontSize: 12.5, color: t.inkMute, marginTop: 4 }}>{desc}</div>}
        </div>
      </div>
      {children}
    </section>
  );
}

// 2열 그리드
function FieldGrid({ children, cols = 2, t }) {
  return <div style={{ display: 'grid', gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: '18px 20px' }}>{children}</div>;
}

Object.assign(window, {
  ACCENT, ACCENT_SOFT, Field, TextInput, NumberInput, TextArea, DateInput,
  EnumSegment, InlineRadioChoice, SelectMenu, ChipMulti, TagInput, ToggleSwitch, SectionCard, FieldGrid,
});
