function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var _excluded = ["variant"];
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
// 새 콘텐츠 생성 — 다국어 입력 (3시안: 언어 탭 / 세로 나열 / 기본 언어만)
// translations(제목·로그라인·시놉시스·인물·공개일) 와 crew(감독·작가·출연진) 공용.

// 한 언어 데이터에 대한 필드 셋
function langFieldCols(f) {
  return f.span === 2 ? 12 : 6;
}
function langFieldStartsRow(fields, index) {
  var used = fields.slice(0, index).reduce(function (sum, f) {
    return sum + langFieldCols(f);
  }, 0);
  return used % 12 === 0;
}
function LangRowField(_ref) {
  var label = _ref.label,
    optional = _ref.optional,
    _ref$cols = _ref.cols,
    cols = _ref$cols === void 0 ? 6 : _ref$cols,
    _ref$inset = _ref.inset,
    inset = _ref$inset === void 0 ? false : _ref$inset,
    _ref$roomy = _ref.roomy,
    roomy = _ref$roomy === void 0 ? false : _ref$roomy,
    t = _ref.t,
    children = _ref.children;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      gridColumn: "span ".concat(cols),
      minWidth: 0,
      display: 'grid',
      gridTemplateColumns: '150px minmax(0, 1fr)',
      gap: 0,
      alignItems: 'stretch',
      padding: 0,
      borderTop: "0.5px solid ".concat(t.line),
      borderLeft: inset ? "0.5px solid ".concat(t.line) : 'none'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 5,
      minWidth: 0,
      alignSelf: 'stretch',
      minHeight: roomy ? 98 : 36,
      background: '#F7F7F4',
      borderRadius: 0,
      padding: '0 10px',
      borderRight: "0.5px solid ".concat(t.line)
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: t.sans,
      fontSize: 12.5,
      fontWeight: 700,
      color: '#5F646D',
      letterSpacing: -0.1,
      whiteSpace: 'nowrap'
    }
  }, label), optional && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: t.sans,
      fontSize: 10.5,
      fontWeight: 600,
      color: '#A1A3A8',
      whiteSpace: 'nowrap'
    }
  }, "\uC120\uD0DD")), /*#__PURE__*/React.createElement("div", {
    style: {
      minWidth: 0,
      padding: roomy ? '10px 10px' : '0 10px'
    }
  }, children));
}
function LangControl(_ref2) {
  var f = _ref2.f,
    data = _ref2.data,
    _onChange = _ref2.onChange,
    t = _ref2.t;
  if (f.kind === 'area') {
    return /*#__PURE__*/React.createElement(TextArea, {
      value: data[f.key],
      onChange: function onChange(v) {
        return _onChange(f.key, v);
      },
      placeholder: f.placeholder,
      rows: f.rows || 3,
      t: t
    });
  }
  if (f.kind === 'date') {
    return /*#__PURE__*/React.createElement(DateInput, {
      value: data[f.key],
      onChange: function onChange(v) {
        return _onChange(f.key, v);
      },
      t: t
    });
  }
  return /*#__PURE__*/React.createElement(TextInput, {
    value: data[f.key],
    onChange: function onChange(v) {
      return _onChange(f.key, v);
    },
    placeholder: f.placeholder,
    t: t
  });
}
function LangFields(_ref3) {
  var fieldsDef = _ref3.fieldsDef,
    data = _ref3.data,
    onChange = _ref3.onChange,
    t = _ref3.t;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(12, minmax(0, 1fr))',
      gap: 0,
      borderLeft: "0.5px solid ".concat(t.line),
      borderRight: "0.5px solid ".concat(t.line),
      borderBottom: "0.5px solid ".concat(t.line)
    }
  }, fieldsDef.map(function (f, fi) {
    var cols = langFieldCols(f);
    var inset = cols < 12 && !langFieldStartsRow(fieldsDef, fi);
    return /*#__PURE__*/React.createElement(LangRowField, {
      key: f.key,
      label: f.label,
      optional: f.optional,
      cols: cols,
      inset: inset,
      roomy: f.kind === 'area',
      t: t
    }, /*#__PURE__*/React.createElement(LangControl, {
      f: f,
      data: data,
      onChange: onChange,
      t: t
    }));
  }));
}

// 언어가 채워졌는지
function langFilled(data, fieldsDef) {
  return fieldsDef.some(function (f) {
    return (data[f.key] || '').toString().trim();
  });
}

