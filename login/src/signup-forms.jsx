// 9 signup screens for the Shortflow signup flow.
// Each component renders ONLY the right-side form. Wrap with <SignupSplit path step>
// to compose with the left dark panel + stepper.
//
// Flow:
//   Common 1-3:  email → verify code → company choice
//   New path:    company info → user info → complete
//   Existing:    invite code → user info → complete

const ST = window.LOGIN_T_SHARED;

// Tiny icon helpers
const IBuilding = (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
    <rect x="4" y="3" width="14" height="16" rx="1.5" stroke="currentColor" strokeWidth="1.6"/>
    <path d="M8 7H10M8 11H10M8 15H10M12 7H14M12 11H14M12 15H14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
  </svg>
);
const IPlus = (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
    <path d="M11 4V18M4 11H18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
  </svg>
);
const ICheck = (
  <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
    <path d="M11 22L19 30L33 14" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const IMail = (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
    <rect x="3" y="5" width="16" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.6"/>
    <path d="M3 7L11 12L19 7" stroke="currentColor" strokeWidth="1.6"/>
  </svg>
);

// ─────────────────────────────────────────────────────────────────────────
// S1 · 이메일 입력

function SignupEmail() {
  return (
    <SignupFormShell
      title="시작하려면 이메일을 입력해 주세요"
      subtitle="회사 이메일로 가입하면 더 빠르게 승인 처리돼요."
    >
      <FieldStack gap={20}>
        <SF label="이메일" placeholder="name@company.com" required large/>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13, color: ST.inkMute }}>
          <span style={{
            width: 16, height: 16, borderRadius: 5,
            border: `1.5px solid ${ST.lineStrong}`, flexShrink: 0,
          }}/>
          <span>
            <a style={{ color: ST.ink, fontWeight: 600, textDecoration: 'underline' }}>이용약관</a>
            {' 및 '}
            <a style={{ color: ST.ink, fontWeight: 600, textDecoration: 'underline' }}>개인정보처리방침</a>
            {'에 동의합니다.'}
          </span>
        </div>
        <CtaRow primaryLabel="인증코드 발송"/>
      </FieldStack>
    </SignupFormShell>
  );
}


// ─────────────────────────────────────────────────────────────────────────
// S2 · 인증코드 입력

function SignupVerify() {
  return (
    <SignupFormShell
      title="인증코드를 입력해 주세요"
      subtitle={<>
        <strong style={{ color: ST.ink, fontWeight: 600 }}>name@company.com</strong>으로 6자리 인증코드를 발송했어요.
      </>}
    >
      <FieldStack gap={20}>
        <SFOtpCode value="847" focusIdx={3}/>

        {/* Timer + resend row */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '14px 16px', background: '#FAFAF7',
          border: `1px solid ${ST.line}`, borderRadius: 12,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13.5, color: ST.inkMute }}>
            <span style={{
              width: 8, height: 8, borderRadius: 99, background: ST.orange,
              boxShadow: '0 0 0 3px rgba(255,90,31,0.2)',
            }}/>
            <span>코드 유효시간 <strong style={{ color: ST.ink, fontFamily: '"Geist Mono", monospace' }}>04:32</strong> 남음</span>
          </div>
          <button style={{
            background: 'transparent', border: 'none',
            color: ST.inkFaint, fontSize: 13, fontFamily: 'inherit',
            cursor: 'not-allowed', padding: 0,
          }} disabled>
            재발송 <span style={{ fontFamily: '"Geist Mono", monospace', marginLeft: 4 }}>02:43</span>
          </button>
        </div>

        <CtaRow onBack primaryLabel="확인"/>
      </FieldStack>
    </SignupFormShell>
  );
}


// ─────────────────────────────────────────────────────────────────────────
// S3 · 회사 선택 (분기점)

function SignupCompanyChoice({ active = null }) {
  return (
    <SignupFormShell
      title="소속된 회사가 있으신가요?"
      subtitle="이미 등록된 회사에 합류하거나, 새 회사를 등록할 수 있어요."
    >
      <FieldStack gap={12}>
        <ChoiceCard
          icon={IBuilding}
          title="회사에 합류하기"
          desc="관리자에게 받은 회사 코드로 기존 회사에 합류합니다."
          badge="회사 코드 필요"
          active={active === 'existing'}
        />
        <ChoiceCard
          icon={IPlus}
          title="새 회사 등록하기"
          desc="회사 정보를 등록하고 첫 번째 관리자로 가입합니다."
          active={active === 'new'}
        />
        <div style={{ height: 12 }}/>
        <CtaRow onBack primaryLabel="다음" primaryDisabled={!active}/>
      </FieldStack>
    </SignupFormShell>
  );
}


