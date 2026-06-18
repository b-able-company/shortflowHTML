function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
// 새 콘텐츠 생성 — 셸 (헤더 · 단계 이동 3시안 · 푸터 · 제출 모달)

// ─── 페이지 헤더 ───────────────────────────────────────
function NCHeader(_ref) {
  var savedAt = _ref.savedAt,
    t = _ref.t;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 24
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      return window.history.back();
    },
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      fontFamily: t.sans,
      fontSize: 12.5,
      fontWeight: 600,
      color: t.inkMute,
      marginBottom: 9,
      whiteSpace: 'nowrap',
      border: 'none',
      background: 'transparent',
      cursor: 'pointer',
      padding: 0
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "14",
    height: "14",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M15 18l-6-6 6-6",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  })), /*#__PURE__*/React.createElement("span", null, "\uB4A4\uB85C\uAC00\uAE30")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-end',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: 0,
      fontFamily: t.sans,
      fontSize: 27,
      fontWeight: 700,
      letterSpacing: -0.7,
      color: t.ink
    }
  }), savedAt && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: t.mono,
      fontSize: 11.5,
      color: t.inkFaint,
      paddingBottom: 5,
      display: 'inline-flex',
      alignItems: 'center',
      gap: 5
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 6,
      height: 6,
      borderRadius: 999,
      background: t.paid
    }
  }), "\uC784\uC2DC\uC800\uC7A5\uB428 ", savedAt)));
}

// ─── 입력 기준 언어 선택 바 ───────────────────────
function InputLanguageBar(_ref2) {
  var value = _ref2.value,
    onChange = _ref2.onChange,
    t = _ref2.t,
    _ref2$embedded = _ref2.embedded,
    embedded = _ref2$embedded === void 0 ? false : _ref2$embedded;
  var opts = [{
    v: 'KO',
    label: '한국어'
  }, {
    v: 'EN',
    label: 'English'
  }, {
    v: 'ZH',
    label: '中文'
  }];
  var selector = /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 4,
      background: t.surface,
      border: "0.5px solid ".concat(t.line),
      borderRadius: 9,
      padding: 3,
      flexShrink: 0
    }
  }, opts.map(function (o) {
    var sel = value === o.v;
    return /*#__PURE__*/React.createElement("button", {
      key: o.v,
      onClick: function onClick() {
        return onChange(o.v);
      },
      style: {
        border: 'none',
        cursor: 'pointer',
        borderRadius: 6,
        padding: embedded ? '7px 14px' : '8px 16px',
        background: sel ? '#25272B' : 'transparent',
        color: sel ? '#FFFFFF' : t.inkMute,
        fontFamily: t.sans,
        fontSize: 13,
        fontWeight: sel ? 700 : 500,
        whiteSpace: 'nowrap'
      }
    }, o.label);
  }));
  if (embedded) {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        minHeight: 38,
        display: 'flex',
        alignItems: 'center'
      }
    }, selector);
  }
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 16,
      marginBottom: 22,
      padding: '14px 18px',
      background: ACCENT_SOFT,
      border: "0.5px solid #F2C3AE",
      borderRadius: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: 34,
      height: 34,
      borderRadius: 9,
      background: t.surface,
      border: "0.5px solid #F2C3AE",
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "17",
    height: "17",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: ACCENT,
    strokeWidth: "1.9"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M5 8l6 6M4 14l6-6 2-3M2 5h12M7 2h1M22 22l-5-10-5 10M14 18h6",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: t.sans,
      fontSize: 13.5,
      fontWeight: 700,
      color: t.ink,
      letterSpacing: -0.2
    }
  }, "\uC785\uB825 \uAE30\uC900 \uC5B8\uC5B4"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: t.sans,
      fontSize: 11.5,
      color: t.inkMute,
      marginTop: 2
    }
  }, "\uCF58\uD150\uCE20 \uC815\uBCF4\uB97C \uC785\uB825\uD560 \uC5B8\uC5B4\uC608\uC694. \uC790\uB9C9\uB3C4 \uC774 \uC5B8\uC5B4 \uAE30\uC900\uC73C\uB85C \uC5C5\uB85C\uB4DC\uB429\uB2C8\uB2E4.")), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), selector);
}

