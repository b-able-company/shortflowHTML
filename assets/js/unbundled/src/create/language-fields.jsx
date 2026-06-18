// 새 콘텐츠 생성 — 다국어 입력 (3시안: 언어 탭 / 세로 나열 / 기본 언어만)
// translations(제목·로그라인·시놉시스·인물·공개일) 와 crew(감독·작가·출연진) 공용.

// 한 언어 데이터에 대한 필드 셋
function langFieldCols(f) {
  return f.span === 2 ? 12 : 6;
}

function langFieldStartsRow(fields, index) {
  const used = fields.slice(0, index).reduce((sum, f) => sum + langFieldCols(f), 0);
  return used % 12 === 0;
}

function LangRowField({ label, optional, cols = 6, inset = false, roomy = false, t, children }) {
  return (
    <div style={{
      gridColumn: `span ${cols}`, minWidth: 0,
      display: 'grid', gridTemplateColumns: '150px minmax(0, 1fr)',
      gap: 0, alignItems: 'stretch', padding: 0,
      borderTop: `0.5px solid ${t.line}`,
      borderLeft: inset ? `0.5px solid ${t.line}` : 'none',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 5, minWidth: 0, alignSelf: 'stretch', minHeight: roomy ? 98 : 36, background: '#F7F7F4', borderRadius: 0, padding: '0 10px', borderRight: `0.5px solid ${t.line}` }}>
        <span style={{ fontFamily: t.sans, fontSize: 12.5, fontWeight: 700, color: '#5F646D', letterSpacing: -0.1, whiteSpace: 'nowrap' }}>{label}</span>
        {optional && <span style={{ fontFamily: t.sans, fontSize: 10.5, fontWeight: 600, color: '#A1A3A8', whiteSpace: 'nowrap' }}>선택</span>}
      </div>
      <div style={{ minWidth: 0, padding: roomy ? '10px 10px' : '0 10px' }}>
        {children}
      </div>
    </div>
  );
}

function LangControl({ f, data, onChange, t }) {
  if (f.kind === 'area') {
    return <TextArea value={data[f.key]} onChange={(v) => onChange(f.key, v)} placeholder={f.placeholder} rows={f.rows || 3} t={t} />;
  }
  if (f.kind === 'date') {
    return <DateInput value={data[f.key]} onChange={(v) => onChange(f.key, v)} t={t} />;
  }
  return <TextInput value={data[f.key]} onChange={(v) => onChange(f.key, v)} placeholder={f.placeholder} t={t} />;
}

function LangFields({ fieldsDef, data, onChange, t }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, minmax(0, 1fr))', gap: 0, borderLeft: `0.5px solid ${t.line}`, borderRight: `0.5px solid ${t.line}`, borderBottom: `0.5px solid ${t.line}` }}>
      {fieldsDef.map((f, fi) => {
        const cols = langFieldCols(f);
        const inset = cols < 12 && !langFieldStartsRow(fieldsDef, fi);
        return (
          <LangRowField key={f.key} label={f.label} optional={f.optional} cols={cols} inset={inset} roomy={f.kind === 'area'} t={t}>
            <LangControl f={f} data={data} onChange={onChange} t={t} />
          </LangRowField>
        );
      })}
    </div>
  );
}

// 언어가 채워졌는지
function langFilled(data, fieldsDef) {
  return fieldsDef.some((f) => (data[f.key] || '').toString().trim());
}

// ════════════════════════════════════════════════════════
// 시안 1 — 언어 탭
// ════════════════════════════════════════════════════════
function LangTabs({ items, onItemChange, fieldsDef, langList, t }) {
  const [active, setActive] = React.useState(langList[0]);
  const cur = items.find((x) => x.language === active) || items[0];
  return (
    <div>
      <div style={{ display: 'flex', gap: 4, background: t.surfaceAlt, border: `0.5px solid ${t.line}`, borderRadius: 10, padding: 4, width: 'fit-content', marginBottom: 20 }}>
        {langList.map((lg) => {
          const sel = active === lg;
          const data = items.find((x) => x.language === lg) || {};
          const filled = langFilled(data, fieldsDef);
          return (
            <button key={lg} onClick={() => setActive(lg)} style={{
              border: 'none', cursor: 'pointer', borderRadius: 7, padding: '8px 16px',
              background: sel ? t.surface : 'transparent', color: sel ? t.ink : t.inkMute,
              fontFamily: t.sans, fontSize: 13, fontWeight: sel ? 700 : 500,
              boxShadow: sel ? '0 1px 3px rgba(0,0,0,0.08)' : 'none',
              display: 'inline-flex', alignItems: 'center', gap: 7,
            }}>
              {LANG_SHORT[lg]}
              <span style={{ width: 6, height: 6, borderRadius: 999, background: filled ? t.paid : t.lineStrong }} />
            </button>
          );
        })}
      </div>
      <LangFields fieldsDef={fieldsDef} data={cur} onChange={(k, v) => onItemChange(active, k, v)} t={t} />
    </div>
  );
}

