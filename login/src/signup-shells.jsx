// signup-shells-v2.jsx
// Fresh signup layouts. Keep ONLY the top bar (logo left + translate/login right).
// Everything else is reworked.
//
//   ShellC — Form-Forward / Quiet
//     White-ish bg, slim 4-segment progress under the topbar, huge eyebrow
//     "02 / 04 · 회사 정보", massive title, single centered form column.
//     No card chrome, no dark panel. Form takes the stage.
//
//   ShellD — Side Text Rail
//     Top bar + asymmetric 2-column body. Left rail is plain text:
//     all 4 steps listed with the active one highlighted in orange,
//     plus a small helper note under it. Right is the form.
//     No dark panel, no card chrome. Generous breathing room.

const SV2_T = window.LOGIN_T_SHARED;
const SV2_PATHS = {
  new:      ['회사 선택', '회사 정보', '유저 정보', '약관 동의', '신청 완료'],
  existing: ['회사 선택', '회사 코드', '유저 정보', '약관 동의', '신청 완료'],
};

const {
  Wordmark, TopChrome,
  SF, SFTextarea, SFSelect, SFRadioGroup, FieldRow, FieldStack, ChoiceCard, CtaRow,
} = window;


// ═════════════════════════════════════════════════════════════════════════
// Shared top bar (the part the user wants to keep)
// Logo left  ·  [번역 ▾] right
// ═════════════════════════════════════════════════════════════════════════

function SV2TopBar({ divider = false }) {
  const T = SV2_T;
  return (
    <header style={{
      height: 64, padding: '0 32px',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      borderBottom: divider ? `1px solid ${T.line}` : 'none',
      flexShrink: 0,
      position: 'relative', zIndex: 2,
    }}>
      <Wordmark size={22}/>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <TopChrome/>
      </div>
    </header>
  );
}


// ═════════════════════════════════════════════════════════════════════════
// Labeled top stepper — shared by Shell C and Shell D.
// Each step shows "STEP N" eyebrow + step name. Lines connect them.
// Current step: orange pill + halo. Done: ink pill + check. Future: ghost.
// ═════════════════════════════════════════════════════════════════════════

