// 새 콘텐츠 등록 — 공용 폼 섹션/헬퍼 (렌더 없음)
// nc-web.jsx (단일 페이지) 와 nc-web-explore.jsx (시안 캔버스) 가 함께 사용.
// 의존: nc-fields(Field·TextInput…·ACCENT) · nc-data(ENUMS·GENRES…) · nc-translations(MultiLangEditor·*_FIELDS)

function webContentGroups(form) {
  const license = [
    { key: 'coProduction', label: '유통권 보유 형태', kind: 'seg', enumKey: 'coProduction', cols: 12 },
    { key: 'licenseType', label: '라이선스 유형', kind: 'seg', enumKey: 'licenseType', cols: 6 },
    { key: 'licenseTerritory', label: '라이선스 가능 지역', kind: 'seg', enumKey: 'licenseTerritory', cols: 6 },
    { key: 'distributionHistory', label: '유통 이력', kind: 'choice', enumKey: 'distributionHistory', cols: 12, hint: '기존 공개 여부' },
  ];
  if (form.distributionHistory === 'NEW') {
    license.push({ key: 'desiredReleaseDate', label: '희망 릴리즈 일정', kind: 'text', cols: 12, ph: '예: 2026년 7월, 3분기, 협의 가능', hint: '공개 희망 시점' });
  }
  if (form.distributionHistory === 'RELEASED') {
    license.push({ key: 'exclusive', label: '독점 여부', kind: 'toggle', cols: 12 });
    license.push({ key: 'previousReleases', label: '기존 유통 플랫폼', kind: 'text', cols: 12, ph: '예: YouTube, TikTok', hint: '공개됐던 플랫폼' });
  }
  return [
    { title: '작품 기본 정보', fields: [
      { key: 'originalTitle', label: '제목', kind: 'text', cols: 12, required: true, ph: '작품 원제', hint: '작품이 처음 제작된 언어의 제목이에요. 변하지 않는 고유 식별용 제목입니다.' },
      { key: 'title', label: '기타제목', kind: 'text', source: 'translation', cols: 12, required: true, ph: '언어별 제목', hint: '지금 보고 계신 언어로 서비스될 때 노출되는 제목이에요.' },
      { key: 'logline', label: '로그라인', kind: 'text', source: 'translation', cols: 12, ph: '한 줄 소개' },
      { key: 'synopsis', label: '시놉시스', kind: 'area', source: 'translation', rows: 4, cols: 12, ph: '줄거리' },
      { key: 'characterDescription', label: '인물 소개', kind: 'area', source: 'translation', rows: 3, cols: 12, ph: '주요 인물 설명' },
      { key: 'director', label: '감독', kind: 'text', source: 'crew', cols: 6, required: false },
      { key: 'writer', label: '작가', kind: 'text', source: 'crew', cols: 6, divider: true, required: false },
      { key: 'cast', label: '출연진', kind: 'text', source: 'crew', cols: 12, ph: '주연 · 조연', required: false },
      { key: 'episodes', label: '총 회차 수', kind: 'num', suffix: '화', cols: 4 },
      { key: 'runtime', label: '회차당 러닝타임', kind: 'text', ph: '예: 1~3분, 90초', cols: 4, divider: true },
      { key: 'totalRuntime', label: '총 러닝타임 (분)', kind: 'num', cols: 4 },
      { key: 'genreCodes', label: '장르', kind: 'chips', cols: 12, hint: '복수 선택' },
    ]},
    { title: '제작 정보', fields: [
      { key: 'productionStatus', label: '제작 상태', kind: 'seg', enumKey: 'productionStatus', cols: 12 },
      { key: 'mediaCategory', label: '미디어 카테고리', kind: 'seg', enumKey: 'mediaCategory', cols: 6 },
      { key: 'productionYear', label: '제작연도', kind: 'num', suffix: '년', cols: 6 },
      { key: 'isAiGenerated', label: 'AI 생성 콘텐츠 여부', kind: 'checkbox', cols: 6, required: false, hint: '생성형 AI로 영상 또는 주요 이미지를 제작한 경우 체크해주세요.' },
      { key: 'contentLanguage', label: '콘텐츠 언어', kind: 'seg', enumKey: 'contentLanguage', hint: '원본 언어', cols: 6, divider: true },
    ]},
    { title: '라이선스 · 유통', fields: license },
    { title: '공개 · 등급', fields: [
      { key: 'startPoint', label: '유료 시청 시작 회차', kind: 'num', suffix: '화부터', hint: '이 회차부터 유료', cols: 6 },
      { key: 'contentType', label: '콘텐츠 유형', kind: 'seg', enumKey: 'contentType', cols: 6 },
      { key: 'ageRating', label: '영상 등급', kind: 'seg', enumKey: 'ageRating', cols: 12, required: false },
    ]},
  ];
}

