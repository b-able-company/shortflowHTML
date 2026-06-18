function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
// Three card patterns for "add to cart" on content search.
// Removes the bundle/select-mode flow; cart replaces it.
// Reuses primitives from content-search-ui.jsx, content-search-variants.jsx, cart-ui.jsx.

// ─── Hook: filters + cart (no selectMode) ─────────────────────
function useCartFilters() {
  var initialCart = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : ['c3', 'c5'];
  var _React$useState = React.useState(''),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    search = _React$useState2[0],
    setSearch = _React$useState2[1];
  var _React$useState3 = React.useState('숏드라마'),
    _React$useState4 = _slicedToArray(_React$useState3, 2),
    type = _React$useState4[0],
    setType = _React$useState4[1];
  var _React$useState5 = React.useState('등록순'),
    _React$useState6 = _slicedToArray(_React$useState5, 2),
    sort = _React$useState6[0],
    setSort = _React$useState6[1];
  var _React$useState7 = React.useState('전체'),
    _React$useState8 = _slicedToArray(_React$useState7, 2),
    genre = _React$useState8[0],
    setGenre = _React$useState8[1];
  var _React$useState9 = React.useState('전체'),
    _React$useState0 = _slicedToArray(_React$useState9, 2),
    year = _React$useState0[0],
    setYear = _React$useState0[1];
  var _React$useState1 = React.useState('전체'),
    _React$useState10 = _slicedToArray(_React$useState1, 2),
    lang = _React$useState10[0],
    setLang = _React$useState10[1];
  var _React$useState11 = React.useState(false),
    _React$useState12 = _slicedToArray(_React$useState11, 2),
    favOnly = _React$useState12[0],
    setFavOnly = _React$useState12[1];
  var _React$useState13 = React.useState(new Set(initialCart)),
    _React$useState14 = _slicedToArray(_React$useState13, 2),
    cart = _React$useState14[0],
    setCart = _React$useState14[1];
  var filtered = React.useMemo(function () {
    return CONTENT_LIBRARY.filter(function (c) {
      if (search && !c.title.includes(search) && !c.genres.some(function (g) {
        return g.includes(search);
      })) return false;
      if (type && c.type !== type) return false;
      if (genre !== '전체' && !c.genres.includes(genre)) return false;
      if (year !== '전체' && c.year !== year) return false;
      if (lang !== '전체' && c.language !== lang) return false;
      if (favOnly && !c.favorited) return false;
      return true;
    });
  }, [search, type, sort, genre, year, lang, favOnly]);
  var toggleCart = function toggleCart(id) {
    var n = new Set(cart);
    if (n.has(id)) n["delete"](id);else n.add(id);
    setCart(n);
  };
  return {
    search: search,
    setSearch: setSearch,
    type: type,
    setType: setType,
    sort: sort,
    setSort: setSort,
    genre: genre,
    setGenre: setGenre,
    year: year,
    setYear: setYear,
    lang: lang,
    setLang: setLang,
    favOnly: favOnly,
    setFavOnly: setFavOnly,
    cart: cart,
    toggleCart: toggleCart,
    filtered: filtered
  };
}

// ─── Cart-aware sticky bar (replaces 제안서 만들기 bar) ────────
function CartStickyBar(_ref) {
  var f = _ref.f,
    t = _ref.t;
  if (f.cart.size === 0) return null;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'fixed',
      bottom: 24,
      left: '50%',
      transform: 'translateX(-50%)',
      background: t.ink,
      color: '#fff',
      padding: '12px 14px 12px 20px',
      borderRadius: 12,
      display: 'flex',
      alignItems: 'center',
      gap: 14,
      boxShadow: '0 12px 40px rgba(0,0,0,0.25)',
      zIndex: 30
    }
  }, /*#__PURE__*/React.createElement(CartIcon, {
    size: 15
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      fontWeight: 500
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: t.mono,
      fontWeight: 600
    }
  }, f.cart.size), "\uD3B8 \uB2F4\uAE40"), /*#__PURE__*/React.createElement("button", {
    style: {
      padding: '8px 14px',
      borderRadius: 8,
      border: 'none',
      background: '#E85D2C',
      color: '#fff',
      fontWeight: 600,
      fontSize: 13,
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: 6
    }
  }, "\uC7A5\uBC14\uAD6C\uB2C8\uB85C \uAC00\uAE30", /*#__PURE__*/React.createElement("svg", {
    width: "13",
    height: "13",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2.2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M5 12h14M13 5l7 7-7 7"
  }))));
}

