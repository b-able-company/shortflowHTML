function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
// Content search UI — top-bar layout variants only.
// All variants keep filters as label+chip rows (per user spec).
// What varies: the relationship between search box, fav toggle, bundle action.

// ─── Top nav ────────────────────────────────────────────────────
function ContentTopNav(_ref) {
  var _ref$t = _ref.t,
    t = _ref$t === void 0 ? BASE_TOKENS : _ref$t,
    _ref$active = _ref.active,
    active = _ref$active === void 0 ? 'content' : _ref$active;
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
        color: it.k === active ? '#E85D2C' : '#6B7280',
        fontWeight: it.k === active ? 600 : 400
      }
    }, it.label);
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      marginLeft: 'auto',
      display: 'flex',
      alignItems: 'center',
      gap: 18,
      color: '#6B7280',
      fontSize: 14
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: t.ink,
      fontWeight: 500,
      fontSize: 14
    }
  }, "Reelio"), /*#__PURE__*/React.createElement("span", {
    style: {
      cursor: 'pointer',
      fontSize: 13
    }
  }, "\uB85C\uADF8\uC544\uC6C3"))));
}

// ─── Shared bits ────────────────────────────────────────────────
function FilterChip(_ref2) {
  var active = _ref2.active,
    onClick = _ref2.onClick,
    children = _ref2.children,
    _ref2$t = _ref2.t,
    t = _ref2$t === void 0 ? BASE_TOKENS : _ref2$t,
    _ref2$size = _ref2.size,
    size = _ref2$size === void 0 ? 'md' : _ref2$size;
  var padY = size === 'sm' ? 5 : 6;
  var padX = size === 'sm' ? 10 : 12;
  var fs = size === 'sm' ? 12 : 13;
  return /*#__PURE__*/React.createElement("button", {
    onClick: onClick,
    style: {
      padding: "".concat(padY, "px ").concat(padX, "px"),
      borderRadius: 8,
      fontFamily: t.sans,
      fontSize: fs,
      cursor: 'pointer',
      whiteSpace: 'nowrap',
      transition: 'all .12s',
      border: active ? '0.5px solid transparent' : "0.5px solid ".concat(t.line),
      background: active ? '#E85D2C' : t.surface,
      color: active ? '#fff' : t.ink,
      fontWeight: active ? 500 : 400
    }
  }, children);
}
function FilterRow(_ref3) {
  var label = _ref3.label,
    children = _ref3.children,
    _ref3$t = _ref3.t,
    t = _ref3$t === void 0 ? BASE_TOKENS : _ref3$t,
    _ref3$labelWidth = _ref3.labelWidth,
    labelWidth = _ref3$labelWidth === void 0 ? 60 : _ref3$labelWidth;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: 28,
      paddingTop: 4
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: labelWidth,
      fontSize: 13,
      color: t.inkMute,
      fontWeight: 500,
      paddingTop: 8,
      flexShrink: 0
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: 8,
      flex: 1
    }
  }, children));
}
function SearchInput(_ref4) {
  var value = _ref4.value,
    _onChange = _ref4.onChange,
    _ref4$t = _ref4.t,
    t = _ref4$t === void 0 ? BASE_TOKENS : _ref4$t,
    _ref4$big = _ref4.big,
    big = _ref4$big === void 0 ? false : _ref4$big,
    _ref4$placeholder = _ref4.placeholder,
    placeholder = _ref4$placeholder === void 0 ? '제목, 키워드, 장르로 검색' : _ref4$placeholder;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      background: t.surface,
      border: "0.5px solid ".concat(t.lineStrong),
      borderRadius: big ? 12 : 10,
      height: big ? 48 : 40,
      paddingLeft: 14,
      paddingRight: 14
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: big ? 18 : 16,
    height: big ? 18 : 16,
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
    value: value,
    onChange: function onChange(e) {
      return _onChange(e.target.value);
    },
    placeholder: placeholder,
    style: {
      flex: 1,
      border: 'none',
      outline: 'none',
      background: 'transparent',
      fontFamily: t.sans,
      fontSize: big ? 15 : 14,
      color: t.ink,
      paddingLeft: 10,
      height: '100%'
    }
  }), value && /*#__PURE__*/React.createElement("span", {
    onClick: function onClick() {
      return _onChange('');
    },
    style: {
      cursor: 'pointer',
      color: t.inkFaint,
      fontSize: 18,
      padding: '0 4px',
      userSelect: 'none'
    }
  }, "\xD7"));
}
function HeartIcon(_ref5) {
  var filled = _ref5.filled,
    _ref5$size = _ref5.size,
    size = _ref5$size === void 0 ? 16 : _ref5$size,
    _ref5$color = _ref5.color,
    color = _ref5$color === void 0 ? '#E85D2C' : _ref5$color;
  return /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: filled ? color : 'none',
    stroke: color,
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
  }));
}
function SendIcon(_ref6) {
  var _ref6$size = _ref6.size,
    size = _ref6$size === void 0 ? 14 : _ref6$size;
  return /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M22 2 11 13"
  }), /*#__PURE__*/React.createElement("path", {
    d: "m22 2-7 20-4-9-9-4 20-7z"
  }));
}
function FavButton(_ref7) {
  var active = _ref7.active,
    onClick = _ref7.onClick,
    t = _ref7.t,
    _ref7$height = _ref7.height,
    height = _ref7$height === void 0 ? 40 : _ref7$height,
    _ref7$label = _ref7.label,
    label = _ref7$label === void 0 ? '즐겨찾기만' : _ref7$label;
  return /*#__PURE__*/React.createElement("button", {
    onClick: onClick,
    style: {
      height: height,
      padding: '0 14px',
      borderRadius: 10,
      border: active ? '0.5px solid transparent' : "0.5px solid ".concat(t.lineStrong),
      background: active ? '#FFF1EC' : t.surface,
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: 7,
      fontFamily: t.sans,
      fontSize: 13,
      color: active ? '#E85D2C' : t.ink,
      fontWeight: active ? 600 : 500
    }
  }, /*#__PURE__*/React.createElement(HeartIcon, {
    filled: active,
    size: 13
  }), label);
}
function BundleButton(_ref8) {
  var active = _ref8.active,
    onClick = _ref8.onClick,
    t = _ref8.t,
    _ref8$height = _ref8.height,
    height = _ref8$height === void 0 ? 40 : _ref8$height,
    label = _ref8.label;
  return /*#__PURE__*/React.createElement("button", {
    onClick: onClick,
    style: {
      height: height,
      padding: '0 16px',
      borderRadius: 10,
      border: 'none',
      background: active ? t.ink : '#E85D2C',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: 7,
      fontFamily: t.sans,
      fontSize: 13,
      color: '#fff',
      fontWeight: 600
    }
  }, /*#__PURE__*/React.createElement(SendIcon, {
    size: 13
  }), label || (active ? '선택 취소' : '묶음제안'));
}
function ContentCard(_ref9) {
  var c = _ref9.c,
    _ref9$t = _ref9.t,
    t = _ref9$t === void 0 ? BASE_TOKENS : _ref9$t,
    selected = _ref9.selected,
    onToggleSelect = _ref9.onToggleSelect,
    selectMode = _ref9.selectMode;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      cursor: 'pointer'
    },
    onClick: function onClick() {
      return selectMode && onToggleSelect && onToggleSelect(c.id);
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      width: '100%',
      aspectRatio: '3/4',
      borderRadius: 10,
      overflow: 'hidden',
      background: "linear-gradient(160deg, ".concat(POSTER_TONES[c.posterTone].bg, " 0%, ").concat(shade(POSTER_TONES[c.posterTone].bg, -12), " 100%)"),
      boxShadow: selected ? "0 0 0 2px #E85D2C" : "inset 0 0 0 0.5px rgba(0,0,0,0.08)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 8,
      right: 8,
      width: 28,
      height: 28,
      borderRadius: 14,
      background: 'rgba(255,255,255,0.85)',
      backdropFilter: 'blur(4px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer'
    },
    onClick: function onClick(e) {
      return e.stopPropagation();
    }
  }, /*#__PURE__*/React.createElement(HeartIcon, {
    filled: c.favorited,
    size: 14
  })), selectMode && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 8,
      left: 8,
      width: 22,
      height: 22,
      borderRadius: 11,
      background: selected ? '#E85D2C' : 'rgba(255,255,255,0.85)',
      border: selected ? 'none' : "1px solid rgba(0,0,0,0.15)",
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, selected && /*#__PURE__*/React.createElement("svg", {
    width: "12",
    height: "12",
    viewBox: "0 0 12 12",
    fill: "none",
    stroke: "#fff",
    strokeWidth: "2.2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M2.5 6.5l2.5 2.5 4.5-5"
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
function useContentFilters() {
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
  var _React$useState13 = React.useState(false),
    _React$useState14 = _slicedToArray(_React$useState13, 2),
    selectMode = _React$useState14[0],
    setSelectMode = _React$useState14[1];
  var _React$useState15 = React.useState(new Set()),
    _React$useState16 = _slicedToArray(_React$useState15, 2),
    selected = _React$useState16[0],
    setSelected = _React$useState16[1];
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
  var toggleSelect = function toggleSelect(id) {
    var n = new Set(selected);
    if (n.has(id)) n["delete"](id);else n.add(id);
    setSelected(n);
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
    selectMode: selectMode,
    setSelectMode: setSelectMode,
    selected: selected,
    setSelected: setSelected,
    toggleSelect: toggleSelect,
    filtered: filtered
  };
}

// FilterStack — the 5 label+chip rows used by all variants.
function FilterStack(_ref0) {
  var f = _ref0.f,
    t = _ref0.t;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement(FilterRow, {
    label: "\uC885\uB958",
    t: t
  }, TYPES.map(function (tt) {
    return /*#__PURE__*/React.createElement(FilterChip, {
      key: tt,
      t: t,
      active: f.type === tt,
      onClick: function onClick() {
        return f.setType(tt);
      }
    }, tt);
  })), /*#__PURE__*/React.createElement(FilterRow, {
    label: "\uC815\uB82C",
    t: t
  }, ['등록순', '최신순'].map(function (s) {
    return /*#__PURE__*/React.createElement(FilterChip, {
      key: s,
      t: t,
      active: f.sort === s,
      onClick: function onClick() {
        return f.setSort(s);
      }
    }, s);
  })), /*#__PURE__*/React.createElement(FilterRow, {
    label: "\uC7A5\uB974",
    t: t
  }, /*#__PURE__*/React.createElement(FilterChip, {
    t: t,
    active: f.genre === '전체',
    onClick: function onClick() {
      return f.setGenre('전체');
    }
  }, "\uC804\uCCB4"), GENRES.map(function (g) {
    return /*#__PURE__*/React.createElement(FilterChip, {
      key: g,
      t: t,
      active: f.genre === g,
      onClick: function onClick() {
        return f.setGenre(g);
      }
    }, g);
  })), /*#__PURE__*/React.createElement(FilterRow, {
    label: "\uC5F0\uB3C4",
    t: t
  }, /*#__PURE__*/React.createElement(FilterChip, {
    t: t,
    active: f.year === '전체',
    onClick: function onClick() {
      return f.setYear('전체');
    }
  }, "\uC804\uCCB4"), YEARS.map(function (y) {
    return /*#__PURE__*/React.createElement(FilterChip, {
      key: y,
      t: t,
      active: f.year === y,
      onClick: function onClick() {
        return f.setYear(y);
      }
    }, y);
  })), /*#__PURE__*/React.createElement(FilterRow, {
    label: "\uC5B8\uC5B4",
    t: t
  }, /*#__PURE__*/React.createElement(FilterChip, {
    t: t,
    active: f.lang === '전체',
    onClick: function onClick() {
      return f.setLang('전체');
    }
  }, "\uC804\uCCB4"), LANGUAGES.map(function (l) {
    return /*#__PURE__*/React.createElement(FilterChip, {
      key: l,
      t: t,
      active: f.lang === l,
      onClick: function onClick() {
        return f.setLang(l);
      }
    }, l);
  })));
}
function StickyActionBar(_ref1) {
  var f = _ref1.f,
    t = _ref1.t;
  if (!(f.selectMode && f.selected.size > 0)) return null;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'fixed',
      bottom: 24,
      left: '50%',
      transform: 'translateX(-50%)',
      background: t.ink,
      color: '#fff',
      padding: '12px 16px 12px 20px',
      borderRadius: 12,
      display: 'flex',
      alignItems: 'center',
      gap: 16,
      boxShadow: '0 12px 40px rgba(0,0,0,0.25)',
      zIndex: 30
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      fontWeight: 500
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: t.mono,
      fontWeight: 600
    }
  }, f.selected.size), "\uD3B8 \uC120\uD0DD\uB428"), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 0.5,
      height: 18,
      background: 'rgba(255,255,255,0.2)'
    }
  }), /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      return f.setSelected(new Set());
    },
    style: {
      border: 'none',
      background: 'transparent',
      color: 'rgba(255,255,255,0.7)',
      fontSize: 13,
      cursor: 'pointer',
      fontFamily: t.sans
    }
  }, "\uC804\uCCB4 \uD574\uC81C"), /*#__PURE__*/React.createElement("button", {
    style: {
      padding: '8px 16px',
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
  }, /*#__PURE__*/React.createElement(SendIcon, {
    size: 13
  }), "\uC81C\uC548\uC11C \uB9CC\uB4E4\uAE30"));
}

