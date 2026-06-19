// 새 콘텐츠 생성 — 셸 (헤더 · 단계 이동 3시안 · 푸터 · 제출 모달)

// ─── 페이지 헤더 ───────────────────────────────────────
function NCHeader({ savedAt, t }) {
  return (
    <div style={{ marginBottom: 24 }}>
      <button onClick={() => window.history.back()} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontFamily: t.sans, fontSize: 12.5, fontWeight: 600, color: t.inkMute, marginBottom: 9, whiteSpace: 'nowrap', border: 'none', background: 'transparent', cursor: 'pointer', padding: 0 }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" /></svg>
        <span>뒤로가기</span>
      </button>
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 12 }}>
        <h1 style={{ margin: 0, fontFamily: t.sans, fontSize: 27, fontWeight: 700, letterSpacing: -0.7, color: t.ink }}></h1>
        {savedAt &&
        <span style={{ fontFamily: t.mono, fontSize: 11.5, color: t.inkFaint, paddingBottom: 5, display: 'inline-flex', alignItems: 'center', gap: 5 }}>
            <span style={{ width: 6, height: 6, borderRadius: 999, background: t.paid }} />임시저장됨 {savedAt}
          </span>
        }
      </div>
    </div>);

}

// ─── 입력 기준 언어 선택 바 ───────────────────────
function InputLanguageBar({ value, onChange, t, embedded = false }) {
  const opts = [
    { v: 'KO', label: '한국어' },
    { v: 'EN', label: 'English' },
    { v: 'ZH', label: '中文' },
  ];
  const selector = (
    <div style={{ display: 'flex', gap: 4, background: t.surface, border: `0.5px solid ${t.line}`, borderRadius: 9, padding: 3, flexShrink: 0 }}>
      {opts.map((o) => {
        const sel = value === o.v;
        return (
          <button key={o.v} onClick={() => onChange(o.v)} style={{
            border: 'none', cursor: 'pointer', borderRadius: 6, padding: embedded ? '7px 14px' : '8px 16px',
            background: sel ? '#25272B' : 'transparent', color: sel ? '#FFFFFF' : t.inkMute,
            fontFamily: t.sans, fontSize: 13, fontWeight: sel ? 700 : 500, whiteSpace: 'nowrap',
          }}>{o.label}</button>
        );
      })}
    </div>
  );

  if (embedded) {
    return (
      <div style={{ minHeight: 38, display: 'flex', alignItems: 'center' }}>
        {selector}
      </div>
    );
  }

  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 16, marginBottom: 22,
      padding: '14px 18px', background: ACCENT_SOFT, border: `0.5px solid #F2C3AE`, borderRadius: 14,
    }}>
      <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 34, height: 34, borderRadius: 9, background: t.surface, border: `0.5px solid #F2C3AE`, flexShrink: 0 }}>
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke={ACCENT} strokeWidth="1.9"><path d="M5 8l6 6M4 14l6-6 2-3M2 5h12M7 2h1M22 22l-5-10-5 10M14 18h6" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </div>
      <div style={{ minWidth: 0 }}>
        <div style={{ fontFamily: t.sans, fontSize: 13.5, fontWeight: 700, color: t.ink, letterSpacing: -0.2 }}>입력 기준 언어</div>
        <div style={{ fontFamily: t.sans, fontSize: 11.5, color: t.inkMute, marginTop: 2 }}>콘텐츠 정보를 입력할 언어예요. 자막도 이 언어 기준으로 업로드됩니다.</div>
      </div>
      <div style={{ flex: 1 }} />
      {selector}
    </div>);

}

