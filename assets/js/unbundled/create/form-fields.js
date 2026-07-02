function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
// 새 콘텐츠 생성 — 폼 필드 프리미티브 (디자인 시스템 톤에 맞춤)
// 모든 컴포넌트는 t(BASE_TOKENS)를 받음.

var ACCENT = '#E85D2C';
var ACCENT_SOFT = '#FFF1EC';

// ─── 라벨 + 힌트 래퍼 ──────────────────────────────────
function Field(_ref) {
  var label = _ref.label,
    hint = _ref.hint,
    required = _ref.required,
    optional = _ref.optional,
    children = _ref.children,
    t = _ref.t,
    span = _ref.span,
    _ref$gap = _ref.gap,
    gap = _ref$gap === void 0 ? 7 : _ref$gap;
  var _React$useState = React.useState(false),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    hintOpen = _React$useState2[0],
    setHintOpen = _React$useState2[1];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: gap,
      gridColumn: span ? "span ".concat(span) : 'auto',
      minWidth: 0
    }
  }, label && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 7,
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: t.sans,
      fontSize: 12.5,
      fontWeight: 600,
      color: t.ink,
      letterSpacing: -0.1,
      whiteSpace: 'nowrap'
    }
  }, label), required && /*#__PURE__*/React.createElement("span", {
    style: {
      color: ACCENT,
      fontSize: 12,
      fontWeight: 700
    }
  }, "*"), optional && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: t.sans,
      fontSize: 11,
      color: t.inkFaint
    }
  }, "\uC120\uD0DD"), hint && /*#__PURE__*/React.createElement("span", {
    role: "button",
    tabIndex: 0,
    "aria-label": hint,
    onClick: function onClick() {
      return setHintOpen(function (v) {
        return !v;
      });
    },
    onFocus: function onFocus() {
      return setHintOpen(true);
    },
    onBlur: function onBlur() {
      return setHintOpen(false);
    },
    onMouseEnter: function onMouseEnter() {
      return setHintOpen(true);
    },
    onMouseLeave: function onMouseLeave() {
      return setHintOpen(false);
    },
    style: {
      position: 'relative',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: 15,
      height: 15,
      borderRadius: 999,
      border: "0.5px solid ".concat(t.lineStrong),
      color: '#9A9DA3',
      background: t.surface,
      fontFamily: t.sans,
      fontSize: 10,
      fontWeight: 700,
      lineHeight: 1,
      cursor: 'help'
    }
  }, "?", hintOpen && /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      top: 22,
      left: -8,
      zIndex: 40,
      width: 'max-content',
      maxWidth: 280,
      padding: '8px 10px',
      borderRadius: 7,
      border: "0.5px solid ".concat(t.line),
      background: t.surface,
      boxShadow: '0 4px 12px rgba(0,0,0,0.045)',
      color: t.inkMute,
      fontFamily: t.sans,
      fontSize: 11.5,
      fontWeight: 500,
      lineHeight: 1.45,
      whiteSpace: 'normal',
      textAlign: 'left'
    }
  }, hint))), children);
}
var inputBase = function inputBase(t) {
  return {
    width: '100%',
    height: 36,
    padding: 0,
    borderRadius: 0,
    border: 'none',
    background: 'transparent',
    fontFamily: t.sans,
    fontSize: 13.5,
    color: t.ink,
    outline: 'none',
    transition: 'color .12s'
  };
};

// ─── 텍스트 입력 ───────────────────────────────────────
function TextInput(_ref2) {
  var value = _ref2.value,
    _onChange = _ref2.onChange,
    placeholder = _ref2.placeholder,
    t = _ref2.t,
    mono = _ref2.mono;
  var _React$useState = React.useState(false),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    foc = _React$useState2[0],
    setFoc = _React$useState2[1];
  return /*#__PURE__*/React.createElement("input", {
    value: value || '',
    placeholder: placeholder,
    onChange: function onChange(e) {
      return _onChange && _onChange(e.target.value);
    },
    onFocus: function onFocus() {
      return setFoc(true);
    },
    onBlur: function onBlur() {
      return setFoc(false);
    },
    style: _objectSpread(_objectSpread({}, inputBase(t)), {}, {
      fontFamily: mono ? t.mono : t.sans,
      boxShadow: 'none'
    })
  });
}