// ─── 시안 B: 상단 가로 스텝퍼 ──────────────────────────
function Stepper(_ref3) {
  var steps = _ref3.steps,
    current = _ref3.current,
    maxReached = _ref3.maxReached,
    onJump = _ref3.onJump,
    t = _ref3.t;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: 'calc(100% - 80px)',
      margin: '0 auto 16px',
      display: 'flex',
      alignItems: 'flex-start',
      padding: '12px 24px 18px'
    }
  }, steps.map(function (s, i) {
    var done = s.k < current;
    var active = s.k === current;
    var reachable = s.k <= maxReached;
    return /*#__PURE__*/React.createElement(React.Fragment, {
      key: s.k
    }, /*#__PURE__*/React.createElement("button", {
      onClick: function onClick() {
        return reachable && onJump(s.k);
      },
      style: {
        flex: '0 0 auto',
        minWidth: 76,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 7,
        border: 'none',
        background: 'transparent',
        cursor: reachable ? 'pointer' : 'default',
        padding: 0,
        textAlign: 'center'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 30,
        height: 30,
        borderRadius: 999,
        flexShrink: 0,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: t.mono,
        fontSize: 13,
        fontWeight: 600,
        background: active ? ACCENT : done ? ACCENT_SOFT : t.surfaceAlt,
        color: active ? '#FFF7EE' : done ? ACCENT : t.inkFaint,
        border: active ? 'none' : "0.5px solid ".concat(t.line)
      }
    }, done ? /*#__PURE__*/React.createElement("svg", {
      width: "14",
      height: "14",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: ACCENT,
      strokeWidth: "3"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M20 6L9 17l-5-5",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    })) : s.k), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: t.sans,
        fontSize: 12.5,
        fontWeight: active ? 600 : 500,
        color: active ? t.ink : done ? t.inkMute : t.inkFaint,
        letterSpacing: -0.2,
        whiteSpace: 'nowrap'
      }
    }, s.label)), i < steps.length - 1 && /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        height: 2,
        background: s.k < current ? ACCENT_SOFT : t.line,
        borderRadius: 2,
        margin: '15px 16px 0'
      }
    }));
  }));
}

// ─── 시안 C: 좌측 사이드 레일 ──────────────────────────
function SideRail(_ref4) {
  var steps = _ref4.steps,
    current = _ref4.current,
    maxReached = _ref4.maxReached,
    onJump = _ref4.onJump,
    t = _ref4.t;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'sticky',
      top: 0,
      display: 'flex',
      flexDirection: 'column',
      gap: 6
    }
  }, steps.map(function (s) {
    var done = s.k < current;
    var active = s.k === current;
    var reachable = s.k <= maxReached;
    return /*#__PURE__*/React.createElement("button", {
      key: s.k,
      onClick: function onClick() {
        return reachable && onJump(s.k);
      },
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        padding: '13px 14px',
        borderRadius: 12,
        textAlign: 'left',
        cursor: reachable ? 'pointer' : 'default',
        background: active ? ACCENT_SOFT : 'transparent',
        border: "0.5px solid ".concat(active ? '#F2C3AE' : 'transparent')
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 28,
        height: 28,
        borderRadius: 999,
        flexShrink: 0,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: t.mono,
        fontSize: 12.5,
        fontWeight: 700,
        background: active ? ACCENT : done ? t.surface : t.surfaceAlt,
        color: active ? '#FFF7EE' : done ? ACCENT : t.inkFaint,
        border: active ? 'none' : "0.5px solid ".concat(t.line)
      }
    }, done ? /*#__PURE__*/React.createElement("svg", {
      width: "13",
      height: "13",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: ACCENT,
      strokeWidth: "3"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M20 6L9 17l-5-5",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    })) : s.k), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: t.sans,
        fontSize: 13.5,
        fontWeight: active ? 700 : 600,
        color: active ? t.ink : t.inkMute,
        letterSpacing: -0.2
      }
    }, s.label), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: t.sans,
        fontSize: 11,
        color: t.inkFaint,
        marginTop: 2
      }
    }, s.hint)));
  }));
}

