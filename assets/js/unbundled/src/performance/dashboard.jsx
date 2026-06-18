// 퍼포먼스 대시보드 (제작사) — 정산 대시보드와 동일한 디자인 언어.
// 화면 1: 콘텐츠 목록(카드)  →  화면 2: 콘텐츠별 연동 플랫폼 퍼포먼스(누적값).
// 지표 4종 views/follows/likes/ads 는 모두 선택값. 전부 누적값이라 시계열 없음.
// tokens.jsx, ui.jsx(Poster·Chevron), performance-data.jsx 에 의존.

// ── 공유 TopNav 와 동일한 외형 ───────────────────────────────
function PerfTopNav({ t = BASE_TOKENS }) {
  const items = [
    { k: 'my', label: '내 콘텐츠' },
    { k: 'dashboard', label: '대시보드' },
    { k: 'ai', label: 'AI 대본분석' },
    { k: 'guide', label: '이용가이드' },
  ];
  const active = 'dashboard';
  const ic = { width: 18, height: 18, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.6, strokeLinecap: 'round', strokeLinejoin: 'round', style: { cursor: 'pointer' } };
  return (
    <header style={{
      borderBottom: `0.5px solid ${t.line}`, background: t.surface,
      padding: '0 80px', height: 64, display: 'flex', alignItems: 'center',
      position: 'sticky', top: 0, zIndex: 20,
    }}>
      <div style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 40, whiteSpace: 'nowrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 40, flexShrink: 0 }}>
          <div style={{ fontWeight: 800, fontSize: 22, letterSpacing: -0.8, fontStyle: 'italic', fontFamily: t.sans }}>
            <span style={{ color: '#111827' }}>short</span><span style={{ color: '#CBD5E1' }}>flow</span>
          </div>
          <nav style={{ display: 'flex', gap: 28, flexShrink: 0 }}>
            {items.map((it) => (
              <div key={it.k} style={{
                fontSize: 14, cursor: 'pointer', whiteSpace: 'nowrap',
                color: it.k === active ? t.ink : '#6B7280',
                fontWeight: it.k === active ? 600 : 400,
              }}>{it.label}</div>
            ))}
          </nav>
        </div>
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 20, color: '#6B7280', fontSize: 14, flexShrink: 0 }}>
          <svg {...ic}><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" /><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" /></svg>
          <svg {...ic}><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" /></svg>
          <span style={{ cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="9" /><path d="M3 12h18" /><path d="M12 3a14 14 0 0 1 0 18a14 14 0 0 1 0-18" />
            </svg>
            한국어
            <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M3 4.5l3 3 3-3" /></svg>
          </span>
          <span style={{ color: t.ink, fontWeight: 500, fontSize: 14 }}>QuickFrame Studio</span>
          <span style={{ cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            로그아웃
          </span>
        </div>
      </div>
    </header>
  );
}

// 작은 플랫폼 도트 스택
function PlatformDots({ platforms, t }) {
  return (
    <div style={{ display: 'flex' }}>
      {platforms.slice(0, 4).map((p, idx) => {
        const ps = platformStyle(p.name);
        return (
          <span key={p.name} title={p.name} style={{
            width: 14, height: 14, borderRadius: 7, background: ps.dot,
            border: `1.5px solid ${t.surface}`, marginLeft: idx === 0 ? 0 : -5,
          }} />
        );
      })}
      {platforms.length > 4 && (
        <span style={{
          marginLeft: -5, height: 14, padding: '0 5px', borderRadius: 7,
          background: t.surfaceAlt, border: `1.5px solid ${t.surface}`,
          fontFamily: t.mono, fontSize: 9, color: t.inkMute,
          display: 'inline-flex', alignItems: 'center',
        }}>+{platforms.length - 4}</span>
      )}
    </div>
  );
}

// 페이지 머리말 (정산 대시보드와 동일 패턴)
function PageHead({ crumb, title, desc, t }) {
  return (
    <div style={{ marginBottom: 28 }}>
      <div style={{
        fontSize: 10.5, color: t.inkMute, marginBottom: 6,
        fontFamily: t.mono, letterSpacing: 0.5, textTransform: 'uppercase',
      }}>{crumb}</div>
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 18, flexWrap: 'wrap' }}>
        <h1 style={{ fontSize: 32, fontWeight: 700, letterSpacing: -0.9, margin: 0, color: t.ink, lineHeight: 1.1 }}>{title}</h1>
        <div style={{ fontSize: 13.5, color: t.inkMute, paddingBottom: 6, lineHeight: 1.5 }}>{desc}</div>
      </div>
    </div>
  );
}

