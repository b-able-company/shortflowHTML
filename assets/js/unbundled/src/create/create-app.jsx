// 새 콘텐츠 등록 — 단계형 웹페이지 (4단계 + 검토 요청)
// API 단계와 정렬: 1 기본정보+2 다국어 → POST /contents · 3 미디어 → PUT media · 4 메타 → PUT meta · 검토 → PATCH submit
// 섹션은 nc-web-sections.jsx 재사용. 의존: dashboard-shell · nc-shell · tweaks-panel

const STEP_DEFS = [
  { k: 1, label: '콘텐츠 정보', hint: '기본 정보 · 텍스트 · 크루', sec: 'sec-basic' },
  { k: 2, label: '미디어', hint: '이미지 · 영상 · 자막', sec: 'sec-media' },
  { k: 3, label: '검토 요청', hint: '요약 · 제출 확인', sec: 'sec-review' },
];

// 좌측 단계 레일
function StepRail({ steps, current, maxReached, onJump, t }) {
  return (
    <nav style={{ position: 'sticky', top: 0, display: 'flex', flexDirection: 'column', gap: 4 }}>
      {steps.map((s) => {
        const done = s.k < current;
        const active = s.k === current;
        const reachable = s.k <= maxReached;
        return (
          <button key={s.k} onClick={() => reachable && onJump(s.k)} style={{
            display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px', borderRadius: 11, textAlign: 'left',
            cursor: reachable ? 'pointer' : 'default', width: '100%',
            background: active ? ACCENT_SOFT : 'transparent', border: `0.5px solid ${active ? '#F2C3AE' : 'transparent'}`,
          }}>
            <span style={{
              width: 26, height: 26, borderRadius: 999, flexShrink: 0, display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: t.mono, fontSize: 12, fontWeight: 700,
              background: active ? ACCENT : done ? t.surface : t.surfaceAlt,
              color: active ? '#FFF7EE' : done ? ACCENT : t.inkFaint, border: active ? 'none' : `0.5px solid ${t.line}`,
            }}>
              {done ? <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={ACCENT} strokeWidth="3"><path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" /></svg> : s.k}
            </span>
            <span>
              <div style={{ fontFamily: t.sans, fontSize: 13.5, fontWeight: active ? 700 : 600, color: active ? t.ink : t.inkMute, letterSpacing: -0.2 }}>{s.label}</div>
              <div style={{ fontFamily: t.sans, fontSize: 11, color: t.inkFaint, marginTop: 2 }}>{s.hint}</div>
            </span>
          </button>
        );
      })}
    </nav>
  );
}

const STEP_TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "stepNav": "top"
}/*EDITMODE-END*/;

function getSiteLanguage() {
  const locale = (document.documentElement.lang || navigator.language || 'ko').toLowerCase();
  if (locale.startsWith('en')) return 'EN';
  if (locale.startsWith('zh')) return 'ZH';
  return 'KO';
}