// ─── 하단 액션 바 ──────────────────────────────────────
function FooterBar(_ref5) {
  var wizard = _ref5.wizard,
    current = _ref5.current,
    total = _ref5.total,
    onPrev = _ref5.onPrev,
    onNext = _ref5.onNext,
    onSave = _ref5.onSave,
    onSubmit = _ref5.onSubmit,
    t = _ref5.t,
    _ref5$maxW = _ref5.maxW,
    maxW = _ref5$maxW === void 0 ? 1180 : _ref5$maxW;
  var ghost = {
    height: 42,
    padding: '0 18px',
    borderRadius: 9,
    cursor: 'pointer',
    border: "0.5px solid ".concat(t.lineStrong),
    background: t.surface,
    color: t.ink,
    fontFamily: t.sans,
    fontSize: 13.5,
    fontWeight: 600,
    display: 'inline-flex',
    alignItems: 'center',
    gap: 7
  };
  var primary = {
    height: 42,
    padding: '0 22px',
    borderRadius: 9,
    cursor: 'pointer',
    border: 'none',
    background: ACCENT,
    color: '#FFF7EE',
    fontFamily: t.sans,
    fontSize: 13.5,
    fontWeight: 700,
    display: 'inline-flex',
    alignItems: 'center',
    gap: 8
  };
  var onLast = current >= total;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      flexShrink: 0,
      borderTop: "0.5px solid ".concat(t.line),
      background: t.surface,
      padding: '14px 40px',
      display: 'flex',
      alignItems: 'center',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: maxW,
      margin: '0 auto',
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      gap: 12
    }
  }, wizard && /*#__PURE__*/React.createElement("button", {
    onClick: onPrev,
    disabled: current <= 1,
    style: _objectSpread(_objectSpread({}, ghost), {}, {
      opacity: current <= 1 ? 0.4 : 1,
      cursor: current <= 1 ? 'default' : 'pointer'
    })
  }, /*#__PURE__*/React.createElement("svg", {
    width: "15",
    height: "15",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M15 18l-6-6 6-6",
    strokeLinecap: "round"
  })), "\uC774\uC804"), /*#__PURE__*/React.createElement("button", {
    onClick: onSave,
    style: ghost
  }, /*#__PURE__*/React.createElement("svg", {
    width: "15",
    height: "15",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.7"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M17 21v-8H7v8M7 3v5h8"
  })), "\uC784\uC2DC\uC800\uC7A5"), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), wizard && !onLast && /*#__PURE__*/React.createElement("button", {
    onClick: onNext,
    style: primary
  }, "\uB2E4\uC74C", /*#__PURE__*/React.createElement("svg", {
    width: "15",
    height: "15",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M9 18l6-6-6-6",
    strokeLinecap: "round"
  }))), (!wizard || onLast) && /*#__PURE__*/React.createElement("button", {
    onClick: onSubmit,
    style: primary
  }, /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "16",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  })), "\uAC80\uD1A0 \uC694\uCCAD \uBCF4\uB0B4\uAE30")));
}