// ════════════════════════════════════════════════════════
// 시안 1 — 언어 탭
// ════════════════════════════════════════════════════════
function LangTabs(_ref4) {
  var items = _ref4.items,
    onItemChange = _ref4.onItemChange,
    fieldsDef = _ref4.fieldsDef,
    langList = _ref4.langList,
    t = _ref4.t;
  var _React$useState = React.useState(langList[0]),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    active = _React$useState2[0],
    setActive = _React$useState2[1];
  var cur = items.find(function (x) {
    return x.language === active;
  }) || items[0];
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 4,
      background: t.surfaceAlt,
      border: "0.5px solid ".concat(t.line),
      borderRadius: 10,
      padding: 4,
      width: 'fit-content',
      marginBottom: 20
    }
  }, langList.map(function (lg) {
    var sel = active === lg;
    var data = items.find(function (x) {
      return x.language === lg;
    }) || {};
    var filled = langFilled(data, fieldsDef);
    return /*#__PURE__*/React.createElement("button", {
      key: lg,
      onClick: function onClick() {
        return setActive(lg);
      },
      style: {
        border: 'none',
        cursor: 'pointer',
        borderRadius: 7,
        padding: '8px 16px',
        background: sel ? t.surface : 'transparent',
        color: sel ? t.ink : t.inkMute,
        fontFamily: t.sans,
        fontSize: 13,
        fontWeight: sel ? 700 : 500,
        boxShadow: sel ? '0 1px 3px rgba(0,0,0,0.08)' : 'none',
        display: 'inline-flex',
        alignItems: 'center',
        gap: 7
      }
    }, LANG_SHORT[lg], /*#__PURE__*/React.createElement("span", {
      style: {
        width: 6,
        height: 6,
        borderRadius: 999,
        background: filled ? t.paid : t.lineStrong
      }
    }));
  })), /*#__PURE__*/React.createElement(LangFields, {
    fieldsDef: fieldsDef,
    data: cur,
    onChange: function onChange(k, v) {
      return onItemChange(active, k, v);
    },
    t: t
  }));
}

// ════════════════════════════════════════════════════════
// 시안 2 — 언어별 세로 나열
// ════════════════════════════════════════════════════════
function LangStacked(_ref5) {
  var items = _ref5.items,
    onItemChange = _ref5.onItemChange,
    fieldsDef = _ref5.fieldsDef,
    langList = _ref5.langList,
    t = _ref5.t;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 22
    }
  }, langList.map(function (lg) {
    var data = items.find(function (x) {
      return x.language === lg;
    }) || {};
    return /*#__PURE__*/React.createElement("div", {
      key: lg,
      style: {
        border: "0.5px solid ".concat(t.line),
        borderRadius: 12,
        padding: '18px 18px 20px',
        background: t.surfaceAlt
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        marginBottom: 16
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: t.sans,
        fontSize: 13,
        fontWeight: 700,
        color: t.ink,
        padding: '3px 10px',
        borderRadius: 7,
        background: t.surface,
        border: "0.5px solid ".concat(t.line)
      }
    }, LANG_SHORT[lg]), /*#__PURE__*/React.createElement("span", {
      style: {
        width: 6,
        height: 6,
        borderRadius: 999,
        background: langFilled(data, fieldsDef) ? t.paid : t.lineStrong
      }
    })), /*#__PURE__*/React.createElement(LangFields, {
      fieldsDef: fieldsDef,
      data: data,
      onChange: function onChange(k, v) {
        return onItemChange(lg, k, v);
      },
      t: t
    }));
  }));
}

