// Login screen variants for Shortflow.
// 4 directions explored on the design canvas. All 1440 × 900.
// Brand: black "short" + orange "flow", warm white bg, Geist/Pretendard.

const LOGIN_T = {
  bg: '#FFFFFF',
  warm: '#F6F2EA',          // warm cream
  warmDeep: '#EEE8DC',
  ink: '#0F1115',
  inkMute: '#5C6068',
  inkFaint: '#9CA0A6',
  line: '#E7E5DF',
  lineStrong: '#D4D2CB',
  // brand orange — derived from the existing logo
  orange: '#FF5A1F',
  orangeDeep: '#E84A0F',
  orangeSoft: '#FFE4D6',
  // dark surface for variant A
  dark: '#0F0E0C',
  darkSoft: '#1A1815',
};

// ─────────────────────────────────────────────────────────────────────────
// Shared atoms

function Wordmark({ size = 26, mono = false }) {
  return (
    <span style={{
      fontFamily: '"Geist", system-ui, sans-serif',
      fontWeight: 700,
      fontSize: size,
      letterSpacing: '-0.02em',
      color: mono ? 'inherit' : LOGIN_T.ink,
      display: 'inline-flex',
      alignItems: 'baseline',
    }}>
      <span>short</span>
      <span style={{ color: LOGIN_T.orange }}>flow</span>
    </span>
  );
}

function GlobeIcon({ size = 14, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="6.5" stroke={color} strokeWidth="1.3" />
      <path d="M8 1.5C5.5 4 5.5 12 8 14.5M8 1.5C10.5 4 10.5 12 8 14.5M1.5 8h13" stroke={color} strokeWidth="1.3" />
    </svg>
  );
}

function MoonIcon({ size = 16, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <path d="M13 9.5A5.5 5.5 0 0 1 6.5 3a5.5 5.5 0 1 0 6.5 6.5z" stroke={color} strokeWidth="1.3" strokeLinejoin="round" />
    </svg>
  );
}

function ChevronDown({ size = 12 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 12 12" fill="none">
      <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function EyeIcon({ size = 16, color = LOGIN_T.inkFaint }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <path d="M1.5 8C3 5 5.2 3.5 8 3.5C10.8 3.5 13 5 14.5 8C13 11 10.8 12.5 8 12.5C5.2 12.5 3 11 1.5 8Z" stroke={color} strokeWidth="1.2"/>
      <circle cx="8" cy="8" r="2" stroke={color} strokeWidth="1.2"/>
    </svg>
  );
}

function TopChrome({ tone = 'light' }) {
  const fg = tone === 'dark' ? '#fff' : LOGIN_T.ink;
  const muted = tone === 'dark' ? 'rgba(255,255,255,0.7)' : LOGIN_T.inkMute;
  const line = tone === 'dark' ? 'rgba(255,255,255,0.16)' : LOGIN_T.line;
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 8,
      color: muted, fontSize: 13,
      fontFamily: '"Geist", "Pretendard", system-ui, sans-serif',
    }}>
      <button style={{
        display: 'inline-flex', alignItems: 'center', gap: 6,
        height: 36, padding: '0 12px', borderRadius: 10,
        background: 'transparent', border: `1px solid ${line}`, color: fg, cursor: 'pointer',
        fontFamily: 'inherit', fontSize: 13,
      }}>
        <GlobeIcon color={fg} />
        <span>한국어</span>
        <ChevronDown />
      </button>
    </div>
  );
}