// ─── 제출 확인 모달 ────────────────────────────────────
function arr(v) {
  return Array.isArray(v) ? v : v ? [v] : [];
}
function SubmitModal(_ref6) {
  var form = _ref6.form,
    onClose = _ref6.onClose,
    onConfirm = _ref6.onConfirm,
    t = _ref6.t;
  var _React$useState = React.useState(false),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    rightsConfirmed = _React$useState2[0],
    setRightsConfirmed = _React$useState2[1];
  var filledLangs = form.translations.filter(function (x) {
    return (x.title || '').trim();
  }).map(function (x) {
    return LANG_SHORT[x.language];
  });
  var checks = [{
    label: '기본 정보',
    ok: !!form.originalTitle,
    detail: form.originalTitle
  }, {
    label: '대표 이미지',
    ok: arr(form.mainImageKey).length > 0,
    detail: arr(form.mainImageKey).length ? '1장' : '미등록',
    required: true
  }, {
    label: '무료회차 영상',
    ok: arr(form.freeEpisodeKeys).length > 0,
    detail: "".concat(arr(form.freeEpisodeKeys).length, "\uAC1C")
  }, {
    label: '티저 영상',
    ok: arr(form.teaserKeys).length > 0,
    detail: "".concat(arr(form.teaserKeys).length, "\uAC1C")
  }, {
    label: '텍스트 정보',
    ok: filledLangs.length > 0,
    detail: filledLangs.join(' · ') || '없음'
  }];
  return /*#__PURE__*/React.createElement("div", {
    onClick: onClose,
    style: {
      position: 'fixed',
      inset: 0,
      zIndex: 2000,
      background: 'rgba(15,17,21,0.42)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 24
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: function onClick(e) {
      return e.stopPropagation();
    },
    style: {
      width: 560,
      maxWidth: '100%',
      maxHeight: '88vh',
      overflow: 'auto',
      background: t.surface,
      borderRadius: 18,
      boxShadow: '0 30px 80px rgba(0,0,0,0.3)',
      padding: '28px 30px 26px'
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      fontFamily: t.sans,
      fontSize: 20,
      fontWeight: 700,
      color: t.ink,
      letterSpacing: -0.4
    }
  }, "\uAC80\uD1A0 \uC694\uCCAD\uC744 \uBCF4\uB0BC\uAE4C\uC694?"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '8px 0 22px',
      fontFamily: t.sans,
      fontSize: 13.5,
      color: t.inkMute,
      lineHeight: 1.6
    }
  }, "\uC81C\uCD9C \uD6C4\uC5D0\uB294 \uAD00\uB9AC\uC790 \uAC80\uD1A0\uAC00 \uC2DC\uC791\uB418\uBA70, \uAC80\uD1A0 \uC911\uC5D0\uB294 \uC218\uC815\uC774 \uC81C\uD55C\uB429\uB2C8\uB2E4."), /*#__PURE__*/React.createElement("div", {
    style: {
      border: "0.5px solid ".concat(t.line),
      borderRadius: 12,
      overflow: 'hidden'
    }
  }, checks.map(function (c, i) {
    return /*#__PURE__*/React.createElement("div", {
      key: c.label,
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 11,
        padding: '12px 15px',
        borderTop: i ? "0.5px solid ".concat(t.line) : 'none',
        background: c.ok ? t.surface : '#FCF7E8'
      }
    }, c.ok ? /*#__PURE__*/React.createElement("svg", {
      width: "17",
      height: "17",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: t.paid,
      strokeWidth: "2.4"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M20 6L9 17l-5-5",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    })) : /*#__PURE__*/React.createElement("svg", {
      width: "17",
      height: "17",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: t.upcoming,
      strokeWidth: "2.2"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M12 9v4M12 17h.01M10.3 3.9l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.7-3l-8-14a2 2 0 0 0-3.4 0z",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    })), /*#__PURE__*/React.createElement("span", {
      style: {
        flex: 1,
        fontFamily: t.sans,
        fontSize: 13.5,
        fontWeight: 600,
        color: t.ink
      }
    }, c.label, c.required && /*#__PURE__*/React.createElement("span", {
      style: {
        color: ACCENT,
        marginLeft: 4
      }
    }, "*")), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: t.sans,
        fontSize: 12.5,
        color: c.ok ? t.inkMute : t.upcoming,
        fontWeight: c.ok ? 500 : 600
      }
    }, c.detail));
  })), /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: 10,
      marginTop: 18,
      padding: '14px 15px',
      border: "0.5px solid ".concat(rightsConfirmed ? '#F2C3AE' : t.line),
      borderRadius: 12,
      background: rightsConfirmed ? '#FFF7F2' : t.surface,
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    checked: rightsConfirmed,
    onChange: function onChange(e) {
      return setRightsConfirmed(e.target.checked);
    },
    style: {
      width: 16,
      height: 16,
      marginTop: 2,
      flexShrink: 0,
      accentColor: ACCENT,
      cursor: 'pointer'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: t.sans,
      fontSize: 12.5,
      color: t.inkMute,
      lineHeight: 1.6,
      textAlign: 'left'
    }
  }, "\uB2F9\uC0AC\uB294 \uBAA8\uB4E0 \uAD8C\uB9AC\uB97C \uBCF4\uC720\uD558\uACE0 \uC788\uAC70\uB098 \uD574\uB2F9 \uC791\uD488\uC758 \uC800\uC791\uAD8C\uC790 \uB610\uB294 \uC801\uBC95\uD55C \uAD8C\uB9AC\uC790\uC784\uC744 \uBCF4\uC99D\uD558\uBA70, \uD574\uB2F9 \uC791\uD488\uC744 \uC774\uC6A9\uD5C8\uB77D\uD560 \uC218 \uC788\uB294 \uC801\uBC95\uD55C \uAD8C\uD55C\uC744 \uBCF4\uC720\uD558\uACE0 \uC788\uC74C\uC744 \uBCF4\uC99D\uD55C\uB2E4. \uB610\uD55C, \uC774\uB97C \uC785\uC99D\uD560 \uC218 \uC788\uB294 \uC790\uB8CC\uB97C \uC81C\uCD9C\uD560 \uC218 \uC788\uC74C\uC744 \uD655\uC778\uD569\uB2C8\uB2E4.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10,
      marginTop: 18
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    style: {
      flex: 1,
      height: 44,
      borderRadius: 10,
      cursor: 'pointer',
      border: "0.5px solid ".concat(t.lineStrong),
      background: t.surface,
      color: t.ink,
      fontFamily: t.sans,
      fontSize: 14,
      fontWeight: 600
    }
  }, "\uCDE8\uC18C"), /*#__PURE__*/React.createElement("button", {
    disabled: !rightsConfirmed,
    onClick: onConfirm,
    style: {
      flex: 1,
      height: 44,
      borderRadius: 10,
      border: 'none',
      background: rightsConfirmed ? ACCENT : t.lineStrong,
      color: rightsConfirmed ? '#FFF7EE' : t.inkFaint,
      fontFamily: t.sans,
      fontSize: 14,
      fontWeight: 700,
      cursor: rightsConfirmed ? 'pointer' : 'not-allowed',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "16",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  })), "\uAC80\uD1A0 \uC694\uCCAD \uBCF4\uB0B4\uAE30"))));
}