// ─── Plus icon ─────────────────────────────────────────────────
function PlusIcon(_ref2) {
  var _ref2$size = _ref2.size,
    size = _ref2$size === void 0 ? 14 : _ref2$size,
    _ref2$color = _ref2.color,
    color = _ref2$color === void 0 ? 'currentColor' : _ref2$color;
  return /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    strokeWidth: "2.2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M12 5v14M5 12h14"
  }));
}

// ═══════════════════════════════════════════════════════════════
// CARD A: Twin icons — heart + cart, both at top-right of poster
// ═══════════════════════════════════════════════════════════════
function ContentCardA(_ref3) {
  var c = _ref3.c,
    t = _ref3.t,
    inCart = _ref3.inCart,
    onToggleCart = _ref3.onToggleCart;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      width: '100%',
      aspectRatio: '3/4',
      borderRadius: 10,
      overflow: 'hidden',
      background: "linear-gradient(160deg, ".concat(POSTER_TONES[c.posterTone].bg, " 0%, ").concat(shade(POSTER_TONES[c.posterTone].bg, -12), " 100%)"),
      boxShadow: "inset 0 0 0 0.5px rgba(0,0,0,0.08)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 8,
      right: 8,
      display: 'flex',
      flexDirection: 'column',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("button", {
    style: {
      width: 28,
      height: 28,
      borderRadius: 14,
      border: 'none',
      background: 'rgba(255,255,255,0.85)',
      backdropFilter: 'blur(4px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      padding: 0
    }
  }, /*#__PURE__*/React.createElement(HeartIcon, {
    filled: c.favorited,
    size: 14
  })), /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      return onToggleCart(c.id);
    },
    style: {
      width: 28,
      height: 28,
      borderRadius: 14,
      border: 'none',
      background: inCart ? '#E85D2C' : 'rgba(255,255,255,0.85)',
      backdropFilter: 'blur(4px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      color: inCart ? '#fff' : '#1A1A1A',
      padding: 0
    }
  }, inCart ? /*#__PURE__*/React.createElement(CheckIcon, {
    size: 13,
    color: "#fff",
    weight: 2.5
  }) : /*#__PURE__*/React.createElement(CartIcon, {
    size: 14
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      padding: '24px 14px 14px',
      background: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.55) 100%)',
      fontFamily: t.sans,
      fontSize: 18,
      fontWeight: 800,
      color: '#fff',
      letterSpacing: -0.4,
      lineHeight: 1.1,
      textShadow: '0 1px 2px rgba(0,0,0,0.4)'
    }
  }, c.title.length > 12 ? c.title.slice(0, 12) + '…' : c.title)), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '10px 2px 0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 600,
      color: t.ink,
      letterSpacing: -0.2,
      lineHeight: 1.3
    }
  }, c.title), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: t.inkMute,
      marginTop: 4,
      lineHeight: 1.4
    }
  }, c.genres.slice(0, 3).join(', '), c.genres.length > 3 ? '…' : '')));
}

