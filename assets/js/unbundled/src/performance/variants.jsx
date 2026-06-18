// 퍼포먼스 대시보드 — 시안 변형 모음.
// performance-clean.jsx (PerfTopNav, PageHead, SectionHead, PlatformDots ...) 와
// performance-data.jsx 헬퍼에 의존. 디자인 캔버스에서 비교용으로 사용.

// ════════════════════════════════════════════════════════════
//  목록 화면 시안
// ════════════════════════════════════════════════════════════

// ── 시안 B · 컴팩트 리스트 (행 단위 + 인라인 4지표) ──────────────
function PerfListCompact({ t = BASE_TOKENS, onOpen }) {
  const list = [...PERF_CONTENTS].sort((a, b) => (contentTotals(b).views || 0) - (contentTotals(a).views || 0));
  const cols = [
  { key: 'views', label: '조회수' },
  { key: 'follows', label: '팔로우수' },
  { key: 'likes', label: '좋아요수' },
  { key: 'ads', label: '광고수' }];

  return (
    <div style={{ minHeight: '100%', background: t.bg, color: t.ink, fontFamily: t.sans }}>
      <PerfTopNav t={t} />
      <main style={{ margin: '0 auto', padding: '36px 64px 80px', maxWidth: 1280 }}>
        <SectionHead t={t} eyebrow="퍼포먼스 대시보드" title="내 콘텐츠 리스트" />

        <div style={{ background: t.surface, border: `0.5px solid ${t.line}`, borderRadius: 14, overflow: 'hidden' }}>
          <div style={{
            display: 'grid', gridTemplateColumns: '56px 1.4fr repeat(4, 1fr) 90px 24px',
            padding: '12px 22px', fontSize: 10.5, color: t.inkMute, fontWeight: 700,
            textTransform: 'uppercase', letterSpacing: 0.6, alignItems: 'center',
            borderBottom: `0.5px solid ${t.line}`, background: t.surfaceAlt
          }}>
            <div></div><div>콘텐츠</div>
            {cols.map((c) => <div key={c.key} style={{ textAlign: 'right' }}>{c.label}</div>)}
            <div style={{ textAlign: 'right' }}>플랫폼</div><div></div>          </div>
          {list.map((c, i) => {
            const tot = contentTotals(c);
            return (
              <div key={c.id} onClick={() => onOpen && onOpen(c.id)} style={{
                display: 'grid', gridTemplateColumns: '56px 1.4fr repeat(4, 1fr) 90px 24px',
                padding: '14px 22px', alignItems: 'center', cursor: 'pointer',
                borderBottom: i === list.length - 1 ? 'none' : `0.5px solid ${t.line}`
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = t.surfaceAlt}
              onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>
                <Poster tone={c.posterTone} size={40} label="" />
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontSize: 14.5, fontWeight: 700, letterSpacing: -0.2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{c.title}</div>
                </div>
                {cols.map((col) =>
                <div key={col.key} style={{
                  textAlign: 'right', fontFamily: t.mono, fontSize: 14, fontWeight: 600,
                  color: tot[col.key] == null ? t.inkFaint : t.ink, fontVariantNumeric: 'tabular-nums'
                }}>{tot[col.key] == null ? '—' : compact(tot[col.key])}</div>
                )}
                <div style={{ textAlign: 'right', fontSize: 12, color: t.inkMute, fontFamily: t.mono, fontVariantNumeric: 'tabular-nums' }}>{c.platforms.length}개</div>
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}><Chevron dir="right" color={t.inkFaint} /></div>
              </div>);

          })}
        </div>
      </main>
    </div>);

}