// 섹션 머리말 (eyebrow + 제목 + 우측 슬롯)
function SectionHead({ eyebrow, title, right, t }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
      marginBottom: 14, paddingBottom: 12, borderBottom: `0.5px solid ${t.line}`, gap: 16, flexWrap: 'wrap',
    }}>
      <div>
        <div style={{
          fontSize: 10.5, letterSpacing: 0.6, color: t.inkMute,
          fontFamily: t.mono, textTransform: 'uppercase', marginBottom: 6,
        }}>{eyebrow}</div>
        <div style={{ fontSize: 18, fontWeight: 700, letterSpacing: -0.3, color: t.ink }}>{title}</div>
      </div>
      {right}
    </div>
  );
}

// ── 화면 1: 콘텐츠 목록 ─────────────────────────────────────
function MetricMini({ label, value, t }) {
  return (
    <div style={{ minWidth: 0 }}>
      <div style={{
        fontSize: 10.5, color: t.inkMute, letterSpacing: 0.5,
        textTransform: 'uppercase', fontWeight: 700, marginBottom: 6, fontFamily: t.sans,
      }}>{label}</div>
      <div style={{
        fontFamily: t.mono, fontSize: 24, fontWeight: 700,
        color: value == null ? t.inkFaint : t.ink,
        letterSpacing: -0.5, fontVariantNumeric: 'tabular-nums', lineHeight: 1,
      }}>{value == null ? '—' : compact(value)}</div>
    </div>
  );
}

function PerfCard({ c, t, onClick }) {
  const tot = contentTotals(c);
  return (
    <div onClick={onClick} style={{
      background: t.surface, border: `0.5px solid ${t.line}`, borderRadius: 14, padding: 16,
      display: 'flex', gap: 14, alignItems: 'stretch', cursor: 'pointer',
      transition: 'box-shadow .12s ease, border-color .12s ease',
    }}
    onMouseEnter={(e) => { e.currentTarget.style.borderColor = t.lineStrong; e.currentTarget.style.boxShadow = '0 4px 14px rgba(15,17,21,0.06)'; }}
    onMouseLeave={(e) => { e.currentTarget.style.borderColor = t.line; e.currentTarget.style.boxShadow = 'none'; }}>
      <Poster tone={c.posterTone} size={68} label="메인" />
      <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
        <div style={{
          fontSize: 15, fontWeight: 700, letterSpacing: -0.3, color: t.ink, marginBottom: 4,
          overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
        }}>{c.title}</div>
        <div style={{
          fontSize: 11.5, color: t.inkMute, marginBottom: 'auto',
          overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
        }}>{c.subtitle}</div>

        <div style={{ marginTop: 12 }}>
          <div style={{
            fontSize: 10, color: t.inkMute, letterSpacing: 0.5,
            textTransform: 'uppercase', fontWeight: 600, marginBottom: 3,
          }}>누적 조회수</div>
          <div style={{
            fontFamily: t.mono, fontSize: 22, fontWeight: 700,
            color: tot.views == null ? t.inkFaint : t.ink,
            letterSpacing: -0.5, fontVariantNumeric: 'tabular-nums',
          }}>{tot.views == null ? '데이터 없음' : compact(tot.views)}</div>
        </div>

        <div style={{
          marginTop: 12, paddingTop: 12, borderTop: `0.5px solid ${t.line}`,
          display: 'flex', alignItems: 'center', gap: 10,
        }}>
          <span style={{
            fontSize: 11.5, color: t.inkMute,
            overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
          }}>{platformSummary(c.platforms)}</span>
          <span style={{ marginLeft: 'auto', fontSize: 11, color: t.inkFaint, fontFamily: t.mono, fontVariantNumeric: 'tabular-nums', flexShrink: 0 }}>{c.lastUpdate}</span>
        </div>
      </div>
    </div>
  );
}