// ═══════════════════════════════════════════════════════════════
// CARD B: Heart on poster, inline cart pill below the title
// ═══════════════════════════════════════════════════════════════
function ContentCardB(_ref4) {
  var c = _ref4.c,
    t = _ref4.t,
    inCart = _ref4.inCart,
    onToggleCart = _ref4.onToggleCart;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      width: '100%',
      aspectRatio: '3/4',
      borderRadius: 10,
      overflow: 'hidden',
      background: "linear-gradient(160deg, ".concat(POSTER_TONES[c.posterTone].bg, " 0%, ").concat(shade(POSTER_TONES[c.posterTone].bg, -12), " 100%)"),
      boxShadow: "inset 0 0 0 0.5px rgba(0,0,0,0.08)"
    }
  }, /*#__PURE__*/React.createElement("button", {
    style: {
      position: 'absolute',
      top: 8,
      right: 8,
      width: 28,
      height: 28,
      borderRadius: 14,
      border: 'none',
      background: 'rgba(255,255,255,0.85)',
      backdropFilter: 'blur(4px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      padding: 0
    }
  }, /*#__PURE__*/React.createElement(HeartIcon, {
    filled: c.favorited,
    size: 14
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      padding: '24px 14px 14px',
      background: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.55) 100%)',
      fontFamily: t.sans,
      fontSize: 18,
      fontWeight: 800,
      color: '#fff',
      letterSpacing: -0.4,
      lineHeight: 1.1,
      textShadow: '0 1px 2px rgba(0,0,0,0.4)'
    }
  }, c.title.length > 12 ? c.title.slice(0, 12) + '…' : c.title)), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '10px 2px 0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 600,
      color: t.ink,
      letterSpacing: -0.2,
      lineHeight: 1.3
    }
  }, c.title), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: t.inkMute,
      marginTop: 4,
      lineHeight: 1.4
    }
  }, c.genres.slice(0, 3).join(', '), c.genres.length > 3 ? '…' : ''), /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      return onToggleCart(c.id);
    },
    style: {
      width: '100%',
      marginTop: 10,
      height: 32,
      borderRadius: 8,
      border: inCart ? 'none' : "0.5px solid ".concat(t.line),
      background: inCart ? '#FFF1EC' : t.surface,
      color: inCart ? '#E85D2C' : t.ink,
      fontFamily: t.sans,
      fontSize: 12,
      fontWeight: inCart ? 600 : 500,
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 5
    }
  }, inCart ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(CheckIcon, {
    size: 11,
    color: "#E85D2C",
    weight: 2.5
  }), "\uB2F4\uAE40") : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(PlusIcon, {
    size: 12
  }), "\uC7A5\uBC14\uAD6C\uB2C8"))));
}

// ═══════════════════════════════════════════════════════════════
// CARD C: Hover overlay CTA + small ✓ badge when in cart
// ═══════════════════════════════════════════════════════════════
function ContentCardC(_ref5) {
  var c = _ref5.c,
    t = _ref5.t,
    inCart = _ref5.inCart,
    onToggleCart = _ref5.onToggleCart;
  var _React$useState15 = React.useState(false),
    _React$useState16 = _slicedToArray(_React$useState15, 2),
    hover = _React$useState16[0],
    setHover = _React$useState16[1];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative'
    },
    onMouseEnter: function onMouseEnter() {
      return setHover(true);
    },
    onMouseLeave: function onMouseLeave() {
      return setHover(false);
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      width: '100%',
      aspectRatio: '3/4',
      borderRadius: 10,
      overflow: 'hidden',
      background: "linear-gradient(160deg, ".concat(POSTER_TONES[c.posterTone].bg, " 0%, ").concat(shade(POSTER_TONES[c.posterTone].bg, -12), " 100%)"),
      boxShadow: inCart ? "0 0 0 2px #E85D2C" : "inset 0 0 0 0.5px rgba(0,0,0,0.08)"
    }
  }, /*#__PURE__*/React.createElement("button", {
    style: {
      position: 'absolute',
      top: 8,
      right: 8,
      zIndex: 2,
      width: 28,
      height: 28,
      borderRadius: 14,
      border: 'none',
      background: 'rgba(255,255,255,0.85)',
      backdropFilter: 'blur(4px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      padding: 0
    }
  }, /*#__PURE__*/React.createElement(HeartIcon, {
    filled: c.favorited,
    size: 14
  })), inCart && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 8,
      left: 8,
      zIndex: 2,
      background: '#E85D2C',
      color: '#fff',
      borderRadius: 12,
      padding: '4px 9px 4px 7px',
      display: 'flex',
      alignItems: 'center',
      gap: 4,
      fontSize: 11,
      fontWeight: 600,
      fontFamily: t.sans,
      boxShadow: '0 2px 6px rgba(0,0,0,0.15)'
    }
  }, /*#__PURE__*/React.createElement(CheckIcon, {
    size: 10,
    color: "#fff",
    weight: 2.5
  }), "\uB2F4\uAE40"), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'linear-gradient(180deg, rgba(0,0,0,0) 30%, rgba(0,0,0,0.55) 100%)',
      opacity: hover ? 1 : 0,
      transition: 'opacity .15s',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      pointerEvents: hover ? 'auto' : 'none'
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      return onToggleCart(c.id);
    },
    style: {
      padding: '10px 16px',
      borderRadius: 10,
      border: 'none',
      background: inCart ? '#fff' : '#E85D2C',
      color: inCart ? '#1A1A1A' : '#fff',
      fontFamily: t.sans,
      fontSize: 13,
      fontWeight: 600,
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: 7,
      boxShadow: '0 6px 20px rgba(0,0,0,0.25)'
    }
  }, inCart ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(CheckIcon, {
    size: 12,
    color: "#1A1A1A",
    weight: 2.5
  }), "\uBE7C\uAE30") : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(PlusIcon, {
    size: 13
  }), "\uC7A5\uBC14\uAD6C\uB2C8\uC5D0 \uB2F4\uAE30"))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      padding: '24px 14px 14px',
      background: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.55) 100%)',
      fontFamily: t.sans,
      fontSize: 18,
      fontWeight: 800,
      color: '#fff',
      letterSpacing: -0.4,
      lineHeight: 1.1,
      textShadow: '0 1px 2px rgba(0,0,0,0.4)',
      opacity: hover ? 0 : 1,
      transition: 'opacity .15s'
    }
  }, c.title.length > 12 ? c.title.slice(0, 12) + '…' : c.title)), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '10px 2px 0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 600,
      color: t.ink,
      letterSpacing: -0.2,
      lineHeight: 1.3
    }
  }, c.title), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: t.inkMute,
      marginTop: 4,
      lineHeight: 1.4
    }
  }, c.genres.slice(0, 3).join(', '), c.genres.length > 3 ? '…' : '')));
}

