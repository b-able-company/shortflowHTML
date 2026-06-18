function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
// Shared UI primitives for the cart + proposal flow.
// Reuses BASE_TOKENS / POSTER_TONES / shade / HeartIcon from existing files.

// ─── Top nav (cart icon + count) ─────────────────────────────
function CartTopNav(_ref) {
  var _ref$t = _ref.t,
    t = _ref$t === void 0 ? BASE_TOKENS : _ref$t,
    _ref$active = _ref.active,
    active = _ref$active === void 0 ? 'content' : _ref$active,
    _ref$cartCount = _ref.cartCount,
    cartCount = _ref$cartCount === void 0 ? 0 : _ref$cartCount,
    onCartClick = _ref.onCartClick;
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
      maxWidth: 1180,
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
      gap: 16,
      color: '#6B7280',
      fontSize: 14
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: onCartClick,
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
      background: '#E85D2C',
      color: '#fff',
      minWidth: 18,
      height: 18,
      padding: '0 5px',
      borderRadius: 9,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      letterSpacing: 0
    }
  }, cartCount)), /*#__PURE__*/React.createElement("span", {
    style: {
      color: t.ink,
      fontWeight: 500,
      fontSize: 14
    }
  }, PLATFORM_NAME))));
}
function CartIcon(_ref2) {
  var _ref2$size = _ref2.size,
    size = _ref2$size === void 0 ? 16 : _ref2$size;
  return /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.8",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M3 4h2l2.2 11.3a2 2 0 0 0 2 1.7h8.1a2 2 0 0 0 2-1.6L21 8H6"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "9.5",
    cy: "20",
    r: "1.3"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "17",
    cy: "20",
    r: "1.3"
  }));
}
function TrashIcon(_ref3) {
  var _ref3$size = _ref3.size,
    size = _ref3$size === void 0 ? 14 : _ref3$size,
    _ref3$color = _ref3.color,
    color = _ref3$color === void 0 ? 'currentColor' : _ref3$color;
  return /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    strokeWidth: "1.6",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M3 6h18"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M19 6l-1.2 13a2 2 0 0 1-2 1.8H8.2a2 2 0 0 1-2-1.8L5 6"
  }));
}
function CheckIcon(_ref4) {
  var _ref4$size = _ref4.size,
    size = _ref4$size === void 0 ? 12 : _ref4$size,
    _ref4$color = _ref4.color,
    color = _ref4$color === void 0 ? '#fff' : _ref4$color,
    _ref4$weight = _ref4.weight,
    weight = _ref4$weight === void 0 ? 2.2 : _ref4$weight;
  return /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 12 12",
    fill: "none",
    stroke: color,
    strokeWidth: weight,
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M2.2 6.4l2.5 2.5 5-5.5"
  }));
}
function SendIcon(_ref5) {
  var _ref5$size = _ref5.size,
    size = _ref5$size === void 0 ? 14 : _ref5$size,
    _ref5$color = _ref5.color,
    color = _ref5$color === void 0 ? 'currentColor' : _ref5$color;
  return /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M22 2 11 13"
  }), /*#__PURE__*/React.createElement("path", {
    d: "m22 2-7 20-4-9-9-4 20-7z"
  }));
}
function CloseIcon(_ref6) {
  var _ref6$size = _ref6.size,
    size = _ref6$size === void 0 ? 16 : _ref6$size;
  return /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.8",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M18 6 6 18M6 6l12 12"
  }));
}
function ChevronIcon(_ref7) {
  var _ref7$dir = _ref7.dir,
    dir = _ref7$dir === void 0 ? 'down' : _ref7$dir,
    _ref7$size = _ref7.size,
    size = _ref7$size === void 0 ? 14 : _ref7$size,
    _ref7$color = _ref7.color,
    color = _ref7$color === void 0 ? 'currentColor' : _ref7$color;
  var rot = {
    right: -90,
    down: 0,
    left: 90,
    up: 180
  }[dir];
  return /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 16 16",
    style: {
      transform: "rotate(".concat(rot, "deg)"),
      transition: 'transform .2s'
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M4 6l4 4 4-4",
    stroke: color,
    strokeWidth: "1.5",
    fill: "none",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }));
}

