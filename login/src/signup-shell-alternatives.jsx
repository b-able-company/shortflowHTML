// Two ALTERNATIVE signup shells for comparing against the current left/right split.
//   ShellA — Open layout: top bar with horizontal stepper, centered form, no card.
//   ShellB — Card layout: warm bg, centered white card with dot progress.
//
// Each shell exports 3 demo screens (email / company choice / company info)
// so we can compare short forms, branching, and long forms head-to-head.

const SHV_T = window.LOGIN_T_SHARED;
const SHV_PATHS = {
  new:      ['회사 선택', '회사 정보', '유저 정보', '신청 완료'],
  existing: ['회사 선택', '회사 코드', '유저 정보', '신청 완료'],
};

// Re-pull atoms from window
const {
  Wordmark, ChevronDown, TopChrome,
  SF, SFTextarea, SFSelect, SFRadioGroup, FieldRow, FieldStack, CtaRow, ChoiceCard,
} = window;


// ═════════════════════════════════════════════════════════════════════════
// SHELL A — Open layout · top horizontal stepper · centered, card-less.
// ═════════════════════════════════════════════════════════════════════════

function StepperHorizontal({ path = 'new', step = 1 }) {
  const steps = SHV_PATHS[path];
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 0,
      fontFamily: '"Geist", "Pretendard", system-ui, sans-serif',
    }}>
      {steps.map((s, i) => {
        const idx = i + 1;
        const isDone = idx < step;
        const isActive = idx === step;
        const isLast = i === steps.length - 1;
        return (
          <React.Fragment key={s}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{
                width: 24, height: 24, borderRadius: 99,
                background: isActive ? SHV_T.orange : isDone ? SHV_T.ink : '#fff',
                border: isDone || isActive ? 'none' : `1.5px solid ${SHV_T.lineStrong}`,
                color: isDone || isActive ? '#fff' : SHV_T.inkFaint,
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 11, fontWeight: 700,
                boxShadow: isActive ? '0 0 0 5px rgba(255,90,31,0.15)' : 'none',
                flexShrink: 0,
              }}>
                {isDone ? (
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M2 6L5 9L10 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                ) : idx}
              </div>
              <div style={{
                fontSize: 13, fontWeight: isActive ? 700 : 500,
                color: isActive ? SHV_T.ink : isDone ? SHV_T.ink : SHV_T.inkFaint,
                letterSpacing: '-0.01em', whiteSpace: 'nowrap',
              }}>
                {s}
              </div>
            </div>
            {!isLast && (
              <div style={{
                flex: 1, height: 1.5, minWidth: 32,
                background: isDone ? SHV_T.ink : SHV_T.line,
                margin: '0 16px',
              }}/>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}

function ShellA({ path = 'new', step = 1, title, subtitle, wide = false, children }) {
  const T = SHV_T;
  return (
    <div style={{
      width: '100%', height: '100%',
      background: '#fff', color: T.ink,
      display: 'flex', flexDirection: 'column',
      fontFamily: '"Geist", "Pretendard", system-ui, sans-serif',
    }}>
      {/* Top bar */}
      <div style={{
        height: 72, padding: '0 40px',
        display: 'flex', alignItems: 'center', gap: 32,
        borderBottom: `1px solid ${T.line}`,
        flexShrink: 0,
      }}>
        <Wordmark/>
        <div style={{ flex: 1, maxWidth: 880, margin: '0 auto' }}>
          <StepperHorizontal path={path} step={step}/>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <TopChrome/>
          <span style={{ fontSize: 13, color: T.inkMute }}>
            이미 계정 있나요? <a style={{ color: T.ink, fontWeight: 600, textDecoration: 'none', marginLeft: 4 }}>로그인 →</a>
          </span>
        </div>
      </div>

      {/* Main */}
      <div style={{
        flex: 1, overflow: 'auto',
        display: 'flex', justifyContent: 'center', padding: '64px 40px 40px',
      }}>
        <div style={{ width: '100%', maxWidth: wide ? 760 : 480 }}>
          {/* Step eyebrow */}
          <div style={{
            fontFamily: '"Geist Mono", ui-monospace, monospace',
            fontSize: 11, color: T.orange, letterSpacing: '0.12em', fontWeight: 600,
            marginBottom: 12,
          }}>
            STEP {step} / 5 · {SHV_PATHS[path][step - 1]}
          </div>
          <h1 style={{ margin: 0, fontSize: 34, fontWeight: 700, letterSpacing: '-0.025em', lineHeight: 1.2 }}>
            {title}
          </h1>
          {subtitle && (
            <p style={{ margin: '14px 0 36px', color: T.inkMute, fontSize: 15, lineHeight: 1.55 }}>
              {subtitle}
            </p>
          )}
          {children}
        </div>
      </div>

      {/* Bottom legal */}
      <div style={{
        padding: '14px 40px', borderTop: `1px solid ${T.line}`,
        display: 'flex', justifyContent: 'space-between',
        fontSize: 11.5, color: T.inkFaint,
        fontFamily: '"Geist Mono", ui-monospace, monospace',
      }}>
        <span>© 2026 shortflow</span>
        <span>이용약관 · 개인정보처리방침</span>
      </div>
    </div>
  );
}


// ═════════════════════════════════════════════════════════════════════════
// SHELL B — Card layout · warm bg · centered card with dot progress.
// ═════════════════════════════════════════════════════════════════════════

function DotProgress({ path = 'new', step = 1 }) {
  const steps = SHV_PATHS[path];
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      gap: 8, marginBottom: 32,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        {steps.map((_, i) => {
          const idx = i + 1;
          const isDone = idx < step;
          const isActive = idx === step;
          return (
            <div key={i} style={{
              width: isActive ? 28 : 6, height: 6, borderRadius: 99,
              background: isActive ? SHV_T.orange : isDone ? SHV_T.ink : SHV_T.line,
              transition: 'width 0.2s',
            }}/>
          );
        })}
      </div>
      <div style={{
        fontFamily: '"Geist Mono", ui-monospace, monospace',
        fontSize: 11, color: SHV_T.inkMute, letterSpacing: '0.08em', fontWeight: 600,
      }}>
        STEP {step} / {steps.length}
      </div>
    </div>
  );
}

function ShellB({ path = 'new', step = 1, title, subtitle, wide = false, children }) {
  const T = SHV_T;
  return (
    <div style={{
      width: '100%', height: '100%',
      background: T.warm,
      display: 'flex', flexDirection: 'column',
      fontFamily: '"Geist", "Pretendard", system-ui, sans-serif',
    }}>
      {/* Mini top bar: logo + login link */}
      <div style={{
        height: 64, padding: '0 32px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        flexShrink: 0,
      }}>
        <Wordmark/>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <TopChrome/>
          <span style={{ fontSize: 13, color: T.inkMute }}>
            이미 계정 있나요? <a style={{ color: T.ink, fontWeight: 600, textDecoration: 'none', marginLeft: 4 }}>로그인 →</a>
          </span>
        </div>
      </div>

      {/* Centered card */}
      <div style={{
        flex: 1, overflow: 'auto',
        display: 'flex', alignItems: 'flex-start', justifyContent: 'center',
        padding: '28px 32px 40px',
      }}>
        <div style={{
          width: '100%', maxWidth: wide ? 760 : 560,
          background: '#fff',
          border: `1px solid ${T.line}`,
          borderRadius: 20,
          padding: '40px 48px 40px',
          boxShadow: '0 18px 60px -36px rgba(15,14,12,0.18), 0 2px 8px -4px rgba(15,14,12,0.06)',
        }}>
          <DotProgress path={path} step={step}/>
          <h1 style={{ margin: 0, fontSize: 26, fontWeight: 700, letterSpacing: '-0.025em', lineHeight: 1.25 }}>
            {title}
          </h1>
          {subtitle && (
            <p style={{ margin: '12px 0 28px', color: T.inkMute, fontSize: 14, lineHeight: 1.55 }}>
              {subtitle}
            </p>
          )}
          {children}
        </div>
      </div>

      {/* Bottom legal */}
      <div style={{
        padding: '14px 32px',
        display: 'flex', justifyContent: 'space-between',
        fontSize: 11.5, color: T.inkFaint,
        fontFamily: '"Geist Mono", ui-monospace, monospace',
      }}>
        <span>© 2026 shortflow</span>
        <span>이용약관 · 개인정보처리방침</span>
      </div>
    </div>
  );
}


// ═════════════════════════════════════════════════════════════════════════
// Sample form bodies (3 representative — reused across both shells)
// ═════════════════════════════════════════════════════════════════════════

const IBuildingV = (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
    <rect x="4" y="3" width="14" height="16" rx="1.5" stroke="currentColor" strokeWidth="1.6"/>
    <path d="M8 7H10M8 11H10M8 15H10M12 7H14M12 11H14M12 15H14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
  </svg>
);
const IPlusV = (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
    <path d="M11 4V18M4 11H18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
  </svg>
);

function BodyEmail() {
  return (
    <FieldStack gap={20}>
      <SF label="이메일" placeholder="name@company.com" required large/>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13, color: SHV_T.inkMute }}>
        <span style={{
          width: 16, height: 16, borderRadius: 5,
          border: `1.5px solid ${SHV_T.lineStrong}`, flexShrink: 0,
        }}/>
        <span>
          <a style={{ color: SHV_T.ink, fontWeight: 600, textDecoration: 'underline' }}>이용약관</a>
          {' 및 '}
          <a style={{ color: SHV_T.ink, fontWeight: 600, textDecoration: 'underline' }}>개인정보처리방침</a>
          {'에 동의합니다.'}
        </span>
      </div>
      <CtaRow primaryLabel="인증코드 발송"/>
    </FieldStack>
  );
}

function BodyChoice({ active = 'new', onSelect, onBack, onNext }) {
  return (
    <FieldStack gap={12}>
      <ChoiceCard
        icon={IBuildingV}
        title="회사에 합류하기"
        desc="관리자에게 받은 초대코드로 기존 회사에 합류합니다."
        badge="초대코드 필요"
        active={active === 'existing'}
        onClick={() => onSelect && onSelect('existing')}
      />
      <ChoiceCard
        icon={IPlusV}
        title="새 회사 등록하기"
        desc="회사 정보를 등록하고 첫 번째 관리자로 가입합니다."
        active={active === 'new'}
        onClick={() => onSelect && onSelect('new')}
      />
      <div style={{ height: 12 }}/>
      <CtaRow onBack={onBack} primaryLabel="다음" primaryDisabled={!active} onPrimary={onNext}/>
    </FieldStack>
  );
}

function BodyCompany({ onBack, onNext } = {}) {
  return (
    <FieldStack gap={16}>
      <FieldRow>
        <SF label="회사명" placeholder="예: Shortflow Inc." required/>
        <SFSelect label="국가" placeholder="국가 선택" value="대한민국 (KR)" required/>
      </FieldRow>
      <SFRadioGroup
        label="회사 유형"
        options={[
          { value: 'platform', label: '플랫폼사', desc: '숏폼 콘텐츠를 유통하는 채널 · 플랫폼' },
          { value: 'studio',   label: '제작사',   desc: 'IP를 기획 · 제작하는 스튜디오' },
        ]}
        value="studio"
        required
      />
      <SFTextarea label="회사 소개" placeholder="회사가 어떤 일을 하는지 간단히 소개해 주세요." required rows={3}/>
      <FieldRow>
        <SF label="회사 대표 이메일" placeholder="contact@company.com" required/>
        <SF label="주소" placeholder="서울특별시 강남구 …" required/>
      </FieldRow>
      <FieldRow>
        <SF label="웹사이트" placeholder="https://" required={false}/>
        <SF label="앱 URL" placeholder="App Store / Play Store" required={false}/>
      </FieldRow>
      <FieldRow cols={3}>
        <SFSelect label="국가코드" placeholder="+82" value="+82 KR" required={false}/>
        <div style={{ gridColumn: 'span 2' }}>
          <SF label="대표 전화번호" placeholder="10-1234-5678" required={false}/>
        </div>
      </FieldRow>
      <CtaRow onBack={onBack} primaryLabel="다음" onPrimary={onNext}/>
    </FieldStack>
  );
}

// User info — name + password + email with inline verify (verified state)
function BodyUser({ onBack, onNext } = {}) {
  const T = SHV_T;
  return (
    <FieldStack gap={16}>
      <label style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <span style={{ fontSize: 13, fontWeight: 600, color: T.ink, letterSpacing: '-0.01em' }}>
            이메일<span style={{ color: T.orange, marginLeft: 4 }}>*</span>
          </span>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            fontSize: 11.5, color: '#176935', fontWeight: 600,
            padding: '3px 8px', borderRadius: 99, background: '#E6F4E8',
            fontFamily: '"Geist Mono", monospace', letterSpacing: '0.04em',
          }}>
            <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
              <path d="M2 6L5 9L10 3" stroke="#176935" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            VERIFIED
          </span>
        </div>
        <div style={{
          display: 'flex', alignItems: 'center', height: 46, padding: '0 14px',
          background: '#FAFAF7', border: `1px solid ${T.line}`, borderRadius: 12, gap: 8,
        }}>
          <span style={{ flex: 1, fontSize: 14, color: T.ink }}>name@company.com</span>
          <button style={{
            background: 'transparent', border: 'none', color: T.inkFaint,
            fontSize: 12, fontFamily: 'inherit', cursor: 'pointer', padding: 0,
            textDecoration: 'underline',
          }}>변경</button>
        </div>
      </label>
      <SF label="이름" placeholder="홍길동" required/>
      <SF
        label="비밀번호" type="password" required
        placeholder="8자 이상, 영문 · 숫자 · 특수문자 조합"
        hint={
          <span style={{
            fontSize: 11.5, color: T.inkFaint,
            fontFamily: '"Geist Mono", monospace', letterSpacing: '0.05em',
          }}>MIN 8 CHARS</span>
        }
      />
      <SF label="비밀번호 확인" type="password" required placeholder="비밀번호를 한 번 더 입력해 주세요"/>
      <FieldRow cols={3}>
        <SFSelect label="국가코드" placeholder="+82" value="+82 KR" required={false}/>
        <div style={{ gridColumn: 'span 2' }}>
          <SF label="전화번호" placeholder="10-1234-5678" required={false}/>
        </div>
      </FieldRow>
      <CtaRow onBack={onBack} primaryLabel="가입 신청" onPrimary={onNext}/>
    </FieldStack>
  );
}