// ═══════════════════════════════════════════════════════════════
// VARIANT A: 한 줄 — [큰 검색바] [즐겨찾기] [묶음제안]
// 가장 단순한 안. 검색이 가장 크고, 옆에 액션 두 개 나란히.
// ═══════════════════════════════════════════════════════════════
function ContentSearchA(_ref10) {
  var _ref10$t = _ref10.t,
    t = _ref10$t === void 0 ? BASE_TOKENS : _ref10$t;
  var f = useContentFilters();
  return /*#__PURE__*/React.createElement("div", {
    style: {
      minHeight: '100%',
      background: t.bg,
      color: t.ink,
      fontFamily: t.sans
    }
  }, /*#__PURE__*/React.createElement(ContentTopNav, {
    t: t,
    active: "content"
  }), /*#__PURE__*/React.createElement("main", {
    style: {
      margin: '0 auto',
      padding: '32px 40px 80px',
      maxWidth: 960
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10,
      alignItems: 'center',
      marginBottom: 22
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement(SearchInput, {
    value: f.search,
    onChange: f.setSearch,
    t: t,
    big: true
  })), /*#__PURE__*/React.createElement(FavButton, {
    active: f.favOnly,
    onClick: function onClick() {
      return f.setFavOnly(!f.favOnly);
    },
    t: t,
    height: 48
  }), /*#__PURE__*/React.createElement(BundleButton, {
    active: f.selectMode,
    onClick: function onClick() {
      return f.setSelectMode(!f.selectMode);
    },
    t: t,
    height: 48
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      background: t.surface,
      border: "0.5px solid ".concat(t.line),
      borderRadius: 14,
      padding: '16px 22px',
      marginBottom: 28
    }
  }, /*#__PURE__*/React.createElement(FilterStack, {
    f: f,
    t: t
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: 24
    }
  }, f.filtered.map(function (c) {
    return /*#__PURE__*/React.createElement(ContentCard, {
      key: c.id,
      c: c,
      t: t,
      selected: f.selected.has(c.id),
      onToggleSelect: f.toggleSelect,
      selectMode: f.selectMode
    });
  })), /*#__PURE__*/React.createElement(StickyActionBar, {
    f: f,
    t: t
  })));
}

