// Three card patterns for "add to cart" on content search.
// Removes the bundle/select-mode flow; cart replaces it.
// Reuses primitives from content-search-ui.jsx, content-search-variants.jsx, cart-ui.jsx.

// ─── Hook: filters + cart (no selectMode) ─────────────────────
function useCartFilters(initialCart = ['c3', 'c5']) {
  const [search, setSearch] = React.useState('');
  const [type, setType] = React.useState('숏드라마');
  const [sort, setSort] = React.useState('등록순');
  const [genre, setGenre] = React.useState('전체');
  const [year, setYear] = React.useState('전체');
  const [lang, setLang] = React.useState('전체');
  const [favOnly, setFavOnly] = React.useState(false);
  const [cart, setCart] = React.useState(new Set(initialCart));

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

  const toggleCart = (id) => {
    const n = new Set(cart);
    if (n.has(id)) n.delete(id); else n.add(id);
    setCart(n);
  };

  return {
    search, setSearch, type, setType, sort, setSort, genre, setGenre,
    year, setYear, lang, setLang, favOnly, setFavOnly,
    cart, toggleCart, filtered,
  };
}

// ─── Cart-aware sticky bar (replaces 제안서 만들기 bar) ────────
function CartStickyBar({ f, t }) {
  if (f.cart.size === 0) return null;
  return (
    <div style={{
      position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)',
      background: t.ink, color: '#fff', padding: '12px 14px 12px 20px',
      borderRadius: 12, display: 'flex', alignItems: 'center', gap: 14,
      boxShadow: '0 12px 40px rgba(0,0,0,0.25)', zIndex: 30,
    }}>
      <CartIcon size={15} />
      <span style={{ fontSize: 14, fontWeight: 500 }}>
        <span style={{ fontFamily: t.mono, fontWeight: 600 }}>{f.cart.size}</span>편 담김
      </span>
      <button style={{
        padding: '8px 14px', borderRadius: 8, border: 'none',
        background: '#E85D2C', color: '#fff', fontWeight: 600, fontSize: 13,
        cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6,
      }}>
        장바구니로 가기
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 12h14M13 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
}