// ─── 숫자 입력 (+ 접미사) ──────────────────────────────
function NumberInput(_ref3) {
  var value = _ref3.value,
    _onChange2 = _ref3.onChange,
    suffix = _ref3.suffix,
    t = _ref3.t,
    placeholder = _ref3.placeholder;
  var _React$useState3 = React.useState(false),
    _React$useState4 = _slicedToArray(_React$useState3, 2),
    foc = _React$useState4[0],
    setFoc = _React$useState4[1];
  return /*#__PURE__*/React.createElement("div", {
    style: _objectSpread(_objectSpread({}, inputBase(t)), {}, {
      display: 'flex',
      alignItems: 'center',
      boxShadow: 'none'
    })
  }, /*#__PURE__*/React.createElement("input", {
    type: "text",
    inputMode: "numeric",
    pattern: "[0-9]*",
    value: value !== null && value !== void 0 ? value : '',
    placeholder: placeholder,
    onChange: function onChange(e) {
      var digits = e.target.value.replace(/[^0-9]/g, '');
      _onChange2 && _onChange2(digits === '' ? null : Number(digits));
    },
    onFocus: function onFocus() {
      return setFoc(true);
    },
    onBlur: function onBlur() {
      return setFoc(false);
    },
    style: {
      flex: 1,
      border: 'none',
      outline: 'none',
      background: 'transparent',
      fontFamily: t.mono,
      fontSize: 13.5,
      color: t.ink,
      minWidth: 0
    }
  }), suffix && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: t.sans,
      fontSize: 12.5,
      color: t.inkFaint,
      marginLeft: 'auto',
      paddingLeft: 10,
      whiteSpace: 'nowrap'
    }
  }, suffix));
}

// ─── 날짜 입력 ─────────────────────────────────────────
function DateInput(_ref4) {
  var value = _ref4.value,
    _onChange3 = _ref4.onChange,
    t = _ref4.t;
  var _React$useState5 = React.useState(false),
    _React$useState6 = _slicedToArray(_React$useState5, 2),
    foc = _React$useState6[0],
    setFoc = _React$useState6[1];
  return /*#__PURE__*/React.createElement("input", {
    type: "date",
    value: value || '',
    onChange: function onChange(e) {
      return _onChange3 && _onChange3(e.target.value);
    },
    onFocus: function onFocus() {
      return setFoc(true);
    },
    onBlur: function onBlur() {
      return setFoc(false);
    },
    style: _objectSpread(_objectSpread({}, inputBase(t)), {}, {
      fontFamily: t.mono,
      color: value ? t.ink : t.inkFaint,
      boxShadow: 'none'
    })
  });
}

// ─── 멀티라인 ──────────────────────────────────────────
function TextArea(_ref5) {
  var value = _ref5.value,
    _onChange4 = _ref5.onChange,
    placeholder = _ref5.placeholder,
    _ref5$rows = _ref5.rows,
    rows = _ref5$rows === void 0 ? 3 : _ref5$rows,
    t = _ref5.t;
  var _React$useState7 = React.useState(false),
    _React$useState8 = _slicedToArray(_React$useState7, 2),
    foc = _React$useState8[0],
    setFoc = _React$useState8[1];
  return /*#__PURE__*/React.createElement("textarea", {
    value: value || '',
    placeholder: placeholder,
    rows: rows,
    onChange: function onChange(e) {
      return _onChange4 && _onChange4(e.target.value);
    },
    onFocus: function onFocus() {
      return setFoc(true);
    },
    onBlur: function onBlur() {
      return setFoc(false);
    },
    style: _objectSpread(_objectSpread({}, inputBase(t)), {}, {
      height: 'auto',
      padding: '8px 0',
      resize: 'vertical',
      lineHeight: 1.55,
      boxShadow: 'none'
    })
  });
}