// ─── Form atoms ───────────────────────────────────────────────
function Field(_ref8) {
  var label = _ref8.label,
    hint = _ref8.hint,
    required = _ref8.required,
    children = _ref8.children,
    _ref8$t = _ref8.t,
    t = _ref8$t === void 0 ? BASE_TOKENS : _ref8$t,
    _ref8$style = _ref8.style,
    style = _ref8$style === void 0 ? {} : _ref8$style;
  return /*#__PURE__*/React.createElement("div", {
    style: _objectSpread({
      display: 'flex',
      flexDirection: 'column',
      gap: 8
    }, style)
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12.5,
      fontWeight: 600,
      color: t.ink,
      letterSpacing: -0.1
    }
  }, label), required && /*#__PURE__*/React.createElement("span", {
    style: {
      color: '#E85D2C',
      fontSize: 12
    }
  }, "*"), hint && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11.5,
      color: t.inkFaint,
      marginLeft: 'auto',
      fontFamily: t.mono
    }
  }, hint)), children);
}
function ReadonlyField(_ref9) {
  var value = _ref9.value,
    _ref9$t = _ref9.t,
    t = _ref9$t === void 0 ? BASE_TOKENS : _ref9$t,
    _ref9$mono = _ref9.mono,
    mono = _ref9$mono === void 0 ? false : _ref9$mono;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      height: 38,
      padding: '0 12px',
      borderRadius: 8,
      background: t.surfaceAlt,
      border: "0.5px solid ".concat(t.line),
      display: 'flex',
      alignItems: 'center',
      fontFamily: mono ? t.mono : t.sans,
      fontSize: 13.5,
      color: t.inkMute
    }
  }, value);
}
function TextInput(_ref0) {
  var value = _ref0.value,
    _onChange = _ref0.onChange,
    placeholder = _ref0.placeholder,
    _ref0$t = _ref0.t,
    t = _ref0$t === void 0 ? BASE_TOKENS : _ref0$t,
    _ref0$mono = _ref0.mono,
    mono = _ref0$mono === void 0 ? false : _ref0$mono,
    suffix = _ref0.suffix,
    prefix = _ref0.prefix;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      height: 38,
      padding: '0 12px',
      borderRadius: 8,
      background: t.surface,
      border: "0.5px solid ".concat(t.lineStrong),
      display: 'flex',
      alignItems: 'center',
      gap: 6,
      transition: 'border-color .12s'
    }
  }, prefix && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      color: t.inkMute,
      fontFamily: t.mono,
      fontWeight: 500
    }
  }, prefix), /*#__PURE__*/React.createElement("input", {
    value: value || '',
    onChange: function onChange(e) {
      return _onChange && _onChange(e.target.value);
    },
    placeholder: placeholder,
    style: {
      flex: 1,
      border: 'none',
      outline: 'none',
      background: 'transparent',
      fontFamily: mono ? t.mono : t.sans,
      fontSize: 13.5,
      color: t.ink,
      height: '100%',
      padding: 0
    }
  }), suffix && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      color: t.inkMute,
      fontFamily: t.mono
    }
  }, suffix));
}
function TextArea(_ref1) {
  var value = _ref1.value,
    _onChange2 = _ref1.onChange,
    placeholder = _ref1.placeholder,
    _ref1$t = _ref1.t,
    t = _ref1$t === void 0 ? BASE_TOKENS : _ref1$t,
    _ref1$rows = _ref1.rows,
    rows = _ref1$rows === void 0 ? 3 : _ref1$rows;
  return /*#__PURE__*/React.createElement("textarea", {
    value: value || '',
    onChange: function onChange(e) {
      return _onChange2 && _onChange2(e.target.value);
    },
    placeholder: placeholder,
    rows: rows,
    style: {
      width: '100%',
      padding: '10px 12px',
      borderRadius: 8,
      background: t.surface,
      border: "0.5px solid ".concat(t.lineStrong),
      fontFamily: t.sans,
      fontSize: 13.5,
      color: t.ink,
      resize: 'none',
      outline: 'none',
      lineHeight: 1.5
    }
  });
}
function Select(_ref10) {
  var value = _ref10.value,
    onChange = _ref10.onChange,
    options = _ref10.options,
    _ref10$t = _ref10.t,
    t = _ref10$t === void 0 ? BASE_TOKENS : _ref10$t,
    placeholder = _ref10.placeholder;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      height: 38,
      padding: '0 36px 0 12px',
      borderRadius: 8,
      background: t.surface,
      border: "0.5px solid ".concat(t.lineStrong),
      display: 'flex',
      alignItems: 'center',
      fontFamily: t.sans,
      fontSize: 13.5,
      color: value ? t.ink : t.inkFaint,
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement("span", null, value || placeholder || '선택'), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      right: 12,
      top: '50%',
      transform: 'translateY(-50%)',
      color: t.inkMute,
      pointerEvents: 'none'
    }
  }, /*#__PURE__*/React.createElement(ChevronIcon, {
    dir: "down",
    size: 14
  })));
}
function RadioChip(_ref11) {
  var active = _ref11.active,
    onClick = _ref11.onClick,
    children = _ref11.children,
    _ref11$t = _ref11.t,
    t = _ref11$t === void 0 ? BASE_TOKENS : _ref11$t;
  return /*#__PURE__*/React.createElement("button", {
    onClick: onClick,
    style: {
      height: 36,
      padding: '0 14px',
      borderRadius: 8,
      border: active ? '0.5px solid transparent' : "0.5px solid ".concat(t.lineStrong),
      background: active ? '#E85D2C' : t.surface,
      color: active ? '#fff' : t.ink,
      fontFamily: t.sans,
      fontSize: 13,
      fontWeight: active ? 600 : 500,
      cursor: 'pointer',
      whiteSpace: 'nowrap',
      transition: 'all .12s'
    }
  }, children);
}
function RadioGroup(_ref12) {
  var value = _ref12.value,
    onChange = _ref12.onChange,
    options = _ref12.options,
    _ref12$t = _ref12.t,
    t = _ref12$t === void 0 ? BASE_TOKENS : _ref12$t;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: 6
    }
  }, options.map(function (o) {
    return /*#__PURE__*/React.createElement(RadioChip, {
      key: o,
      active: value === o,
      onClick: function onClick() {
        return onChange && onChange(o);
      },
      t: t
    }, o);
  }));
}
function Toggle(_ref13) {
  var value = _ref13.value,
    onChange = _ref13.onChange,
    options = _ref13.options,
    _ref13$t = _ref13.t,
    t = _ref13$t === void 0 ? BASE_TOKENS : _ref13$t;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'inline-flex',
      padding: 3,
      borderRadius: 9,
      background: t.surfaceAlt,
      border: "0.5px solid ".concat(t.line)
    }
  }, options.map(function (o) {
    return /*#__PURE__*/React.createElement("button", {
      key: o,
      onClick: function onClick() {
        return onChange && onChange(o);
      },
      style: {
        height: 30,
        padding: '0 14px',
        borderRadius: 7,
        border: 'none',
        background: value === o ? t.surface : 'transparent',
        color: value === o ? t.ink : t.inkMute,
        fontFamily: t.mono,
        fontSize: 12,
        fontWeight: 600,
        cursor: 'pointer',
        boxShadow: value === o ? '0 1px 3px rgba(0,0,0,0.06), 0 0 0 0.5px rgba(0,0,0,0.04)' : 'none',
        letterSpacing: 0.3,
        transition: 'all .12s'
      }
    }, o);
  }));
}
function Checkbox(_ref14) {
  var checked = _ref14.checked,
    onChange = _ref14.onChange,
    _ref14$size = _ref14.size,
    size = _ref14$size === void 0 ? 18 : _ref14$size,
    _ref14$indeterminate = _ref14.indeterminate,
    indeterminate = _ref14$indeterminate === void 0 ? false : _ref14$indeterminate;
  var bg = checked || indeterminate ? '#E85D2C' : '#fff';
  return /*#__PURE__*/React.createElement("div", {
    onClick: function onClick() {
      return onChange && onChange(!checked);
    },
    style: {
      width: size,
      height: size,
      borderRadius: 5,
      background: bg,
      border: checked || indeterminate ? 'none' : '1.2px solid #C9C7C0',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      flexShrink: 0,
      transition: 'all .12s'
    }
  }, indeterminate ? /*#__PURE__*/React.createElement("div", {
    style: {
      width: size * 0.5,
      height: 2,
      background: '#fff',
      borderRadius: 1
    }
  }) : checked ? /*#__PURE__*/React.createElement(CheckIcon, {
    size: Math.round(size * 0.66),
    weight: 2.4
  }) : null);
}
function PrimaryButton(_ref15) {
  var children = _ref15.children,
    onClick = _ref15.onClick,
    _ref15$height = _ref15.height,
    height = _ref15$height === void 0 ? 44 : _ref15$height,
    full = _ref15.full,
    _ref15$t = _ref15.t,
    t = _ref15$t === void 0 ? BASE_TOKENS : _ref15$t,
    icon = _ref15.icon,
    _ref15$style = _ref15.style,
    style = _ref15$style === void 0 ? {} : _ref15$style,
    disabled = _ref15.disabled;
  return /*#__PURE__*/React.createElement("button", {
    onClick: onClick,
    disabled: disabled,
    style: _objectSpread({
      height: height,
      padding: '0 22px',
      borderRadius: 10,
      border: 'none',
      background: disabled ? '#D4D2CB' : '#E85D2C',
      color: '#fff',
      fontFamily: t.sans,
      fontSize: 14,
      fontWeight: 600,
      cursor: disabled ? 'not-allowed' : 'pointer',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
      width: full ? '100%' : undefined,
      letterSpacing: -0.1,
      transition: 'background .12s'
    }, style)
  }, icon, children);
}
function GhostButton(_ref16) {
  var children = _ref16.children,
    onClick = _ref16.onClick,
    _ref16$height = _ref16.height,
    height = _ref16$height === void 0 ? 44 : _ref16$height,
    _ref16$t = _ref16.t,
    t = _ref16$t === void 0 ? BASE_TOKENS : _ref16$t,
    icon = _ref16.icon,
    _ref16$style = _ref16.style,
    style = _ref16$style === void 0 ? {} : _ref16$style;
  return /*#__PURE__*/React.createElement("button", {
    onClick: onClick,
    style: _objectSpread({
      height: height,
      padding: '0 18px',
      borderRadius: 10,
      border: "0.5px solid ".concat(t.lineStrong),
      background: t.surface,
      color: t.ink,
      fontFamily: t.sans,
      fontSize: 14,
      fontWeight: 500,
      cursor: 'pointer',
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6
    }, style)
  }, icon, children);
}

