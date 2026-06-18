// 퍼포먼스 콘텐츠 상세 — 정산 상세(아코디언) 레이아웃 기반.
// 헤더: 포스터 + 제목(릴리즈 우측) + 플랫폼 합산 누적 타일.
// 본문: 플랫폼별 펼침 행 — 접힘=대표 지표, 펼침=4지표 전체(누적값).
// performance-clean.jsx(PerfTopNav) + performance-data.jsx 헬퍼에 의존.

// ── 헤더 타일 ────────────────────────────────────────────────
function PerfTile({ label, value, full, t }) {
  return (
    <div style={{
      background: t.surface, border: `0.5px solid ${t.line}`, borderRadius: 12,
      padding: '14px 18px', flex: 1, minWidth: 0,
      display: 'flex', flexDirection: 'column', gap: 8,
    }}>
      <div style={{
        fontSize: 11, color: t.inkMute, letterSpacing: 0.4,
        textTransform: 'uppercase', fontWeight: 700, fontFamily: t.sans,
      }}>{label}</div>
      <div style={{
        fontFamily: t.mono, fontSize: 24, fontWeight: 700,
        color: value == null ? t.inkFaint : t.ink, letterSpacing: -0.5,
        fontVariantNumeric: 'tabular-nums', lineHeight: 1.1,
      }}>{value == null ? '—' : compact(value)}</div>
      {value != null && full && (
        <div style={{ fontFamily: t.mono, fontSize: 11, color: t.inkFaint, fontVariantNumeric: 'tabular-nums' }}>{fullNum(value)}</div>
      )}
    </div>
  );
}

function PerfMetaCell({ label, value, last, t }) {
  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: 8,
      paddingRight: last ? 0 : 18, marginRight: last ? 0 : 18,
      borderRight: last ? 'none' : `0.5px solid ${t.line}`,
    }}>
      <span style={{ fontSize: 10, color: t.inkMute, letterSpacing: 0.4, textTransform: 'uppercase', fontWeight: 700 }}>{label}</span>
      <span style={{ color: t.ink, fontSize: 12 }}>{value}</span>
    </div>
  );
}