function WebControl({ f, form, set, setLangItem, activeLanguage, translation, crew, t }) {
  const source = f.source || 'form';
  const data = source === 'translation' ? translation : source === 'crew' ? crew : form;
  const v = data[f.key];
  const change = (x) => {
    if (source === 'translation') return setLangItem('translations', activeLanguage, f.key, x);
    if (source === 'crew') return setLangItem('crew', activeLanguage, f.key, x);
    return set(f.key, x);
  };
  switch (f.kind) {
    case 'text': return <TextInput value={v} onChange={change} placeholder={f.ph} t={t} />;
    case 'area': return <TextArea value={v} onChange={change} placeholder={f.ph} rows={f.rows || 3} t={t} />;
    case 'num': return <NumberInput value={v} onChange={change} suffix={f.suffix} t={t} />;
    case 'seg': return <SelectMenu options={ENUMS[f.enumKey]} value={v} onChange={change} t={t} placeholder="선택" />;
    case 'status': return (
      <div style={{ minHeight: 36, display: 'flex', alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: 4, background: t.surface, border: `0.5px solid ${t.line}`, borderRadius: 9, padding: 3 }}>
          {ENUMS.productionStatus.map((option) => {
            const selected = v === option.v;
            return (
              <button key={option.v} onClick={() => change(option.v)} style={{
                border: 'none', cursor: 'pointer', borderRadius: 6, padding: '7px 14px',
                background: selected ? '#25272B' : 'transparent', color: selected ? '#FFFFFF' : t.inkMute,
                fontFamily: t.sans, fontSize: 13, fontWeight: selected ? 700 : 500, whiteSpace: 'nowrap',
              }}>
                {option.label}
              </button>
            );
          })}
        </div>
      </div>
    );
    case 'choice': return <InlineRadioChoice options={ENUMS[f.enumKey]} value={v} onChange={change} t={t} />;
    case 'checkbox': return (
      <label style={{ minHeight: 36, display: 'inline-flex', alignItems: 'center', gap: 9, cursor: 'pointer', fontFamily: t.sans, fontSize: 13, color: t.ink }}>
        <input
          type="checkbox"
          checked={Boolean(v)}
          onChange={(event) => change(event.target.checked)}
          style={{ width: 16, height: 16, margin: 0, accentColor: ACCENT, cursor: 'pointer' }}
        />
      </label>
    );
    case 'chips': return <ChipMulti options={GENRES} value={v} onChange={change} t={t} />;
    case 'date': return <DateInput value={v} onChange={change} t={t} />;
    case 'toggle': return <SelectMenu options={[{ v: true, label: '독점' }, { v: false, label: '비독점' }]} value={v} onChange={change} t={t} placeholder="선택" />;
    case 'tags': return <TagInput value={v || []} onChange={change} suggestions={PLATFORM_SUGGEST} placeholder="플랫폼 입력 후 Enter" t={t} />;
    default: return null;
  }
}

function GroupHead({ title, t, flush }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: flush ? 0 : 12 }}>
      <span style={{ width: 6, height: 6, borderRadius: 999, background: ACCENT, flexShrink: 0 }} />
      <span style={{ fontFamily: t.sans, fontSize: 12.5, fontWeight: 700, letterSpacing: 0.4, color: t.inkMute, whiteSpace: 'nowrap' }}>{title}</span>
    </div>
  );
}

function SubHead({ title, desc, t }) {
  return (
    <div style={{ margin: '34px 0 20px', paddingTop: 26, borderTop: `0.5px solid ${t.line}` }}>
      <div style={{ fontFamily: t.sans, fontSize: 15, fontWeight: 700, color: t.ink, letterSpacing: -0.2 }}>{title}</div>
      {desc && <div style={{ fontFamily: t.sans, fontSize: 12.5, color: t.inkMute, marginTop: 4 }}>{desc}</div>}
    </div>
  );
}

// 컨트롤을 제 너비만큼만 — 숫자 좁게, 텍스트 적당히, 세그먼트·칩·태그는 풀폭
function ControlCap({ kind, children }) {
  const cap = { date: 200 }[kind];
  return cap ? <div style={{ maxWidth: cap }}>{children}</div> : children;
}