// ═══════════════════════════════════════════════════════════════
// VARIANT B: 검색바를 묶음제안과 한 묶음으로 — "찾고 → 묶기" 흐름
// 위쪽: 작은 즐겨찾기 토글(보조)
// 메인: [검색바 ──────────────] [묶음제안 큰 버튼]
// 묶음제안이 검색의 결과 액션처럼 보이게 함.
// ═══════════════════════════════════════════════════════════════
function ContentSearchB(_ref11) {
  var _ref11$t = _ref11.t,
    t = _ref11$t === void 0 ? BASE_TOKENS : _ref11$t;
  var f = useContentFilters();
  return /*#__PURE__*/React.createElement("div", {
    style: {
      minHeight: '100%',
      background: t.bg,
      color: t.ink,
      fontFamily: t.sans
    }
  }, /*#__PURE__*/React.createElement(ContentTopNav, {
    t: t,
    active: "content"
  }), /*#__PURE__*/React.createElement("main", {
    style: {
      margin: '0 auto',
      padding: '32px 40px 80px',
      maxWidth: 960
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      justifyContent: 'space-between',
      marginBottom: 16
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: t.mono,
      fontSize: 13,
      color: t.inkMute,
      letterSpacing: 0.2
    }
  }, f.filtered.length, "\uD3B8"), /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      return f.setFavOnly(!f.favOnly);
    },
    style: {
      background: 'transparent',
      border: 'none',
      cursor: 'pointer',
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      fontFamily: t.sans,
      fontSize: 13,
      color: f.favOnly ? '#E85D2C' : t.inkMute,
      fontWeight: f.favOnly ? 600 : 500,
      padding: '6px 4px'
    }
  }, /*#__PURE__*/React.createElement(HeartIcon, {
    filled: f.favOnly,
    size: 14
  }), f.favOnly ? '즐겨찾기만 보는 중' : '즐겨찾기만 보기')), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10,
      marginBottom: 22
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement(SearchInput, {
    value: f.search,
    onChange: f.setSearch,
    t: t,
    big: true
  })), /*#__PURE__*/React.createElement(BundleButton, {
    active: f.selectMode,
    onClick: function onClick() {
      return f.setSelectMode(!f.selectMode);
    },
    t: t,
    height: 48
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      background: t.surface,
      border: "0.5px solid ".concat(t.line),
      borderRadius: 14,
      padding: '16px 22px',
      marginBottom: 28
    }
  }, /*#__PURE__*/React.createElement(FilterStack, {
    f: f,
    t: t
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: 24
    }
  }, f.filtered.map(function (c) {
    return /*#__PURE__*/React.createElement(ContentCard, {
      key: c.id,
      c: c,
      t: t,
      selected: f.selected.has(c.id),
      onToggleSelect: f.toggleSelect,
      selectMode: f.selectMode
    });
  })), /*#__PURE__*/React.createElement(StickyActionBar, {
    f: f,
    t: t
  })));
}