// ── 시안 C · 매거진형 와이드 카드 (2열, 큰 포스터 + 지표 칩) ──────
function PerfListMag({ t = BASE_TOKENS, onOpen }) {
  const list = [...PERF_CONTENTS].sort((a, b) => (contentTotals(b).views || 0) - (contentTotals(a).views || 0));
  const metricRow = [
  { key: 'views', label: '조회수' },
  { key: 'follows', label: '팔로우수' },
  { key: 'likes', label: '좋아요수' },
  { key: 'ads', label: '광고수' }];

  return (
    <div style={{ minHeight: '100%', background: t.bg, color: t.ink, fontFamily: t.sans }}>
      <PerfTopNav t={t} />
      <main style={{ margin: '0 auto', padding: '36px 64px 80px', maxWidth: 1280 }}>
        <PageHead t={t} crumb="대시보드 · 퍼포먼스" title="퍼포먼스 대시보드"
        desc={<span><span style={{ color: t.ink, fontWeight: 600 }}>QuickFrame Studio</span><span style={{ margin: '0 8px', color: t.inkFaint }}>·</span>콘텐츠별 누적 성과</span>} />
        <SectionHead t={t} eyebrow="내 콘텐츠" title={`${PERF_CONTENTS.length}편 · 누적 조회순`} />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
          {list.map((c) => {
            const tot = contentTotals(c);
            return (
              <div key={c.id} onClick={() => onOpen && onOpen(c.id)} style={{
                background: t.surface, border: `0.5px solid ${t.line}`, borderRadius: 16,
                padding: 20, display: 'flex', gap: 18, cursor: 'pointer',
                transition: 'box-shadow .12s ease, border-color .12s ease'
              }}
              onMouseEnter={(e) => {e.currentTarget.style.borderColor = t.lineStrong;e.currentTarget.style.boxShadow = '0 4px 14px rgba(15,17,21,0.06)';}}
              onMouseLeave={(e) => {e.currentTarget.style.borderColor = t.line;e.currentTarget.style.boxShadow = 'none';}}>
                <Poster tone={c.posterTone} size={96} label="메인" />
                <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
                    <div style={{ fontSize: 17, fontWeight: 700, letterSpacing: -0.3, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{c.title}</div>
                  </div>
                  <div style={{ fontSize: 12, color: t.inkMute, marginBottom: 14 }}>
                    {c.subtitle}
                  </div>
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 'auto' }}>
                    {metricRow.map((m) =>
                    <div key={m.key} style={{
                      flex: '1 1 0', minWidth: 80,
                      background: t.surfaceAlt, borderRadius: 10, padding: '10px 12px'
                    }}>
                        <div style={{ fontSize: 9.5, color: t.inkMute, letterSpacing: 0.4, textTransform: 'uppercase', fontWeight: 700, marginBottom: 5 }}>{m.label}</div>
                        <div style={{
                        fontFamily: t.mono, fontSize: 17, fontWeight: 700, letterSpacing: -0.4,
                        color: tot[m.key] == null ? t.inkFaint : t.ink, fontVariantNumeric: 'tabular-nums'
                      }}>{tot[m.key] == null ? '—' : compact(tot[m.key])}</div>
                      </div>
                    )}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 14 }}>
                    <span style={{ fontSize: 11.5, color: t.inkMute, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{platformSummary(c.platforms)}</span>
                    <span style={{ marginLeft: 'auto', fontSize: 11, color: t.inkFaint, fontFamily: t.mono, flexShrink: 0 }}>업데이트 {c.lastUpdate}</span>
                  </div>
                </div>
              </div>);

          })}
        </div>
      </main>
    </div>);

}

// ════════════════════════════════════════════════════════════
//  상세 화면 — 플랫폼 블록 시안 (PerfDetailClean 의 renderPlatforms 로 주입)
// ════════════════════════════════════════════════════════════

const METRIC_DEFS = [
{ key: 'views', label: '조회수' },
{ key: 'follows', label: '팔로우수' },
{ key: 'likes', label: '좋아요수' },
{ key: 'ads', label: '광고수' }];


function NoDataRow({ t }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: t.inkMute, fontSize: 13 }}>
      <span style={{
        width: 24, height: 24, borderRadius: 12, border: `1px dashed ${t.lineStrong}`,
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        color: t.inkFaint, fontFamily: t.mono, fontSize: 12
      }}>—</span>
      데이터 미제공
    </div>);

}