// 한 행 최대 두 필드. 각 필드는 라벨 왼쪽, 입력 오른쪽으로 읽힌다.
function RowField({ label, hint, required, cols = 6, inset = false, strongDivider = false, roomy = false, t, children }) {
  const [hintOpen, setHintOpen] = React.useState(false);
  return (
    <div style={{
      gridColumn: `span ${cols}`, minWidth: 0,
      display: 'grid', gridTemplateColumns: '150px minmax(0, 1fr)',
      gap: 0, alignItems: 'stretch', padding: 0,
      borderTop: `0.5px solid ${t.line}`,
      borderLeft: inset ? `${strongDivider ? 1 : 0.5}px solid ${t.line}` : 'none',
    }}>
      <div onMouseEnter={() => hint && setHintOpen(true)} onMouseLeave={() => setHintOpen(false)} style={{ position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', gap: 2, minWidth: 0, alignSelf: 'stretch', minHeight: roomy ? 88 : 36, background: '#F7F7F4', borderRadius: 0, padding: '0 10px', borderRight: `0.5px solid ${t.line}`, cursor: 'default' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 5, minWidth: 0 }}>
          <span style={{ fontFamily: t.sans, fontSize: 12.5, fontWeight: 700, color: '#5F646D', letterSpacing: -0.1, whiteSpace: 'nowrap' }}>{label}</span>
          {required && <span style={{ color: ACCENT, fontSize: 12, fontWeight: 700 }}>*</span>}
          {hint && <span aria-label={hint} style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 14, height: 14, borderRadius: 999, border: `0.5px solid ${t.lineStrong}`, color: '#9A9DA3', fontFamily: t.sans, fontSize: 10, fontWeight: 700, lineHeight: 1 }}>?</span>}
        </div>
        {hint && hintOpen && (
          <div style={{ position: 'absolute', left: 10, top: 'calc(100% + 6px)', zIndex: 100, width: 'max-content', maxWidth: 220, padding: '8px 10px', borderRadius: 7, background: '#2B2D31', color: '#FFFFFF', boxShadow: '0 10px 26px rgba(0,0,0,0.18)', fontFamily: t.sans, fontSize: 11.5, fontWeight: 600, lineHeight: 1.45, whiteSpace: 'normal', pointerEvents: 'none' }}>
            {hint}
          </div>
        )}
      </div>
      <div style={{ minWidth: 0, padding: roomy ? '12px 10px' : '0 10px' }}>
        {children}
      </div>
    </div>
  );
}

function fieldCols(f) {
  return f.cols || (f.span === 2 ? 12 : 6);
}

function fieldStartsRow(fields, index) {
  const used = fields.slice(0, index).reduce((sum, f) => sum + fieldCols(f), 0);
  return used % 12 === 0;
}

function fieldGridPosition(fields, index) {
  let cursor = 0;
  for (let i = 0; i < index; i += 1) {
    const span = fieldCols(fields[i]);
    if (span > 12 - cursor) cursor = 0;
    cursor = (cursor + span) % 12;
  }
  const cols = fieldCols(fields[index]);
  const startsRow = cols > 12 - cursor || cursor === 0;
  if (cols > 12 - cursor) cursor = 0;
  const after = (cursor + cols) % 12;
  const nextCols = fields[index + 1] ? fieldCols(fields[index + 1]) : 0;
  const endsRow = after === 0 || !fields[index + 1] || nextCols > 12 - after;
  return { after, endsRow, remainder: after === 0 ? 0 : 12 - after, startsRow };
}