function FormField({ label, placeholder, type = 'text', hint, dark = false, large = false }) {
  const ink = dark ? '#fff' : LOGIN_T.ink;
  const muted = dark ? 'rgba(255,255,255,0.55)' : LOGIN_T.inkFaint;
  const line = dark ? 'rgba(255,255,255,0.18)' : LOGIN_T.lineStrong;
  const bg = dark ? 'rgba(255,255,255,0.04)' : '#fff';
  return (
    <label style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <span style={{ fontSize: 13, fontWeight: 600, color: ink, letterSpacing: '-0.01em' }}>{label}</span>
        {hint}
      </div>
      <div style={{
        display: 'flex', alignItems: 'center',
        height: large ? 52 : 46,
        padding: '0 14px',
        background: bg,
        border: `1px solid ${line}`,
        borderRadius: 12,
        gap: 8,
      }}>
        <input
          placeholder={placeholder}
          type={type}
          style={{
            flex: 1, height: '100%', border: 'none', outline: 'none', background: 'transparent',
            fontFamily: 'inherit', fontSize: 14, color: ink,
          }}
        />
        {type === 'password' && <EyeIcon color={muted} />}
      </div>
    </label>
  );
}

function SocialBtn({ provider, dark = false }) {
  const ink = dark ? '#fff' : LOGIN_T.ink;
  const line = dark ? 'rgba(255,255,255,0.18)' : LOGIN_T.line;
  const bg = dark ? 'transparent' : '#fff';
  const icon = ({
    google: (
      <svg width="18" height="18" viewBox="0 0 18 18">
        <path fill="#4285F4" d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 0 1-1.8 2.72v2.26h2.92c1.7-1.57 2.68-3.88 2.68-6.62z"/>
        <path fill="#34A853" d="M9 18c2.43 0 4.47-.81 5.96-2.18l-2.92-2.26c-.81.54-1.84.86-3.04.86-2.34 0-4.32-1.58-5.03-3.7H.92v2.32A9 9 0 0 0 9 18z"/>
        <path fill="#FBBC05" d="M3.97 10.72A5.41 5.41 0 0 1 3.68 9c0-.6.1-1.18.29-1.72V4.96H.92A9 9 0 0 0 0 9c0 1.45.35 2.83.92 4.04l3.05-2.32z"/>
        <path fill="#EA4335" d="M9 3.58c1.32 0 2.5.45 3.44 1.35l2.58-2.58A9 9 0 0 0 9 0 9 9 0 0 0 .92 4.96L3.97 7.28C4.68 5.16 6.66 3.58 9 3.58z"/>
      </svg>
    ),
    kakao: (
      <svg width="18" height="18" viewBox="0 0 18 18">
        <path fill="#191919" d="M9 1.5C4.86 1.5 1.5 4.13 1.5 7.37c0 2.1 1.41 3.94 3.54 4.97l-.9 3.29c-.08.29.25.52.5.36l3.95-2.61c.13.01.27.02.41.02 4.14 0 7.5-2.63 7.5-5.87S13.14 1.5 9 1.5z"/>
      </svg>
    ),
    naver: (
      <svg width="18" height="18" viewBox="0 0 18 18">
        <rect width="18" height="18" rx="3" fill="#03C75A"/>
        <path fill="#fff" d="M10.5 5v4.4L7.5 5H5v8h2.5V8.6L10.5 13H13V5z"/>
      </svg>
    ),
  })[provider];
  const label = { google: 'Google', kakao: 'Kakao', naver: 'Naver' }[provider];
  return (
    <button style={{
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
      height: 46, padding: '0 14px', flex: 1,
      background: bg, color: ink,
      border: `1px solid ${line}`, borderRadius: 12,
      fontFamily: 'inherit', fontSize: 13.5, fontWeight: 500, cursor: 'pointer',
    }}>
      {icon}
      <span>{label}</span>
    </button>
  );
}

function PrimaryButton({ children, dark = false, fullWidth = true, height = 52 }) {
  return (
    <button style={{
      width: fullWidth ? '100%' : undefined, height,
      background: dark ? '#fff' : LOGIN_T.ink,
      color: dark ? LOGIN_T.ink : '#fff',
      border: 'none', borderRadius: 12,
      fontFamily: '"Geist", "Pretendard", system-ui, sans-serif',
      fontSize: 15, fontWeight: 600, letterSpacing: '-0.01em',
      cursor: 'pointer',
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
    }}>
      {children}
    </button>
  );
}

