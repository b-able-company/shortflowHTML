// Content search UI — top-bar layout variants only.
// All variants keep filters as label+chip rows (per user spec).
// What varies: the relationship between search box, fav toggle, bundle action.

// ─── Top nav ────────────────────────────────────────────────────
function ContentTopNav({ t = BASE_TOKENS, active = 'content' }) {
  const items = [
    { k: 'content', label: '콘텐츠' },
    { k: 'dashboard', label: '대시보드' },
    { k: 'guide', label: '이용가이드' },
  ];
  return (
    <header style={{
      borderBottom: `0.5px solid ${t.line}`, background: t.surface,
      height: 64, display: 'flex', alignItems: 'center',
      position: 'sticky', top: 0, zIndex: 20,
    }}>
      <div style={{ width: '100%', maxWidth: 960, margin: '0 auto', padding: '0 40px', display: 'flex', alignItems: 'center', gap: 36, whiteSpace: 'nowrap' }}>
        <div style={{
          fontWeight: 800, fontSize: 22, letterSpacing: -0.8,
          fontStyle: 'italic', fontFamily: t.sans,
        }}>
          <span style={{ color: '#111827' }}>short</span><span style={{ color: '#CBD5E1' }}>flow</span>
        </div>
        <nav style={{ display: 'flex', gap: 26 }}>
          {items.map((it) => (
            <div key={it.k} style={{
              fontSize: 14, cursor: 'pointer',
              color: it.k === active ? '#E85D2C' : '#6B7280',
              fontWeight: it.k === active ? 600 : 400,
            }}>{it.label}</div>
          ))}
        </nav>
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 18, color: '#6B7280', fontSize: 14 }}>
          <span style={{ color: t.ink, fontWeight: 500, fontSize: 14 }}>Reelio</span>
          <span style={{ cursor: 'pointer', fontSize: 13 }}>로그아웃</span>
        </div>
      </div>
    </header>
  );
}

// ─── Shared bits ────────────────────────────────────────────────
function FilterChip({ active, onClick, children, t = BASE_TOKENS, size = 'md' }) {
  const padY = size === 'sm' ? 5 : 6;
  const padX = size === 'sm' ? 10 : 12;
  const fs = size === 'sm' ? 12 : 13;
  return (
    <button onClick={onClick} style={{
      padding: `${padY}px ${padX}px`, borderRadius: 8, fontFamily: t.sans, fontSize: fs,
      cursor: 'pointer', whiteSpace: 'nowrap', transition: 'all .12s',
      border: active ? '0.5px solid transparent' : `0.5px solid ${t.line}`,
      background: active ? '#E85D2C' : t.surface,
      color: active ? '#fff' : t.ink,
      fontWeight: active ? 500 : 400,
    }}>{children}</button>
  );
}

function FilterRow({ label, children, t = BASE_TOKENS, labelWidth = 60 }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 28, paddingTop: 4 }}>
      <div style={{
        width: labelWidth, fontSize: 13, color: t.inkMute, fontWeight: 500,
        paddingTop: 8, flexShrink: 0,
      }}>{label}</div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, flex: 1 }}>
        {children}
      </div>
    </div>
  );
}

function SearchInput({ value, onChange, t = BASE_TOKENS, big = false, placeholder = '제목, 키워드, 장르로 검색' }) {
  return (
    <div style={{
      position: 'relative', display: 'flex', alignItems: 'center',
      background: t.surface, border: `0.5px solid ${t.lineStrong}`,
      borderRadius: big ? 12 : 10, height: big ? 48 : 40, paddingLeft: 14, paddingRight: 14,
    }}>
      <svg width={big ? 18 : 16} height={big ? 18 : 16} viewBox="0 0 24 24" fill="none" stroke="#9CA0A6" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-3.5-3.5" />
      </svg>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        style={{
          flex: 1, border: 'none', outline: 'none', background: 'transparent',
          fontFamily: t.sans, fontSize: big ? 15 : 14, color: t.ink,
          paddingLeft: 10, height: '100%',
        }}
      />
      {value && (
        <span onClick={() => onChange('')} style={{
          cursor: 'pointer', color: t.inkFaint, fontSize: 18,
          padding: '0 4px', userSelect: 'none',
        }}>×</span>
      )}
    </div>
  );
}