function WebBasicSection({ form, set, setLangItem, baseLanguage, onAiUpload, t }) {
  const activeLanguage = baseLanguage || LANG_LIST[0];
  const translation = form.translations.find((x) => x.language === activeLanguage) || {};
  const crew = form.crew.find((x) => x.language === activeLanguage) || {};
  const groups = webContentGroups(form);
  return (
    <SectionCard id="sec-basic" title="콘텐츠 정보" desc={null} t={t}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
        {groups.map((g) => (
          <div key={g.title} style={{ padding: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
              <div style={{ flex: 1 }}><GroupHead title={g.title} t={t} flush /></div>
              {g.title === '작품 기본 정보' && (
                <button
                  onClick={onAiUpload}
                  onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.82'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.opacity = '1'; }}
                  style={{ height: 34, padding: '0 13px', borderRadius: 9, border: 'none', background: ACCENT, color: '#FFF7EE', cursor: 'pointer', fontFamily: t.sans, fontSize: 13, fontWeight: 600, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 7, flexShrink: 0, transition: 'opacity 140ms ease' }}
                >
                  AI 자동 추출
                  <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: 0.4, background: 'rgba(255,255,255,0.22)', color: '#FFF7EE', padding: '2px 5px', borderRadius: 4, lineHeight: 1.4 }}>BETA</span>
                </button>
              )}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, minmax(0, 1fr))', gap: 0, borderLeft: `0.5px solid ${t.line}`, borderRight: `0.5px solid ${t.line}`, borderBottom: `0.5px solid ${t.line}` }}>
              {g.fields.map((f, fi) => {
                const cols = fieldCols(f);
                const position = fieldGridPosition(g.fields, fi);
                const inset = f.divider || (cols < 12 && !position.startsRow);
                const needsRowFiller = position.endsRow && position.remainder > 0;
                const roomy = f.kind === 'chips' || f.kind === 'area';
                const required = f.required !== false && f.key !== 'startPoint';
                return (
                  <React.Fragment key={`${f.source || 'form'}-${f.key}`}>
                    <RowField label={f.label} hint={f.hint} required={required} cols={cols} inset={inset} strongDivider={!!f.divider} roomy={roomy} t={t}>
                      <ControlCap kind={f.kind}>
                        <WebControl f={f} form={form} set={set} setLangItem={setLangItem} activeLanguage={activeLanguage} translation={translation} crew={crew} t={t} />
                      </ControlCap>
                    </RowField>
                    {needsRowFiller && <div aria-hidden="true" style={{ gridColumn: `span ${position.remainder}`, borderTop: `0.5px solid ${t.line}` }} />}
                  </React.Fragment>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}

// 추가 메타는 콘텐츠 정보 단계로 흡수// 추가 메타는 콘텐츠 정보 단계로 흡수

// 언어별 자막 업로더 (영상은 언어 공용, 자막만 언어별)
function SubtitleByLang({ value, onChange, langList, t }) {
  const v = value || {};
  const ll = langList || LANG_LIST;
  return (
    <div style={{ border: `0.5px solid ${t.line}`, borderRadius: 12, background: t.surfaceAlt, padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 13 }}>
      {ll.map((lg) => (
        <div key={lg} style={{ display: 'grid', gridTemplateColumns: '70px minmax(0, 1fr)', gap: 14, alignItems: 'start' }}>
          <span style={{ marginTop: 6, justifySelf: 'start', fontFamily: t.sans, fontSize: 12.5, fontWeight: 700, color: t.ink, padding: '4px 11px', borderRadius: 7, background: t.surface, border: `0.5px solid ${t.line}` }}>{LANG_SHORT[lg]}</span>
          <MediaUpload variant="buttons" kind="subtitle" multiple max={10}
            value={v[lg] || []} onChange={(x) => onChange({ ...v, [lg]: x })}
            placeholder=".srt · .vtt 파일 선택" t={t} />
        </div>
      ))}
    </div>
  );
}

function fillSlots(current, files, max) {
  const next = Array.from({ length: max }, (_, index) => current[index] || null);
  let cursor = 0;
  files.forEach((file) => {
    while (cursor < max && next[cursor]) cursor += 1;
    if (cursor < max) {
      next[cursor] = file;
      cursor += 1;
    }
  });
  return next;
}

function fillSubtitleSlots(current, files, videos, max) {
  const next = Array.from({ length: max }, (_, index) => current[index] || null);
  let cursor = 0;
  files.forEach((file) => {
    while (cursor < max && (!videos[cursor] || next[cursor])) cursor += 1;
    if (cursor < max) {
      next[cursor] = file;
      cursor += 1;
    }
  });
  return next;
}

function moveSlots(values, from, to, max) {
  const next = Array.from({ length: max }, (_, index) => values[index] || null);
  const [item] = next.splice(from, 1);
  next.splice(to, 0, item);
  return next.slice(0, max);
}

function compactSlots(values, max) {
  const files = (Array.isArray(values) ? values : []).filter(Boolean);
  return [...files, ...Array(Math.max(0, max - files.length)).fill(null)].slice(0, max);
}

function removeSlot(values, index, max) {
  const next = Array.from({ length: max }, (_, i) => values[i] || null);
  next[index] = null;
  return next;
}

function EpisodeMediaMapper({
  videoValue,
  subtitleValue,
  onVideoChange,
  onSubtitleChange,
  langList,
  t,
  max = 10,
}) {
  const lang = (langList && langList[0]) || LANG_LIST[0];
  const rawVideos = Array.isArray(videoValue) ? videoValue : videoValue ? [videoValue] : [];
  const subtitlesByLang = subtitleValue || {};
  const rawSubtitles = Array.isArray(subtitlesByLang[lang]) ? subtitlesByLang[lang] : [];
  const videos = Array.from({ length: max }, (_, index) => rawVideos[index] || null);
  const subtitles = Array.from({ length: max }, (_, index) => rawSubtitles[index] || null);
  const rows = videos.map((video, index) => ({ video, subtitle: subtitles[index] || null }));
  const activeRows = videos.filter(Boolean).length;
  const pairedCount = rows.filter((row) => row.video && row.subtitle).length;
  const videoCount = videos.filter(Boolean).length;
  const subtitleCount = subtitles.filter((subtitle, index) => subtitle && videos[index]).length;
  const [draggingItem, setDraggingItem] = React.useState(null);
  const setSubtitles = (next) => onSubtitleChange({ ...subtitlesByLang, [lang]: next });
  const syncSubtitlesToVideos = (nextVideos, nextSubtitles = subtitles) => {
    const nextActiveRows = nextVideos.filter(Boolean).length;
    return Array.from({ length: max }, (_, index) => (index < nextActiveRows ? nextSubtitles[index] || null : null));
  };
  const addMany = (kind) => {
    const room = kind === 'video' ? max - videoCount : videoCount - subtitleCount;
    if (room <= 0) return;
    const count = Math.min(3, room);
    const files = Array.from({ length: count }, () => fakeFile(kind));
    if (kind === 'video') onVideoChange(fillSlots(videos, files, max));
    else setSubtitles(fillSubtitleSlots(subtitles, files, videos, max));
  };
  const removeFile = (kind, index) => {
    if (kind === 'video') {
      const nextVideos = compactSlots(removeSlot(videos, index, max), max);
      const nextSubtitles = compactSlots(removeSlot(subtitles, index, max), max);
      onVideoChange(nextVideos);
      setSubtitles(syncSubtitlesToVideos(nextVideos, nextSubtitles));
      return;
    }
    setSubtitles(removeSlot(subtitles, index, max));
  };
  const moveItem = (kind, from, to) => {
    if (from == null || from === to) return;
    if (kind === 'video') {
      const nextVideos = compactSlots(moveSlots(videos, from, to, max), max);
      onVideoChange(nextVideos);
      setSubtitles(syncSubtitlesToVideos(nextVideos));
      return;
    }
    if (to >= activeRows) return;
    setSubtitles(moveSlots(subtitles, from, to, max));
  };
  const startDrag = (event, kind, index, enabled) => {
    if (!enabled) {
      event.preventDefault();
      return;
    }
    setDraggingItem({ kind, index });
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setData('text/plain', `${kind}:${index}`);
  };
  const dropItem = (event, kind, index) => {
    event.preventDefault();
    if (!draggingItem || draggingItem.kind !== kind) return;
    moveItem(kind, draggingItem.index, index);
    setDraggingItem(null);
  };
  const fileItem = (kind, file, index, enabled) => {
    const dragging = draggingItem?.kind === kind && draggingItem.index === index;
    const emptyText = kind === 'video' ? '영상 없음' : enabled ? '자막 없음' : '영상 추가 후 가능';
    return (
      <div
        draggable={!!file}
        onDragStart={(event) => startDrag(event, kind, index, !!file)}
        onDragOver={(event) => {
          if (draggingItem?.kind === kind && draggingItem.index !== index && enabled) event.preventDefault();
        }}
        onDrop={(event) => enabled && dropItem(event, kind, index)}
        onDragEnd={() => setDraggingItem(null)}
        title={file ? '파일을 잡고 드래그해서 순서 변경' : undefined}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          minWidth: 0,
          minHeight: 30,
          padding: 0,
          borderRadius: 0,
          border: 'none',
          background: 'transparent',
          boxShadow: 'none',
          opacity: dragging ? 0.64 : enabled ? 1 : 0.46,
          cursor: file ? 'grab' : 'default',
        }}
      >
        {file ? (
          <>
            <span style={{ flex: 1, minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontFamily: t.sans, fontSize: 12.5, color: t.ink }}>{file.name}</span>
            <button type="button" onMouseDown={(event) => event.stopPropagation()} onClick={() => removeFile(kind, index)} aria-label={`${kind === 'video' ? '영상' : '자막'} 제거`} style={{ width: 20, height: 24, border: 'none', background: 'transparent', color: t.inkMute, fontFamily: t.sans, fontSize: 15, lineHeight: '22px', cursor: 'pointer', flexShrink: 0, padding: 0 }}>×</button>
          </>
        ) : (
          <span style={{ fontFamily: t.sans, fontSize: 11.5, color: enabled ? t.inkFaint : t.inkFaint }}>{emptyText}</span>
        )}
      </div>
    );
  };
  const mediaBox = (kind) => {
    const isVideo = kind === 'video';
    const titleText = isVideo ? '영상 파일' : '자막 파일';
    const countText = isVideo ? `${videoCount}/${max}` : `${subtitleCount}/${videoCount || 0}`;
    const disabled = isVideo ? videoCount >= max : videoCount === 0 || subtitleCount >= videoCount;
    const buttonText = isVideo ? '영상 업로드' : '자막 업로드';
    const values = isVideo ? videos : subtitles;
    return (
      <div style={{ flex: '1 1 280px', minWidth: 0, border: `0.5px solid ${t.line}`, borderRadius: 12, overflow: 'hidden', background: '#fff' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10, minHeight: 46, padding: '0 12px', background: t.surfaceAlt, borderBottom: `0.5px solid ${t.line}` }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, minWidth: 0 }}>
            <span style={{ fontFamily: t.sans, fontSize: 12.5, fontWeight: 700, color: t.ink, whiteSpace: 'nowrap' }}>{titleText}</span>
            <span style={{ fontFamily: t.sans, fontSize: 11, color: t.inkFaint, whiteSpace: 'nowrap' }}>{countText}개</span>
          </div>
          <button
            type="button"
            onClick={() => addMany(kind)}
            disabled={disabled}
            onMouseEnter={(event) => {
              if (!disabled) event.currentTarget.style.background = '#FFE5DB';
            }}
            onMouseLeave={(event) => {
              if (!disabled) event.currentTarget.style.background = ACCENT_SOFT;
            }}
            style={{
              height: 29,
              padding: '0 12px',
              borderRadius: 999,
              border: 'none',
              background: disabled ? '#F7F7F8' : ACCENT_SOFT,
              color: disabled ? t.inkFaint : ACCENT,
              fontFamily: t.sans,
              fontSize: 11.5,
              fontWeight: 500,
              cursor: disabled ? 'default' : 'pointer',
              whiteSpace: 'nowrap',
              boxShadow: disabled ? 'none' : 'inset 0 0 0 0.5px rgba(232,93,44,0.16)',
              transition: 'background 140ms ease, box-shadow 140ms ease, color 140ms ease',
            }}
          >{buttonText}</button>
        </div>
        <div>
          {values.map((file, index) => {
            const enabled = isVideo || index < activeRows;
            return (
              <div key={index} style={{ display: 'grid', gridTemplateColumns: '58px minmax(0, 1fr)', alignItems: 'center', gap: 10, minHeight: 46, padding: '8px 12px', borderTop: index === 0 ? 'none' : `0.5px solid ${t.line}`, background: enabled ? '#fff' : '#FCFCFA' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <span style={{ fontFamily: t.mono, fontSize: 12, fontWeight: 700, color: enabled ? t.ink : t.inkFaint }}>EP{String(index + 1).padStart(2, '0')}</span>
                </div>
                {fileItem(kind, file, index, enabled)}
              </div>
            );
          })}
        </div>
      </div>
    );
  };
  return (
    <div>
      <div style={{ display: 'flex', gap: 12, alignItems: 'stretch', flexWrap: 'wrap' }}>
        {mediaBox('video')}
        {mediaBox('subtitle')}
      </div>
    </div>
  );
}

function SubLabel({ children, hint, t, compact = false }) {
  return (
    <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, margin: compact ? '0 0 9px' : '14px 0 9px' }}>
      <span style={{ fontFamily: t.sans, fontSize: 12.5, fontWeight: 700, color: t.ink }}>{children}</span>
      {hint && <span style={{ fontFamily: t.sans, fontSize: 11, color: t.inkFaint }}>{hint}</span>}
    </div>
  );
}

function DotFieldLabel({ children }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 9 }}>
      <span style={{ width: 6, height: 6, borderRadius: 999, background: ACCENT, flexShrink: 0 }} />
      <span>{children}</span>
    </span>
  );
}

function WebMediaSection({ form, set, langList, t }) {
  const ll = langList || LANG_LIST;
  return (
    <SectionCard id="sec-media" title="미디어" desc={null} t={t}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
        <Field label={<DotFieldLabel>대표 이미지</DotFieldLabel>} required hint="세로 포스터 1장" gap={12} t={t}>
          <MediaUpload variant="dropzone" kind="image" multiple={false} max={1} value={form.mainImageKey}
            onChange={(v) => set('mainImageKey', v)} placeholder="대표 이미지 업로드" t={t} />
        </Field>

        <Field label={<DotFieldLabel>관련 이미지</DotFieldLabel>} hint="최대 10장" gap={12} t={t}>
          <MediaUpload variant="dropzone" kind="image" multiple max={10} value={form.contentImageKeys}
            onChange={(v) => set('contentImageKeys', v)} placeholder="스틸컷 · 키아트 업로드" t={t} />
        </Field>

        <Field label={<DotFieldLabel>티저 영상·자막</DotFieldLabel>} hint="자막이나 로고가 삽입되지 않은 클린 버전 영상만 업로드해주세요." gap={12} t={t}>
          <EpisodeMediaMapper
            videoValue={form.teaserKeys}
            subtitleValue={form.teaserSubtitles}
            onVideoChange={(v) => set('teaserKeys', v)}
            onSubtitleChange={(v) => set('teaserSubtitles', v)}
            langList={ll}
            t={t}
            max={3}
          />
        </Field>

        <Field label={<DotFieldLabel>무료회차 영상·자막</DotFieldLabel>} hint="자막이나 로고가 삽입되지 않은 클린 버전 영상만 업로드해주세요." gap={12} t={t}>
          <EpisodeMediaMapper
            videoValue={form.freeEpisodeKeys}
            subtitleValue={form.freeEpisodeSubtitles}
            onVideoChange={(v) => set('freeEpisodeKeys', v)}
            onSubtitleChange={(v) => set('freeEpisodeSubtitles', v)}
            langList={ll}
            t={t}
          />
        </Field>
      </div>
    </SectionCard>
  );
}

function reviewArr(v) {
  return (Array.isArray(v) ? v : v ? [v] : []).filter(Boolean);
}

function ReviewRow({ label, value, ok = true, required = false, t }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '160px minmax(0, 1fr)', minHeight: 38, borderTop: `0.5px solid ${t.line}` }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '0 10px', background: '#F7F7F4', borderRight: `0.5px solid ${t.line}`, fontFamily: t.sans, fontSize: 12.5, fontWeight: 700, color: '#5F646D' }}>
        <span>{label}</span>
        {required && <span style={{ fontSize: 12, fontWeight: 700, color: ACCENT, flexShrink: 0 }}>*</span>}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '0 10px', fontFamily: t.sans, fontSize: 13.5, fontWeight: ok ? 500 : 400, color: ok ? t.ink : t.inkFaint }}>
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
        <span>{value || '미입력'}</span>
      </div>
    </div>
  );
}