// ─── Cart-aware top nav (no logout shown — keeps focus) ───────
function CartContentNav(_ref6) {
  var t = _ref6.t,
    _ref6$cartCount = _ref6.cartCount,
    cartCount = _ref6$cartCount === void 0 ? 0 : _ref6$cartCount;
  var items = [{
    k: 'content',
    label: '콘텐츠'
  }, {
    k: 'dashboard',
    label: '대시보드'
  }, {
    k: 'guide',
    label: '이용가이드'
  }];
  return /*#__PURE__*/React.createElement("header", {
    style: {
      borderBottom: "0.5px solid ".concat(t.line),
      background: t.surface,
      height: 64,
      display: 'flex',
      alignItems: 'center',
      position: 'sticky',
      top: 0,
      zIndex: 20
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: '100%',
      maxWidth: 960,
      margin: '0 auto',
      padding: '0 40px',
      display: 'flex',
      alignItems: 'center',
      gap: 36,
      whiteSpace: 'nowrap'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 800,
      fontSize: 22,
      letterSpacing: -0.8,
      fontStyle: 'italic',
      fontFamily: t.sans
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: '#111827'
    }
  }, "short"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: '#CBD5E1'
    }
  }, "flow")), /*#__PURE__*/React.createElement("nav", {
    style: {
      display: 'flex',
      gap: 26
    }
  }, items.map(function (it) {
    return /*#__PURE__*/React.createElement("div", {
      key: it.k,
      style: {
        fontSize: 14,
        cursor: 'pointer',
        color: it.k === 'content' ? '#E85D2C' : '#6B7280',
        fontWeight: it.k === 'content' ? 600 : 400
      }
    }, it.label);
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      marginLeft: 'auto',
      display: 'flex',
      alignItems: 'center',
      gap: 16,
      color: '#6B7280',
      fontSize: 14
    }
  }, /*#__PURE__*/React.createElement("button", {
    style: {
      position: 'relative',
      height: 36,
      padding: '0 12px',
      borderRadius: 10,
      border: "0.5px solid ".concat(t.line),
      background: t.surface,
      cursor: 'pointer',
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
      fontFamily: t.sans,
      fontSize: 13,
      color: t.ink,
      fontWeight: 500
    }
  }, /*#__PURE__*/React.createElement(CartIcon, {
    size: 15
  }), /*#__PURE__*/React.createElement("span", null, "\uC7A5\uBC14\uAD6C\uB2C8"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: t.mono,
      fontSize: 11,
      fontWeight: 600,
      background: cartCount > 0 ? '#E85D2C' : '#D1D5DB',
      color: '#fff',
      minWidth: 18,
      height: 18,
      padding: '0 5px',
      borderRadius: 9,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, cartCount)), /*#__PURE__*/React.createElement("span", {
    style: {
      color: t.ink,
      fontWeight: 500,
      fontSize: 14
    }
  }, "Reelio"))));
}