function PerfDashClean({ t = BASE_TOKENS, onOpen }) {
  const [sort, setSort] = React.useState('views'); // views | recent
  const list = [...PERF_CONTENTS].sort((a, b) => {
    if (sort === 'recent') return b.lastUpdate.localeCompare(a.lastUpdate);
    const av = contentTotals(a).views || 0, bv = contentTotals(b).views || 0;
    return bv - av;
  });

  const sortBtn = (k, label) => (
    <button onClick={() => setSort(k)} style={{
      background: sort === k ? t.surface : 'transparent',
      border: `0.5px solid ${sort === k ? t.lineStrong : 'transparent'}`,
      padding: '7px 12px', borderRadius: 8, cursor: 'pointer',
      fontFamily: t.sans, fontSize: 12, fontWeight: 500,
      color: sort === k ? t.inkMute : t.inkFaint, whiteSpace: 'nowrap',
    }}>{label}</button>
  );

  return (
    <div style={{ minHeight: '100%', background: t.bg, color: t.ink, fontFamily: t.sans }}>
      <PerfTopNav t={t} />
      <main style={{ margin: '0 auto', padding: '36px 64px 80px', maxWidth: 1280 }}>
        <PageHead
          t={t}
          crumb="대시보드 · 퍼포먼스"
          title="퍼포먼스 대시보드"
          desc={<span><span style={{ color: t.ink, fontWeight: 600 }}>QuickFrame Studio</span><span style={{ margin: '0 8px', color: t.inkFaint }}>·</span>각 플랫폼에 연동된 콘텐츠의 누적 성과를 한눈에 확인하세요</span>}
        />

        <SectionHead
          t={t}
          eyebrow="내 콘텐츠"
          title={`${PERF_CONTENTS.length}편 · 플랫폼 누적 성과 기준`}
          right={<div style={{ display: 'flex', gap: 8 }}>{sortBtn('views', '누적 조회순')}{sortBtn('recent', '최근 업데이트순')}</div>}
        />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
          {list.map((c) => (
            <PerfCard key={c.id} c={c} t={t} onClick={() => onOpen && onOpen(c.id)} />
          ))}
        </div>
      </main>
    </div>
  );
}

// ── 화면 2: 콘텐츠 상세 (연동 플랫폼별 누적 퍼포먼스) ──────────
function PlatformPerfTableClean({ platforms, t }) {
  const cols = [
    { key: 'views', label: '조회수' },
    { key: 'follows', label: '팔로우수' },
    { key: 'likes', label: '좋아요수' },
    { key: 'ads', label: '광고수' },
  ];
  return (
    <div style={{ background: t.surface, border: `0.5px solid ${t.line}`, borderRadius: 14, overflow: 'hidden' }}>
      <div style={{
        display: 'grid', gridTemplateColumns: '1.5fr repeat(4, 1fr) 120px',
        padding: '13px 22px', fontSize: 10.5, color: t.inkMute, fontWeight: 700,
        textTransform: 'uppercase', letterSpacing: 0.6,
        borderBottom: `0.5px solid ${t.line}`, background: t.surfaceAlt,
      }}>
        <div>플랫폼</div>
        {cols.map((c) => (<div key={c.key} style={{ textAlign: 'right' }}>{c.label}</div>))}
        <div style={{ textAlign: 'right' }}>출시일</div>
      </div>
      {platforms.map((p, i) => {
        const ps = platformStyle(p.name);
        const hasData = platformHasAny(p);
        return (
          <div key={p.name} style={{
            display: 'grid', gridTemplateColumns: '1.5fr repeat(4, 1fr) 120px',
            padding: '17px 22px', alignItems: 'center',
            borderBottom: i === platforms.length - 1 ? 'none' : `0.5px solid ${t.line}`,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ width: 9, height: 9, borderRadius: 5, background: ps.dot, flexShrink: 0 }} />
              <div style={{ fontSize: 14, fontWeight: 700, color: t.ink, letterSpacing: -0.1 }}>{p.name}</div>
            </div>
            {!hasData ? (
              <div style={{
                gridColumn: 'span 4', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                fontSize: 12.5, color: t.inkFaint,
              }}>
                <span style={{
                  width: 18, height: 18, borderRadius: 9, border: `1px dashed ${t.lineStrong}`,
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: t.mono, fontSize: 11, color: t.inkFaint,
                }}>—</span>
                데이터 미제공
              </div>
            ) : (
              cols.map((c) => (
                <div key={c.key} style={{
                  textAlign: 'right', fontFamily: t.mono, fontSize: 15, fontWeight: 600,
                  color: p[c.key] == null ? t.inkFaint : t.ink, fontVariantNumeric: 'tabular-nums',
                }} title={p[c.key] == null ? '미제공' : fullNum(p[c.key])}>{p[c.key] == null ? '—' : compact(p[c.key])}</div>
              ))
            )}
            <div style={{
              textAlign: 'right', fontFamily: t.mono, fontSize: 12, color: t.inkMute, fontVariantNumeric: 'tabular-nums',
            }}>{p.releaseDate || '—'}</div>
          </div>
        );
      })}
    </div>
  );
}