// ════════════════════════════════════════════════════════
// 시안 3 — 기본 언어만, 추가 언어는 선택적으로
// ════════════════════════════════════════════════════════
function LangPrimaryOnly(_ref6) {
  var items = _ref6.items,
    onItemChange = _ref6.onItemChange,
    fieldsDef = _ref6.fieldsDef,
    langList = _ref6.langList,
    t = _ref6.t;
  var primary = langList[0];
  var extras = langList.slice(1);
  var _React$useState3 = React.useState(function () {
      return extras.filter(function (lg) {
        var d = items.find(function (x) {
          return x.language === lg;
        }) || {};
        return langFilled(d, fieldsDef);
      });
    }),
    _React$useState4 = _slicedToArray(_React$useState3, 2),
    added = _React$useState4[0],
    setAdded = _React$useState4[1];
  var addLang = function addLang(lg) {
    return setAdded(function (a) {
      return [].concat(_toConsumableArray(a), [lg]);
    });
  };
  var removeLang = function removeLang(lg) {
    return setAdded(function (a) {
      return a.filter(function (x) {
        return x !== lg;
      });
    });
  };
  var notAdded = extras.filter(function (lg) {
    return !added.includes(lg);
  });
  var primData = items.find(function (x) {
    return x.language === primary;
  }) || {};
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 20
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: _defineProperty({
      fontFamily: t.sans,
      fontSize: 13,
      fontWeight: 700,
      color: t.ink,
      padding: '3px 10px',
      borderRadius: 7,
      background: ACCENT_SOFT
    }, "color", ACCENT)
  }, LANG_SHORT[primary]), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: t.sans,
      fontSize: 11.5,
      color: t.inkFaint
    }
  }, "\uAE30\uBCF8 \uC5B8\uC5B4")), /*#__PURE__*/React.createElement(LangFields, {
    fieldsDef: fieldsDef,
    data: primData,
    onChange: function onChange(k, v) {
      return onItemChange(primary, k, v);
    },
    t: t
  })), added.map(function (lg) {
    var data = items.find(function (x) {
      return x.language === lg;
    }) || {};
    return /*#__PURE__*/React.createElement("div", {
      key: lg,
      style: {
        border: "0.5px solid ".concat(t.line),
        borderRadius: 12,
        padding: '18px 18px 20px',
        background: t.surfaceAlt
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        marginBottom: 16
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: t.sans,
        fontSize: 13,
        fontWeight: 700,
        color: t.ink,
        padding: '3px 10px',
        borderRadius: 7,
        background: t.surface,
        border: "0.5px solid ".concat(t.line)
      }
    }, LANG_SHORT[lg]), /*#__PURE__*/React.createElement("button", {
      onClick: function onClick() {
        return removeLang(lg);
      },
      style: {
        marginLeft: 'auto',
        border: 'none',
        background: 'transparent',
        cursor: 'pointer',
        color: t.inkFaint,
        fontFamily: t.sans,
        fontSize: 12,
        display: 'inline-flex',
        alignItems: 'center',
        gap: 4
      }
    }, /*#__PURE__*/React.createElement("svg", {
      width: "13",
      height: "13",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M18 6L6 18M6 6l12 12",
      strokeLinecap: "round"
    })), "\uC81C\uAC70")), /*#__PURE__*/React.createElement(LangFields, {
      fieldsDef: fieldsDef,
      data: data,
      onChange: function onChange(k, v) {
        return onItemChange(lg, k, v);
      },
      t: t
    }));
  }), notAdded.length > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 9
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: t.sans,
      fontSize: 12,
      color: t.inkFaint
    }
  }, "\uC5B8\uC5B4 \uCD94\uAC00"), notAdded.map(function (lg) {
    return /*#__PURE__*/React.createElement("button", {
      key: lg,
      onClick: function onClick() {
        return addLang(lg);
      },
      style: {
        cursor: 'pointer',
        borderRadius: 999,
        padding: '6px 13px',
        border: "0.5px dashed ".concat(t.lineStrong),
        background: 'transparent',
        color: t.inkMute,
        fontFamily: t.sans,
        fontSize: 12.5,
        fontWeight: 600,
        display: 'inline-flex',
        alignItems: 'center',
        gap: 5
      }
    }, /*#__PURE__*/React.createElement("svg", {
      width: "12",
      height: "12",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2.4"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M12 5v14M5 12h14",
      strokeLinecap: "round"
    })), LANG_SHORT[lg]);
  })));
}

// 래퍼 — variant 분기
function MultiLangEditor(_ref8) {
  var variant = _ref8.variant,
    props = _objectWithoutProperties(_ref8, _excluded);
  if (variant === 'stacked') return /*#__PURE__*/React.createElement(LangStacked, props);
  if (variant === 'primary') return /*#__PURE__*/React.createElement(LangPrimaryOnly, props);
  return /*#__PURE__*/React.createElement(LangTabs, props);
}

// 필드 정의
var TRANSLATION_FIELDS = [{
  key: 'title',
  label: '제목',
  kind: 'text',
  span: 2,
  placeholder: '언어별 제목'
}, {
  key: 'logline',
  label: '로그라인',
  kind: 'text',
  span: 2,
  placeholder: '한 줄 소개'
}, {
  key: 'synopsis',
  label: '시놉시스',
  kind: 'area',
  rows: 4,
  span: 2,
  placeholder: '줄거리'
}, {
  key: 'characterDescription',
  label: '인물 소개',
  kind: 'area',
  rows: 3,
  span: 2,
  placeholder: '주요 인물 설명'
}, {
  key: 'releaseDate',
  label: '공개일',
  kind: 'date',
  span: 1
}];
var CREW_FIELDS = [{
  key: 'director',
  label: '감독',
  kind: 'text',
  span: 1
}, {
  key: 'writer',
  label: '작가',
  kind: 'text',
  span: 1
}, {
  key: 'cast',
  label: '출연진',
  kind: 'text',
  span: 2,
  placeholder: '주연 · 조연'
}];
Object.assign(window, {
  MultiLangEditor: MultiLangEditor,
  LangTabs: LangTabs,
  LangStacked: LangStacked,
  LangPrimaryOnly: LangPrimaryOnly,
  LangFields: LangFields,
  TRANSLATION_FIELDS: TRANSLATION_FIELDS,
  CREW_FIELDS: CREW_FIELDS
});