function OrangeButton({ children, height = 52 }) {
  return (
    <button style={{
      width: '100%', height,
      background: LOGIN_T.orange,
      color: '#fff',
      border: 'none', borderRadius: 12,
      fontFamily: '"Geist", "Pretendard", system-ui, sans-serif',
      fontSize: 15, fontWeight: 600, letterSpacing: '-0.01em',
      cursor: 'pointer',
      boxShadow: '0 8px 24px -10px rgba(255, 90, 31, 0.65), 0 1px 0 rgba(255,255,255,0.2) inset',
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
    }}>
      {children}
    </button>
  );
}

// Fake shorts poster card (placeholder for a vertical video thumbnail).
const SHORT_POSTER_TONES = {
  rose:   { bg: 'linear-gradient(180deg, #F2C0C2 0%, #C97072 100%)', ink: '#3F1213' },
  amber:  { bg: 'linear-gradient(180deg, #F4D08A 0%, #A56716 100%)', ink: '#3A2407' },
  teal:   { bg: 'linear-gradient(180deg, #A9D6CB 0%, #2F6F62 100%)', ink: '#0C2B26' },
  indigo: { bg: 'linear-gradient(180deg, #B5BBE0 0%, #303670 100%)', ink: '#0B0F2E' },
  dusk:   { bg: 'linear-gradient(180deg, #423b3a 0%, #15110f 100%)', ink: '#E6E2DC' },
  ember:  { bg: 'linear-gradient(180deg, #FF8A4F 0%, #B4310B 100%)', ink: '#350D02' },
};