function HeartIcon({ filled, size = 16, color = '#E85D2C' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={filled ? color : 'none'} stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}

function SendIcon({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 2 11 13" />
      <path d="m22 2-7 20-4-9-9-4 20-7z" />
    </svg>
  );
}

function FavButton({ active, onClick, t, height = 40, label = '즐겨찾기만' }) {
  return (
    <button onClick={onClick} style={{
      height, padding: '0 14px', borderRadius: 10,
      border: active ? '0.5px solid transparent' : `0.5px solid ${t.lineStrong}`,
      background: active ? '#FFF1EC' : t.surface,
      cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 7,
      fontFamily: t.sans, fontSize: 13,
      color: active ? '#E85D2C' : t.ink, fontWeight: active ? 600 : 500,
    }}>
      <HeartIcon filled={active} size={13} />
      {label}
    </button>
  );
}

function BundleButton({ active, onClick, t, height = 40, label }) {
  return (
    <button onClick={onClick} style={{
      height, padding: '0 16px', borderRadius: 10,
      border: 'none', background: active ? t.ink : '#E85D2C',
      cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 7,
      fontFamily: t.sans, fontSize: 13, color: '#fff', fontWeight: 600,
    }}>
      <SendIcon size={13} />
      {label || (active ? '선택 취소' : '묶음제안')}
    </button>
  );
}

function ContentCard({ c, t = BASE_TOKENS, selected, onToggleSelect, selectMode }) {
  return (
    <div style={{ position: 'relative', cursor: 'pointer' }}
      onClick={() => selectMode && onToggleSelect && onToggleSelect(c.id)}>
      <div style={{
        position: 'relative', width: '100%', aspectRatio: '3/4',
        borderRadius: 10, overflow: 'hidden',
        background: `linear-gradient(160deg, ${POSTER_TONES[c.posterTone].bg} 0%, ${shade(POSTER_TONES[c.posterTone].bg, -12)} 100%)`,
        boxShadow: selected ? `0 0 0 2px #E85D2C` : `inset 0 0 0 0.5px rgba(0,0,0,0.08)`,
      }}>
        <div style={{
          position: 'absolute', top: 8, right: 8,
          width: 28, height: 28, borderRadius: 14,
          background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(4px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer',
        }} onClick={(e) => e.stopPropagation()}>
          <HeartIcon filled={c.favorited} size={14} />
        </div>
        {selectMode && (
          <div style={{
            position: 'absolute', top: 8, left: 8,
            width: 22, height: 22, borderRadius: 11,
            background: selected ? '#E85D2C' : 'rgba(255,255,255,0.85)',
            border: selected ? 'none' : `1px solid rgba(0,0,0,0.15)`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            {selected && (
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2.5 6.5l2.5 2.5 4.5-5" />
              </svg>
            )}
          </div>
        )}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          padding: '24px 14px 14px',
          background: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.55) 100%)',
          fontFamily: t.sans, fontSize: 18, fontWeight: 800,
          color: '#fff', letterSpacing: -0.4, lineHeight: 1.1,
          textShadow: '0 1px 2px rgba(0,0,0,0.4)',
        }}>{c.title.length > 12 ? c.title.slice(0, 12) + '…' : c.title}</div>
      </div>
      <div style={{ padding: '10px 2px 0' }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: t.ink, letterSpacing: -0.2, lineHeight: 1.3 }}>{c.title}</div>
        <div style={{ fontSize: 11, color: t.inkMute, marginTop: 4, lineHeight: 1.4 }}>
          {c.genres.slice(0, 3).join(', ')}{c.genres.length > 3 ? '…' : ''}
        </div>
      </div>
    </div>
  );
}

