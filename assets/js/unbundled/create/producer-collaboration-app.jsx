const PLAN_STEPS = [
  { k: 1, label: '기획안 정보', hint: '기본 정보 · 텍스트', sec: 'sec-plan-basic' },
  { k: 2, label: '미디어', hint: '포스터 · 레퍼런스', sec: 'sec-plan-media' },
  { k: 3, label: '검토 요청', hint: '요약 · 제출 확인', sec: 'sec-plan-review' },
];

const PLAN_INITIAL_FORM = {
  title: '',
  genre: [],
  synopsis: '',
  status: '기획중',
  episodeCount: null,
  runtime: '',
  casting: '',
  mainPoster: [],
  referenceImages: [],
  referenceVideos: [],
  reviewNote: '',
};

const PLAN_STATUS_OPTIONS = [
  { v: '기획중', label: '기획중' },
  { v: '캐스팅중', label: '캐스팅중' },
  { v: '파일럿 촬영완료', label: '파일럿 촬영완료' },
];

function planArr(value) {
  return Array.isArray(value) ? value : value ? [value] : [];
}

function planNowHHMM() {
  const d = new Date();
  return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
}

function PlanDotLabel({ children }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 9 }}>
      <span style={{ width: 6, height: 6, borderRadius: 999, background: ACCENT, flexShrink: 0 }} />
      <span>{children}</span>
    </span>
  );
}

const PLAN_BASIC_FIELDS = [
  { key: 'title', label: '제목', kind: 'text', cols: 12, required: true, ph: '작품 제목을 입력하세요' },
  { key: 'episodeCount', label: '예정 부작수', kind: 'num', cols: 6, required: true, suffix: '부작', ph: '예: 12' },
  { key: 'runtime', label: '편당 러닝타임', kind: 'text', cols: 6, required: true, divider: true, ph: '예: 8분' },
  { key: 'synopsis', label: '시놉시스', kind: 'area', cols: 12, required: true, rows: 5, ph: '작품의 핵심 설정과 전개를 입력하세요.' },
  { key: 'casting', label: '캐스팅 정보', kind: 'area', cols: 12, required: false, rows: 4, ph: '확정 또는 희망 캐스팅, 주요 캐릭터 정보를 입력하세요.' },
  { key: 'genre', label: '장르', kind: 'chips', cols: 12, required: true, hint: '복수 선택' },
  { key: 'status', label: '진행상황', kind: 'select', cols: 12, required: true },
];

function renderPlanBasicControl(f, form, set, t) {
  const value = form[f.key];
  const onChange = (v) => set(f.key, v);
  if (f.kind === 'select') {
    return <SelectMenu options={PLAN_STATUS_OPTIONS} value={value} onChange={onChange} t={t} placeholder="선택" />;
  }
  if (f.kind === 'chips') {
    return <ChipMulti options={GENRES} value={value || []} onChange={onChange} t={t} />;
  }
  if (f.kind === 'num') {
    return <NumberInput value={value} onChange={onChange} suffix={f.suffix} placeholder={f.ph} t={t} />;
  }
  if (f.kind === 'area') {
    return <TextArea value={value} onChange={onChange} placeholder={f.ph} rows={f.rows} t={t} />;
  }
  return <TextInput value={value} onChange={onChange} placeholder={f.ph} t={t} />;
}