function ReviewGroup({ title, children, t }) {
  return (
    <div>
      <GroupHead title={title} t={t} />
      <div style={{ borderLeft: `0.5px solid ${t.line}`, borderRight: `0.5px solid ${t.line}`, borderBottom: `0.5px solid ${t.line}` }}>
        {children}
      </div>
    </div>
  );
}

function WebReviewSection({ form, set, baseLanguage, rightsConfirmed, onRightsChange, t }) {
  const lang = baseLanguage || LANG_LIST[0];
  const langLabel = LANG_SHORT[lang] || lang;
  const tr = form.translations.find((x) => x.language === lang) || {};
  const crew = form.crew.find((x) => x.language === lang) || {};
  const mainImages = reviewArr(form.mainImageKey);
  const freeVideos = reviewArr(form.freeEpisodeKeys);
  const teaserVideos = reviewArr(form.teaserKeys);
  const contentImages = reviewArr(form.contentImageKeys);
  const freeSubs = reviewArr((form.freeEpisodeSubtitles || {})[lang]);
  const teaserSubs = reviewArr((form.teaserSubtitles || {})[lang]);
  const genreText = (form.genreCodes || []).map((c) => genreLabel(c)).join(' · ');
  const distributionLabel = form.distributionHistory === 'NEW' ? '미유통 (신작)' : form.distributionHistory === 'RELEASED' ? '기유통' : '';

  return (
    <SectionCard id="sec-review" title="검토 요청" desc={null} t={t}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
        <div style={{ padding: '13px 16px', border: `0.5px solid ${t.line}`, borderRadius: 10, background: '#F4F4F1', display: 'flex', alignItems: 'center', gap: 9 }}>
          <span aria-hidden="true" style={{ width: 18, height: 18, borderRadius: 999, border: `1px solid ${t.inkMute}`, color: t.inkMute, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontFamily: t.sans, fontSize: 11, fontWeight: 700 }}>!</span>
          <div style={{ fontFamily: t.sans, fontSize: 13, fontWeight: 500, color: '#555A63', lineHeight: 1.5 }}>
            검토 요청을 전송하기 전에 입력한 내용을 마지막으로 확인해주세요.
          </div>
        </div>

        <ReviewGroup title="작품 기본 정보" t={t}>
          <ReviewRow label="제목" value={form.originalTitle} ok={!!form.originalTitle} required t={t} />
          <ReviewRow label="기타제목" value={tr.title} ok={!!tr.title} required t={t} />
          <ReviewRow label="로그라인" value={tr.logline} ok={!!tr.logline} required t={t} />
          <ReviewRow label="시놉시스" value={tr.synopsis} ok={!!tr.synopsis} required t={t} />
          <ReviewRow label="인물 소개" value={tr.characterDescription} ok={!!tr.characterDescription} required t={t} />
          <ReviewRow label="감독" value={crew.director} ok={!!crew.director} t={t} />
          <ReviewRow label="작가" value={crew.writer} ok={!!crew.writer} t={t} />
          <ReviewRow label="출연진" value={crew.cast} ok={!!crew.cast} t={t} />
          <ReviewRow label="총 회차 수" value={form.episodes ? `${form.episodes}화` : ''} ok={!!form.episodes} required t={t} />
          <ReviewRow label="회차당 러닝타임" value={form.runtime} ok={!!form.runtime} required t={t} />
          <ReviewRow label="총 러닝타임 (분)" value={form.totalRuntime ? `${form.totalRuntime}분` : ''} ok={!!form.totalRuntime} required t={t} />
          <ReviewRow label="장르" value={genreText} ok={!!genreText} required t={t} />
        </ReviewGroup>

        <ReviewGroup title="제작 정보" t={t}>
          <ReviewRow label="제작 상태" value={enumLabel('productionStatus', form.productionStatus)} ok={!!form.productionStatus} required t={t} />
          <ReviewRow label="미디어 카테고리" value={enumLabel('mediaCategory', form.mediaCategory)} ok={!!form.mediaCategory} required t={t} />
          <ReviewRow label="제작연도" value={form.productionYear ? `${form.productionYear}년` : ''} ok={!!form.productionYear} required t={t} />
          <ReviewRow label="AI 생성 콘텐츠 여부" value={form.isAiGenerated ? '예' : '아니오'} ok={true} t={t} />
          <ReviewRow label="콘텐츠 언어" value={enumLabel('contentLanguage', form.contentLanguage)} ok={!!form.contentLanguage} required t={t} />
        </ReviewGroup>

        <ReviewGroup title="라이선스 · 유통" t={t}>
          <ReviewRow label="유통권 보유 형태" value={enumLabel('coProduction', form.coProduction)} ok={!!form.coProduction} required t={t} />
          <ReviewRow label="라이선스 유형" value={enumLabel('licenseType', form.licenseType)} ok={!!form.licenseType} required t={t} />
          <ReviewRow label="라이선스 가능 지역" value={enumLabel('licenseTerritory', form.licenseTerritory)} ok={!!form.licenseTerritory} required t={t} />
          <ReviewRow label="유통 이력" value={distributionLabel} ok={!!form.distributionHistory} required t={t} />
          {form.distributionHistory === 'NEW' && <ReviewRow label="희망 릴리즈 일정" value={form.desiredReleaseDate} ok={!!form.desiredReleaseDate} required t={t} />}
          {form.distributionHistory === 'RELEASED' && <ReviewRow label="독점 여부" value={form.exclusive ? '독점' : '비독점'} ok={form.exclusive !== undefined && form.exclusive !== null} required t={t} />}
          {form.distributionHistory === 'RELEASED' && <ReviewRow label="기존 유통 플랫폼" value={form.previousReleases} ok={!!form.previousReleases} required t={t} />}
        </ReviewGroup>

        <ReviewGroup title="공개 · 등급" t={t}>
          <ReviewRow label="유료 시청 시작 회차" value={form.startPoint ? `${form.startPoint}화부터` : ''} ok={!!form.startPoint} t={t} />
          <ReviewRow label="콘텐츠 유형" value={enumLabel('contentType', form.contentType)} ok={!!form.contentType} required t={t} />
          <ReviewRow label="영상 등급" value={enumLabel('ageRating', form.ageRating)} ok={!!form.ageRating} t={t} />
        </ReviewGroup>

        <ReviewGroup title="미디어" t={t}>
          <ReviewRow label="대표 이미지" value={mainImages.length ? `${mainImages.length}장` : ''} ok={mainImages.length > 0} required t={t} />
          <ReviewRow label="관련 이미지" value={`${contentImages.length}장`} ok={contentImages.length > 0} t={t} />
          <ReviewRow label="티저 영상" value={`${teaserVideos.length}개`} ok={teaserVideos.length > 0} t={t} />
          <ReviewRow label="티저 자막" value={`${teaserSubs.length}개`} ok={teaserSubs.length > 0} t={t} />
          <ReviewRow label="무료회차 영상" value={`${freeVideos.length}개`} ok={freeVideos.length > 0} t={t} />
          <ReviewRow label="무료회차 자막" value={`${freeSubs.length}개`} ok={freeSubs.length > 0} t={t} />
        </ReviewGroup>

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
              resize: 'vertical',
              border: `0.5px solid ${t.line}`,
              borderRadius: 12,
              background: t.surface,
              padding: '13px 14px',
              outline: 'none',
              fontFamily: t.sans,
              fontSize: 13,
              fontWeight: 450,
              color: t.ink,
              lineHeight: 1.55,
            }}
          />
        </div>

        <div style={{ padding: '20px 22px', border: `0.5px solid ${t.line}`, borderRadius: 12, background: '#F8F7F3' }}>
          <p style={{ margin: '0 0 7px', fontFamily: t.sans, fontSize: 13.5, color: t.ink, fontWeight: 450, lineHeight: 1.65 }}>
            당사는 해당 작품의 저작권자 또는 적법한 권리자이며, 작품을 이용허락할 수 있는 권한을 보유하고 있음을 보증합니다.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
            <span style={{ fontFamily: t.sans, fontSize: 13.5, color: t.ink, fontWeight: 450, lineHeight: 1.65 }}>
              또한 이를 입증할 자료를 제출할 수 있음을 확인합니다.
            </span>
            <label style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginLeft: 'auto', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={rightsConfirmed}
                onChange={(event) => onRightsChange(event.target.checked)}
                style={{ width: 16, height: 16, margin: 0, accentColor: ACCENT, cursor: 'pointer' }}
              />
              <span style={{ fontFamily: t.sans, fontSize: 12.5, color: t.ink, fontWeight: 600 }}>위 내용을 확인하고 동의합니다.</span>
            </label>
          </div>
        </div>
      </div>
    </SectionCard>
  );
}