// ─── Page shell (Variant I toolbar, no bundle button) ─────────
function CartSearchPage(_ref7) {
  var _ref7$t = _ref7.t,
    t = _ref7$t === void 0 ? BASE_TOKENS : _ref7$t,
    CardComp = _ref7.CardComp,
    label = _ref7.label;
  var f = useCartFilters();
  var _React$useState17 = React.useState(false),
    _React$useState18 = _slicedToArray(_React$useState17, 2),
    filterOpen = _React$useState18[0],
    setFilterOpen = _React$useState18[1];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      minHeight: '100%',
      background: t.bg,
      color: t.ink,
      fontFamily: t.sans,
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement(CartContentNav, {
    t: t,
    cartCount: f.cart.size
  }), /*#__PURE__*/React.createElement("main", {
    style: {
      margin: '0 auto',
      padding: '24px 40px 100px',
      maxWidth: 960
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      marginBottom: 14,
      padding: '8px',
      background: t.surface,
      border: "0.5px solid ".concat(t.line),
      borderRadius: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      padding: '0 8px'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "16",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "#9CA0A6",
    strokeWidth: "1.8",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "11",
    cy: "11",
    r: "7"
  }), /*#__PURE__*/React.createElement("path", {
    d: "m20 20-3.5-3.5"
  })), /*#__PURE__*/React.createElement("input", {
    value: f.search,
    onChange: function onChange(e) {
      return f.setSearch(e.target.value);
    },
    placeholder: "\uAC80\uC0C9",
    style: {
      flex: 1,
      border: 'none',
      outline: 'none',
      background: 'transparent',
      fontFamily: t.sans,
      fontSize: 14,
      color: t.ink,
      height: 36
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 0.5,
      height: 24,
      background: t.line
    }
  }), /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      return setFilterOpen(!filterOpen);
    },
    style: {
      height: 36,
      padding: '0 12px',
      borderRadius: 8,
      border: 'none',
      background: filterOpen ? '#FFF1EC' : 'transparent',
      color: filterOpen ? '#E85D2C' : t.ink,
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: 6,
      fontFamily: t.sans,
      fontSize: 13,
      fontWeight: 500
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "14",
    height: "14",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.8",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M3 6h18M6 12h12M10 18h4"
  })), "\uD544\uD130"), /*#__PURE__*/React.createElement(FavButton, {
    active: f.favOnly,
    onClick: function onClick() {
      return f.setFavOnly(!f.favOnly);
    },
    t: t,
    height: 36
  })), filterOpen && /*#__PURE__*/React.createElement("div", {
    style: {
      background: t.surface,
      border: "0.5px solid ".concat(t.line),
      borderRadius: 12,
      padding: '18px 20px',
      marginBottom: 20
    }
  }, /*#__PURE__*/React.createElement(FilterStackNoSort, {
    f: f,
    t: t
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      justifyContent: 'space-between',
      padding: '0 6px',
      marginBottom: 18
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: t.mono,
      fontSize: 13,
      color: t.inkMute
    }
  }, f.filtered.length, "\uD3B8"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 4,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      color: t.inkMute,
      marginRight: 4
    }
  }, "\uC815\uB82C"), ['등록순', '최신순'].map(function (s) {
    return /*#__PURE__*/React.createElement("button", {
      key: s,
      onClick: function onClick() {
        return f.setSort(s);
      },
      style: {
        background: 'transparent',
        border: 'none',
        cursor: 'pointer',
        fontSize: 12,
        fontFamily: t.sans,
        padding: '4px 8px',
        color: f.sort === s ? '#E85D2C' : t.inkMute,
        fontWeight: f.sort === s ? 600 : 500
      }
    }, s);
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: 24
    }
  }, f.filtered.map(function (c) {
    return /*#__PURE__*/React.createElement(CardComp, {
      key: c.id,
      c: c,
      t: t,
      inCart: f.cart.has(c.id),
      onToggleCart: f.toggleCart
    });
  })), /*#__PURE__*/React.createElement(CartStickyBar, {
    f: f,
    t: t
  })));
}