// ─── 시안 B: 상단 가로 스텝퍼 ──────────────────────────
function Stepper({ steps, current, maxReached, onJump, t }) {
  return (
    <div style={{ width: 'calc(100% - 80px)', margin: '0 auto 16px', display: 'flex', alignItems: 'flex-start', padding: '12px 24px 18px' }}>
      {steps.map((s, i) => {
        const done = s.k < current;
        const active = s.k === current;
        const reachable = s.k <= maxReached;
        return (
          <React.Fragment key={s.k}>
            <button onClick={() => reachable && onJump(s.k)} style={{
              flex: '0 0 auto', minWidth: 76, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 7, border: 'none', background: 'transparent',
              cursor: reachable ? 'pointer' : 'default', padding: 0, textAlign: 'center'
            }}>
              <span style={{
                width: 30, height: 30, borderRadius: 999, flexShrink: 0,
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: t.mono, fontSize: 13, fontWeight: 600,
                background: active ? ACCENT : done ? ACCENT_SOFT : t.surfaceAlt,
                color: active ? '#FFF7EE' : done ? ACCENT : t.inkFaint,
                border: active ? 'none' : `0.5px solid ${t.line}`
              }}>
                {done ? <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={ACCENT} strokeWidth="3"><path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" /></svg> : s.k}
              </span>
              <span style={{ fontFamily: t.sans, fontSize: 12.5, fontWeight: active ? 600 : 500, color: active ? t.ink : done ? t.inkMute : t.inkFaint, letterSpacing: -0.2, whiteSpace: 'nowrap' }}>{s.label}</span>
            </button>
            {i < steps.length - 1 &&
            <div style={{ flex: 1, height: 2, background: s.k < current ? ACCENT_SOFT : t.line, borderRadius: 2, margin: '15px 16px 0' }} />
            }
          </React.Fragment>
        );
      })}
    </div>
  );
}

// ─── 시안 C: 좌측 사이드 레일 ──────────────────────────
function SideRail({ steps, current, maxReached, onJump, t }) {
  return (
    <div style={{ position: 'sticky', top: 0, display: 'flex', flexDirection: 'column', gap: 6 }}>
      {steps.map((s) => {
        const done = s.k < current;
        const active = s.k === current;
        const reachable = s.k <= maxReached;
        return (
          <button key={s.k} onClick={() => reachable && onJump(s.k)} style={{
            display: 'flex', alignItems: 'center', gap: 12, padding: '13px 14px', borderRadius: 12, textAlign: 'left',
            cursor: reachable ? 'pointer' : 'default',
            background: active ? ACCENT_SOFT : 'transparent',
            border: `0.5px solid ${active ? '#F2C3AE' : 'transparent'}`
          }}>
            <span style={{
              width: 28, height: 28, borderRadius: 999, flexShrink: 0,
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: t.mono, fontSize: 12.5, fontWeight: 700,
              background: active ? ACCENT : done ? t.surface : t.surfaceAlt,
              color: active ? '#FFF7EE' : done ? ACCENT : t.inkFaint,
              border: active ? 'none' : `0.5px solid ${t.line}`
            }}>
              {done ? <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={ACCENT} strokeWidth="3"><path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" /></svg> : s.k}
            </span>
            <span>
              <div style={{ fontFamily: t.sans, fontSize: 13.5, fontWeight: active ? 700 : 600, color: active ? t.ink : t.inkMute, letterSpacing: -0.2 }}>{s.label}</div>
              <div style={{ fontFamily: t.sans, fontSize: 11, color: t.inkFaint, marginTop: 2 }}>{s.hint}</div>
            </span>
          </button>);

      })}
    </div>);

}

// ─── 하단 액션 바 ──────────────────────────────────────
function FooterBar({ wizard, current, total, onPrev, onNext, onSave, onSubmit, missingCount = 0, onDevBypass, t, maxW = 1180 }) {
  const ghost = {
    height: 42, padding: '0 18px', borderRadius: 9, cursor: 'pointer',
    border: `0.5px solid ${t.lineStrong}`, background: t.surface, color: t.ink,
    fontFamily: t.sans, fontSize: 13.5, fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: 7
  };
  const primary = {
    height: 42, padding: '0 22px', borderRadius: 9, cursor: 'pointer', border: 'none',
    background: ACCENT, color: '#FFF7EE', fontFamily: t.sans, fontSize: 13.5, fontWeight: 700,
    display: 'inline-flex', alignItems: 'center', gap: 8
  };
  const onLast = current >= total;
  return (
    <div style={{
      flexShrink: 0, borderTop: `0.5px solid ${t.line}`, background: t.surface,
      padding: '14px 40px', display: 'flex', alignItems: 'center', gap: 12
    }}>
      <div style={{ maxWidth: maxW, margin: '0 auto', width: '100%', display: 'flex', alignItems: 'center', gap: 12 }}>
        {wizard &&
        <button onClick={onPrev} disabled={current <= 1} style={{ ...ghost, opacity: current <= 1 ? 0.4 : 1, cursor: current <= 1 ? 'default' : 'pointer' }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6" strokeLinecap="round" /></svg>
            이전
          </button>
        }
        <div style={{ flex: 1 }} />
        <button onClick={onSave} style={ghost}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" /><path d="M17 21v-8H7v8M7 3v5h8" /></svg>
          임시저장
        </button>
        {wizard && !onLast &&
        <button onClick={onNext} style={{ ...primary, background: '#1F2125', color: '#FFFFFF' }}>
            다음
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6" strokeLinecap="round" /></svg>
          </button>
        }
        {(!wizard || onLast) && (() => {
          const canSubmit = missingCount === 0;
          return (
            <div style={{ position: 'relative', display: 'inline-flex', gap: 8 }} className="submit-wrap">
              {onDevBypass && !canSubmit && (
                <button onClick={onDevBypass} style={{ ...ghost, fontSize: 12, color: t.inkFaint, borderStyle: 'dashed' }}>
                  전체 입력 상태 만들기
                </button>
              )}
              <button
                onClick={canSubmit ? onSubmit : undefined}
                disabled={!canSubmit}
                style={{ ...primary, opacity: canSubmit ? 1 : 0.45, cursor: canSubmit ? 'pointer' : 'not-allowed' }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" strokeLinecap="round" strokeLinejoin="round" /></svg>
                검토 요청 보내기
              </button>
              {!canSubmit && (
                <span style={{
                  position: 'absolute', bottom: 'calc(100% + 8px)', right: 0,
                  background: 'rgba(15,17,21,0.88)', color: '#fff', fontSize: 12, fontFamily: t.sans,
                  padding: '6px 10px', borderRadius: 7, whiteSpace: 'nowrap', pointerEvents: 'none',
                  opacity: 0, transition: 'opacity 0.15s',
                }} className="submit-tooltip">
                  필수 항목 {missingCount}개를 먼저 입력해주세요
                </span>
              )}
            </div>
          );
        })()}
        <style>{`.submit-wrap:hover .submit-tooltip { opacity: 1 !important; }`}</style>
      </div>
    </div>);

}

// ─── 제출 확인 모달 ────────────────────────────────────
function arr(v) {return Array.isArray(v) ? v : v ? [v] : [];}

function hasRequiredValue(value) {
  if (Array.isArray(value)) return value.length > 0;
  if (typeof value === 'string') return value.trim().length > 0;
  return value !== null && value !== undefined && value !== '';
}

function missingSubmitRequiredItems(form, baseLanguage) {
  const language = baseLanguage || form.mediaLanguage || LANG_LIST[0];
  const translation = form.translations.find((item) => item.language === language) || {};
  const crew = form.crew.find((item) => item.language === language) || {};
  const missing = [];

  webContentGroups(form).forEach((group) => {
    group.fields.forEach((field) => {
      const optionalInPlanning = form.productionStatus === 'PLANNING' && ['director', 'writer', 'cast', 'ageRating'].includes(field.key);
      const required = field.required !== false && field.key !== 'startPoint' && !optionalInPlanning;
      if (!required) return;
      const source = field.source === 'translation' ? translation : field.source === 'crew' ? crew : form;
      if (!hasRequiredValue(source[field.key])) missing.push(field.label);
    });
  });

  if (arr(form.mainImageKey).length === 0) missing.push('대표 이미지');
  return [...new Set(missing)];
}

function SubmitModal({ form, baseLanguage, onClose, onConfirm, t }) {
  const [rightsConfirmed, setRightsConfirmed] = React.useState(false);
  const [submitHover, setSubmitHover] = React.useState(false);

  return (
    <div onClick={onClose} style={{
      position: 'fixed', inset: 0, zIndex: 2000, background: 'rgba(15,17,21,0.42)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24
    }}>
      <div onClick={(e) => e.stopPropagation()} style={{
        position: 'relative', width: 420, maxWidth: '100%', maxHeight: '88vh', overflow: 'auto', background: t.surface,
        borderRadius: 18, boxShadow: '0 24px 70px rgba(0,0,0,0.24)', padding: '30px 28px 26px', textAlign: 'center'
      }}>
        <button
          type="button"
          aria-label="닫기"
          onClick={onClose}
          style={{ position: 'absolute', top: 14, right: 16, width: 30, height: 30, padding: 0, border: 'none', borderRadius: 8, background: 'transparent', color: t.inkMute, cursor: 'pointer', fontFamily: t.sans, fontSize: 22, lineHeight: 1, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
        >×</button>
        <div style={{ width: 60, height: 60, margin: '0 auto 18px', borderRadius: 16, background: '#F4F4F1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <img
            src="images/contentAddCheck.png"
            alt=""
            style={{ width: 44, height: 44, display: 'block', objectFit: 'contain' }}
          />
        </div>

        <h2 style={{ margin: 0, fontFamily: t.sans, fontSize: 19, fontWeight: 650, color: t.ink, letterSpacing: -0.35 }}>권리 보유 내용을 확인해주세요</h2>
        <p style={{ margin: '10px auto 20px', maxWidth: 350, fontFamily: t.sans, fontSize: 13.5, color: '#555A63', fontWeight: 500, lineHeight: 1.7 }}>
          당사는 해당 작품의 저작권자 또는 적법한 권리자이며, 작품을 이용허락할 수 있는 권한을 보유하고 있음을 보증합니다. 또한 이를 입증할 자료를 제출할 수 있음을 확인합니다.
        </p>

        <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 9, width: '100%', marginTop: 2, cursor: 'pointer' }}>
          <input
            type="checkbox"
            checked={rightsConfirmed}
            onChange={(e) => setRightsConfirmed(e.target.checked)}
            style={{ width: 16, height: 16, margin: 0, flexShrink: 0, accentColor: ACCENT, cursor: 'pointer' }}
          />
          <span style={{ fontFamily: t.sans, fontSize: 12.5, color: t.ink, fontWeight: 600 }}>위 내용을 확인하고 동의합니다.</span>
        </label>

        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 12 }}>
          <button
            disabled={!rightsConfirmed}
            onClick={onConfirm}
            onMouseEnter={() => rightsConfirmed && setSubmitHover(true)}
            onMouseLeave={() => setSubmitHover(false)}
            style={{
            width: '100%', height: 40, borderRadius: 10,
            border: submitHover ? 'none' : `0.5px solid ${rightsConfirmed ? t.lineStrong : t.line}`,
            background: submitHover ? ACCENT : t.surface,
            color: submitHover ? '#FFF7EE' : rightsConfirmed ? t.ink : t.inkFaint,
            fontFamily: t.sans, fontSize: 14, fontWeight: 600, cursor: rightsConfirmed ? 'pointer' : 'not-allowed',
            transition: 'background 160ms ease, color 160ms ease, border-color 160ms ease'
          }}>
            검토 요청
          </button>
        </div>
      </div>
    </div>);

}

// ─── 제출 완료 토스트/화면 ─────────────────────────────
function SubmittedToast({ onClose, t }) {
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 2000, background: 'rgba(15,17,21,0.42)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <div style={{ width: 420, maxWidth: '100%', background: t.surface, borderRadius: 18, boxShadow: '0 30px 80px rgba(0,0,0,0.3)', padding: '34px 30px', textAlign: 'center' }}>
        <div style={{ width: 56, height: 56, borderRadius: 999, background: t.paidTint, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={t.paid} strokeWidth="2.4"><path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </div>
        <h2 style={{ margin: 0, fontFamily: t.sans, fontSize: 19, fontWeight: 700, color: t.ink }}>검토 요청을 보냈어요</h2>
        <p style={{ margin: '8px 0 22px', fontFamily: t.sans, fontSize: 13.5, color: t.inkMute, lineHeight: 1.6 }}>
          관리자 검토가 시작됩니다. 진행 상황은 워크플로우에서 확인할 수 있어요.
        </p>
        <button onClick={onClose} style={{ height: 42, padding: '0 24px', borderRadius: 10, cursor: 'pointer', border: 'none', background: ACCENT, color: '#FFF7EE', fontFamily: t.sans, fontSize: 14, fontWeight: 700 }}>내 콘텐츠로</button>
      </div>
    </div>);

}

Object.assign(window, { NCHeader, InputLanguageBar, Stepper, SideRail, FooterBar, SubmitModal, SubmittedToast, missingSubmitRequiredItems });