// ─── Item row pieces ──────────────────────────────────────────
function ItemPoster(_ref17) {
  var tone = _ref17.tone,
    _ref17$size = _ref17.size,
    size = _ref17$size === void 0 ? 64 : _ref17$size,
    _ref17$ratio = _ref17.ratio,
    ratio = _ref17$ratio === void 0 ? 1.4 : _ref17$ratio,
    label = _ref17.label;
  var tt = POSTER_TONES[tone] || POSTER_TONES.rose;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: size,
      height: Math.round(size * ratio),
      borderRadius: 6,
      flexShrink: 0,
      background: "linear-gradient(160deg, ".concat(tt.bg, " 0%, ").concat(shade(tt.bg, -12), " 100%)"),
      boxShadow: 'inset 0 0 0 0.5px rgba(0,0,0,0.08)',
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'center',
      padding: '4px 4px',
      color: tt.ink,
      fontFamily: BASE_TOKENS.mono,
      fontSize: 8,
      letterSpacing: 0.3,
      textAlign: 'center',
      lineHeight: 1.1
    }
  }, label || '포스터');
}
Object.assign(window, {
  CartTopNav: CartTopNav,
  CartIcon: CartIcon,
  TrashIcon: TrashIcon,
  CheckIcon: CheckIcon,
  SendIcon: SendIcon,
  CloseIcon: CloseIcon,
  ChevronIcon: ChevronIcon,
  Field: Field,
  ReadonlyField: ReadonlyField,
  TextInput: TextInput,
  TextArea: TextArea,
  Select: Select,
  RadioChip: RadioChip,
  RadioGroup: RadioGroup,
  Toggle: Toggle,
  Checkbox: Checkbox,
  PrimaryButton: PrimaryButton,
  GhostButton: GhostButton,
  ItemPoster: ItemPoster
});