// ═══════════════════════════════════════════════════════════════
// VARIANT C: 2단 — 1행 [제목 · 카운트 · 액션 우측]
//                  2행 [검색바 풀와이드]
// 액션이 페이지 헤더 액션처럼 명확히 분리됨. 검색바는 자체로 강조.
// ═══════════════════════════════════════════════════════════════
function ContentSearchC(_ref12) {
  var _ref12$t = _ref12.t,
    t = _ref12$t === void 0 ? BASE_TOKENS : _ref12$t;
  var f = useContentFilters();
  return /*#__PURE__*/React.createElement("div", {
    style: {
      minHeight: '100%',
      background: t.bg,
      color: t.ink,
      fontFamily: t.sans
    }
  }, /*#__PURE__*/React.createElement(ContentTopNav, {
    t: t,
    active: "content"
  }), /*#__PURE__*/React.createElement("main", {
    style: {
      margin: '0 auto',
      padding: '32px 40px 80px',
      maxWidth: 960
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 18
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: t.mono,
      fontSize: 13,
      color: t.inkMute,
      letterSpacing: 0.2
    }
  }, f.filtered.length, "\uD3B8"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(FavButton, {
    active: f.favOnly,
    onClick: function onClick() {
      return f.setFavOnly(!f.favOnly);
    },
    t: t,
    height: 40
  }), /*#__PURE__*/React.createElement(BundleButton, {
    active: f.selectMode,
    onClick: function onClick() {
      return f.setSelectMode(!f.selectMode);
    },
    t: t,
    height: 40
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 22
    }
  }, /*#__PURE__*/React.createElement(SearchInput, {
    value: f.search,
    onChange: f.setSearch,
    t: t,
    big: true
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      background: t.surface,
      border: "0.5px solid ".concat(t.line),
      borderRadius: 14,
      padding: '16px 22px',
      marginBottom: 28
    }
  }, /*#__PURE__*/React.createElement(FilterStack, {
    f: f,
    t: t
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: 24
    }
  }, f.filtered.map(function (c) {
    return /*#__PURE__*/React.createElement(ContentCard, {
      key: c.id,
      c: c,
      t: t,
      selected: f.selected.has(c.id),
      onToggleSelect: f.toggleSelect,
      selectMode: f.selectMode
    });
  })), /*#__PURE__*/React.createElement(StickyActionBar, {
    f: f,
    t: t
  })));
}