function LabeledTopStepper({ path, step }) {
  const T = SV2_T;
  const steps = SV2_PATHS[path];
  return (
    <div style={{
      padding: '14px 32px 0',
      background: '#fff',
      flexShrink: 0,
    }}>
      <div style={{
        maxWidth: 820,
        margin: '0 auto',
        display: 'flex', alignItems: 'center',
      }}>
        {steps.map((s, i) => {
          const idx = i + 1;
          const isDone = idx < step;
          const isActive = idx === step;
          const isLast = i === steps.length - 1;
          return (
            <React.Fragment key={s}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                flexShrink: 0,
                padding: '10px 0 12px',
                background: '#fff',
              }}>
                <div style={{
                  width: 24, height: 24, borderRadius: 99,
                  background: isActive ? T.orange : isDone ? T.ink : '#fff',
                  border: isDone || isActive ? 'none' : `1.5px solid ${T.lineStrong}`,
                  color: isDone || isActive ? '#fff' : T.inkFaint,
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 11, fontWeight: 700,
                  fontFamily: '"Geist Mono", ui-monospace, monospace',
                  boxShadow: isActive ? '0 0 0 5px rgba(255,90,31,0.16)' : 'none',
                  transition: 'all 0.15s',
                  flexShrink: 0,
                }}>
                  {isDone ? (
                    <svg width="13" height="13" viewBox="0 0 12 12" fill="none">
                      <path d="M2 6L5 9L10 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  ) : idx}
                </div>
                <div style={{ minWidth: 0 }}>
                  <div style={{
                    fontFamily: '"Geist Mono", ui-monospace, monospace',
                    fontSize: 9, color: isActive ? T.orange : T.inkFaint,
                    letterSpacing: '0.12em', fontWeight: 700,
                    marginBottom: 2,
                  }}>
                    STEP {idx}
                  </div>
                  <div style={{
                    fontSize: 12.5, fontWeight: isActive ? 700 : 500,
                    color: isActive ? T.ink : isDone ? T.ink : T.inkFaint,
                    letterSpacing: '-0.01em', whiteSpace: 'nowrap',
                  }}>
                    {s}
                  </div>
                </div>
              </div>
              {!isLast && (
                <div style={{
                  flex: 1, height: 1.5, minWidth: 44,
                  background: isDone ? T.ink : T.lineStrong,
                  margin: '0 12px',
                }}/>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}

function ShellC({ path = 'new', step = 1, title, subtitle, wide = false, contentMaxWidth = null, children }) {
  const T = SV2_T;
  return (
    <div style={{
      width: '100%', height: '100%',
      background: '#ffffff',
      display: 'flex', flexDirection: 'column',
      color: T.ink,
      fontFamily: '"Geist", "Pretendard", system-ui, sans-serif',
      position: 'relative',
    }}>
      <SV2TopBar/>

      <div style={{
        flex: 1, overflow: 'auto',
        display: 'flex', justifyContent: 'center', alignItems: 'flex-start',
        background: '#fff',
        padding: '28px 32px 88px',
      }}>
        <div style={{
          width: '100%',
          maxWidth: 820,
          background: '#FAFAF7',
          borderRadius: 6,
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          flex: '0 0 auto',
        }}>
          <LabeledTopStepper path={path} step={step}/>

          <div style={{
            width: '100%',
            maxWidth: contentMaxWidth || (wide ? 700 : 500),
            margin: '0 auto',
            padding: '42px 32px 64px',
          }}>
            <h1 style={{
              margin: 0, fontSize: 32, fontWeight: 700,
              letterSpacing: '-0.028em', lineHeight: 1.16,
            }}>
              {title}
            </h1>
            {subtitle && (
              <p style={{
                margin: '14px 0 32px', color: T.inkMute,
                fontSize: 14.5, lineHeight: 1.55, maxWidth: 500,
              }}>
                {subtitle}
              </p>
            )}
            {children}
          </div>
        </div>
      </div>

    </div>
  );
}


// ═════════════════════════════════════════════════════════════════════════
// ShellD — Side Text Rail
// ═════════════════════════════════════════════════════════════════════════

function ShellD({ path = 'new', step = 1, title, subtitle, wide = false, centered = false, children }) {
  const T = SV2_T;
  return (
    <div style={{
      width: '100%', height: '100%',
      background: '#fff',
      display: 'flex', flexDirection: 'column',
      color: T.ink,
      fontFamily: '"Geist", "Pretendard", system-ui, sans-serif',
    }}>
      <SV2TopBar/>
      <LabeledTopStepper path={path} step={step}/>

      <div style={{
        flex: 1, overflow: 'auto',
        padding: '64px 56px 88px',
      }}>
        <div style={{
          maxWidth: 1120, margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: centered ? '1fr' : 'minmax(280px, 380px) 1fr',
          gap: centered ? 0 : 96,
          alignItems: 'start',
          justifyItems: centered ? 'center' : 'stretch',
        }}>
          {!centered && (
            <div style={{ position: 'sticky', top: 0 }}>
              <div style={{
                fontFamily: '"Geist Mono", ui-monospace, monospace',
                fontSize: 11, color: T.orange, letterSpacing: '0.12em',
                fontWeight: 700, marginBottom: 14,
              }}>
                STEP {step} · {path === 'new' ? 'NEW ORG' : 'JOIN ORG'}
              </div>
              <h1 style={{
                margin: 0, fontSize: 34, fontWeight: 700,
                letterSpacing: '-0.028em', lineHeight: 1.16,
              }}>
                {title}
              </h1>
              {subtitle && (
                <p style={{
                  margin: '18px 0 0', color: T.inkMute,
                  fontSize: 15, lineHeight: 1.6,
                }}>
                  {subtitle}
                </p>
              )}
              <div style={{
                marginTop: 28, padding: '16px 18px',
                background: '#FAFAF7',
                border: `1px solid ${T.line}`,
                borderRadius: 14,
                fontSize: 12.5, color: T.inkMute, lineHeight: 1.55,
              }}>
                <div style={{
                  fontWeight: 700, color: T.ink, marginBottom: 4, fontSize: 13,
                  letterSpacing: '-0.01em',
                }}>
                  도움이 필요하세요?
                </div>
                <a style={{ color: T.ink, fontWeight: 600, textDecoration: 'underline' }}>support@shortflow.io</a>로 언제든 문의해 주세요.
              </div>
            </div>
          )}

          <div style={{ minWidth: 0, width: '100%', maxWidth: wide ? 720 : 540 }}>
            {centered && (
              <>
                <h1 style={{
                  margin: 0, fontSize: 34, fontWeight: 700,
                  letterSpacing: '-0.028em', lineHeight: 1.16, textAlign: 'left',
                }}>
                  {title}
                </h1>
                {subtitle && (
                  <p style={{
                    margin: '16px 0 36px', color: T.inkMute,
                    fontSize: 15.5, lineHeight: 1.55,
                  }}>
                    {subtitle}
                  </p>
                )}
              </>
            )}
            {children}
          </div>
        </div>
      </div>

    </div>
  );
}


// ═════════════════════════════════════════════════════════════════════════
// BodyTerms — terms confirmation before submitting signup.
// ═════════════════════════════════════════════════════════════════════════

function BodyTerms({ onBack, onNext }) {
  const T = SV2_T;
  const terms = [
    {
      id: 'service',
      title: '서비스 이용약관 동의',
      required: true,
      body: [
        'shortflow는 숏폼 드라마, 숏폼 애니메이션, 웹 기반 시리즈 IP 등 다양한 콘텐츠의 제작사, 플랫폼사, 배급 파트너가 작품 정보와 유통 상태를 관리하고 협업할 수 있도록 제공되는 비즈니스용 서비스입니다.',
        '회원은 shortflow를 이용하기 위해 정확한 회사 정보와 사용자 정보를 제공해야 하며, 소속 회사의 승인 없이 타 회사의 이름, 회사 코드, 담당자 정보를 사용하거나 제3자의 계정으로 서비스를 이용해서는 안 됩니다.',
        '회원가입 신청이 접수되면 shortflow 또는 회사 관리자는 제출된 회사명, 회사 유형, 대표 이메일, 회사 소개, 연락처, 초대 코드 등의 정보를 바탕으로 가입 자격과 소속 여부를 확인할 수 있습니다.',
        '서비스 내에서 제공되는 작품명, 편성 정보, 유통 제안, 계약 검토 상태, 담당자 코멘트, 내부 메모 등은 업무 목적을 위해서만 사용되어야 하며, 권한이 없는 외부인에게 무단으로 공유하거나 별도 저장소에 복제할 수 없습니다.',
        '회원은 계정 접근 권한을 안전하게 관리해야 하며, 비밀번호 유출, 권한 오남용, 회사 퇴사 또는 담당 업무 변경 등 계정 사용 권한에 영향을 줄 수 있는 사유가 발생한 경우 즉시 관리자에게 알려야 합니다.',
        'shortflow는 안정적인 서비스 운영과 콘텐츠 IP 거래 질서 보호를 위해 비정상적인 접근, 허위 정보 입력, 무단 데이터 수집, 반복적인 승인 요청, 타사의 영업 기밀 침해가 의심되는 행위를 제한할 수 있습니다.',
        '서비스의 세부 기능, 권한 범위, 알림 방식, 지원 범위 및 이용 제한 기준은 운영 정책에 따라 변경될 수 있으며, 중요한 변경 사항은 서비스 화면 또는 가입 시 등록한 이메일을 통해 안내될 수 있습니다.',
      ],
    },
    {
      id: 'privacy',
      title: '개인정보 수집 및 이용 동의',
      required: true,
      body: [
        'shortflow는 회원가입 신청 검토, 회사 소속 확인, 계정 생성, 권한 부여 및 서비스 이용 안내를 위해 가입자가 입력한 이름, 이메일 주소, 비밀번호, 전화번호, 회사명, 회사 유형, 회사 소개, 대표 이메일, 주소, 웹사이트, 앱 URL 등의 정보를 수집합니다.',
        '회사가 이미 등록되어 있는 경우 shortflow는 가입자가 입력한 회사 코드와 이메일 정보를 활용하여 해당 회사의 구성원 또는 협업 대상자인지 확인할 수 있으며, 필요한 경우 회사 관리자에게 가입 승인 요청 정보가 제공될 수 있습니다.',
        '새 회사를 등록하는 경우 제출된 회사 정보는 회사의 실제 운영 여부, 콘텐츠 제작 또는 유통 관련성, 담당자 연락 가능 여부, 서비스 이용 목적의 적절성을 검토하기 위해 사용됩니다.',
        '수집된 개인정보는 회원가입 승인 여부 판단, 계정 식별, 로그인 및 보안 관리, 승인 결과 메일 발송, 고객 문의 대응, 서비스 이용 기록 확인, 부정 이용 방지 및 분쟁 대응을 위한 목적으로만 이용됩니다.',
        'shortflow는 승인 검토가 진행 중인 계정에 대해 로그인 제한 상태를 유지할 수 있으며, 승인 또는 반려 결과는 가입 시 입력한 이메일 주소로 안내됩니다. 이메일 주소가 정확하지 않을 경우 승인 안내를 받지 못할 수 있습니다.',
        '개인정보는 목적 달성 후 내부 보관 기준과 관련 법령에 따라 안전하게 보관 또는 파기됩니다. 단, 서비스 이용 기록, 승인 이력, 부정 이용 방지 기록 등 법령상 또는 운영상 보관이 필요한 정보는 정해진 기간 동안 별도로 보관될 수 있습니다.',
        '가입자는 개인정보 수집 및 이용에 대한 동의를 거부할 수 있으나, 필수 정보 처리에 동의하지 않을 경우 회원가입 신청, 회사 소속 확인, 계정 승인 및 shortflow 서비스 이용이 제한될 수 있습니다.',
        'shortflow는 개인정보를 안전하게 보호하기 위해 접근 권한 관리, 암호화, 접속 기록 관리 등 합리적인 보안 조치를 적용하며, 회사 관리자와 서비스 운영자는 업무 수행에 필요한 범위 내에서만 정보를 확인할 수 있습니다.',
      ],
    },
  ];
  const [canAgree, setCanAgree] = React.useState(false);
  const [checked, setChecked] = React.useState(false);
  const agreeRef = React.useRef(null);

  React.useEffect(() => {
    const node = agreeRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setCanAgree(true);
    }, { threshold: 0.7 });

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 30 }}>
      <div style={{
        padding: '22px 24px',
        background: '#fff',
        border: `1px solid ${T.line}`,
        borderRadius: 6,
        color: T.inkMute,
        fontSize: 13,
        lineHeight: 1.72,
      }}>
        {terms.map((term) => (
          <section key={term.id} style={{ marginBottom: 24 }}>
            <h3 style={{
              margin: '0 0 10px',
              color: T.ink,
              fontSize: 14,
              fontWeight: 700,
              letterSpacing: '-0.01em',
            }}>
              {term.title}
              <span style={{ color: term.required ? T.orange : T.inkFaint, marginLeft: 5 }}>
                ({term.required ? '필수' : '선택'})
              </span>
            </h3>
            {term.body.map((paragraph) => (
              <p key={paragraph} style={{ margin: '0 0 10px' }}>{paragraph}</p>
            ))}
          </section>
        ))}
      </div>

      <label ref={agreeRef} style={{
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        color: canAgree ? T.ink : T.inkFaint,
        fontSize: 13.5,
        fontWeight: 600,
        lineHeight: 1.45,
        cursor: canAgree ? 'pointer' : 'not-allowed',
      }}>
        <input
          type="checkbox"
          disabled={!canAgree}
          checked={checked}
          onChange={(event) => setChecked(event.target.checked)}
          style={{ width: 17, height: 17, accentColor: T.orange, cursor: canAgree ? 'pointer' : 'not-allowed', flexShrink: 0 }}
        />
        <span>위 약관 내용을 모두 확인하고 동의합니다.</span>
      </label>

      <CtaRow onBack={onBack} primaryLabel="가입 신청" primaryDisabled={!canAgree || !checked} onPrimary={onNext}/>
    </div>
  );
}


// ═════════════════════════════════════════════════════════════════════════
// BodyComplete — success body shared by both shells.
// ═════════════════════════════════════════════════════════════════════════

function BodyComplete({ path = 'new' }) {
  const T = SV2_T;
  const rows = [
    { label: '신청 상태', value: '접수 완료', tone: 'strong' },
    { label: '로그인 가능 시점', value: '관리자 승인 완료 후' },
  ];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div style={{
        padding: '22px 24px',
        background: '#fff',
        border: `1px solid ${T.line}`,
        borderRadius: 8,
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 16,
          paddingBottom: 18,
          borderBottom: `1px solid ${T.line}`,
          marginBottom: 18,
        }}>
          <div>
            <div style={{
              fontFamily: '"Geist Mono", ui-monospace, monospace',
              fontSize: 11,
              color: T.orange,
              letterSpacing: '0.12em',
              fontWeight: 700,
              marginBottom: 6,
            }}>
              APPLICATION RECEIVED
            </div>
            <div style={{
              fontSize: 18,
              fontWeight: 700,
              color: T.ink,
              letterSpacing: '-0.02em',
            }}>
              가입 신청이 접수되었어요
            </div>
          </div>
          <div style={{
            height: 34,
            padding: '0 12px',
            borderRadius: 99,
            background: '#FFF1E9',
            color: T.orange,
            display: 'inline-flex',
            alignItems: 'center',
            fontSize: 13,
            fontWeight: 700,
            flexShrink: 0,
          }}>
            접수 완료
          </div>
        </div>

        <div style={{ display: 'grid', gap: 12 }}>
          {rows.map((row) => (
            <div key={row.label} style={{
              display: 'grid',
              gridTemplateColumns: '104px 1fr',
              gap: 16,
              alignItems: 'baseline',
            }}>
              <div style={{
                fontSize: 12,
                color: T.inkFaint,
                fontFamily: '"Geist Mono", ui-monospace, monospace',
                letterSpacing: '0.04em',
              }}>
                {row.label}
              </div>
              <div style={{
                fontSize: 14,
                fontWeight: row.tone === 'strong' ? 700 : 500,
                color: row.tone === 'strong' ? T.ink : T.inkMute,
              }}>
                {row.value}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: 'flex', gap: 10, marginBottom: 56 }}>
        <a href="login.html" style={{
          flex: 1,
          height: 52,
          background: T.ink,
          color: '#fff',
          border: 'none',
          borderRadius: 8,
          fontFamily: 'inherit',
          fontSize: 15,
          fontWeight: 600,
          letterSpacing: '-0.01em',
          cursor: 'pointer',
          textDecoration: 'none',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          로그인 페이지로
        </a>
        <button style={{
          height: 52,
          padding: '0 24px',
          background: '#fff',
          color: T.ink,
          border: `1px solid ${T.lineStrong}`,
          borderRadius: 8,
          fontFamily: 'inherit',
          fontSize: 15,
          fontWeight: 600,
          cursor: 'pointer',
        }}>
          문의하기
        </button>
      </div>
    </div>
  );
}


Object.assign(window, {
  SV2TopBar, ShellC, ShellD, BodyTerms, BodyComplete,
});