function PlanBasicSection({ form, set, t }) {
  return (
    <SectionCard id="sec-plan-basic" title="기획안 정보" desc={null} t={t}>
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
          <div style={{ flex: 1 }}>
            <GroupHead title="기획안 정보" t={t} flush />
          </div>
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(12, minmax(0, 1fr))',
            gap: 0,
            borderLeft: `0.5px solid ${t.line}`,
            borderRight: `0.5px solid ${t.line}`,
            borderBottom: `0.5px solid ${t.line}`,
          }}
        >
          {PLAN_BASIC_FIELDS.map((f, fi) => {
            const cols = fieldCols(f);
            const position = fieldGridPosition(PLAN_BASIC_FIELDS, fi);
            const inset = f.divider || (cols < 12 && !position.startsRow);
            const needsRowFiller = position.endsRow && position.remainder > 0;
            const roomy = f.kind === 'area' || f.kind === 'chips';
            return (
              <React.Fragment key={f.key}>
                <RowField
                  label={f.label}
                  hint={f.hint}
                  required={f.required}
                  cols={cols}
                  inset={inset}
                  strongDivider={!!f.divider}
                  roomy={roomy}
                  t={t}
                >
                  {renderPlanBasicControl(f, form, set, t)}
                </RowField>
                {needsRowFiller && (
                  <div aria-hidden="true" style={{ gridColumn: `span ${position.remainder}`, borderTop: `0.5px solid ${t.line}` }} />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </SectionCard>
  );
}

function PlanMediaSection({ form, set, t }) {
  return (
    <SectionCard id="sec-plan-media" title="미디어" desc={null} t={t}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
        <Field label={<PlanDotLabel>메인 포스터</PlanDotLabel>} required hint="세로 포스터 1장" gap={12} t={t}>
          <MediaUpload
            variant="dropzone"
            kind="image"
            multiple={false}
            max={1}
            value={form.mainPoster}
            onChange={(v) => set('mainPoster', v)}
            placeholder="메인 포스터 업로드"
            t={t}
          />
        </Field>

        <Field label={<PlanDotLabel>레퍼런스 이미지</PlanDotLabel>} hint="무드보드, 스틸컷, 키아트 등 · 최대 10장" gap={12} t={t}>
          <MediaUpload
            variant="dropzone"
            kind="image"
            multiple
            max={10}
            value={form.referenceImages}
            onChange={(v) => set('referenceImages', v)}
            placeholder="레퍼런스 이미지 업로드"
            t={t}
          />
        </Field>

        <Field label={<PlanDotLabel>레퍼런스 영상</PlanDotLabel>} hint="샘플 영상, 티저 등 · 최대 5개" gap={12} t={t}>
          <MediaUpload
            variant="dropzone"
            kind="video"
            multiple
            max={5}
            value={form.referenceVideos}
            onChange={(v) => set('referenceVideos', v)}
            placeholder="레퍼런스 영상 업로드"
            t={t}
          />
        </Field>
      </div>
    </SectionCard>
  );
}

function PlanReviewRow({ label, value, ok = true, required = false, t }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '160px minmax(0, 1fr)', minHeight: 38, borderTop: `0.5px solid ${t.line}` }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '0 10px', background: '#F7F7F4', borderRight: `0.5px solid ${t.line}`, fontFamily: t.sans, fontSize: 12.5, fontWeight: 700, color: '#5F646D' }}>
        <span>{label}</span>
        {required && <span style={{ fontSize: 12, fontWeight: 700, color: ACCENT, flexShrink: 0 }}>*</span>}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '0 10px', fontFamily: t.sans, fontSize: 13.5, fontWeight: ok ? 500 : 400, color: ok ? t.ink : t.inkFaint, minWidth: 0 }}>
        <span style={{
          width: 16, height: 16, borderRadius: 999, flexShrink: 0,
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          background: ok ? ACCENT : 'transparent',
          border: `1px solid ${ok ? ACCENT : t.lineStrong}`,
          color: '#FFFFFF'
        }}>
          {ok && (
            <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M2.5 6.2 5 8.5 9.5 3.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </span>
        <span style={{ minWidth: 0, overflowWrap: 'anywhere' }}>{value || '미입력'}</span>
      </div>
    </div>
  );
}

function PlanReviewGroup({ title, children, t }) {
  return (
    <div>
      <GroupHead title={title} t={t} />
      <div style={{ borderLeft: `0.5px solid ${t.line}`, borderRight: `0.5px solid ${t.line}`, borderBottom: `0.5px solid ${t.line}` }}>
        {children}
      </div>
    </div>
  );
}

