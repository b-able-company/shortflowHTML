function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
// Small shared UI primitives used across all dashboard variants.

function Poster(_ref) {
  var _ref$tone = _ref.tone,
    tone = _ref$tone === void 0 ? 'rose' : _ref$tone,
    _ref$size = _ref.size,
    size = _ref$size === void 0 ? 44 : _ref$size,
    _ref$label = _ref.label,
    label = _ref$label === void 0 ? '포스터' : _ref$label;
  var t = POSTER_TONES[tone] || POSTER_TONES.rose;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: size,
      height: Math.round(size * 1.4),
      borderRadius: 6,
      background: "linear-gradient(160deg, ".concat(t.bg, " 0%, ").concat(t.bg, " 55%, ").concat(shade(t.bg, -8), " 100%)"),
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'center',
      padding: '4px 2px',
      fontFamily: BASE_TOKENS.mono,
      fontSize: 8,
      color: t.ink,
      letterSpacing: 0.3,
      flexShrink: 0,
      boxShadow: 'inset 0 0 0 0.5px rgba(0,0,0,0.08)'
    }
  }, label);
}
function shade(hex, amt) {
  var c = hex.replace('#', '');
  var num = parseInt(c, 16);
  var r = Math.max(0, Math.min(255, (num >> 16) + amt));
  var g = Math.max(0, Math.min(255, (num >> 8 & 0xff) + amt));
  var b = Math.max(0, Math.min(255, (num & 0xff) + amt));
  return '#' + (r << 16 | g << 8 | b).toString(16).padStart(6, '0');
}
function Badge(_ref2) {
  var kind = _ref2.kind,
    children = _ref2.children,
    _ref2$t = _ref2.t,
    t = _ref2$t === void 0 ? BASE_TOKENS : _ref2$t;
  var map = {
    rs: {
      bg: t.rsTint,
      fg: t.rsInk
    },
    mg: {
      bg: t.mgTint,
      fg: t.mgInk
    },
    paid: {
      bg: t.paidTint,
      fg: t.paid
    },
    upcoming: {
      bg: t.upcomingTint,
      fg: t.upcoming
    },
    neutral: {
      bg: '#EEECE6',
      fg: t.inkMute
    }
  };
  var s = map[kind] || map.neutral;
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 4,
      padding: '2px 7px',
      borderRadius: 999,
      background: s.bg,
      color: s.fg,
      fontFamily: t.mono,
      fontSize: 11,
      fontWeight: 500,
      letterSpacing: 0.2,
      lineHeight: '16px',
      whiteSpace: 'nowrap'
    }
  }, children);
}
function Card(_ref3) {
  var children = _ref3.children,
    _ref3$style = _ref3.style,
    style = _ref3$style === void 0 ? {} : _ref3$style,
    _ref3$t = _ref3.t,
    t = _ref3$t === void 0 ? BASE_TOKENS : _ref3$t;
  return /*#__PURE__*/React.createElement("div", {
    style: _objectSpread({
      background: t.surface,
      border: "0.5px solid ".concat(t.line),
      borderRadius: 14,
      padding: 14
    }, style)
  }, children);
}
function Divider(_ref4) {
  var _ref4$t = _ref4.t,
    t = _ref4$t === void 0 ? BASE_TOKENS : _ref4$t,
    _ref4$style = _ref4.style,
    style = _ref4$style === void 0 ? {} : _ref4$style;
  return /*#__PURE__*/React.createElement("div", {
    style: _objectSpread({
      height: 0.5,
      background: t.line
    }, style)
  });
}
function Label(_ref5) {
  var children = _ref5.children,
    _ref5$t = _ref5.t,
    t = _ref5$t === void 0 ? BASE_TOKENS : _ref5$t,
    _ref5$style = _ref5.style,
    style = _ref5$style === void 0 ? {} : _ref5$style;
  return /*#__PURE__*/React.createElement("div", {
    style: _objectSpread({
      fontFamily: t.sans,
      fontSize: 11,
      fontWeight: 500,
      color: t.inkMute,
      textTransform: 'uppercase',
      letterSpacing: 0.6
    }, style)
  }, children);
}
function Money(_ref6) {
  var value = _ref6.value,
    _ref6$size = _ref6.size,
    size = _ref6$size === void 0 ? 26 : _ref6$size,
    _ref6$t = _ref6.t,
    t = _ref6$t === void 0 ? BASE_TOKENS : _ref6$t,
    color = _ref6.color,
    _ref6$weight = _ref6.weight,
    weight = _ref6$weight === void 0 ? 600 : _ref6$weight;
  var neg = value === 0 || value == null;
  return /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: t.mono,
      fontSize: size,
      fontWeight: weight,
      color: color || (neg ? t.inkFaint : t.ink),
      letterSpacing: -0.5,
      fontVariantNumeric: 'tabular-nums'
    }
  }, fmt(value));
}
function Chevron(_ref7) {
  var _ref7$dir = _ref7.dir,
    dir = _ref7$dir === void 0 ? 'right' : _ref7$dir,
    _ref7$size = _ref7.size,
    size = _ref7$size === void 0 ? 12 : _ref7$size,
    _ref7$color = _ref7.color,
    color = _ref7$color === void 0 ? '#9CA0A6' : _ref7$color;
  var rot = {
    right: 0,
    down: 90,
    left: 180,
    up: 270
  }[dir];
  return /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 12 12",
    style: {
      transform: "rotate(".concat(rot, "deg)"),
      transition: 'transform .2s'
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M4 2l4 4-4 4",
    stroke: color,
    strokeWidth: "1.5",
    fill: "none",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }));
}
Object.assign(window, {
  Poster: Poster,
  Badge: Badge,
  Card: Card,
  Divider: Divider,
  Label: Label,
  Money: Money,
  Chevron: Chevron,
  shade: shade
});