// ─── Plus icon ─────────────────────────────────────────────────
function PlusIcon({ size = 14, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

// ═══════════════════════════════════════════════════════════════
// CARD A: Twin icons — heart + cart, both at top-right of poster
// ═══════════════════════════════════════════════════════════════
function ContentCardA({ c, t, inCart, onToggleCart }) {
  return (
    <div style={{ position: 'relative' }}>
      <div style={{
        position: 'relative', width: '100%', aspectRatio: '3/4',
        borderRadius: 10, overflow: 'hidden',
        background: `linear-gradient(160deg, ${POSTER_TONES[c.posterTone].bg} 0%, ${shade(POSTER_TONES[c.posterTone].bg, -12)} 100%)`,
        boxShadow: `inset 0 0 0 0.5px rgba(0,0,0,0.08)`,
      }}>
        {/* Top-right pair: heart + cart */}
        <div style={{
          position: 'absolute', top: 8, right: 8,
          display: 'flex', flexDirection: 'column', gap: 6,
        }}>
          <button style={{
            width: 28, height: 28, borderRadius: 14, border: 'none',
            background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(4px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', padding: 0,
          }}>
            <HeartIcon filled={c.favorited} size={14} />
          </button>
          <button onClick={() => onToggleCart(c.id)} style={{
            width: 28, height: 28, borderRadius: 14, border: 'none',
            background: inCart ? '#E85D2C' : 'rgba(255,255,255,0.85)',
            backdropFilter: 'blur(4px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', color: inCart ? '#fff' : '#1A1A1A', padding: 0,
          }}>
            {inCart ? <CheckIcon size={13} color="#fff" weight={2.5} /> : <CartIcon size={14} />}
          </button>
        </div>
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

// ═══════════════════════════════════════════════════════════════
// CARD B: Heart on poster, inline cart pill below the title
// ═══════════════════════════════════════════════════════════════
function ContentCardB({ c, t, inCart, onToggleCart }) {
  return (
    <div style={{ position: 'relative' }}>
      <div style={{
        position: 'relative', width: '100%', aspectRatio: '3/4',
        borderRadius: 10, overflow: 'hidden',
        background: `linear-gradient(160deg, ${POSTER_TONES[c.posterTone].bg} 0%, ${shade(POSTER_TONES[c.posterTone].bg, -12)} 100%)`,
        boxShadow: `inset 0 0 0 0.5px rgba(0,0,0,0.08)`,
      }}>
        <button style={{
          position: 'absolute', top: 8, right: 8,
          width: 28, height: 28, borderRadius: 14, border: 'none',
          background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(4px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', padding: 0,
        }}>
          <HeartIcon filled={c.favorited} size={14} />
        </button>
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
        <button onClick={() => onToggleCart(c.id)} style={{
          width: '100%', marginTop: 10, height: 32, borderRadius: 8,
          border: inCart ? 'none' : `0.5px solid ${t.line}`,
          background: inCart ? '#FFF1EC' : t.surface,
          color: inCart ? '#E85D2C' : t.ink,
          fontFamily: t.sans, fontSize: 12,
          fontWeight: inCart ? 600 : 500,
          cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5,
        }}>
          {inCart ? (
            <>
              <CheckIcon size={11} color="#E85D2C" weight={2.5} />
              담김
            </>
          ) : (
            <>
              <PlusIcon size={12} />
              장바구니
            </>
          )}
        </button>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// CARD C: Hover overlay CTA + small ✓ badge when in cart
// ═══════════════════════════════════════════════════════════════
function ContentCardC({ c, t, inCart, onToggleCart }) {
  const [hover, setHover] = React.useState(false);
  return (
    <div style={{ position: 'relative' }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div style={{
        position: 'relative', width: '100%', aspectRatio: '3/4',
        borderRadius: 10, overflow: 'hidden',
        background: `linear-gradient(160deg, ${POSTER_TONES[c.posterTone].bg} 0%, ${shade(POSTER_TONES[c.posterTone].bg, -12)} 100%)`,
        boxShadow: inCart ? `0 0 0 2px #E85D2C` : `inset 0 0 0 0.5px rgba(0,0,0,0.08)`,
      }}>
        {/* heart top-right */}
        <button style={{
          position: 'absolute', top: 8, right: 8, zIndex: 2,
          width: 28, height: 28, borderRadius: 14, border: 'none',
          background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(4px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', padding: 0,
        }}>
          <HeartIcon filled={c.favorited} size={14} />
        </button>

        {/* in-cart badge top-left */}
        {inCart && (
          <div style={{
            position: 'absolute', top: 8, left: 8, zIndex: 2,
            background: '#E85D2C', color: '#fff', borderRadius: 12,
            padding: '4px 9px 4px 7px',
            display: 'flex', alignItems: 'center', gap: 4,
            fontSize: 11, fontWeight: 600, fontFamily: t.sans,
            boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
          }}>
            <CheckIcon size={10} color="#fff" weight={2.5} />
            담김
          </div>
        )}

        {/* hover overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(180deg, rgba(0,0,0,0) 30%, rgba(0,0,0,0.55) 100%)',
          opacity: hover ? 1 : 0, transition: 'opacity .15s',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          pointerEvents: hover ? 'auto' : 'none',
        }}>
          <button onClick={() => onToggleCart(c.id)} style={{
            padding: '10px 16px', borderRadius: 10, border: 'none',
            background: inCart ? '#fff' : '#E85D2C',
            color: inCart ? '#1A1A1A' : '#fff',
            fontFamily: t.sans, fontSize: 13, fontWeight: 600,
            cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 7,
            boxShadow: '0 6px 20px rgba(0,0,0,0.25)',
          }}>
            {inCart ? <><CheckIcon size={12} color="#1A1A1A" weight={2.5} />빼기</> : <><PlusIcon size={13} />장바구니에 담기</>}
          </button>
        </div>

        {/* title gradient — fades when hovering */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          padding: '24px 14px 14px',
          background: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.55) 100%)',
          fontFamily: t.sans, fontSize: 18, fontWeight: 800,
          color: '#fff', letterSpacing: -0.4, lineHeight: 1.1,
          textShadow: '0 1px 2px rgba(0,0,0,0.4)',
          opacity: hover ? 0 : 1, transition: 'opacity .15s',
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

// ─── Cart-aware top nav (no logout shown — keeps focus) ───────
function CartContentNav({ t, cartCount = 0 }) {
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
              color: it.k === 'content' ? '#E85D2C' : '#6B7280',
              fontWeight: it.k === 'content' ? 600 : 400,
            }}>{it.label}</div>
          ))}
        </nav>
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 16, color: '#6B7280', fontSize: 14 }}>
          <button style={{
            position: 'relative', height: 36, padding: '0 12px',
            borderRadius: 10, border: `0.5px solid ${t.line}`,
            background: t.surface, cursor: 'pointer',
            display: 'inline-flex', alignItems: 'center', gap: 8,
            fontFamily: t.sans, fontSize: 13, color: t.ink, fontWeight: 500,
          }}>
            <CartIcon size={15} />
            <span>장바구니</span>
            <span style={{
              fontFamily: t.mono, fontSize: 11, fontWeight: 600,
              background: cartCount > 0 ? '#E85D2C' : '#D1D5DB',
              color: '#fff',
              minWidth: 18, height: 18, padding: '0 5px',
              borderRadius: 9, display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            }}>{cartCount}</span>
          </button>
          <span style={{ color: t.ink, fontWeight: 500, fontSize: 14 }}>Reelio</span>
        </div>
      </div>
    </header>
  );
}

// ─── Page shell (Variant I toolbar, no bundle button) ─────────
function CartSearchPage({ t = BASE_TOKENS, CardComp, label }) {
  const f = useCartFilters();
  const [filterOpen, setFilterOpen] = React.useState(false);

  return (
    <div style={{ minHeight: '100%', background: t.bg, color: t.ink, fontFamily: t.sans, position: 'relative' }}>
      <CartContentNav t={t} cartCount={f.cart.size} />
      <main style={{ margin: '0 auto', padding: '24px 40px 100px', maxWidth: 960 }}>
        {/* Compact toolbar — bundle button removed */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14,
          padding: '8px', background: t.surface, border: `0.5px solid ${t.line}`,
          borderRadius: 12,
        }}>
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 8, padding: '0 8px' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9CA0A6" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" />
            </svg>
            <input
              value={f.search}
              onChange={(e) => f.setSearch(e.target.value)}
              placeholder="검색"
              style={{
                flex: 1, border: 'none', outline: 'none', background: 'transparent',
                fontFamily: t.sans, fontSize: 14, color: t.ink, height: 36,
              }}
            />
          </div>
          <div style={{ width: 0.5, height: 24, background: t.line }} />
          <button onClick={() => setFilterOpen(!filterOpen)} style={{
            height: 36, padding: '0 12px', borderRadius: 8,
            border: 'none', background: filterOpen ? '#FFF1EC' : 'transparent',
            color: filterOpen ? '#E85D2C' : t.ink,
            cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6,
            fontFamily: t.sans, fontSize: 13, fontWeight: 500,
          }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 6h18M6 12h12M10 18h4" />
            </svg>
            필터
          </button>
          <FavButton active={f.favOnly} onClick={() => f.setFavOnly(!f.favOnly)} t={t} height={36} />
          {/* BundleButton REMOVED */}
        </div>

        {filterOpen && (
          <div style={{
            background: t.surface, border: `0.5px solid ${t.line}`, borderRadius: 12,
            padding: '18px 20px', marginBottom: 20,
          }}>
            <FilterStackNoSort f={f} t={t} />
          </div>
        )}

        <div style={{
          display: 'flex', alignItems: 'baseline', justifyContent: 'space-between',
          padding: '0 6px', marginBottom: 18,
        }}>
          <span style={{ fontFamily: t.mono, fontSize: 13, color: t.inkMute }}>
            {f.filtered.length}편
          </span>
          <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
            <span style={{ fontSize: 12, color: t.inkMute, marginRight: 4 }}>정렬</span>
            {['등록순','최신순'].map((s) => (
              <button key={s} onClick={() => f.setSort(s)} style={{
                background: 'transparent', border: 'none', cursor: 'pointer',
                fontSize: 12, fontFamily: t.sans, padding: '4px 8px',
                color: f.sort === s ? '#E85D2C' : t.inkMute,
                fontWeight: f.sort === s ? 600 : 500,
              }}>{s}</button>
            ))}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }}>
          {f.filtered.map((c) => (
            <CardComp
              key={c.id} c={c} t={t}
              inCart={f.cart.has(c.id)}
              onToggleCart={f.toggleCart}
            />
          ))}
        </div>

        <CartStickyBar f={f} t={t} />
      </main>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// CARD D: Dual inline — both heart & cart pill BELOW the poster
// Poster is completely clean. All actions live in the meta area.
// ═══════════════════════════════════════════════════════════════
function ContentCardD({ c, t, inCart, onToggleCart }) {
  const [fav, setFav] = React.useState(c.favorited);
  return (
    <div style={{ position: 'relative' }}>
      <div style={{
        position: 'relative', width: '100%', aspectRatio: '3/4',
        borderRadius: 10, overflow: 'hidden',
        background: `linear-gradient(160deg, ${POSTER_TONES[c.posterTone].bg} 0%, ${shade(POSTER_TONES[c.posterTone].bg, -12)} 100%)`,
        boxShadow: `inset 0 0 0 0.5px rgba(0,0,0,0.08)`,
      }}>
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
        <div style={{ display: 'flex', gap: 6, marginTop: 10 }}>
          <button onClick={() => setFav(!fav)} style={{
            width: 32, height: 32, borderRadius: 8,
            border: `0.5px solid ${t.line}`,
            background: t.surface,
            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0, padding: 0,
          }}>
            <HeartIcon filled={fav} size={13} />
          </button>
          <button onClick={() => onToggleCart(c.id)} style={{
            flex: 1, height: 32, borderRadius: 8,
            border: inCart ? 'none' : `0.5px solid ${t.line}`,
            background: inCart ? '#FFF1EC' : t.surface,
            color: inCart ? '#E85D2C' : t.ink,
            fontFamily: t.sans, fontSize: 12,
            fontWeight: inCart ? 600 : 500,
            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5,
          }}>
            {inCart ? (
              <>
                <CheckIcon size={11} color="#E85D2C" weight={2.5} />
                담김
              </>
            ) : (
              <>
                <PlusIcon size={12} />
                장바구니
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// CARD E: Card-toggle (Pinterest / Photos select style)
// Whole card is the cart toggle. Hover shows big center "+".
// Selected = thick orange border + corner check badge.
// Heart remains as a secondary top-left action.
// ═══════════════════════════════════════════════════════════════
function ContentCardE({ c, t, inCart, onToggleCart }) {
  const [hover, setHover] = React.useState(false);
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={() => onToggleCart(c.id)}
      style={{ position: 'relative', cursor: 'pointer' }}
    >
      <div style={{
        position: 'relative', width: '100%', aspectRatio: '3/4',
        borderRadius: 10, overflow: 'hidden',
        background: `linear-gradient(160deg, ${POSTER_TONES[c.posterTone].bg} 0%, ${shade(POSTER_TONES[c.posterTone].bg, -12)} 100%)`,
        boxShadow: inCart ? `0 0 0 3px #E85D2C` : `inset 0 0 0 0.5px rgba(0,0,0,0.08)`,
        transition: 'box-shadow .15s',
      }}>
        {/* heart top-left, secondary */}
        <button onClick={(e) => e.stopPropagation()} style={{
          position: 'absolute', top: 8, left: 8, zIndex: 2,
          width: 28, height: 28, borderRadius: 14, border: 'none',
          background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(4px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', padding: 0,
        }}>
          <HeartIcon filled={c.favorited} size={14} />
        </button>

        {/* in-cart check badge top-right */}
        {inCart && (
          <div style={{
            position: 'absolute', top: 8, right: 8, zIndex: 2,
            width: 28, height: 28, borderRadius: 14,
            background: '#E85D2C',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 2px 8px rgba(232,93,44,0.4)',
          }}>
            <CheckIcon size={13} color="#fff" weight={2.8} />
          </div>
        )}

        {/* hover-only center "+" */}
        {!inCart && (
          <div style={{
            position: 'absolute', inset: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            opacity: hover ? 1 : 0, transition: 'opacity .15s',
            pointerEvents: 'none',
          }}>
            <div style={{
              width: 52, height: 52, borderRadius: 26,
              background: 'rgba(255,255,255,0.95)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 6px 20px rgba(0,0,0,0.25)',
              color: '#E85D2C',
            }}>
              <PlusIcon size={22} />
            </div>
          </div>
        )}

        {/* title */}
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

function CartSearchA({ t }) { return <CartSearchPage t={t} CardComp={ContentCardA} label="A" />; }
function CartSearchB({ t }) { return <CartSearchPage t={t} CardComp={ContentCardB} label="B" />; }
function CartSearchC({ t }) { return <CartSearchPage t={t} CardComp={ContentCardC} label="C" />; }
function CartSearchD({ t }) { return <CartSearchPage t={t} CardComp={ContentCardD} label="D" />; }
function CartSearchE({ t }) { return <CartSearchPage t={t} CardComp={ContentCardE} label="E" />; }

Object.assign(window, {
  CartSearchA, CartSearchB, CartSearchC, CartSearchD, CartSearchE,
  ContentCardA, ContentCardB, ContentCardC, ContentCardD, ContentCardE,
  CartStickyBar, CartContentNav, useCartFilters, PlusIcon,
});