function PerfDetailClean({ t = BASE_TOKENS, contentId, onBack, renderPlatforms = null }) {
  const c = PERF_CONTENTS.find((x) => x.id === contentId) || PERF_CONTENTS[0];
  const tot = contentTotals(c);
  const agg = [
    { key: 'views', label: '조회수', value: tot.views },
    { key: 'follows', label: '팔로우수', value: tot.follows },
    { key: 'likes', label: '좋아요수', value: tot.likes },
    { key: 'ads', label: '광고수', value: tot.ads },
  ];

  return (
    <div style={{ minHeight: '100%', background: t.bg, color: t.ink, fontFamily: t.sans }}>
      <PerfTopNav t={t} />
      <main style={{ margin: '0 auto', padding: '36px 64px 80px', maxWidth: 1280 }}>
        <div style={{
          fontSize: 10.5, color: t.inkMute, marginBottom: 14,
          fontFamily: t.mono, letterSpacing: 0.5, textTransform: 'uppercase',
        }}>대시보드 · 퍼포먼스 · 콘텐츠 상세</div>

        <button onClick={onBack} style={{
          background: 'transparent', border: 'none', padding: 0, cursor: 'pointer',
          display: 'inline-flex', alignItems: 'center', gap: 6, marginBottom: 20,
          fontFamily: t.sans, fontSize: 13, color: t.inkMute,
        }}>
          <Chevron dir="left" size={11} color={t.inkMute} />
          퍼포먼스 대시보드
        </button>

        {/* 헤더 */}
        <div style={{ display: 'flex', gap: 18, alignItems: 'center', marginBottom: 28 }}>
          <Poster tone={c.posterTone} size={76} label="메인" />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 28, fontWeight: 700, letterSpacing: -0.7, lineHeight: 1.15 }}>{c.title}</div>
            <div style={{ fontSize: 13, color: t.inkMute, marginTop: 7 }}>
              {c.subtitle}<span style={{ margin: '0 8px', color: t.inkFaint }}>·</span>
              연동 플랫폼 {c.platforms.length}곳 · 지표 제공 {tot.liveCount}곳
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 10.5, color: t.inkMute, marginBottom: 5, letterSpacing: 0.5, textTransform: 'uppercase', fontWeight: 700 }}>
              마지막 업데이트
            </div>
            <div style={{ fontFamily: t.mono, fontSize: 13, color: t.ink, fontVariantNumeric: 'tabular-nums' }}>{c.lastUpdate}</div>
          </div>
        </div>

        {/* 합산 누적 strip */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
          background: t.surface, border: `0.5px solid ${t.line}`, borderRadius: 16,
          marginBottom: 36, overflow: 'hidden',
        }}>
          {agg.map((m, i) => (
            <div key={m.key} style={{
              padding: '20px 24px', borderRight: i < 3 ? `0.5px solid ${t.line}` : 'none',
            }}>
              <div style={{
                fontSize: 10.5, color: t.inkMute, fontWeight: 700,
                letterSpacing: 0.5, textTransform: 'uppercase', marginBottom: 10,
              }}>플랫폼 합산 {m.label}</div>
              <div style={{
                fontFamily: t.mono, fontSize: 30, fontWeight: 700, letterSpacing: -1,
                color: m.value == null ? t.inkFaint : t.ink, fontVariantNumeric: 'tabular-nums', lineHeight: 1,
              }}>{m.value == null ? '—' : compact(m.value)}</div>
              {m.value != null && (
                <div style={{ fontFamily: t.mono, fontSize: 11, color: t.inkFaint, marginTop: 5, fontVariantNumeric: 'tabular-nums' }}>{fullNum(m.value)}</div>
              )}
            </div>
          ))}
        </div>

        <SectionHead
          t={t}
          eyebrow="연동 플랫폼"
          title={`${c.platforms.length}개 플랫폼 · 누적 지표`}
          right={<div style={{ fontFamily: t.mono, fontSize: 11, color: t.inkMute, letterSpacing: 0.2, paddingBottom: 4 }}>지표 제공 {tot.liveCount} / {c.platforms.length}</div>}
        />

        {renderPlatforms ? renderPlatforms(c, t) : <PlatformPerfTableClean platforms={c.platforms} t={t} />}

        {/* 안내 */}
        <div style={{
          marginTop: 28, padding: '14px 18px', background: t.surfaceAlt, borderRadius: 10,
          fontSize: 12, color: t.inkMute, lineHeight: 1.6, display: 'flex', gap: 12,
        }}>
          <span style={{
            fontFamily: t.mono, fontSize: 10, color: t.inkFaint,
            border: `0.5px solid ${t.lineStrong}`, padding: '2px 7px', borderRadius: 999,
            height: 18, alignSelf: 'flex-start', letterSpacing: 0.4,
          }}>NOTE</span>
          <div>
            모든 수치는 출시 이후 <strong style={{ color: t.ink, fontWeight: 600 }}>누적값</strong>이며 시점별 추이는 제공되지 않습니다.
            지표는 각 플랫폼이 제공하는 범위 내에서만 표시되며, 미제공 항목은 <span style={{ fontFamily: t.mono }}>—</span> 로 나타냅니다.
          </div>
        </div>
      </main>
    </div>
  );
}

Object.assign(window, { PerfTopNav, PerfDashClean, PerfDetailClean, PlatformPerfTableClean, PerfCard, PageHead, SectionHead, PlatformDots, MetricMini });