// ─── 세그먼트(짧은 enum) ───────────────────────────────
function EnumSegment(_ref6) {
  var options = _ref6.options,
    value = _ref6.value,
    onChange = _ref6.onChange,
    t = _ref6.t,
    wrap = _ref6.wrap;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: wrap ? 'flex' : 'inline-flex',
      flexWrap: wrap ? 'wrap' : 'nowrap',
      gap: 4,
      background: t.surfaceAlt,
      border: "0.5px solid ".concat(t.line),
      borderRadius: 7,
      padding: 4,
      width: 'fit-content',
      maxWidth: '100%'
    }
  }, options.map(function (o) {
    var sel = value === o.v;
    return /*#__PURE__*/React.createElement("button", {
      key: o.v,
      onClick: function onClick() {
        return onChange && onChange(o.v);
      },
      style: {
        border: 'none',
        cursor: 'pointer',
        borderRadius: 5,
        padding: '8px 14px',
        background: sel ? t.surface : 'transparent',
        color: sel ? t.ink : t.inkMute,
        fontFamily: t.sans,
        fontSize: 13,
        fontWeight: sel ? 700 : 500,
        whiteSpace: 'nowrap',
        boxShadow: sel ? '0 1px 2px rgba(0,0,0,0.06)' : 'none',
        transition: 'all .12s'
      }
    }, o.label);
  }));
}
function InlineRadioChoice(_ref7) {
  var options = _ref7.options,
    value = _ref7.value,
    onChange = _ref7.onChange,
    t = _ref7.t;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 18,
      minHeight: 36
    }
  }, options.map(function (o) {
    var sel = value === o.v;
    return /*#__PURE__*/React.createElement("button", {
      key: o.v,
      onClick: function onClick() {
        return onChange && onChange(o.v);
      },
      style: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: 7,
        border: 'none',
        background: 'transparent',
        padding: 0,
        cursor: 'pointer',
        fontFamily: t.sans,
        fontSize: 13.5,
        fontWeight: sel ? 700 : 500,
        color: sel ? t.ink : t.inkMute,
        whiteSpace: 'nowrap'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 14,
        height: 14,
        borderRadius: 999,
        border: "1px solid ".concat(sel ? ACCENT : t.lineStrong),
        background: t.surface
      }
    }, sel && /*#__PURE__*/React.createElement("span", {
      style: {
        width: 6,
        height: 6,
        borderRadius: 999,
        background: ACCENT
      }
    })), o.label);
  }));
}

// ─── 드롭다운(긴 목록) ─────────────────────────────────
function SelectMenu(_ref8) {
  var options = _ref8.options,
    value = _ref8.value,
    onChange = _ref8.onChange,
    t = _ref8.t,
    placeholder = _ref8.placeholder;
  var _React$useState9 = React.useState(false),
    _React$useState0 = _slicedToArray(_React$useState9, 2),
    open = _React$useState0[0],
    setOpen = _React$useState0[1];
  var ref = React.useRef(null);
  React.useEffect(function () {
    if (!open) return;
    var h = function h(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', h);
    return function () {
      return document.removeEventListener('mousedown', h);
    };
  }, [open]);
  var cur = options.find(function (o) {
    return o.v === value;
  });
  return /*#__PURE__*/React.createElement("div", {
    ref: ref,
    style: {
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      return setOpen(function (o) {
        return !o;
      });
    },
    style: _objectSpread(_objectSpread({}, inputBase(t)), {}, {
      display: 'flex',
      alignItems: 'center',
      cursor: 'pointer',
      textAlign: 'left',
      boxShadow: 'none'
    })
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      color: cur ? t.ink : t.inkFaint
    }
  }, cur ? cur.label : placeholder || '선택'), /*#__PURE__*/React.createElement("svg", {
    width: "14",
    height: "14",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: t.inkFaint,
    strokeWidth: "2.2"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M6 9l6 6 6-6",
    strokeLinecap: "round"
  }))), open && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 40,
      left: 0,
      right: 0,
      zIndex: 30,
      background: t.surface,
      border: "0.5px solid ".concat(t.line),
      borderRadius: 7,
      boxShadow: '0 4px 12px rgba(0,0,0,0.045)',
      padding: 5,
      maxHeight: 240,
      overflow: 'auto'
    }
  }, options.map(function (o) {
    return /*#__PURE__*/React.createElement("div", {
      key: o.v,
      onClick: function onClick() {
        onChange && onChange(o.v);
        setOpen(false);
      },
      style: {
        padding: '9px 11px',
        borderRadius: 5,
        cursor: 'pointer',
        fontFamily: t.sans,
        fontSize: 13,
        fontWeight: o.v === value ? 700 : 500,
        color: o.v === value ? ACCENT : t.ink,
        background: o.v === value ? ACCENT_SOFT : 'transparent'
      }
    }, o.label);
  })));
}