function useContentFilters() {
  const [search, setSearch] = React.useState('');
  const [type, setType] = React.useState('숏드라마');
  const [sort, setSort] = React.useState('등록순');
  const [genre, setGenre] = React.useState('전체');
  const [year, setYear] = React.useState('전체');
  const [lang, setLang] = React.useState('전체');
  const [favOnly, setFavOnly] = React.useState(false);
  const [selectMode, setSelectMode] = React.useState(false);
  const [selected, setSelected] = React.useState(new Set());

  const filtered = React.useMemo(() => {
    return CONTENT_LIBRARY.filter((c) => {
      if (search && !c.title.includes(search) && !c.genres.some((g) => g.includes(search))) return false;
      if (type && c.type !== type) return false;
      if (genre !== '전체' && !c.genres.includes(genre)) return false;
      if (year !== '전체' && c.year !== year) return false;
      if (lang !== '전체' && c.language !== lang) return false;
      if (favOnly && !c.favorited) return false;
      return true;
    });
  }, [search, type, sort, genre, year, lang, favOnly]);

  const toggleSelect = (id) => {
    const n = new Set(selected);
    if (n.has(id)) n.delete(id); else n.add(id);
    setSelected(n);
  };

  return {
    search, setSearch, type, setType, sort, setSort, genre, setGenre,
    year, setYear, lang, setLang, favOnly, setFavOnly,
    selectMode, setSelectMode, selected, setSelected, toggleSelect, filtered,
  };
}

// FilterStack — the 5 label+chip rows used by all variants.
function FilterStack({ f, t }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      <FilterRow label="종류" t={t}>
        {TYPES.map((tt) => <FilterChip key={tt} t={t} active={f.type === tt} onClick={() => f.setType(tt)}>{tt}</FilterChip>)}
      </FilterRow>
      <FilterRow label="정렬" t={t}>
        {['등록순','최신순'].map((s) => <FilterChip key={s} t={t} active={f.sort === s} onClick={() => f.setSort(s)}>{s}</FilterChip>)}
      </FilterRow>
      <FilterRow label="장르" t={t}>
        <FilterChip t={t} active={f.genre === '전체'} onClick={() => f.setGenre('전체')}>전체</FilterChip>
        {GENRES.map((g) => <FilterChip key={g} t={t} active={f.genre === g} onClick={() => f.setGenre(g)}>{g}</FilterChip>)}
      </FilterRow>
      <FilterRow label="연도" t={t}>
        <FilterChip t={t} active={f.year === '전체'} onClick={() => f.setYear('전체')}>전체</FilterChip>
        {YEARS.map((y) => <FilterChip key={y} t={t} active={f.year === y} onClick={() => f.setYear(y)}>{y}</FilterChip>)}
      </FilterRow>
      <FilterRow label="언어" t={t}>
        <FilterChip t={t} active={f.lang === '전체'} onClick={() => f.setLang('전체')}>전체</FilterChip>
        {LANGUAGES.map((l) => <FilterChip key={l} t={t} active={f.lang === l} onClick={() => f.setLang(l)}>{l}</FilterChip>)}
      </FilterRow>
    </div>
  );
}