// ════════════════════════════════════════════════════════
// 시안 2 — 언어별 세로 나열
// ════════════════════════════════════════════════════════
function LangStacked({ items, onItemChange, fieldsDef, langList, t }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
      {langList.map((lg) => {
        const data = items.find((x) => x.language === lg) || {};
        return (
          <div key={lg} style={{ border: `0.5px solid ${t.line}`, borderRadius: 12, padding: '18px 18px 20px', background: t.surfaceAlt }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
              <span style={{ fontFamily: t.sans, fontSize: 13, fontWeight: 700, color: t.ink, padding: '3px 10px', borderRadius: 7, background: t.surface, border: `0.5px solid ${t.line}` }}>{LANG_SHORT[lg]}</span>
              <span style={{ width: 6, height: 6, borderRadius: 999, background: langFilled(data, fieldsDef) ? t.paid : t.lineStrong }} />
            </div>
            <LangFields fieldsDef={fieldsDef} data={data} onChange={(k, v) => onItemChange(lg, k, v)} t={t} />
          </div>
        );
      })}
    </div>
  );
}

// ════════════════════════════════════════════════════════
// 시안 3 — 기본 언어만, 추가 언어는 선택적으로
// ════════════════════════════════════════════════════════
function LangPrimaryOnly({ items, onItemChange, fieldsDef, langList, t }) {
  const primary = langList[0];
  const extras = langList.slice(1);
  const [added, setAdded] = React.useState(() => extras.filter((lg) => {
    const d = items.find((x) => x.language === lg) || {};
    return langFilled(d, fieldsDef);
  }));
  const addLang = (lg) => setAdded((a) => [...a, lg]);
  const removeLang = (lg) => setAdded((a) => a.filter((x) => x !== lg));
  const notAdded = extras.filter((lg) => !added.includes(lg));
  const primData = items.find((x) => x.language === primary) || {};
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
          <span style={{ fontFamily: t.sans, fontSize: 13, fontWeight: 700, color: t.ink, padding: '3px 10px', borderRadius: 7, background: ACCENT_SOFT, color: ACCENT }}>{LANG_SHORT[primary]}</span>
          <span style={{ fontFamily: t.sans, fontSize: 11.5, color: t.inkFaint }}>기본 언어</span>
        </div>
        <LangFields fieldsDef={fieldsDef} data={primData} onChange={(k, v) => onItemChange(primary, k, v)} t={t} />
      </div>

      {added.map((lg) => {
        const data = items.find((x) => x.language === lg) || {};
        return (
          <div key={lg} style={{ border: `0.5px solid ${t.line}`, borderRadius: 12, padding: '18px 18px 20px', background: t.surfaceAlt }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
              <span style={{ fontFamily: t.sans, fontSize: 13, fontWeight: 700, color: t.ink, padding: '3px 10px', borderRadius: 7, background: t.surface, border: `0.5px solid ${t.line}` }}>{LANG_SHORT[lg]}</span>
              <button onClick={() => removeLang(lg)} style={{ marginLeft: 'auto', border: 'none', background: 'transparent', cursor: 'pointer', color: t.inkFaint, fontFamily: t.sans, fontSize: 12, display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" /></svg>
                제거
              </button>
            </div>
            <LangFields fieldsDef={fieldsDef} data={data} onChange={(k, v) => onItemChange(lg, k, v)} t={t} />
          </div>
        );
      })}

      {notAdded.length > 0 && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
          <span style={{ fontFamily: t.sans, fontSize: 12, color: t.inkFaint }}>언어 추가</span>
          {notAdded.map((lg) => (
            <button key={lg} onClick={() => addLang(lg)} style={{
              cursor: 'pointer', borderRadius: 999, padding: '6px 13px', border: `0.5px dashed ${t.lineStrong}`,
              background: 'transparent', color: t.inkMute, fontFamily: t.sans, fontSize: 12.5, fontWeight: 600,
              display: 'inline-flex', alignItems: 'center', gap: 5,
            }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="M12 5v14M5 12h14" strokeLinecap="round" /></svg>
              {LANG_SHORT[lg]}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// 래퍼 — variant 분기
function MultiLangEditor({ variant, ...props }) {
  if (variant === 'stacked') return <LangStacked {...props} />;
  if (variant === 'primary') return <LangPrimaryOnly {...props} />;
  return <LangTabs {...props} />;
}

// 필드 정의
const TRANSLATION_FIELDS = [
  { key: 'title', label: '제목', kind: 'text', span: 2, placeholder: '언어별 제목' },
  { key: 'logline', label: '로그라인', kind: 'text', span: 2, placeholder: '한 줄 소개' },
  { key: 'synopsis', label: '시놉시스', kind: 'area', rows: 4, span: 2, placeholder: '줄거리' },
  { key: 'characterDescription', label: '인물 소개', kind: 'area', rows: 3, span: 2, placeholder: '주요 인물 설명' },
  { key: 'releaseDate', label: '공개일', kind: 'date', span: 1 },
];
const CREW_FIELDS = [
  { key: 'director', label: '감독', kind: 'text', span: 1 },
  { key: 'writer', label: '작가', kind: 'text', span: 1 },
  { key: 'cast', label: '출연진', kind: 'text', span: 2, placeholder: '주연 · 조연' },
];

Object.assign(window, { MultiLangEditor, LangTabs, LangStacked, LangPrimaryOnly, LangFields, TRANSLATION_FIELDS, CREW_FIELDS });