function ShortPoster({ tone, label, w = 152, h = 270, rotate = 0, offset = { x: 0, y: 0 } }) {
  const tones = SHORT_POSTER_TONES[tone] || SHORT_POSTER_TONES.rose;
  return (
    <div style={{
      position: 'absolute',
      left: offset.x, top: offset.y,
      width: w, height: h,
      borderRadius: 14,
      background: tones.bg,
      transform: `rotate(${rotate}deg)`,
      boxShadow: '0 30px 60px -20px rgba(0,0,0,0.55), 0 8px 18px -10px rgba(0,0,0,0.4)',
      padding: 12,
      display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
      color: tones.ink,
      fontFamily: '"Geist Mono", ui-monospace, monospace',
      fontSize: 10, letterSpacing: '0.04em',
      overflow: 'hidden',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <span style={{ opacity: 0.75 }}>{label.code}</span>
        <span style={{
          display: 'inline-flex', alignItems: 'center', gap: 4,
          padding: '2px 6px', borderRadius: 99,
          background: 'rgba(255,255,255,0.25)',
          color: tones.ink, fontWeight: 600,
        }}>
          <span style={{ width: 5, height: 5, borderRadius: 99, background: tones.ink, display: 'inline-block' }} />
          LIVE
        </span>
      </div>
      <div style={{ fontFamily: '"Geist", "Pretendard", sans-serif', fontSize: 16, fontWeight: 700, lineHeight: 1.15 }}>
        {label.title}
      </div>
    </div>
  );
}


// ─────────────────────────────────────────────────────────────────────────
// Variant A · Editorial Split
//   Dark warm panel left with floating shorts posters · clean form right.

function LoginA() {
  return (
    <div style={{
      width: '100%', height: '100%',
      display: 'grid', gridTemplateColumns: '620px 1fr',
      background: '#fff',
      fontFamily: '"Geist", "Pretendard", system-ui, sans-serif',
      color: LOGIN_T.ink,
    }}>
      {/* LEFT — dark editorial */}
      <div style={{
        position: 'relative', overflow: 'hidden',
        background: `radial-gradient(120% 80% at 20% 0%, #2A211C 0%, ${LOGIN_T.dark} 60%)`,
        color: '#fff',
        padding: '40px 44px',
        display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
      }}>
        {/* Diagonal hairlines */}
        <svg width="100%" height="100%" viewBox="0 0 620 900" preserveAspectRatio="none"
             style={{ position: 'absolute', inset: 0, opacity: 0.06, pointerEvents: 'none' }}>
          {Array.from({ length: 30 }).map((_, i) => (
            <line key={i} x1={-200 + i*40} y1={0} x2={-200 + i*40 + 900} y2={900} stroke="#fff" strokeWidth="1"/>
          ))}
        </svg>

        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ color: '#fff' }}>
            <Wordmark mono />
          </div>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            fontFamily: '"Geist Mono", ui-monospace, monospace',
            fontSize: 11, color: 'rgba(255,255,255,0.55)',
          }}>
            <span style={{ width: 6, height: 6, borderRadius: 99, background: LOGIN_T.orange }} />
            ADMIN · v2.4
          </div>
        </div>

        {/* Floating posters */}
        <div style={{ position: 'relative', flex: 1, marginTop: 30, marginBottom: 30 }}>
          <ShortPoster tone="ember"  label={{ code: 'SF-0421', title: '오피스\n5초 챌린지' }}
                       offset={{ x: 40, y: 30 }} rotate={-8} w={158} h={282} />
          <ShortPoster tone="indigo" label={{ code: 'SF-0612', title: '한강\n야경 VLOG' }}
                       offset={{ x: 215, y: 80 }} rotate={4} w={170} h={302} />
          <ShortPoster tone="amber"  label={{ code: 'SF-0833', title: '레시피\n3-스텝' }}
                       offset={{ x: 400, y: 20 }} rotate={9} w={148} h={262} />
          <ShortPoster tone="rose"   label={{ code: 'SF-0901', title: '댄스 커버\n#shortflow' }}
                       offset={{ x: 110, y: 320 }} rotate={6} w={150} h={266} />
          <ShortPoster tone="teal"   label={{ code: 'SF-1003', title: '브이로그\n야간자율' }}
                       offset={{ x: 300, y: 360 }} rotate={-5} w={156} h={278} />
        </div>

        <div style={{ position: 'relative' }}>
          <div style={{
            fontSize: 32, fontWeight: 700, lineHeight: 1.15, letterSpacing: '-0.02em',
            maxWidth: 460, color: '#fff',
          }}>
            숏폼 콘텐츠 제작과 유통을<br/>
            하나로 연결하는 <span style={{ color: LOGIN_T.orange }}>통합 인프라.</span>
          </div>
          <div style={{
            marginTop: 14, fontFamily: '"Geist Mono", ui-monospace, monospace',
            fontSize: 11, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.05em',
          }}>
            CREATORS · 1,284 &nbsp;·&nbsp; DELIVERED · 23,910 &nbsp;·&nbsp; CHANNELS · 47
          </div>
        </div>
      </div>

      {/* RIGHT — form */}
      <div style={{
        display: 'flex', flexDirection: 'column',
        padding: '32px 56px',
      }}>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <TopChrome />
        </div>

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', maxWidth: 400, alignSelf: 'center', width: '100%' }}>
          <div style={{
            fontFamily: '"Geist Mono", ui-monospace, monospace',
            fontSize: 11, color: LOGIN_T.inkMute, letterSpacing: '0.1em',
            marginBottom: 12,
          }}>
            ADMIN LOGIN
          </div>
          <h1 style={{
            margin: 0, fontSize: 36, fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.1,
          }}>
            다시 만나서<br/>반가워요.
          </h1>
          <p style={{
            margin: '14px 0 32px', color: LOGIN_T.inkMute, fontSize: 14.5, lineHeight: 1.55,
          }}>
            계정으로 로그인하면 콘텐츠 제작 · 검토 · 유통 워크플로우에 접근할 수 있어요.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <FormField label="이메일" placeholder="name@company.com" />
            <FormField
              label="비밀번호"
              placeholder="비밀번호를 입력해주세요"
              type="password"
              hint={
                <a style={{ fontSize: 12.5, color: LOGIN_T.inkMute, textDecoration: 'none' }}>
                  비밀번호를 잊으셨나요?
                </a>
              }
            />
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: LOGIN_T.inkMute }}>
              <span style={{ width: 16, height: 16, border: `1.5px solid ${LOGIN_T.lineStrong}`, borderRadius: 5 }} />
              로그인 상태 유지
            </label>
            <PrimaryButton>로그인 →</PrimaryButton>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '28px 0 20px', color: LOGIN_T.inkFaint, fontSize: 12 }}>
            <div style={{ flex: 1, height: 1, background: LOGIN_T.line }}/>
            <span>또는</span>
            <div style={{ flex: 1, height: 1, background: LOGIN_T.line }}/>
          </div>

          <div style={{ display: 'flex', gap: 10 }}>
            <SocialBtn provider="google" />
            <SocialBtn provider="kakao" />
            <SocialBtn provider="naver" />
          </div>

          <div style={{ marginTop: 36, fontSize: 13.5, color: LOGIN_T.inkMute, textAlign: 'center' }}>
            계정이 없으신가요? <a style={{ color: LOGIN_T.ink, fontWeight: 600, textDecoration: 'none' }}>회원가입 →</a>
          </div>
        </div>

        <div style={{
          display: 'flex', justifyContent: 'space-between',
          fontSize: 12, color: LOGIN_T.inkFaint,
          fontFamily: '"Geist Mono", ui-monospace, monospace',
        }}>
          <span>© 2026 shortflow</span>
          <span><a style={{ color: 'inherit', textDecoration: 'none' }}>이용약관</a> · <a style={{ color: 'inherit', textDecoration: 'none' }}>개인정보처리방침</a></span>
        </div>
      </div>
    </div>
  );
}