function StickyActionBar({ f, t }) {
  if (!(f.selectMode && f.selected.size > 0)) return null;
  return (
    <div style={{
      position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)',
      background: t.ink, color: '#fff', padding: '12px 16px 12px 20px',
      borderRadius: 12, display: 'flex', alignItems: 'center', gap: 16,
      boxShadow: '0 12px 40px rgba(0,0,0,0.25)', zIndex: 30,
    }}>
      <span style={{ fontSize: 14, fontWeight: 500 }}>
        <span style={{ fontFamily: t.mono, fontWeight: 600 }}>{f.selected.size}</span>편 선택됨
      </span>
      <span style={{ width: 0.5, height: 18, background: 'rgba(255,255,255,0.2)' }} />
      <button onClick={() => f.setSelected(new Set())} style={{
        border: 'none', background: 'transparent', color: 'rgba(255,255,255,0.7)',
        fontSize: 13, cursor: 'pointer', fontFamily: t.sans,
      }}>전체 해제</button>
      <button style={{
        padding: '8px 16px', borderRadius: 8, border: 'none',
        background: '#E85D2C', color: '#fff', fontWeight: 600, fontSize: 13,
        cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6,
      }}>
        <SendIcon size={13} />
        제안서 만들기
      </button>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// VARIANT A: 한 줄 — [큰 검색바] [즐겨찾기] [묶음제안]
// 가장 단순한 안. 검색이 가장 크고, 옆에 액션 두 개 나란히.
// ═══════════════════════════════════════════════════════════════
function ContentSearchA({ t = BASE_TOKENS }) {
  const f = useContentFilters();
  return (
    <div style={{ minHeight: '100%', background: t.bg, color: t.ink, fontFamily: t.sans }}>
      <ContentTopNav t={t} active="content" />
      <main style={{ margin: '0 auto', padding: '32px 40px 80px', maxWidth: 960 }}>
        {/* Single row — search dominant, actions on the right */}
        <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 22 }}>
          <div style={{ flex: 1 }}>
            <SearchInput value={f.search} onChange={f.setSearch} t={t} big />
          </div>
          <FavButton active={f.favOnly} onClick={() => f.setFavOnly(!f.favOnly)} t={t} height={48} />
          <BundleButton active={f.selectMode} onClick={() => f.setSelectMode(!f.selectMode)} t={t} height={48} />
        </div>

        {/* Filters */}
        <div style={{
          background: t.surface, border: `0.5px solid ${t.line}`, borderRadius: 14,
          padding: '16px 22px', marginBottom: 28,
        }}>
          <FilterStack f={f} t={t} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }}>
          {f.filtered.map((c) => (
            <ContentCard key={c.id} c={c} t={t}
              selected={f.selected.has(c.id)} onToggleSelect={f.toggleSelect}
              selectMode={f.selectMode} />
          ))}
        </div>
        <StickyActionBar f={f} t={t} />
      </main>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// VARIANT B: 검색바를 묶음제안과 한 묶음으로 — "찾고 → 묶기" 흐름
// 위쪽: 작은 즐겨찾기 토글(보조)
// 메인: [검색바 ──────────────] [묶음제안 큰 버튼]
// 묶음제안이 검색의 결과 액션처럼 보이게 함.
// ═══════════════════════════════════════════════════════════════
function ContentSearchB({ t = BASE_TOKENS }) {
  const f = useContentFilters();
  return (
    <div style={{ minHeight: '100%', background: t.bg, color: t.ink, fontFamily: t.sans }}>
      <ContentTopNav t={t} active="content" />
      <main style={{ margin: '0 auto', padding: '32px 40px 80px', maxWidth: 960 }}>
        {/* Top row: title + secondary fav toggle */}
        <div style={{
          display: 'flex', alignItems: 'baseline', justifyContent: 'space-between',
          marginBottom: 16,
        }}>
          <span style={{ fontFamily: t.mono, fontSize: 13, color: t.inkMute, letterSpacing: 0.2 }}>{f.filtered.length}편</span>
          <button onClick={() => f.setFavOnly(!f.favOnly)} style={{
            background: 'transparent', border: 'none', cursor: 'pointer',
            display: 'inline-flex', alignItems: 'center', gap: 6,
            fontFamily: t.sans, fontSize: 13,
            color: f.favOnly ? '#E85D2C' : t.inkMute,
            fontWeight: f.favOnly ? 600 : 500,
            padding: '6px 4px',
          }}>
            <HeartIcon filled={f.favOnly} size={14} />
            {f.favOnly ? '즐겨찾기만 보는 중' : '즐겨찾기만 보기'}
          </button>
        </div>

        {/* Search + bundle paired */}
        <div style={{ display: 'flex', gap: 10, marginBottom: 22 }}>
          <div style={{ flex: 1 }}>
            <SearchInput value={f.search} onChange={f.setSearch} t={t} big />
          </div>
          <BundleButton active={f.selectMode} onClick={() => f.setSelectMode(!f.selectMode)} t={t} height={48} />
        </div>

        <div style={{
          background: t.surface, border: `0.5px solid ${t.line}`, borderRadius: 14,
          padding: '16px 22px', marginBottom: 28,
        }}>
          <FilterStack f={f} t={t} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }}>
          {f.filtered.map((c) => (
            <ContentCard key={c.id} c={c} t={t}
              selected={f.selected.has(c.id)} onToggleSelect={f.toggleSelect}
              selectMode={f.selectMode} />
          ))}
        </div>
        <StickyActionBar f={f} t={t} />
      </main>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// VARIANT C: 2단 — 1행 [제목 · 카운트 · 액션 우측]