// ═══════════════════════════════════════════════════════════════
// CARD D: Dual inline — both heart & cart pill BELOW the poster
// Poster is completely clean. All actions live in the meta area.
// ═══════════════════════════════════════════════════════════════
function ContentCardD(_ref8) {
  var c = _ref8.c,
    t = _ref8.t,
    inCart = _ref8.inCart,
    onToggleCart = _ref8.onToggleCart;
  var _React$useState19 = React.useState(c.favorited),
    _React$useState20 = _slicedToArray(_React$useState19, 2),
    fav = _React$useState20[0],
    setFav = _React$useState20[1];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      width: '100%',
      aspectRatio: '3/4',
      borderRadius: 10,
      overflow: 'hidden',
      background: "linear-gradient(160deg, ".concat(POSTER_TONES[c.posterTone].bg, " 0%, ").concat(shade(POSTER_TONES[c.posterTone].bg, -12), " 100%)"),
      boxShadow: "inset 0 0 0 0.5px rgba(0,0,0,0.08)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      padding: '24px 14px 14px',
      background: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.55) 100%)',
      fontFamily: t.sans,
      fontSize: 18,
      fontWeight: 800,
      color: '#fff',
      letterSpacing: -0.4,
      lineHeight: 1.1,
      textShadow: '0 1px 2px rgba(0,0,0,0.4)'
    }
  }, c.title.length > 12 ? c.title.slice(0, 12) + '…' : c.title)), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '10px 2px 0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 600,
      color: t.ink,
      letterSpacing: -0.2,
      lineHeight: 1.3
    }
  }, c.title), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: t.inkMute,
      marginTop: 4,
      lineHeight: 1.4
    }
  }, c.genres.slice(0, 3).join(', '), c.genres.length > 3 ? '…' : ''), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 6,
      marginTop: 10
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      return setFav(!fav);
    },
    style: {
      width: 32,
      height: 32,
      borderRadius: 8,
      border: "0.5px solid ".concat(t.line),
      background: t.surface,
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
      padding: 0
    }
  }, /*#__PURE__*/React.createElement(HeartIcon, {
    filled: fav,
    size: 13
  })), /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      return onToggleCart(c.id);
    },
    style: {
      flex: 1,
      height: 32,
      borderRadius: 8,
      border: inCart ? 'none' : "0.5px solid ".concat(t.line),
      background: inCart ? '#FFF1EC' : t.surface,
      color: inCart ? '#E85D2C' : t.ink,
      fontFamily: t.sans,
      fontSize: 12,
      fontWeight: inCart ? 600 : 500,
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 5
    }
  }, inCart ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(CheckIcon, {
    size: 11,
    color: "#E85D2C",
    weight: 2.5
  }), "\uB2F4\uAE40") : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(PlusIcon, {
    size: 12
  }), "\uC7A5\uBC14\uAD6C\uB2C8")))));
}