// ─────────────────────────────────────────────────────────────────────────
// Variant B · Warm Card
//   Single centered card on warm cream with subtle background motif.

function LoginB() {
  return (
    <div style={{
      position: 'relative',
      width: '100%', height: '100%',
      background: LOGIN_T.warm,
      fontFamily: '"Geist", "Pretendard", system-ui, sans-serif',
      color: LOGIN_T.ink,
      overflow: 'hidden',
    }}>
      {/* Dotted/grid texture */}
      <svg width="100%" height="100%" style={{ position: 'absolute', inset: 0, opacity: 0.5 }}>
        <defs>
          <pattern id="dot" width="22" height="22" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="1" fill={LOGIN_T.lineStrong}/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dot)"/>
      </svg>
      {/* Orange glow */}
      <div style={{
        position: 'absolute', width: 700, height: 700, borderRadius: '50%',
        background: 'radial-gradient(closest-side, rgba(255,90,31,0.18), transparent)',
        left: -200, top: -150, pointerEvents: 'none',
      }}/>
      <div style={{
        position: 'absolute', width: 600, height: 600, borderRadius: '50%',
        background: 'radial-gradient(closest-side, rgba(255,200,120,0.25), transparent)',
        right: -150, bottom: -150, pointerEvents: 'none',
      }}/>

      {/* Top bar */}
      <div style={{
        position: 'relative', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '28px 40px',
      }}>
        <Wordmark size={24}/>
        <TopChrome/>
      </div>

      {/* Card */}
      <div style={{
        position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center',
        marginTop: 38,
      }}>
        {/* Eyebrow chip */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          padding: '6px 12px', borderRadius: 999,
          background: '#fff', border: `1px solid ${LOGIN_T.line}`,
          fontSize: 12, color: LOGIN_T.inkMute,
          boxShadow: '0 2px 6px rgba(0,0,0,0.04)',
        }}>
          <span style={{ width: 6, height: 6, borderRadius: 99, background: LOGIN_T.orange }}/>
          숏폼 콘텐츠 통합 유통 인프라
        </div>

        <h1 style={{
          margin: '20px 0 10px', fontSize: 40, fontWeight: 700, letterSpacing: '-0.025em', textAlign: 'center',
        }}>
          환영합니다 <span style={{
            background: `linear-gradient(180deg, transparent 60%, ${LOGIN_T.orangeSoft} 60%)`,
            padding: '0 4px',
          }}>👋</span>
        </h1>
        <p style={{ margin: 0, color: LOGIN_T.inkMute, fontSize: 15 }}>
          shortflow 계정으로 로그인하세요.
        </p>

        {/* Card */}
        <div style={{
          width: 440, marginTop: 28,
          background: '#fff', borderRadius: 20,
          padding: 30,
          border: `1px solid ${LOGIN_T.line}`,
          boxShadow: '0 30px 60px -30px rgba(40,30,20,0.18), 0 4px 14px -6px rgba(40,30,20,0.08)',
          display: 'flex', flexDirection: 'column', gap: 16,
        }}>
          <FormField label="이메일" placeholder="name@company.com" large/>
          <FormField
            label="비밀번호"
            placeholder="비밀번호를 입력해주세요"
            type="password"
            large
            hint={
              <a style={{ fontSize: 12.5, color: LOGIN_T.orange, fontWeight: 500, textDecoration: 'none' }}>
                비밀번호 찾기
              </a>
            }
          />
          <div style={{ marginTop: 4 }}>
            <OrangeButton>로그인</OrangeButton>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, color: LOGIN_T.inkFaint, fontSize: 12 }}>
            <div style={{ flex: 1, height: 1, background: LOGIN_T.line }}/>
            <span>간편 로그인</span>
            <div style={{ flex: 1, height: 1, background: LOGIN_T.line }}/>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <SocialBtn provider="google"/>
            <SocialBtn provider="kakao"/>
            <SocialBtn provider="naver"/>
          </div>
        </div>

        <div style={{ marginTop: 22, fontSize: 13.5, color: LOGIN_T.inkMute }}>
          계정이 없으신가요? <a style={{ color: LOGIN_T.ink, fontWeight: 600, textDecoration: 'none' }}>회원가입하기</a>
        </div>
      </div>
    </div>
  );
}