// ─── 멀티 칩 (장르 등) ─────────────────────────────────
function ChipMulti(_ref9) {
  var options = _ref9.options,
    _ref9$value = _ref9.value,
    value = _ref9$value === void 0 ? [] : _ref9$value,
    onChange = _ref9.onChange,
    t = _ref9.t;
  var toggle = function toggle(c) {
    var has = value.includes(c);
    onChange && onChange(has ? value.filter(function (x) {
      return x !== c;
    }) : [].concat(_toConsumableArray(value), [c]));
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: 8
    }
  }, options.map(function (o) {
    var sel = value.includes(o.c);
    return /*#__PURE__*/React.createElement("button", {
      key: o.c,
      onClick: function onClick() {
        return toggle(o.c);
      },
      style: {
        cursor: 'pointer',
        borderRadius: 12,
        padding: '7px 14px',
        border: "0.5px solid ".concat(sel ? ACCENT : t.lineStrong),
        background: sel ? ACCENT_SOFT : t.surface,
        color: sel ? ACCENT : t.inkMute,
        fontFamily: t.sans,
        fontSize: 12.5,
        fontWeight: sel ? 700 : 500,
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        transition: 'all .12s'
      }
    }, o.label);
  }));
}

// ─── 태그 입력 (기선공개 플랫폼) ──────────────────────
function TagInput(_ref0) {
  var _ref0$value = _ref0.value,
    value = _ref0$value === void 0 ? [] : _ref0$value,
    onChange = _ref0.onChange,
    _ref0$suggestions = _ref0.suggestions,
    suggestions = _ref0$suggestions === void 0 ? [] : _ref0$suggestions,
    placeholder = _ref0.placeholder,
    t = _ref0.t;
  var _React$useState1 = React.useState(''),
    _React$useState10 = _slicedToArray(_React$useState1, 2),
    draft = _React$useState10[0],
    setDraft = _React$useState10[1];
  var add = function add(v) {
    var x = (v || draft).trim();
    if (!x || value.includes(x)) {
      setDraft('');
      return;
    }
    onChange && onChange([].concat(_toConsumableArray(value), [x]));
    setDraft('');
  };
  var remove = function remove(x) {
    return onChange && onChange(value.filter(function (v) {
      return v !== x;
    }));
  };
  var avail = suggestions.filter(function (s) {
    return !value.includes(s);
  });
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 9
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: _objectSpread(_objectSpread({}, inputBase(t)), {}, {
      height: 'auto',
      minHeight: 36,
      display: 'flex',
      flexWrap: 'wrap',
      gap: 7,
      alignItems: 'center',
      padding: '5px 0'
    })
  }, value.map(function (x) {
    return /*#__PURE__*/React.createElement("span", {
      key: x,
      style: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        padding: '4px 6px 4px 11px',
        borderRadius: 5,
        background: t.surfaceAlt,
        border: "0.5px solid ".concat(t.line),
        fontFamily: t.sans,
        fontSize: 12.5,
        color: t.ink
      }
    }, x, /*#__PURE__*/React.createElement("button", {
      onClick: function onClick() {
        return remove(x);
      },
      style: {
        border: 'none',
        background: 'transparent',
        cursor: 'pointer',
        color: t.inkFaint,
        padding: 0,
        display: 'inline-flex'
      }
    }, /*#__PURE__*/React.createElement("svg", {
      width: "13",
      height: "13",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2.2"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M18 6L6 18M6 6l12 12",
      strokeLinecap: "round"
    }))));
  }), /*#__PURE__*/React.createElement("input", {
    value: draft,
    placeholder: value.length ? '' : placeholder,
    onChange: function onChange(e) {
      return setDraft(e.target.value);
    },
    onKeyDown: function onKeyDown(e) {
      if (e.key === 'Enter') {
        e.preventDefault();
        add();
      }
      if (e.key === 'Backspace' && !draft && value.length) remove(value[value.length - 1]);
    },
    style: {
      flex: 1,
      minWidth: 80,
      border: 'none',
      outline: 'none',
      background: 'transparent',
      fontFamily: t.sans,
      fontSize: 13,
      color: t.ink
    }
  })), avail.length > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: 6
    }
  }, avail.map(function (s) {
    return /*#__PURE__*/React.createElement("button", {
      key: s,
      onClick: function onClick() {
        return add(s);
      },
      style: {
        cursor: 'pointer',
        borderRadius: 10,
        padding: '4px 11px',
        border: "0.5px dashed ".concat(t.lineStrong),
        background: 'transparent',
        color: t.inkMute,
        fontFamily: t.sans,
        fontSize: 11.5,
        fontWeight: 500
      }
    }, "+ ", s);
  })));
}