// ── 플랫폼 행 (항상 펼침 — 데이터가 적어 접지 않음) ─────────────
function PerfPlatformRow({ p, t = BASE_TOKENS }) {
  const has = platformHasAny(p);
  const present = presentMetrics(p);

  return (
    <div style={{ background: t.surface, border: `0.5px solid ${t.line}`, borderRadius: 14, overflow: 'hidden' }}>
      {/* HEADER */}
      <div style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ fontSize: 17, fontWeight: 700, letterSpacing: -0.3, color: t.ink }}>{p.name}</div>
        {has ? (
          <span style={{
            display: 'inline-flex', alignItems: 'center', padding: '3px 9px', borderRadius: 6,
            background: t.surfaceAlt, color: t.inkMute,
            fontFamily: t.sans, fontSize: 11, fontWeight: 600, letterSpacing: 0.2,
          }}>지표 {present.length}/4</span>
        ) : (
          <span style={{
            display: 'inline-flex', alignItems: 'center', padding: '3px 9px', borderRadius: 6,
            background: t.surfaceAlt, color: t.inkMute, border: `0.5px dashed ${t.lineStrong}`,
            fontFamily: t.sans, fontSize: 11, fontWeight: 600, letterSpacing: 0.2,
          }}>데이터 미제공</span>
        )}
        <div style={{ marginLeft: 'auto', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 10, color: t.inkMute, letterSpacing: 0.4, textTransform: 'uppercase', fontWeight: 700 }}>출시일</span>
          <span style={{ fontFamily: t.mono, fontSize: 12, color: t.ink, fontVariantNumeric: 'tabular-nums' }}>{p.releaseDate || '—'}</span>
        </div>
      </div>

      {/* 누적 4지표 */}
      <div style={{ borderTop: `0.5px solid ${t.line}` }}>
        {!has ? (
          <div style={{ padding: '24px 20px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, color: t.inkMute, fontSize: 13 }}>
            <span style={{
              width: 24, height: 24, borderRadius: 12, border: `1px dashed ${t.lineStrong}`,
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: t.inkFaint, fontFamily: t.mono, fontSize: 12,
            }}>—</span>
            이 플랫폼은 지표를 제공하지 않습니다
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)' }}>
            {METRIC_ORDER.map((m, i) => {
              const v = p[m.key];
              return (
                <div key={m.key} style={{ padding: '18px 20px', borderRight: i < 3 ? `0.5px solid ${t.line}` : 'none' }}>
                  <div style={{ fontSize: 10.5, color: t.inkMute, fontWeight: 700, letterSpacing: 0.4, textTransform: 'uppercase', marginBottom: 8 }}>{m.label}</div>
                  <div style={{
                    fontFamily: t.mono, fontSize: 22, fontWeight: 700, letterSpacing: -0.5,
                    color: v == null ? t.inkFaint : t.ink, fontVariantNumeric: 'tabular-nums', lineHeight: 1,
                  }}>{v == null ? '미제공' : compact(v)}</div>
                  {v != null && (
                    <div style={{ fontFamily: t.mono, fontSize: 11, color: t.inkFaint, marginTop: 5, fontVariantNumeric: 'tabular-nums' }}>{fullNum(v)}</div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

// ── 화면 ─────────────────────────────────────────────────────
function PerfDetailAccordion({ t = BASE_TOKENS, contentId, onBack }) {
  const c = PERF_CONTENTS.find((x) => x.id === contentId) || PERF_CONTENTS[0];
  const tot = contentTotals(c);
  const tiles = METRIC_ORDER.filter((m) => tot[m.key] != null);

  return (
    <div style={{ minHeight: '100%', background: t.bg, color: t.ink, fontFamily: t.sans }}>
      <PerfTopNav t={t} />
      <main style={{ margin: '0 auto', padding: '32px 64px 80px', maxWidth: 1280 }}>
        <button onClick={onBack} style={{
          background: 'transparent', border: 'none', padding: 0, cursor: 'pointer',
          display: 'inline-flex', alignItems: 'center', gap: 6, marginBottom: 18,
          fontFamily: t.sans, fontSize: 13, color: t.inkMute,
        }}>
          <Chevron dir="left" size={11} color={t.inkMute} />
          퍼포먼스 대시보드
        </button>

        {/* 헤더 */}
        <section style={{ display: 'flex', gap: 22, alignItems: 'flex-start', marginBottom: 36 }}>
          <Poster tone={c.posterTone} size={120} label="메인" />
          <div style={{ flex: 1, minWidth: 0, paddingTop: 2 }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 20 }}>
              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: 10, letterSpacing: 0.6, color: t.inkMute, fontFamily: t.mono, textTransform: 'uppercase', marginBottom: 8 }}>콘텐츠</div>
                <h1 style={{ fontSize: 26, fontWeight: 700, letterSpacing: -0.6, margin: 0, lineHeight: 1.15, color: t.ink }}>{c.title}</h1>
              </div>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 8, flexShrink: 0,
                padding: '6px 10px', borderRadius: 8, background: t.surfaceAlt, fontSize: 12, color: t.inkMute,
              }}>
                <span>최초 릴리즈</span>
                <span style={{ fontFamily: t.mono, color: t.ink, fontWeight: 500, fontVariantNumeric: 'tabular-nums' }}>{firstReleaseDate(c.platforms)}</span>
                <span style={{ fontSize: 11, color: t.inkFaint }}>가장 빠른 플랫폼 기준</span>
              </div>
            </div>

            <div style={{ fontSize: 10, letterSpacing: 0.6, color: t.inkMute, fontFamily: t.mono, textTransform: 'uppercase', margin: '20px 0 10px' }}>
              플랫폼 합산 누적 (제공 지표 기준)
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              {tiles.length > 0 ? tiles.map((m) => (
                <PerfTile key={m.key} label={`누적 ${m.label}`} value={tot[m.key]} full t={t} />
              )) : (
                <div style={{ flex: 1, padding: '18px', borderRadius: 12, background: t.surfaceAlt, color: t.inkMute, fontSize: 13 }}>
                  아직 제공된 지표가 없습니다.
                </div>
              )}
            </div>
          </div>
        </section>

        {/* 플랫폼별 헤더 */}
        <div style={{
          marginBottom: 14, paddingBottom: 12, borderBottom: `0.5px solid ${t.line}`,
        }}>
          <div style={{ fontSize: 10, letterSpacing: 0.6, color: t.inkMute, fontFamily: t.mono, textTransform: 'uppercase', marginBottom: 6 }}>플랫폼별 누적 지표</div>
          <div style={{ fontSize: 18, fontWeight: 700, letterSpacing: -0.3 }}>{c.platforms.length}개 플랫폼 연동</div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {c.platforms.map((p) => (
            <PerfPlatformRow key={p.name} p={p} t={t} />
          ))}
        </div>

        {/* 안내 */}
        <div style={{
          marginTop: 28, padding: '14px 18px', background: t.surfaceAlt, borderRadius: 10,
          fontSize: 12, color: t.inkMute, lineHeight: 1.6, display: 'flex', gap: 12,
        }}>
          <span style={{
            fontFamily: t.mono, fontSize: 10, color: t.inkFaint, border: `0.5px solid ${t.lineStrong}`,
            padding: '2px 7px', borderRadius: 999, height: 18, alignSelf: 'flex-start', letterSpacing: 0.4,
          }}>NOTE</span>
          <div>
            모든 수치는 출시 이후 <strong style={{ color: t.ink, fontWeight: 600 }}>누적값</strong>이며 시점별 추이는 제공되지 않습니다.
            지표는 각 플랫폼이 제공하는 범위 내에서만 표시되며, 미제공 항목은 <span style={{ fontFamily: t.mono }}>미제공</span>으로 나타냅니다.
          </div>
        </div>
      </main>
    </div>
  );
}

Object.assign(window, { PerfDetailAccordion, PerfPlatformRow, PerfTile });