// ─────────────────────────────────────────────────────────────────────────
// Variant C · Big Type
//   Huge brand wordmark + manifesto on left, minimal form on right.

function LoginC() {
  return (
    <div style={{
      width: '100%', height: '100%',
      display: 'grid', gridTemplateColumns: '1fr 480px',
      background: LOGIN_T.warm,
      fontFamily: '"Geist", "Pretendard", system-ui, sans-serif',
      color: LOGIN_T.ink,
      position: 'relative',
    }}>
      {/* LEFT — manifesto */}
      <div style={{
        position: 'relative', overflow: 'hidden',
        padding: '40px 56px',
        display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Wordmark size={22}/>
          <div style={{
            fontFamily: '"Geist Mono", ui-monospace, monospace',
            fontSize: 11, color: LOGIN_T.inkMute, letterSpacing: '0.08em',
          }}>
            EST. 2024 · SEOUL
          </div>
        </div>

        {/* Big wordmark */}
        <div style={{ position: 'relative', flex: 1, display: 'flex', alignItems: 'center' }}>
          <div style={{
            fontSize: 260, fontWeight: 800, letterSpacing: '-0.06em', lineHeight: 0.85,
            color: LOGIN_T.ink,
            position: 'relative',
          }}>
            short<br/>
            <span style={{ color: LOGIN_T.orange }}>flow</span>
            <span style={{
              display: 'inline-block', width: 24, height: 24, borderRadius: 99,
              background: LOGIN_T.ink, verticalAlign: 'baseline', marginLeft: 8,
            }}/>
          </div>

          {/* Floating poster */}
          <div style={{ position: 'absolute', right: 0, top: 30 }}>
            <ShortPoster tone="ember" label={{ code: 'NOW PLAYING', title: '오늘\n트렌드' }}
                         offset={{ x: 0, y: 0 }} rotate={6} w={170} h={302}/>
          </div>
        </div>

        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 28,
          paddingTop: 24, borderTop: `1px solid ${LOGIN_T.lineStrong}`,
        }}>
          {[
            ['1,284', '활성 크리에이터'],
            ['23.9K', '월간 유통 콘텐츠'],
            ['47', '연결된 채널'],
          ].map(([n, l]) => (
            <div key={l}>
              <div style={{
                fontSize: 32, fontWeight: 700, letterSpacing: '-0.02em',
                fontFamily: '"Geist", system-ui',
              }}>{n}</div>
              <div style={{ fontSize: 12.5, color: LOGIN_T.inkMute, marginTop: 4 }}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT — minimal form */}
      <div style={{
        background: '#fff',
        borderLeft: `1px solid ${LOGIN_T.line}`,
        padding: '32px 48px',
        display: 'flex', flexDirection: 'column',
      }}>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <TopChrome/>
        </div>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <h1 style={{
            margin: 0, fontSize: 28, fontWeight: 700, letterSpacing: '-0.02em',
          }}>
            로그인
          </h1>
          <p style={{ margin: '8px 0 28px', color: LOGIN_T.inkMute, fontSize: 14 }}>
            관리자 콘솔에 접속합니다.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <FormField label="이메일" placeholder="name@company.com"/>
            <FormField
              label="비밀번호"
              placeholder="비밀번호를 입력해주세요"
              type="password"
              hint={
                <a style={{ fontSize: 12.5, color: LOGIN_T.inkMute, textDecoration: 'none' }}>
                  비밀번호를 잊으셨나요?
                </a>
              }
            />
            <PrimaryButton>로그인</PrimaryButton>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '24px 0', color: LOGIN_T.inkFaint, fontSize: 12 }}>
            <div style={{ flex: 1, height: 1, background: LOGIN_T.line }}/>
            <span>또는</span>
            <div style={{ flex: 1, height: 1, background: LOGIN_T.line }}/>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <SocialBtn provider="google"/>
            <SocialBtn provider="kakao"/>
          </div>

          <div style={{ marginTop: 32, fontSize: 13.5, color: LOGIN_T.inkMute, textAlign: 'center' }}>
            계정이 없으신가요? <a style={{ color: LOGIN_T.ink, fontWeight: 600, textDecoration: 'none' }}>회원가입</a>
          </div>
        </div>
      </div>
    </div>
  );
}