// ═══════════════════════════════════════════════════════════════
// VARIANT D: 검색바가 필터 카드의 일부 — 통합된 "툴박스" 느낌
// 검색바 + 5개 필터행 한 카드 안에. 액션은 카드 외부 우상단.
// 검색과 필터를 하나의 "조회 도구"로 묶어 인지하게 함.
// ═══════════════════════════════════════════════════════════════
function ContentSearchD(_ref13) {
  var _ref13$t = _ref13.t,
    t = _ref13$t === void 0 ? BASE_TOKENS : _ref13$t;
  var f = useContentFilters();
  return /*#__PURE__*/React.createElement("div", {
    style: {
      minHeight: '100%',
      background: t.bg,
      color: t.ink,
      fontFamily: t.sans
    }
  }, /*#__PURE__*/React.createElement(ContentTopNav, {
    t: t,
    active: "content"
  }), /*#__PURE__*/React.createElement("main", {
    style: {
      margin: '0 auto',
      padding: '32px 40px 80px',
      maxWidth: 960
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 16
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: t.mono,
      fontSize: 13,
      color: t.inkMute,
      letterSpacing: 0.2
    }
  }, f.filtered.length, "\uD3B8"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(FavButton, {
    active: f.favOnly,
    onClick: function onClick() {
      return f.setFavOnly(!f.favOnly);
    },
    t: t,
    height: 38
  }), /*#__PURE__*/React.createElement(BundleButton, {
    active: f.selectMode,
    onClick: function onClick() {
      return f.setSelectMode(!f.selectMode);
    },
    t: t,
    height: 38
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      background: t.surface,
      border: "0.5px solid ".concat(t.line),
      borderRadius: 14,
      padding: '14px 14px 18px',
      marginBottom: 28
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 14,
      padding: '0 6px'
    }
  }, /*#__PURE__*/React.createElement(SearchInput, {
    value: f.search,
    onChange: f.setSearch,
    t: t
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 0.5,
      background: t.line,
      marginBottom: 14
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '0 8px'
    }
  }, /*#__PURE__*/React.createElement(FilterStack, {
    f: f,
    t: t
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: 24
    }
  }, f.filtered.map(function (c) {
    return /*#__PURE__*/React.createElement(ContentCard, {
      key: c.id,
      c: c,
      t: t,
      selected: f.selected.has(c.id),
      onToggleSelect: f.toggleSelect,
      selectMode: f.selectMode
    });
  })), /*#__PURE__*/React.createElement(StickyActionBar, {
    f: f,
    t: t
  })));
}
Object.assign(window, {
  ContentTopNav: ContentTopNav,
  ContentSearchA: ContentSearchA,
  ContentSearchB: ContentSearchB,
  ContentSearchC: ContentSearchC,
  ContentSearchD: ContentSearchD,
  ContentCard: ContentCard,
  FilterChip: FilterChip,
  FilterRow: FilterRow,
  SearchInput: SearchInput,
  HeartIcon: HeartIcon
});