function PlanReviewSection({ form, set, t }) {
  const mainPoster = planArr(form.mainPoster);
  const referenceImages = planArr(form.referenceImages);
  const referenceVideos = planArr(form.referenceVideos);
  const genreText = planArr(form.genre).map(genreLabel).join(', ');
  return (
    <SectionCard id="sec-plan-review" title="검토 요청" desc={null} t={t}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
        <div style={{ padding: '13px 16px', border: `0.5px solid ${t.line}`, borderRadius: 10, background: '#F4F4F1', display: 'flex', alignItems: 'center', gap: 9 }}>
          <span aria-hidden="true" style={{ width: 18, height: 18, borderRadius: 999, border: `1px solid ${t.inkMute}`, color: t.inkMute, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontFamily: t.sans, fontSize: 11, fontWeight: 700 }}>!</span>
          <div style={{ fontFamily: t.sans, fontSize: 13, fontWeight: 500, color: '#555A63', lineHeight: 1.5 }}>
            검토 요청을 전송하기 전에 입력한 내용을 마지막으로 확인해주세요.
          </div>
        </div>

        <PlanReviewGroup title="기획안 정보" t={t}>
          <PlanReviewRow label="제목" value={form.title} ok={!!form.title} required t={t} />
          <PlanReviewRow label="예정 부작수" value={form.episodeCount ? `${form.episodeCount}부작` : ''} ok={!!form.episodeCount} required t={t} />
          <PlanReviewRow label="편당 러닝타임" value={form.runtime} ok={!!form.runtime} required t={t} />
          <PlanReviewRow label="시놉시스" value={form.synopsis} ok={!!form.synopsis} required t={t} />
          <PlanReviewRow label="캐스팅 정보" value={form.casting} ok={!!form.casting} t={t} />
          <PlanReviewRow label="장르" value={genreText} ok={!!genreText} required t={t} />
          <PlanReviewRow label="진행상황" value={form.status} ok={!!form.status} required t={t} />
        </PlanReviewGroup>

        <PlanReviewGroup title="미디어" t={t}>
          <PlanReviewRow label="메인 포스터" value={mainPoster.length ? `${mainPoster.length}장` : ''} ok={mainPoster.length > 0} required t={t} />
          <PlanReviewRow label="레퍼런스 이미지" value={referenceImages.length ? `${referenceImages.length}장` : ''} ok={referenceImages.length > 0} t={t} />
          <PlanReviewRow label="레퍼런스 영상" value={referenceVideos.length ? `${referenceVideos.length}개` : ''} ok={referenceVideos.length > 0} t={t} />
        </PlanReviewGroup>

        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, marginBottom: 12 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 9, minWidth: 0 }}>
              <span style={{ width: 6, height: 6, borderRadius: 999, background: ACCENT, flexShrink: 0 }} />
              <span style={{ fontFamily: t.sans, fontSize: 12.5, fontWeight: 700, letterSpacing: 0.4, color: t.inkMute, whiteSpace: 'nowrap' }}>관리자 전달 메모</span>
            </div>
            <span style={{ fontFamily: t.sans, fontSize: 11.5, color: t.inkFaint, whiteSpace: 'nowrap' }}>선택</span>
          </div>
          <textarea
            value={form.reviewNote || ''}
            onChange={(event) => set('reviewNote', event.target.value)}
            placeholder="검토 시 참고할 내용이 있으면 입력해주세요."
            rows={4}
            style={{
              width: '100%',
              minHeight: 110,
              padding: 14,
              borderRadius: 10,
              border: `0.5px solid ${t.line}`,
              background: t.surface,
              color: t.ink,
              fontFamily: t.sans,
              fontSize: 13.5,
              lineHeight: 1.6,
              resize: 'vertical',
              outline: 'none'
            }}
          />
        </div>
      </div>
    </SectionCard>
  );
}

function missingPlanRequiredItems(form) {
  const missing = [];
  if (!form.title) missing.push('제목');
  if (!planArr(form.genre).length) missing.push('장르');
  if (!form.synopsis) missing.push('시놉시스');
  if (!form.status) missing.push('진행상황');
  if (!form.episodeCount) missing.push('예정 부작수');
  if (!form.runtime) missing.push('편당 러닝타임');
  if (planArr(form.mainPoster).length === 0) missing.push('메인 포스터');
  return missing;
}

