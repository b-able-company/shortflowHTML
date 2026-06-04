// Shared atoms + left panel for the signup flow.
// Matches the A · Editorial Split shape from login (620 dark left + form right).
//
// Reuses login-variants.jsx atoms via window: Wordmark, GlobeIcon, ChevronDown, TopChrome.

window.LOGIN_T_SHARED = window.LOGIN_T_SHARED || {
  ink: '#0F1115', inkMute: '#5C6068', inkFaint: '#9CA0A6',
  line: '#E7E5DF', lineStrong: '#D4D2CB',
  orange: '#FF5A1F', orangeDeep: '#E84A0F',
  dark: '#0F0E0C', warm: '#F6F2EA',
};

const SIGNUP_T = window.LOGIN_T_SHARED;

// ─────────────────────────────────────────────────────────────────────────
// Vertical stepper for the left dark panel.

function StepperVertical({ steps, current }) {
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', gap: 4,
      fontFamily: '"Geist", "Pretendard", system-ui, sans-serif',
    }}>
      {steps.map((s, i) => {
        const idx = i + 1;
        const isDone = idx < current;
        const isActive = idx === current;
        const isFuture = idx > current;
        const dotBg = isActive
          ? SIGNUP_T.orange
          : isDone ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.08)';
        const dotInk = isActive ? '#fff' : isDone ? SIGNUP_T.ink : 'rgba(255,255,255,0.4)';
        const dotBorder = isActive
          ? `none`
          : isDone ? 'none' : '1px solid rgba(255,255,255,0.18)';
        const labelColor = isActive ? '#fff' : isDone ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.35)';
        const labelWeight = isActive ? 700 : 500;
        return (
          <div key={s} style={{ display: 'flex', gap: 14, position: 'relative' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{
                width: 28, height: 28, borderRadius: 99,
                background: dotBg,
                border: dotBorder,
                color: dotInk,
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 12, fontWeight: 700,
                fontFamily: '"Geist", system-ui',
                boxShadow: isActive ? '0 0 0 6px rgba(255,90,31,0.18)' : 'none',
                transition: 'box-shadow 0.15s',
                flexShrink: 0,
              }}>
                {isDone ? (
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M3 7L6 10L11 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                ) : idx}
              </div>
              {i < steps.length - 1 && (
                <div style={{
                  width: 1.5, flex: 1, minHeight: 28,
                  background: isDone ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,0.1)',
                  margin: '4px 0',
                }}/>
              )}
            </div>
            <div style={{ paddingTop: 4, paddingBottom: 16 }}>
              <div style={{
                fontSize: 14.5, color: labelColor, fontWeight: labelWeight,
                letterSpacing: '-0.01em', lineHeight: 1.3,
              }}>
                {s}
              </div>
              {isActive && (
                <div style={{
                  marginTop: 4, fontSize: 11.5,
                  color: SIGNUP_T.orange,
                  fontFamily: '"Geist Mono", ui-monospace, monospace',
                  letterSpacing: '0.05em', fontWeight: 600,
                }}>
                  IN PROGRESS
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────
// Left panel — dark, with wordmark + stepper + brand tagline.

const SIGNUP_PATHS = {
  new:      ['회사 선택', '회사 정보', '유저 정보', '신청 완료'],
  existing: ['회사 선택', '회사 코드', '유저 정보', '신청 완료'],
};

function SignupLeftPanel({ path = 'new', step = 1 }) {
  const steps = SIGNUP_PATHS[path];
  return (
    <div style={{
      position: 'relative', overflow: 'hidden',
      background: `radial-gradient(120% 80% at 20% 0%, #2A211C 0%, ${SIGNUP_T.dark} 60%)`,
      color: '#fff',
      padding: '40px 44px',
      display: 'flex', flexDirection: 'column',
      fontFamily: '"Geist", "Pretendard", system-ui, sans-serif',
    }}>
      {/* Diagonal hairlines bg */}
      <svg width="100%" height="100%" viewBox="0 0 620 900" preserveAspectRatio="none"
           style={{ position: 'absolute', inset: 0, opacity: 0.06, pointerEvents: 'none' }}>
        {Array.from({ length: 30 }).map((_, i) => (
          <line key={i} x1={-200 + i*40} y1={0} x2={-200 + i*40 + 900} y2={900} stroke="#fff" strokeWidth="1"/>
        ))}
      </svg>

      {/* Header */}
      <div style={{ position: 'relative', display: 'flex', alignItems: 'center', zIndex: 2, marginBottom: 36 }}>
        <Wordmark/>
      </div>

      {/* Eyebrow */}
      <div style={{
        position: 'relative',
        fontFamily: '"Geist Mono", ui-monospace, monospace',
        fontSize: 11, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.12em', fontWeight: 600,
        marginBottom: 12,
      }}>
        SIGN UP · {path === 'new' ? 'NEW ORG' : 'JOIN ORG'}
      </div>
      <div style={{
        position: 'relative',
        fontSize: 28, fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.2,
        marginBottom: 36, maxWidth: 360,
      }}>
        shortflow에<br/>가입하고 IP의<br/>흐름을 시작하세요.
      </div>

      {/* Stepper */}
      <div style={{ position: 'relative', flex: 1 }}>
        <StepperVertical steps={steps} current={step}/>
      </div>

      {/* Footer tagline */}
      <div style={{
        position: 'relative', paddingTop: 24,
        borderTop: '1px solid rgba(255,255,255,0.1)',
        fontSize: 12, color: 'rgba(255,255,255,0.45)', lineHeight: 1.55,
      }}>
        숏폼 콘텐츠 제작과 유통을 하나로 연결하는<br/>
        통합 유통 인프라 · <span style={{ color: SIGNUP_T.orange }}>shortflow</span>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────
// Form shell — right side wrapper. Children = the step-specific form body.

function SignupFormShell({ title, subtitle, children, footer = 'login' }) {
  return (
    <div style={{
      display: 'flex', flexDirection: 'column',
      padding: '32px 56px',
      background: '#fff', color: SIGNUP_T.ink,
      fontFamily: '"Geist", "Pretendard", system-ui, sans-serif',
      minWidth: 0,
    }}>
      {/* Top language selector */}
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <TopChrome/>
      </div>

      <div style={{
        flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center',
        maxWidth: 480, alignSelf: 'center', width: '100%',
        paddingTop: 24, paddingBottom: 24,
      }}>
        <h1 style={{
          margin: 0, fontSize: 30, fontWeight: 700, letterSpacing: '-0.025em', lineHeight: 1.2,
        }}>
          {title}
        </h1>
        {subtitle && (
          <p style={{ margin: '12px 0 28px', color: SIGNUP_T.inkMute, fontSize: 14.5, lineHeight: 1.55 }}>
            {subtitle}
          </p>
        )}
        {children}
      </div>

      <div style={{
        display: 'flex', justifyContent: 'space-between',
        fontSize: 12, color: SIGNUP_T.inkFaint,
        fontFamily: '"Geist Mono", ui-monospace, monospace',
      }}>
        <span>© 2026 shortflow</span>
        <span>
          {footer === 'login' ? (
            <>이미 계정이 있으신가요? <a style={{ color: SIGNUP_T.ink, fontWeight: 600, textDecoration: 'none', marginLeft: 4 }}>로그인 →</a></>
          ) : (
            <a style={{ color: 'inherit', textDecoration: 'none' }}>이용약관 · 개인정보처리방침</a>
          )}
        </span>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────
// Inputs

function SF({ label, placeholder, type = 'text', hint, required, suffix, value, large = false, mono = false }) {
  const T = SIGNUP_T;
  return (
    <label style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <span style={{ fontSize: 13, fontWeight: 600, color: T.ink, letterSpacing: '-0.01em' }}>
          {label}
          {required && <span style={{ color: T.orange, marginLeft: 4 }}>*</span>}
        </span>
        {hint}
      </div>
      <div style={{
        display: 'flex', alignItems: 'center',
        height: large ? 48 : 42,
        padding: '0 14px',
        background: '#fff',
        border: `1px solid ${T.lineStrong}`,
        borderRadius: 8,
        gap: 8,
      }}>
        <input
          placeholder={placeholder}
          type={type}
          defaultValue={value}
          style={{
            flex: 1, height: '100%', border: 'none', outline: 'none', background: 'transparent',
            fontFamily: mono ? '"Geist Mono", ui-monospace, monospace' : 'inherit',
            fontSize: mono ? 15 : 14, color: T.ink, letterSpacing: mono ? '0.05em' : '0',
          }}
        />
        {suffix && <div style={{ color: T.inkMute, fontSize: 13 }}>{suffix}</div>}
      </div>
    </label>
  );
}

function SFTextarea({ label, placeholder, required, rows = 4 }) {
  const T = SIGNUP_T;
  return (
    <label style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <span style={{ fontSize: 13, fontWeight: 600, color: T.ink, letterSpacing: '-0.01em' }}>
        {label}
        {required && <span style={{ color: T.orange, marginLeft: 4 }}>*</span>}
      </span>
      <textarea
        placeholder={placeholder}
        rows={rows}
        style={{
          padding: '12px 14px',
          background: '#fff',
          border: `1px solid ${T.lineStrong}`,
          borderRadius: 8,
          fontFamily: 'inherit', fontSize: 14, color: T.ink,
          resize: 'none', outline: 'none', lineHeight: 1.55,
        }}
      />
    </label>
  );
}

function SFSelect({ label, placeholder, required, value }) {
  const T = SIGNUP_T;
  return (
    <label style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <span style={{ fontSize: 13, fontWeight: 600, color: T.ink, letterSpacing: '-0.01em' }}>
        {label}
        {required && <span style={{ color: T.orange, marginLeft: 4 }}>*</span>}
      </span>
      <div style={{
        display: 'flex', alignItems: 'center',
        height: 42, padding: '0 14px',
        background: '#fff',
        border: `1px solid ${T.lineStrong}`,
        borderRadius: 8,
        cursor: 'pointer',
      }}>
        <span style={{ flex: 1, fontSize: 14, color: value ? T.ink : T.inkFaint }}>
          {value || placeholder}
        </span>
        <ChevronDown/>
      </div>
    </label>
  );
}

function SFRadioGroup({ label, options, value, required }) {
  const T = SIGNUP_T;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <span style={{ fontSize: 13, fontWeight: 600, color: T.ink, letterSpacing: '-0.01em' }}>
        {label}
        {required && <span style={{ color: T.orange, marginLeft: 4 }}>*</span>}
      </span>
      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${options.length}, 1fr)`, gap: 10 }}>
        {options.map(o => {
          const active = o.value === value;
          return (
            <div key={o.value} style={{
              padding: '14px 16px',
              background: active ? '#FFF6F1' : '#fff',
              border: `1.5px solid ${active ? T.orange : T.lineStrong}`,
              borderRadius: 8,
              cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: 12,
            }}>
              <div style={{
                width: 18, height: 18, borderRadius: 99,
                border: `1.5px solid ${active ? T.orange : T.lineStrong}`,
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
              }}>
                {active && <div style={{ width: 8, height: 8, borderRadius: 99, background: T.orange }}/>}
              </div>
              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: T.ink }}>{o.label}</div>
                {o.desc && (
                  <div style={{ fontSize: 12, color: T.inkMute, marginTop: 2, lineHeight: 1.4 }}>{o.desc}</div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// 6-digit OTP code input with 6 separated boxes. Showing typed state for design.
function SFOtpCode({ value = '847', focusIdx = 3 }) {
  const T = SIGNUP_T;
  const chars = (value + '      ').slice(0, 6).split('');
  return (
    <div style={{ display: 'flex', gap: 10 }}>
      {chars.map((c, i) => {
        const filled = c.trim() !== '';
        const focused = i === focusIdx;
        return (
          <div key={i} style={{
            flex: 1, height: 60,
            border: `1.5px solid ${focused ? T.orange : T.lineStrong}`,
            background: '#fff',
            borderRadius: 8,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: '"Geist", system-ui', fontSize: 26, fontWeight: 700,
            color: T.ink, letterSpacing: '-0.01em',
            boxShadow: focused ? '0 0 0 4px rgba(255,90,31,0.12)' : 'none',
            position: 'relative',
          }}>
            {filled ? c : (focused ? <span style={{
              display: 'inline-block', width: 2, height: 28, background: T.orange,
              animation: 'none',
            }}/> : '')}
          </div>
        );
      })}
    </div>
  );
}

// Big tappable choice card for step 2 (회사 선택).
function ChoiceCard({ icon, title, desc, badge, active = false, onClick }) {
  const T = SIGNUP_T;
  return (
    <div
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onClick={onClick}
      onKeyDown={(event) => {
        if (!onClick) return;
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          onClick();
        }
      }}
      style={{
      padding: '24px 24px',
      background: active ? '#FFF6F1' : '#fff',
      border: `1.5px solid ${active ? T.orange : T.lineStrong}`,
      borderRadius: 10,
      cursor: 'pointer',
      display: 'flex', alignItems: 'flex-start', gap: 18,
      position: 'relative',
      boxShadow: active ? '0 8px 24px -12px rgba(255,90,31,0.3)' : 'none',
    }}>
      <div style={{
        width: 48, height: 48, borderRadius: 8,
        background: active ? T.orange : '#F4F2EC',
        color: active ? '#fff' : T.ink,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexShrink: 0,
      }}>
        {icon}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
          <div style={{ fontSize: 16, fontWeight: 700, color: T.ink, letterSpacing: '-0.01em' }}>{title}</div>
          {badge && (
            <span style={{
              fontSize: 11, color: T.orange, fontWeight: 600,
              padding: '2px 8px', borderRadius: 99, background: '#FFE4D6',
              fontFamily: '"Geist Mono", monospace', letterSpacing: '0.05em',
            }}>{badge}</span>
          )}
        </div>
        <div style={{ fontSize: 13.5, color: T.inkMute, lineHeight: 1.5 }}>{desc}</div>
      </div>
      <div style={{
        flexShrink: 0, alignSelf: 'center',
        color: active ? T.orange : T.inkFaint,
      }}>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M7 4L13 10L7 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </div>
  );
}

// CTA button row — primary right, optional secondary left.
function CtaRow({ onBack, primaryLabel, primaryDisabled = false, onPrimary }) {
  const T = SIGNUP_T;
  const handleBack = typeof onBack === 'function' ? onBack : undefined;
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 8 }}>
      {onBack && (
        <button onClick={handleBack} style={{
          height: 48, padding: '0 22px',
          background: '#fff',
          color: T.ink,
          border: `1px solid ${T.lineStrong}`,
          borderRadius: 8,
          fontFamily: 'inherit', fontSize: 15, fontWeight: 600, cursor: 'pointer',
        }}>
          이전
        </button>
      )}
      <button
        disabled={primaryDisabled}
        onClick={primaryDisabled ? undefined : onPrimary}
        style={{
        flex: 1, height: 48,
        background: primaryDisabled ? T.lineStrong : T.ink,
        color: '#fff',
        border: 'none', borderRadius: 8,
        fontFamily: 'inherit', fontSize: 15, fontWeight: 600, letterSpacing: '-0.01em',
        cursor: primaryDisabled ? 'not-allowed' : 'pointer',
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
      }}>
        {primaryLabel} →
      </button>
    </div>
  );
}

// Layout helper for split-row fields.
function FieldRow({ children, cols = 2 }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: 12 }}>
      {children}
    </div>
  );
}

// Stack with consistent vertical gap.
function FieldStack({ children, gap = 16 }) {
  return <div style={{ display: 'flex', flexDirection: 'column', gap }}>{children}</div>;
}

// Compose left + right into one 1440×900 artboard.
function SignupSplit({ path, step, children }) {
  return (
    <div style={{
      width: '100%', height: '100%',
      display: 'grid', gridTemplateColumns: '620px 1fr',
      background: '#fff',
    }}>
      <SignupLeftPanel path={path} step={step}/>
      {children}
    </div>
  );
}

Object.assign(window, {
  SignupLeftPanel, SignupFormShell, SignupSplit,
  StepperVertical,
  SF, SFTextarea, SFSelect, SFRadioGroup, SFOtpCode,
  ChoiceCard, CtaRow, FieldRow, FieldStack,
});