// ─── 토글 스위치 ───────────────────────────────────────
function ToggleSwitch(_ref1) {
  var value = _ref1.value,
    onChange = _ref1.onChange,
    t = _ref1.t,
    _ref1$onLabel = _ref1.onLabel,
    onLabel = _ref1$onLabel === void 0 ? '예' : _ref1$onLabel,
    _ref1$offLabel = _ref1.offLabel,
    offLabel = _ref1$offLabel === void 0 ? '아니오' : _ref1$offLabel;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 11
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      return onChange && onChange(!value);
    },
    style: {
      width: 46,
      height: 26,
      borderRadius: 999,
      border: 'none',
      cursor: 'pointer',
      position: 'relative',
      background: value ? ACCENT : t.lineStrong,
      transition: 'background .15s',
      padding: 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      top: 3,
      left: value ? 23 : 3,
      width: 20,
      height: 20,
      borderRadius: 999,
      background: '#FFF',
      boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
      transition: 'left .15s'
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: t.sans,
      fontSize: 13,
      fontWeight: 600,
      color: value ? t.ink : t.inkMute
    }
  }, value ? onLabel : offLabel));
}

// ─── 섹션 카드 ─────────────────────────────────────────
function SectionCard(_ref10) {
  var title = _ref10.title,
    desc = _ref10.desc,
    step = _ref10.step,
    children = _ref10.children,
    t = _ref10.t,
    id = _ref10.id;
  return /*#__PURE__*/React.createElement("section", {
    id: id,
    style: {
      background: t.surface,
      border: "0.5px solid ".concat(t.line),
      borderRadius: 12,
      padding: '24px 26px 28px',
      scrollMarginTop: 90
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: 12,
      marginBottom: 24,
      paddingBottom: 0,
      borderBottom: 'none'
    }
  }, step != null && /*#__PURE__*/React.createElement("span", {
    style: {
      flexShrink: 0,
      width: 26,
      height: 26,
      borderRadius: 6,
      background: ACCENT_SOFT,
      color: ACCENT,
      fontFamily: t.mono,
      fontSize: 13,
      fontWeight: 700,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 1
    }
  }, step), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      fontFamily: t.sans,
      fontSize: 17,
      fontWeight: 700,
      color: t.ink,
      letterSpacing: -0.4
    }
  }, title), desc && /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: t.sans,
      fontSize: 12.5,
      color: t.inkMute,
      marginTop: 4
    }
  }, desc))), children);
}

// 2열 그리드
function FieldGrid(_ref11) {
  var children = _ref11.children,
    _ref11$cols = _ref11.cols,
    cols = _ref11$cols === void 0 ? 2 : _ref11$cols,
    t = _ref11.t;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: "repeat(".concat(cols, ", 1fr)"),
      gap: '18px 20px'
    }
  }, children);
}
Object.assign(window, {
  ACCENT: ACCENT,
  ACCENT_SOFT: ACCENT_SOFT,
  Field: Field,
  TextInput: TextInput,
  NumberInput: NumberInput,
  TextArea: TextArea,
  DateInput: DateInput,
  EnumSegment: EnumSegment,
  InlineRadioChoice: InlineRadioChoice,
  SelectMenu: SelectMenu,
  ChipMulti: ChipMulti,
  TagInput: TagInput,
  ToggleSwitch: ToggleSwitch,
  SectionCard: SectionCard,
  FieldGrid: FieldGrid
});