function WebPageHeader({ t, compact }) {
  return (
    <div style={{ marginBottom: compact ? 16 : 22 }}>
      <button onClick={() => window.history.back()} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontFamily: t.sans, fontSize: 12.5, fontWeight: 600, color: t.inkMute, marginBottom: 12, border: 'none', background: 'transparent', cursor: 'pointer', padding: 0 }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" /></svg>
        콘텐츠 목록
      </button>
      <h1 style={{ margin: 0, fontFamily: t.sans, fontSize: 28, fontWeight: 700, letterSpacing: -0.7, color: t.ink }}>새 콘텐츠 등록</h1>
      <div style={{ fontFamily: t.sans, fontSize: 13.5, color: t.inkMute, marginTop: 6, lineHeight: 1.5 }}>작품 정보를 입력하고 검토를 요청하세요. 입력 내용은 임시저장으로 보관됩니다.</div>
    </div>
  );
}

function nowHHMM() {
  const d = new Date();
  return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
}

// 진행 상황 계산 (시안 공용)
function webSections(form, baseLanguage) {
  const tr = form.translations.find((x) => x.language === baseLanguage) || {};
  return [
    { id: 'sec-basic', label: '콘텐츠 정보', done: !!(form.originalTitle || '').trim() && !!(tr.title || '').trim() },
    { id: 'sec-media', label: '미디어', done: !!form.mainImageKey },
    { id: 'sec-review', label: '검토 요청', done: !!(form.originalTitle || '').trim() && !!(tr.title || '').trim() && !!form.mainImageKey },
  ];
}

Object.assign(window, {
  webContentGroups, WebControl, GroupHead, SubHead,
  WebBasicSection, WebMediaSection, WebReviewSection, SubtitleByLang, SubLabel,
  WebPageHeader, nowHHMM, webSections,
});