// ── 플랫폼 시안 B · 카드 그리드 ───────────────────────────────
function renderPlatformCards(c, t) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 14 }}>
      {c.platforms.map((p) => {
        const ps = platformStyle(p.name);
        const has = platformHasAny(p);
        const present = METRIC_DEFS.filter((m) => p[m.key] != null);
        const missing = METRIC_DEFS.filter((m) => p[m.key] == null);
        return (
          <div key={p.name} style={{ background: t.surface, border: `0.5px solid ${t.line}`, borderRadius: 14, overflow: 'hidden' }}>
            <div style={{
              background: ps.tint, padding: '13px 18px', display: 'flex', alignItems: 'center',
              justifyContent: 'space-between', borderBottom: `0.5px solid ${t.line}`
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
                <span style={{ width: 8, height: 8, borderRadius: 4, background: ps.dot }} />
                <div style={{ fontSize: 14, fontWeight: 700, color: ps.ink }}>{p.name}</div>
              </div>
              <div style={{ fontFamily: t.mono, fontSize: 11, color: ps.ink, opacity: 0.7 }}>출시 {p.releaseDate || '—'}</div>
            </div>
            {!has ?
            <div style={{ padding: '30px 18px', display: 'flex', justifyContent: 'center' }}><NoDataRow t={t} /></div> :

            <div style={{ padding: '18px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', rowGap: 18, columnGap: 16 }}>
                  {present.map((m) =>
                <div key={m.key}>
                      <div style={{ fontSize: 10.5, color: t.inkMute, fontWeight: 700, letterSpacing: 0.4, textTransform: 'uppercase', marginBottom: 5 }}>{m.label}</div>
                      <div style={{ fontFamily: t.mono, fontSize: 24, fontWeight: 700, color: t.ink, letterSpacing: -0.6, fontVariantNumeric: 'tabular-nums', lineHeight: 1 }}>{compact(p[m.key])}</div>
                    </div>
                )}
                </div>
                {missing.length > 0 &&
              <div style={{ marginTop: 16, paddingTop: 12, borderTop: `0.5px dashed ${t.line}`, display: 'flex', flexWrap: 'wrap', gap: 6, alignItems: 'center', fontFamily: t.mono, fontSize: 11, color: t.inkFaint }}>
                    <span>미제공</span>
                    {missing.map((m) =>
                <span key={m.key} style={{ padding: '1px 7px', borderRadius: 999, background: t.surfaceAlt, color: t.inkMute }}>{m.label}</span>
                )}
                  </div>
              }
              </div>
            }
          </div>);

      })}
    </div>);

}

// ── 플랫폼 시안 C · 사이드 스트라이프 행 ──────────────────────
function renderPlatformStripe(c, t) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {c.platforms.map((p) => {
        const ps = platformStyle(p.name);
        const has = platformHasAny(p);
        return (
          <div key={p.name} style={{
            background: t.surface, border: `0.5px solid ${t.line}`, borderRadius: 14,
            display: 'flex', overflow: 'hidden', minHeight: 96
          }}>
            <div style={{ width: 8, background: ps.dot, flexShrink: 0 }} />
            <div style={{ flex: 1, padding: '16px 22px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                <div style={{ fontSize: 15, fontWeight: 700, color: t.ink, letterSpacing: -0.2 }}>{p.name}</div>
                <span style={{ padding: '2px 8px', borderRadius: 999, background: ps.tint, color: ps.ink, fontFamily: t.mono, fontSize: 10, fontWeight: 500 }}>출시 {p.releaseDate || '—'}</span>
              </div>
              {!has ? <NoDataRow t={t} /> :
              <div style={{ display: 'flex', gap: 36, flexWrap: 'wrap' }}>
                  {METRIC_DEFS.map((m) =>
                <div key={m.key}>
                      <div style={{ fontSize: 10.5, color: t.inkMute, fontWeight: 700, letterSpacing: 0.4, textTransform: 'uppercase', marginBottom: 6 }}>{m.label}</div>
                      <div style={{
                    fontFamily: t.mono, fontSize: 23, fontWeight: 700, letterSpacing: -0.5, fontVariantNumeric: 'tabular-nums',
                    color: p[m.key] == null ? t.inkFaint : t.ink
                  }}>{p[m.key] == null ? '—' : compact(p[m.key])}</div>
                    </div>
                )}
                </div>
              }
            </div>
          </div>);

      })}
    </div>);

}

Object.assign(window, {
  PerfListCompact, PerfListMag,
  renderPlatformCards, renderPlatformStripe
});