// ─────────────────────────────────────────────────────────────────────────
// S4-new · 회사 정보 입력 (새 회사 분기)

function SignupCompanyInfo() {
  return (
    <SignupFormShell
      title="회사 정보를 입력해 주세요"
      subtitle="관리자가 가입 승인을 검토할 때 사용되는 정보예요. 정확하게 입력해 주세요."
    >
      <FieldStack gap={16}>
        <SF label="회사명" placeholder="예: Shortflow Inc." required/>
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
        <SF label="회사 대표 이메일" placeholder="contact@company.com" required/>
        <FieldRow>
          <SFSelect label="국가" placeholder="국가 선택" value="대한민국 (KR)" required/>
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
        <CtaRow onBack primaryLabel="다음"/>
      </FieldStack>
    </SignupFormShell>
  );
}


// ─────────────────────────────────────────────────────────────────────────
// S4-existing · 회사 코드 입력 (기존 회사 분기)

function SignupInviteCode() {
  return (
    <SignupFormShell
      title="회사 코드를 입력해 주세요"
      subtitle="관리자에게 받은 8자리 회사 코드를 입력하면 회사에 합류할 수 있어요."
    >
      <FieldStack gap={20}>
        <SF
          label="회사 코드"
          placeholder="ABCD-1234"
          value="LOON-A4K9"
          required
          mono
          large
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

        {/* Company preview card */}
        <div style={{
          padding: '18px 20px',
          background: '#FAFAF7',
          border: `1px solid ${ST.line}`,
          borderRadius: 14,
          display: 'flex', alignItems: 'center', gap: 16,
        }}>
          <div style={{
            width: 52, height: 52, borderRadius: 12,
            background: 'linear-gradient(135deg, #FF8A4F 0%, #B4310B 100%)',
            color: '#fff',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 22, fontWeight: 800, fontFamily: '"Geist", system-ui',
          }}>L</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 11, color: ST.inkMute, fontFamily: '"Geist Mono", monospace', letterSpacing: '0.05em', marginBottom: 2 }}>
              JOINING ORGANIZATION
            </div>
            <div style={{ fontSize: 16, fontWeight: 700, color: ST.ink, letterSpacing: '-0.01em' }}>LoonSquare</div>
            <div style={{ fontSize: 12.5, color: ST.inkMute, marginTop: 2 }}>제작사 · 대한민국</div>
          </div>
        </div>

        <CtaRow onBack primaryLabel="다음"/>
      </FieldStack>
    </SignupFormShell>
  );
}


// ─────────────────────────────────────────────────────────────────────────
// S5 · 유저 정보 입력 (공통) — 이메일 + 인라인 인증 포함

function SignupUserInfo() {
  return (
    <SignupFormShell
      title="유저 정보를 입력해 주세요"
      subtitle="관리자 승인 후 사용할 계정 정보예요."
    >
      <FieldStack gap={16}>
        {/* Email + inline verify (verified state) */}
        <label style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: ST.ink, letterSpacing: '-0.01em' }}>
              이메일<span style={{ color: ST.orange, marginLeft: 4 }}>*</span>
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
            background: '#FAFAF7', border: `1px solid ${ST.line}`, borderRadius: 12, gap: 8,
          }}>
            <span style={{ flex: 1, fontSize: 14, color: ST.ink }}>name@company.com</span>
            <button style={{
              background: 'transparent', border: 'none', color: ST.inkFaint,
              fontSize: 12, fontFamily: 'inherit', cursor: 'pointer', padding: 0,
              textDecoration: 'underline',
            }}>변경</button>
          </div>
        </label>

        <SF label="이름" placeholder="홍길동" required/>
        <SF
          label="비밀번호"
          placeholder="8자 이상, 영문 · 숫자 · 특수문자 조합"
          type="password"
          required
          hint={
            <span style={{
              fontSize: 11.5, color: ST.inkFaint,
              fontFamily: '"Geist Mono", monospace', letterSpacing: '0.05em',
            }}>
              MIN 8 CHARS
            </span>
          }
        />
        <SF label="비밀번호 확인" placeholder="비밀번호를 한 번 더 입력해 주세요" type="password" required/>
        <FieldRow cols={3}>
          <SFSelect label="국가코드" placeholder="+82" value="+82 KR" required={false}/>
          <div style={{ gridColumn: 'span 2' }}>
            <SF label="전화번호" placeholder="10-1234-5678" required={false}/>
          </div>
        </FieldRow>

        {/* Privacy reminder */}
        <div style={{
          padding: '12px 14px',
          background: '#FAFAF7',
          border: `1px solid ${ST.line}`,
          borderRadius: 10,
          fontSize: 12.5, color: ST.inkMute, lineHeight: 1.55,
        }}>
          입력하신 정보는 회원가입 심사 외 목적으로 사용되지 않으며, <a style={{ color: ST.ink, textDecoration: 'underline' }}>개인정보처리방침</a>에 따라 안전하게 보관됩니다.
        </div>

        <CtaRow onBack primaryLabel="가입 신청"/>
      </FieldStack>
    </SignupFormShell>
  );
}