function AIIntroModal({ onLater, onTry, t }) {
  const [tryHover, setTryHover] = React.useState(false);

  return (
    <div onClick={onLater} style={{ position: 'fixed', inset: 0, zIndex: 2100, background: 'rgba(15,17,21,0.42)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <div onClick={(e) => e.stopPropagation()} style={{ position: 'relative', width: 380, height: 350, maxWidth: 'calc(100vw - 48px)', maxHeight: 'calc(100vh - 48px)', boxSizing: 'border-box', background: t.surface, borderRadius: 22, boxShadow: 'none', overflow: 'hidden', display: 'flex', flexDirection: 'column', alignItems: 'stretch', textAlign: 'center' }}>
        <button aria-label="닫기" onClick={onLater} style={{ position: 'absolute', top: 12, right: 12, zIndex: 2, width: 34, height: 34, borderRadius: 999, border: 'none', background: 'rgba(255,255,255,0.82)', color: t.inkMute, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontFamily: t.sans, fontSize: 22, lineHeight: 1 }}>×</button>
        <img src="images/기획서팝업.png" alt="" style={{ width: '100%', height: 166, objectFit: 'cover', display: 'block', flexShrink: 0 }} />
        <div style={{ flex: 1, padding: '22px 28px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          <h2 style={{ margin: 0, fontFamily: t.sans, fontSize: 18, fontWeight: 500, color: t.ink, letterSpacing: -0.45, textAlign: 'center' }}>AI 기획서 자동 추출</h2>
          <p style={{ margin: '9px 0 0', maxWidth: 300, fontFamily: t.sans, fontSize: 13.5, color: t.inkMute, lineHeight: 1.65, textAlign: 'center' }}>
            기획안을 업로드하면 제목, 시놉시스, 장르 등 주요 정보가 자동으로 입력됩니다.
          </p>
          <div style={{ display: 'flex', width: '100%', marginTop: 'auto' }}>
            <button
              onClick={onTry}
              onMouseEnter={() => setTryHover(true)}
              onMouseLeave={() => setTryHover(false)}
              style={{ width: '100%', height: 40, borderRadius: 10, cursor: 'pointer', border: tryHover ? 'none' : `0.5px solid ${t.lineStrong}`, background: tryHover ? ACCENT : t.surface, color: tryHover ? '#FFF7EE' : t.ink, fontFamily: t.sans, fontSize: 14, fontWeight: 600, transition: 'background 160ms ease, color 160ms ease, border-color 160ms ease' }}
            >
              사용해보기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function AIPlanUploadModal({ onClose, t }) {
  return (
    <div onClick={onClose} style={{ position: 'fixed', inset: 0, zIndex: 2100, background: 'rgba(15,17,21,0.42)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <div onClick={(e) => e.stopPropagation()} style={{ width: 380, height: 308, maxWidth: 'calc(100vw - 48px)', maxHeight: 'calc(100vh - 48px)', boxSizing: 'border-box', background: t.surface, borderRadius: 22, boxShadow: 'none', padding: '22px 24px', display: 'flex', flexDirection: 'column' }}>
        <h2 style={{ margin: 0, fontFamily: t.sans, fontSize: 17, fontWeight: 500, color: t.ink, letterSpacing: -0.4, display: 'flex', alignItems: 'center', gap: 6 }}>AI 기획서 자동 추출<span style={{ fontSize: 9, fontWeight: 700, letterSpacing: 0.4, color: ACCENT, lineHeight: 1.4 }}>BETA</span></h2>
        <p style={{ margin: '3px 0 14px', fontFamily: t.sans, fontSize: 13, color: t.inkMute, lineHeight: 1.6 }}>
          기획안 PDF를 업로드 해주세요.
        </p>
        <label style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 148, borderRadius: 14, border: `1px dashed ${t.lineStrong}`, background: t.surfaceAlt, cursor: 'pointer', padding: 14, textAlign: 'center', marginTop: 0 }}>
          <input type="file" accept=".pdf,application/pdf" style={{ display: 'none' }} />
          <span style={{ width: 38, height: 38, borderRadius: 999, background: t.surface, border: `0.5px solid ${t.line}`, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: ACCENT, marginBottom: 10 }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9"><path d="M12 16V4M7 9l5-5 5 5M5 20h14" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </span>
          <span style={{ fontFamily: t.sans, fontSize: 13.5, fontWeight: 450, color: t.inkMute }}>기획안 PDF 파일 선택</span>
          <span style={{ marginTop: 5, fontFamily: t.sans, fontSize: 11.5, color: t.inkFaint }}>PDF 형식만 가능 • 100페이지 이하 • 최대 100MB</span>
        </label>
        <div style={{ display: 'flex', gap: 10, marginTop: 14 }}>
          <button onClick={onClose} style={{ flex: '1 1 0', height: 40, borderRadius: 10, cursor: 'pointer', border: `0.5px solid ${t.lineStrong}`, background: t.surface, color: t.ink, fontFamily: t.sans, fontSize: 14, fontWeight: 650 }}>취소</button>
          <button onClick={onClose} style={{ flex: '1 1 0', height: 40, borderRadius: 10, cursor: 'pointer', border: 'none', background: ACCENT, color: '#FFF7EE', fontFamily: t.sans, fontSize: 14, fontWeight: 800 }}>추출하기</button>
        </div>
      </div>
    </div>
  );
}

function WebStepApp() {
  const t = BASE_TOKENS;
  const [tw, setTweak] = useTweaks(STEP_TWEAK_DEFAULTS);
  const [baseLanguage] = React.useState(getSiteLanguage);
  const [form, setForm] = React.useState(() => ({ ...INITIAL_FORM, mediaLanguage: getSiteLanguage() }));
  const selectedLangs = [baseLanguage];
  const [current, setCurrent] = React.useState(1);
  const [savedAt, setSavedAt] = React.useState(null);
  const [devBypass, setDevBypass] = React.useState(false);
  const [doneOpen, setDoneOpen] = React.useState(false);
  const [rightsConfirmed, setRightsConfirmed] = React.useState(false);
  const [aiIntroOpen, setAiIntroOpen] = React.useState(true);
  const [aiUploadOpen, setAiUploadOpen] = React.useState(false);

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));
  const setLangItem = (listKey, language, k, v) => setForm((f) => ({
    ...f, [listKey]: f[listKey].map((x) => (x.language === language ? { ...x, [k]: v } : x)),
  }));

  const total = STEP_DEFS.length;
  const props = {
    form,
    set,
    setLangItem,
    langList: selectedLangs,
    baseLanguage,
    rightsConfirmed,
    onRightsChange: setRightsConfirmed,
    onAiUpload: () => setAiUploadOpen(true),
    t,
  };
  const goTo = (k) => { setCurrent(k); document.querySelector('[data-nc-scroll]')?.scrollTo({ top: 0 }); };
  const onSave = () => setSavedAt(nowHHMM());

  const renderStep = () => {
    if (current === 1) return <WebBasicSection {...props} />;
    if (current === 2) return <WebMediaSection {...props} />;
    return <WebReviewSection {...props} />;
  };

  const side = tw.stepNav === 'side';
  const cur = STEP_DEFS[current - 1];

  return (
    <div style={{ width: '100vw', height: '100vh', overflow: 'hidden', display: 'flex', flexDirection: 'column', background: t.bg }}>
      <DashTopNav t={t} active="콘텐츠" notifications={2} />

      <div data-nc-scroll style={{ flex: 1, overflow: 'auto' }}>
        <div style={{ width: 'min(960px, calc(100vw - 80px))', margin: '0 auto', padding: '32px 0 48px', position: 'relative' }}>
          {/* 헤더 */}
          <div style={{ marginBottom: 22 }}>
            <button onClick={() => window.history.back()} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontFamily: t.sans, fontSize: 12.5, fontWeight: 600, color: t.inkMute, marginBottom: 10, border: 'none', background: 'transparent', cursor: 'pointer', padding: 0 }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" /></svg>
              콘텐츠 목록
            </button>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <h1 style={{ margin: 0, fontFamily: t.sans, fontSize: 27, fontWeight: 700, letterSpacing: -0.7, color: t.ink }}>새 콘텐츠 등록</h1>
              <span style={{ fontFamily: t.mono, fontSize: 12.5, color: t.inkFaint }}>단계 {current} / {total} · {cur.label}</span>
              {savedAt && <span style={{ fontFamily: t.mono, fontSize: 11.5, color: t.inkFaint, display: 'inline-flex', alignItems: 'center', gap: 5 }}><span style={{ width: 6, height: 6, borderRadius: 999, background: t.paid }} />임시저장됨 {savedAt}</span>}
            </div>
          </div>

          {!side && <Stepper steps={STEP_DEFS} current={current} maxReached={total} onJump={goTo} t={t} />}

          {side ? (
            <div style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', left: -252, top: 0, width: 220 }}><StepRail steps={STEP_DEFS} current={current} maxReached={total} onJump={goTo} t={t} /></div>
              <div>{renderStep()}</div>
            </div>
          ) : (
            renderStep()
          )}
        </div>
      </div>

      <FooterBar
        wizard current={current} total={total} maxW={960}
        onPrev={() => goTo(Math.max(1, current - 1))}
        onNext={() => goTo(Math.min(total, current + 1))}
        onSave={onSave}
        onSubmit={() => setDoneOpen(true)}
        missingCount={(devBypass ? 0 : window.missingSubmitRequiredItems(form, baseLanguage).length) + (current === total && !rightsConfirmed ? 1 : 0)}
        onDevBypass={() => setDevBypass(v => !v)}
        t={t} />

      {doneOpen && <SubmittedToast t={t} onClose={() => setDoneOpen(false)} />}
      {aiIntroOpen && <AIIntroModal t={t} onLater={() => setAiIntroOpen(false)} onTry={() => { setAiIntroOpen(false); setAiUploadOpen(true); }} />}
      {aiUploadOpen && <AIPlanUploadModal t={t} onClose={() => setAiUploadOpen(false)} />}

      <TweaksPanel title="Tweaks">
        <TweakSection label="단계 내비" />
        <TweakRadio label="형태" value={tw.stepNav}
          options={[{ value: 'top', label: '상단 스텝퍼' }, { value: 'side', label: '좌측 레일' }]}
          onChange={(v) => setTweak('stepNav', v)} />
      </TweaksPanel>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<WebStepApp />);