function PlanSubmittedToast({ onClose, t }) {
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 2000, background: 'rgba(15,17,21,0.42)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <div style={{ width: 330, height: 270, maxWidth: '100%', background: t.surface, borderRadius: 18, boxShadow: 'none', padding: '28px 26px 22px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ width: 60, height: 60, borderRadius: 999, background: '#FFF3EC', border: `2px solid ${ACCENT}`, color: ACCENT, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: 14 }}>
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h2 style={{ margin: 0, fontFamily: t.sans, fontSize: 18, fontWeight: 700, color: t.ink }}>검토 요청을 보냈어요</h2>
        <p style={{ margin: '8px 0 0', fontFamily: t.sans, fontSize: 13, color: t.inkMute, lineHeight: 1.6 }}>
          플랫폼사 검토가 시작됩니다.<br />진행 상황은 워크플로우에서 확인할 수 있어요.
        </p>
        <button onClick={onClose} style={{ marginTop: 22, width: '100%', height: 42, borderRadius: 10, cursor: 'pointer', border: `1px solid ${t.line}`, background: t.surface, color: t.ink, fontFamily: t.sans, fontSize: 14, fontWeight: 600 }}>제작협업 기획안으로</button>
      </div>
    </div>
  );
}

function ProducerPlanApp() {
  const t = BASE_TOKENS;
  const [form, setForm] = React.useState(PLAN_INITIAL_FORM);
  const [current, setCurrent] = React.useState(1);
  const [savedAt, setSavedAt] = React.useState(null);
  const [doneOpen, setDoneOpen] = React.useState(false);
  const total = PLAN_STEPS.length;
  const currentStep = PLAN_STEPS[current - 1];

  const set = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));
  const goTo = (step) => {
    setCurrent(step);
    document.querySelector('[data-nc-scroll]')?.scrollTo({ top: 0 });
  };

  const renderStep = () => {
    if (current === 1) return <PlanBasicSection form={form} set={set} t={t} />;
    if (current === 2) return <PlanMediaSection form={form} set={set} t={t} />;
    return <PlanReviewSection form={form} set={set} t={t} />;
  };

  return (
    <div style={{ width: '100vw', height: '100vh', overflow: 'hidden', display: 'flex', flexDirection: 'column', background: t.bg }}>
      <DashTopNav t={t} active="콘텐츠" notifications={2} />

      <div data-nc-scroll style={{ flex: 1, overflow: 'auto' }}>
        <div style={{ width: 'min(960px, calc(100vw - 80px))', margin: '0 auto', padding: '32px 0 48px', position: 'relative' }}>
          <div style={{ marginBottom: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <h1 style={{ margin: 0, fontFamily: t.sans, fontSize: 27, fontWeight: 700, letterSpacing: -0.7, color: t.ink }}>새 제작협업 기획안</h1>
              <span style={{ fontFamily: t.mono, fontSize: 12.5, color: t.inkFaint }}>단계 {current} / {total} · {currentStep.label}</span>
              {savedAt && <span style={{ fontFamily: t.mono, fontSize: 11.5, color: t.inkFaint, display: 'inline-flex', alignItems: 'center', gap: 5 }}><span style={{ width: 6, height: 6, borderRadius: 999, background: t.paid }} />임시저장됨 {savedAt}</span>}
            </div>
          </div>

          <Stepper steps={PLAN_STEPS} current={current} maxReached={total} onJump={goTo} t={t} />
          {renderStep()}
        </div>
      </div>

      <FooterBar
        wizard
        current={current}
        total={total}
        maxW={960}
        onPrev={() => goTo(Math.max(1, current - 1))}
        onNext={() => goTo(Math.min(total, current + 1))}
        onSave={() => setSavedAt(planNowHHMM())}
        onSubmit={() => setDoneOpen(true)}
        missingCount={missingPlanRequiredItems(form).length}
        t={t}
      />

      {doneOpen && <PlanSubmittedToast t={t} onClose={() => window.location.href = 'producer-collaboration.html'} />}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<ProducerPlanApp />);