// Invite code — valid state with company preview card
function BodyInvite({ onBack, onNext } = {}) {
  const T = SHV_T;
  return (
    <FieldStack gap={20}>
      <SF
        label="회사 코드" placeholder="ABCD-1234" value="LOON-A4K9" required mono large
        suffix={
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            fontSize: 12, color: '#176935', fontWeight: 600,
            padding: '4px', borderRadius: 99, background: '#E6F4E8',
            fontFamily: '"Geist", system-ui',
          }}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M2 6L5 9L10 3" stroke="#176935" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </span>
        }
      />
      <div style={{
        padding: '18px 20px', background: '#FAFAF7',
        border: `1px solid ${T.line}`, borderRadius: 14,
        display: 'flex', alignItems: 'center', gap: 16,
      }}>
        <div style={{
          width: 52, height: 52, borderRadius: 12,
          background: 'linear-gradient(135deg, #FF8A4F 0%, #B4310B 100%)',
          color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 22, fontWeight: 800,
        }}>L</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 11, color: T.inkMute, fontFamily: '"Geist Mono", monospace', letterSpacing: '0.05em', marginBottom: 2 }}>
            JOINING ORGANIZATION
          </div>
          <div style={{ fontSize: 16, fontWeight: 700, color: T.ink, letterSpacing: '-0.01em' }}>LoonSquare</div>
          <div style={{ fontSize: 12.5, color: T.inkMute, marginTop: 2 }}>제작사 · 대한민국</div>
        </div>
      </div>
      <CtaRow onBack={onBack} primaryLabel="다음" onPrimary={onNext}/>
    </FieldStack>
  );
}


Object.assign(window, {
  ShellA, ShellB,
  BodyEmail, BodyChoice, BodyCompany, BodyUser, BodyInvite,
});