// ─── 제출 완료 토스트/화면 ─────────────────────────────
function SubmittedToast(_ref7) {
  var onClose = _ref7.onClose,
    t = _ref7.t;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'fixed',
      inset: 0,
      zIndex: 2000,
      background: 'rgba(15,17,21,0.42)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 24
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 420,
      maxWidth: '100%',
      background: t.surface,
      borderRadius: 18,
      boxShadow: '0 30px 80px rgba(0,0,0,0.3)',
      padding: '34px 30px',
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 56,
      height: 56,
      borderRadius: 999,
      background: t.paidTint,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 16
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "28",
    height: "28",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: t.paid,
    strokeWidth: "2.4"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M20 6L9 17l-5-5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }))), /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      fontFamily: t.sans,
      fontSize: 19,
      fontWeight: 700,
      color: t.ink
    }
  }, "\uAC80\uD1A0 \uC694\uCCAD\uC744 \uBCF4\uB0C8\uC5B4\uC694"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '8px 0 22px',
      fontFamily: t.sans,
      fontSize: 13.5,
      color: t.inkMute,
      lineHeight: 1.6
    }
  }, "\uAD00\uB9AC\uC790 \uAC80\uD1A0\uAC00 \uC2DC\uC791\uB429\uB2C8\uB2E4. \uC9C4\uD589 \uC0C1\uD669\uC740 \uC6CC\uD06C\uD50C\uB85C\uC6B0\uC5D0\uC11C \uD655\uC778\uD560 \uC218 \uC788\uC5B4\uC694."), /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    style: {
      height: 42,
      padding: '0 24px',
      borderRadius: 10,
      cursor: 'pointer',
      border: 'none',
      background: ACCENT,
      color: '#FFF7EE',
      fontFamily: t.sans,
      fontSize: 14,
      fontWeight: 700
    }
  }, "\uB0B4 \uCF58\uD150\uCE20\uB85C")));
}
Object.assign(window, {
  NCHeader: NCHeader,
  InputLanguageBar: InputLanguageBar,
  Stepper: Stepper,
  SideRail: SideRail,
  FooterBar: FooterBar,
  SubmitModal: SubmitModal,
  SubmittedToast: SubmittedToast
});