// ═══════════════════════════════════════════════════════════════
// CARD E: Card-toggle (Pinterest / Photos select style)
// Whole card is the cart toggle. Hover shows big center "+".
// Selected = thick orange border + corner check badge.
// Heart remains as a secondary top-left action.
// ═══════════════════════════════════════════════════════════════
function ContentCardE(_ref9) {
  var c = _ref9.c,
    t = _ref9.t,
    inCart = _ref9.inCart,
    onToggleCart = _ref9.onToggleCart;
  var _React$useState21 = React.useState(false),
    _React$useState22 = _slicedToArray(_React$useState21, 2),
    hover = _React$useState22[0],
    setHover = _React$useState22[1];
  return /*#__PURE__*/React.createElement("div", {
    onMouseEnter: function onMouseEnter() {
      return setHover(true);
    },
    onMouseLeave: function onMouseLeave() {
      return setHover(false);
    },
    onClick: function onClick() {
      return onToggleCart(c.id);
    },
    style: {
      position: 'relative',
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      width: '100%',
      aspectRatio: '3/4',
      borderRadius: 10,
      overflow: 'hidden',
      background: "linear-gradient(160deg, ".concat(POSTER_TONES[c.posterTone].bg, " 0%, ").concat(shade(POSTER_TONES[c.posterTone].bg, -12), " 100%)"),
      boxShadow: inCart ? "0 0 0 3px #E85D2C" : "inset 0 0 0 0.5px rgba(0,0,0,0.08)",
      transition: 'box-shadow .15s'
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: function onClick(e) {
      return e.stopPropagation();
    },
    style: {
      position: 'absolute',
      top: 8,
      left: 8,
      zIndex: 2,
      width: 28,
      height: 28,
      borderRadius: 14,
      border: 'none',
      background: 'rgba(255,255,255,0.85)',
      backdropFilter: 'blur(4px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      padding: 0
    }
  }, /*#__PURE__*/React.createElement(HeartIcon, {
    filled: c.favorited,
    size: 14
  })), inCart && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 8,
      right: 8,
      zIndex: 2,
      width: 28,
      height: 28,
      borderRadius: 14,
      background: '#E85D2C',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: '0 2px 8px rgba(232,93,44,0.4)'
    }
  }, /*#__PURE__*/React.createElement(CheckIcon, {
    size: 13,
    color: "#fff",
    weight: 2.8
  })), !inCart && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      opacity: hover ? 1 : 0,
      transition: 'opacity .15s',
      pointerEvents: 'none'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 52,
      height: 52,
      borderRadius: 26,
      background: 'rgba(255,255,255,0.95)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: '0 6px 20px rgba(0,0,0,0.25)',
      color: '#E85D2C'
    }
  }, /*#__PURE__*/React.createElement(PlusIcon, {
    size: 22
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      padding: '24px 14px 14px',
      background: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.55) 100%)',
      fontFamily: t.sans,
      fontSize: 18,
      fontWeight: 800,
      color: '#fff',
      letterSpacing: -0.4,
      lineHeight: 1.1,
      textShadow: '0 1px 2px rgba(0,0,0,0.4)'
    }
  }, c.title.length > 12 ? c.title.slice(0, 12) + '…' : c.title)), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '10px 2px 0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 600,
      color: t.ink,
      letterSpacing: -0.2,
      lineHeight: 1.3
    }
  }, c.title), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: t.inkMute,
      marginTop: 4,
      lineHeight: 1.4
    }
  }, c.genres.slice(0, 3).join(', '), c.genres.length > 3 ? '…' : '')));
}
function CartSearchA(_ref0) {
  var t = _ref0.t;
  return /*#__PURE__*/React.createElement(CartSearchPage, {
    t: t,
    CardComp: ContentCardA,
    label: "A"
  });
}
function CartSearchB(_ref1) {
  var t = _ref1.t;
  return /*#__PURE__*/React.createElement(CartSearchPage, {
    t: t,
    CardComp: ContentCardB,
    label: "B"
  });
}
function CartSearchC(_ref10) {
  var t = _ref10.t;
  return /*#__PURE__*/React.createElement(CartSearchPage, {
    t: t,
    CardComp: ContentCardC,
    label: "C"
  });
}
function CartSearchD(_ref11) {
  var t = _ref11.t;
  return /*#__PURE__*/React.createElement(CartSearchPage, {
    t: t,
    CardComp: ContentCardD,
    label: "D"
  });
}
function CartSearchE(_ref12) {
  var t = _ref12.t;
  return /*#__PURE__*/React.createElement(CartSearchPage, {
    t: t,
    CardComp: ContentCardE,
    label: "E"
  });
}
Object.assign(window, {
  CartSearchA: CartSearchA,
  CartSearchB: CartSearchB,
  CartSearchC: CartSearchC,
  CartSearchD: CartSearchD,
  CartSearchE: CartSearchE,
  ContentCardA: ContentCardA,
  ContentCardB: ContentCardB,
  ContentCardC: ContentCardC,
  ContentCardD: ContentCardD,
  ContentCardE: ContentCardE,
  CartStickyBar: CartStickyBar,
  CartContentNav: CartContentNav,
  useCartFilters: useCartFilters,
  PlusIcon: PlusIcon
});