//                  2행 [검색바 풀와이드]
// 액션이 페이지 헤더 액션처럼 명확히 분리됨. 검색바는 자체로 강조.
// ═══════════════════════════════════════════════════════════════
function ContentSearchC({ t = BASE_TOKENS }) {
  const f = useContentFilters();
  return (
    <div style={{ minHeight: '100%', background: t.bg, color: t.ink, fontFamily: t.sans }}>
      <ContentTopNav t={t} active="content" />
      <main style={{ margin: '0 auto', padding: '32px 40px 80px', maxWidth: 960 }}>
        {/* Header row: title left · actions right */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          marginBottom: 18,
        }}>
          <span style={{ fontFamily: t.mono, fontSize: 13, color: t.inkMute, letterSpacing: 0.2 }}>{f.filtered.length}편</span>
          <div style={{ display: 'flex', gap: 8 }}>
            <FavButton active={f.favOnly} onClick={() => f.setFavOnly(!f.favOnly)} t={t} height={40} />
            <BundleButton active={f.selectMode} onClick={() => f.setSelectMode(!f.selectMode)} t={t} height={40} />
          </div>
        </div>

        {/* Full-width search bar */}
        <div style={{ marginBottom: 22 }}>
          <SearchInput value={f.search} onChange={f.setSearch} t={t} big />
        </div>

        <div style={{
          background: t.surface, border: `0.5px solid ${t.line}`, borderRadius: 14,
          padding: '16px 22px', marginBottom: 28,
        }}>
          <FilterStack f={f} t={t} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }}>
          {f.filtered.map((c) => (
            <ContentCard key={c.id} c={c} t={t}
              selected={f.selected.has(c.id)} onToggleSelect={f.toggleSelect}
              selectMode={f.selectMode} />
          ))}
        </div>
        <StickyActionBar f={f} t={t} />
      </main>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// VARIANT D: 검색바가 필터 카드의 일부 — 통합된 "툴박스" 느낌
// 검색바 + 5개 필터행 한 카드 안에. 액션은 카드 외부 우상단.
// 검색과 필터를 하나의 "조회 도구"로 묶어 인지하게 함.
// ═══════════════════════════════════════════════════════════════
function ContentSearchD({ t = BASE_TOKENS }) {
  const f = useContentFilters();
  return (
    <div style={{ minHeight: '100%', background: t.bg, color: t.ink, fontFamily: t.sans }}>
      <ContentTopNav t={t} active="content" />
      <main style={{ margin: '0 auto', padding: '32px 40px 80px', maxWidth: 960 }}>
        {/* Header */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          marginBottom: 16,
        }}>
          <span style={{ fontFamily: t.mono, fontSize: 13, color: t.inkMute, letterSpacing: 0.2 }}>{f.filtered.length}편</span>
          <div style={{ display: 'flex', gap: 8 }}>
            <FavButton active={f.favOnly} onClick={() => f.setFavOnly(!f.favOnly)} t={t} height={38} />
            <BundleButton active={f.selectMode} onClick={() => f.setSelectMode(!f.selectMode)} t={t} height={38} />
          </div>
        </div>

        {/* Unified search + filters card */}
        <div style={{
          background: t.surface, border: `0.5px solid ${t.line}`, borderRadius: 14,
          padding: '14px 14px 18px', marginBottom: 28,
        }}>
          <div style={{ marginBottom: 14, padding: '0 6px' }}>
            <SearchInput value={f.search} onChange={f.setSearch} t={t} />
          </div>
          <div style={{ height: 0.5, background: t.line, marginBottom: 14 }} />
          <div style={{ padding: '0 8px' }}>
            <FilterStack f={f} t={t} />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }}>
          {f.filtered.map((c) => (
            <ContentCard key={c.id} c={c} t={t}
              selected={f.selected.has(c.id)} onToggleSelect={f.toggleSelect}
              selectMode={f.selectMode} />
          ))}
        </div>
        <StickyActionBar f={f} t={t} />
      </main>
    </div>
  );
}

Object.assign(window, {
  ContentTopNav, ContentSearchA, ContentSearchB, ContentSearchC, ContentSearchD,
  ContentCard, FilterChip, FilterRow, SearchInput, HeartIcon,
});