// ─────────────────────────────────────────────────────────────────────────
// S6 · 신청 완료 (공통)

function SignupComplete({ path = 'new' }) {
  return (
    <SignupFormShell
      title=""
      footer="legal"
    >
      <div style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        textAlign: 'center', paddingTop: 12,
      }}>
        <div style={{
          width: 88, height: 88, borderRadius: 99,
          background: '#FFF6F1', color: ST.orange,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          marginBottom: 24,
          boxShadow: '0 0 0 8px rgba(255,90,31,0.08)',
        }}>
          {ICheck}
        </div>
        <div style={{
          fontFamily: '"Geist Mono", ui-monospace, monospace',
          fontSize: 11, color: ST.orange, letterSpacing: '0.12em', fontWeight: 600,
          marginBottom: 10,
        }}>
          APPLICATION RECEIVED
        </div>
        <h1 style={{
          margin: 0, fontSize: 30, fontWeight: 700, letterSpacing: '-0.025em', lineHeight: 1.2,
        }}>
          회원가입 신청이 완료되었습니다.
        </h1>
        <p style={{
          margin: '14px 0 28px', color: ST.inkMute, fontSize: 14.5, lineHeight: 1.6,
          maxWidth: 400,
        }}>
          관리자 검토 후 가입 승인 메일이 발송돼요.<br/>
          보통 1영업일 이내에 처리되며, 승인되기 전까지는 로그인할 수 없어요.
        </p>

        {/* Status timeline */}
        <div style={{
          width: '100%', maxWidth: 400,
          padding: '18px 20px',
          background: '#FAFAF7',
          border: `1px solid ${ST.line}`,
          borderRadius: 14,
          display: 'flex', flexDirection: 'column', gap: 14,
          textAlign: 'left', marginBottom: 28,
        }}>
          {[
            { label: '가입 신청 완료', sub: '방금', state: 'done' },
            { label: '관리자 검토중', sub: path === 'new' ? '새 회사 검증 포함' : '회사 코드 확인 후 자동 승인', state: 'active' },
            { label: '승인 메일 발송', sub: '~ 1영업일 이내', state: 'future' },
          ].map(s => (
            <div key={s.label} style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
              <div style={{
                width: 20, height: 20, borderRadius: 99,
                background: s.state === 'done' ? ST.ink : s.state === 'active' ? ST.orange : '#fff',
                border: s.state === 'future' ? `1.5px solid ${ST.lineStrong}` : 'none',
                color: '#fff',
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 11, fontWeight: 700, flexShrink: 0,
                boxShadow: s.state === 'active' ? '0 0 0 5px rgba(255,90,31,0.18)' : 'none',
              }}>
                {s.state === 'done' ? '✓' : s.state === 'active' ? <span style={{ width: 6, height: 6, borderRadius: 99, background: '#fff' }}/> : ''}
              </div>
              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: 13.5, fontWeight: 600, color: ST.ink, letterSpacing: '-0.01em' }}>{s.label}</div>
                <div style={{ fontSize: 12, color: ST.inkMute, marginTop: 2 }}>{s.sub}</div>
              </div>
            </div>
          ))}
        </div>

        <button style={{
          height: 52, padding: '0 28px',
          background: ST.ink, color: '#fff',
          border: 'none', borderRadius: 12,
          fontFamily: 'inherit', fontSize: 15, fontWeight: 600,
          cursor: 'pointer',
        }}>
          로그인 페이지로 →
        </button>
        <div style={{ marginTop: 14, fontSize: 13, color: ST.inkMute }}>
          승인 메일이 오지 않나요? <a style={{ color: ST.ink, fontWeight: 600, textDecoration: 'none' }}>문의하기</a>
        </div>
      </div>
    </SignupFormShell>
  );
}


Object.assign(window, {
  SignupEmail, SignupVerify, SignupCompanyChoice,
  SignupCompanyInfo, SignupInviteCode, SignupUserInfo, SignupComplete,
});