// ─────────────────────────────────────────────────────────────────────────
// Variant D · Poster Hero
//   Full bleed warm gradient, big poster strip behind, frosted card centered.

function LoginD() {
  return (
    <div style={{
      position: 'relative', width: '100%', height: '100%',
      background: `linear-gradient(135deg, #FFD8B5 0%, #F6E6CF 35%, #F2D2B5 100%)`,
      fontFamily: '"Geist", "Pretendard", system-ui, sans-serif',
      color: LOGIN_T.ink,
      overflow: 'hidden',
    }}>
      {/* Orange blob */}
      <div style={{
        position: 'absolute', width: 900, height: 900, borderRadius: '50%',
        background: 'radial-gradient(closest-side, rgba(255,90,31,0.55), transparent)',
        left: -250, bottom: -350, pointerEvents: 'none',
      }}/>
      <div style={{
        position: 'absolute', width: 700, height: 700, borderRadius: '50%',
        background: 'radial-gradient(closest-side, rgba(255,180,80,0.45), transparent)',
        right: -200, top: -200, pointerEvents: 'none',
      }}/>

      {/* Floating poster row behind card */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <ShortPoster tone="ember"  label={{ code: 'SF-A21', title: '오피스\n5초 챌린지' }}
                     offset={{ x: 80, y: 130 }} rotate={-9} w={170} h={300}/>
        <ShortPoster tone="rose"   label={{ code: 'SF-B12', title: '댄스 커버' }}
                     offset={{ x: 130, y: 480 }} rotate={6} w={160} h={285}/>
        <ShortPoster tone="indigo" label={{ code: 'SF-C03', title: '한강\n야경' }}
                     offset={{ x: 1140, y: 110 }} rotate={8} w={170} h={300}/>
        <ShortPoster tone="teal"   label={{ code: 'SF-D44', title: '브이로그' }}
                     offset={{ x: 1180, y: 470 }} rotate={-7} w={158} h={278}/>
      </div>

      {/* Top bar */}
      <div style={{
        position: 'relative', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '28px 40px',
      }}>
        <Wordmark size={24}/>
        <TopChrome/>
      </div>

      {/* Frosted center card */}
      <div style={{
        position: 'relative',
        width: 460,
        margin: '40px auto 0',
        background: 'rgba(255, 252, 248, 0.78)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderRadius: 24,
        border: '1px solid rgba(255,255,255,0.7)',
        boxShadow: '0 40px 80px -20px rgba(60,30,10,0.25), 0 0 0 1px rgba(40,30,20,0.04)',
        padding: 38,
      }}>
        <div style={{
          fontFamily: '"Geist Mono", ui-monospace, monospace',
          fontSize: 11, color: LOGIN_T.orange, letterSpacing: '0.12em', fontWeight: 600,
        }}>
          ADMIN LOGIN
        </div>
        <h1 style={{ margin: '10px 0 8px', fontSize: 32, fontWeight: 700, letterSpacing: '-0.02em' }}>
          환영합니다
        </h1>
        <p style={{ margin: '0 0 24px', color: LOGIN_T.inkMute, fontSize: 14, lineHeight: 1.5 }}>
          숏폼 콘텐츠 제작과 유통을 하나로 — shortflow에 로그인하세요.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <FormField label="이메일" placeholder="name@company.com" large/>
          <FormField
            label="비밀번호"
            placeholder="비밀번호를 입력해주세요"
            type="password"
            large
            hint={
              <a style={{ fontSize: 12.5, color: LOGIN_T.orange, fontWeight: 500, textDecoration: 'none' }}>
                비밀번호 찾기
              </a>
            }
          />
          <div style={{ marginTop: 4 }}>
            <OrangeButton>로그인 →</OrangeButton>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '22px 0 16px', color: LOGIN_T.inkFaint, fontSize: 12 }}>
          <div style={{ flex: 1, height: 1, background: 'rgba(40,30,20,0.12)' }}/>
          <span>간편 로그인</span>
          <div style={{ flex: 1, height: 1, background: 'rgba(40,30,20,0.12)' }}/>
        </div>

        <div style={{ display: 'flex', gap: 10 }}>
          <SocialBtn provider="google"/>
          <SocialBtn provider="kakao"/>
          <SocialBtn provider="naver"/>
        </div>

        <div style={{ marginTop: 22, fontSize: 13.5, color: LOGIN_T.inkMute, textAlign: 'center' }}>
          계정이 없으신가요? <a style={{ color: LOGIN_T.ink, fontWeight: 600, textDecoration: 'none' }}>회원가입</a>
        </div>
      </div>

      {/* footer */}
      <div style={{
        position: 'absolute', bottom: 24, left: 0, right: 0,
        display: 'flex', justifyContent: 'space-between', padding: '0 40px',
        fontSize: 12, color: 'rgba(40,30,20,0.5)',
        fontFamily: '"Geist Mono", ui-monospace, monospace',
      }}>
        <span>© 2026 shortflow</span>
        <span>이용약관 · 개인정보처리방침</span>
      </div>
    </div>
  );
}


Object.assign(window, { LoginA, LoginB, LoginC, LoginD });
