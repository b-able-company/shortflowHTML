function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
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
// 새 콘텐츠 등록 — 단계형 웹페이지 (4단계 + 검토 요청)
// API 단계와 정렬: 1 기본정보+2 다국어 → POST /contents · 3 미디어 → PUT media · 4 메타 → PUT meta · 검토 → PATCH submit
// 섹션은 nc-web-sections.jsx 재사용. 의존: dashboard-shell · nc-shell · tweaks-panel

var STEP_DEFS = [{
  k: 1,
  label: '콘텐츠 정보',
  hint: '기본 정보 · 텍스트 · 크루',
  sec: 'sec-basic'
}, {
  k: 2,
  label: '미디어',
  hint: '이미지 · 영상 · 자막',
  sec: 'sec-media'
}, {
  k: 3,
  label: '검토 요청',
  hint: '요약 · 제출 확인',
  sec: 'sec-review'
}];

// 좌측 단계 레일
function StepRail(_ref) {
  var steps = _ref.steps,
    current = _ref.current,
    maxReached = _ref.maxReached,
    onJump = _ref.onJump,
    t = _ref.t;
  return /*#__PURE__*/React.createElement("nav", {
    style: {
      position: 'sticky',
      top: 0,
      display: 'flex',
      flexDirection: 'column',
      gap: 4
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
        padding: '12px 14px',
        borderRadius: 11,
        textAlign: 'left',
        cursor: reachable ? 'pointer' : 'default',
        width: '100%',
        background: active ? ACCENT_SOFT : 'transparent',
        border: "0.5px solid ".concat(active ? '#F2C3AE' : 'transparent')
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 26,
        height: 26,
        borderRadius: 999,
        flexShrink: 0,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: t.mono,
        fontSize: 12,
        fontWeight: 700,
        background: active ? ACCENT : done ? t.surface : t.surfaceAlt,
        color: active ? '#FFF7EE' : done ? ACCENT : t.inkFaint,
        border: active ? 'none' : "0.5px solid ".concat(t.line)
      }
    }, done ? /*#__PURE__*/React.createElement("svg", {
      width: "12",
      height: "12",
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
var STEP_TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "stepNav": "top"
} /*EDITMODE-END*/;
function getSiteLanguage() {
  var locale = (document.documentElement.lang || navigator.language || 'ko').toLowerCase();
  if (locale.startsWith('en')) return 'EN';
  if (locale.startsWith('zh')) return 'ZH';
  return 'KO';
}
function AIIntroModal(_ref2) {
  var onLater = _ref2.onLater,
    onTry = _ref2.onTry,
    t = _ref2.t;
  var _React$useState = React.useState(false),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    tryHover = _React$useState2[0],
    setTryHover = _React$useState2[1];
  return /*#__PURE__*/React.createElement("div", {
    onClick: onLater,
    style: {
      position: 'fixed',
      inset: 0,
      zIndex: 2100,
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
      position: 'relative',
      width: 380,
      height: 350,
      maxWidth: 'calc(100vw - 48px)',
      maxHeight: 'calc(100vh - 48px)',
      boxSizing: 'border-box',
      background: t.surface,
      borderRadius: 22,
      boxShadow: 'none',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'stretch',
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("button", {
    "aria-label": "\uB2EB\uAE30",
    onClick: onLater,
    style: {
      position: 'absolute',
      top: 12,
      right: 12,
      zIndex: 2,
      width: 34,
      height: 34,
      borderRadius: 999,
      border: 'none',
      background: 'rgba(255,255,255,0.82)',
      color: t.inkMute,
      cursor: 'pointer',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: t.sans,
      fontSize: 22,
      lineHeight: 1
    }
  }, "\xD7"), /*#__PURE__*/React.createElement("img", {
    src: "images/\uAE30\uD68D\uC11C\uD31D\uC5C5.png",
    alt: "",
    style: {
      width: '100%',
      height: 166,
      objectFit: 'cover',
      display: 'block',
      flexShrink: 0
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      padding: '22px 28px 24px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      fontFamily: t.sans,
      fontSize: 20,
      fontWeight: 600,
      color: t.ink,
      letterSpacing: -0.45,
      textAlign: 'center'
    }
  }, "AI \uAE30\uD68D\uC11C \uC790\uB3D9 \uCD94\uCD9C"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '9px 0 0',
      maxWidth: 300,
      fontFamily: t.sans,
      fontSize: 13.5,
      color: t.inkMute,
      lineHeight: 1.65,
      textAlign: 'center'
    }
  }, "\uAE30\uD68D\uC548\uC744 \uC5C5\uB85C\uB4DC\uD558\uBA74 \uC81C\uBAA9, \uC2DC\uB189\uC2DC\uC2A4, \uC7A5\uB974 \uB4F1 \uC8FC\uC694 \uC815\uBCF4\uAC00 \uC790\uB3D9\uC73C\uB85C \uC785\uB825\uB429\uB2C8\uB2E4."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      width: '100%',
      marginTop: 'auto'
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: onTry,
    onMouseEnter: function onMouseEnter() {
      return setTryHover(true);
    },
    onMouseLeave: function onMouseLeave() {
      return setTryHover(false);
    },
    style: {
      width: '100%',
      height: 40,
      borderRadius: 10,
      cursor: 'pointer',
      border: tryHover ? 'none' : "0.5px solid ".concat(t.lineStrong),
      background: tryHover ? ACCENT : t.surface,
      color: tryHover ? '#FFF7EE' : t.ink,
      fontFamily: t.sans,
      fontSize: 14,
      fontWeight: 600,
      transition: 'background 160ms ease, color 160ms ease, border-color 160ms ease'
    }
  }, "\uC0AC\uC6A9\uD574\uBCF4\uAE30")))));
}
function AIPlanUploadModal(_ref3) {
  var onClose = _ref3.onClose,
    t = _ref3.t;
  return /*#__PURE__*/React.createElement("div", {
    onClick: onClose,
    style: {
      position: 'fixed',
      inset: 0,
      zIndex: 2100,
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
      width: 380,
      height: 350,
      maxWidth: 'calc(100vw - 48px)',
      maxHeight: 'calc(100vh - 48px)',
      boxSizing: 'border-box',
      background: t.surface,
      borderRadius: 22,
      boxShadow: 'none',
      padding: '22px 24px 22px',
      display: 'flex',
      flexDirection: 'column'
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      fontFamily: t.sans,
      fontSize: 20,
      fontWeight: 650,
      color: t.ink,
      letterSpacing: -0.4
    }
  }, "AI \uAE30\uD68D\uC11C \uC790\uB3D9 \uCD94\uCD9C"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '8px 0 18px',
      fontFamily: t.sans,
      fontSize: 13,
      color: t.inkMute,
      lineHeight: 1.6
    }
  }, "\uAE30\uD68D\uC548 PDF\uB97C \uC5C5\uB85C\uB4DC \uD574\uC8FC\uC138\uC694."), /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: 158,
      borderRadius: 14,
      border: "1px dashed ".concat(t.lineStrong),
      background: t.surfaceAlt,
      cursor: 'pointer',
      padding: 18,
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("input", {
    type: "file",
    accept: ".pdf,application/pdf",
    style: {
      display: 'none'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 38,
      height: 38,
      borderRadius: 999,
      background: t.surface,
      border: "0.5px solid ".concat(t.line),
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: ACCENT,
      marginBottom: 10
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "22",
    height: "22",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.9"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M12 16V4M7 9l5-5 5 5M5 20h14",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }))), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: t.sans,
      fontSize: 13.5,
      fontWeight: 550,
      color: t.ink
    }
  }, "\uAE30\uD68D\uC548 PDF \uD30C\uC77C \uC120\uD0DD"), /*#__PURE__*/React.createElement("span", {
    style: {
      marginTop: 5,
      fontFamily: t.sans,
      fontSize: 12.5,
      color: t.inkFaint
    }
  }, "PDF \uD30C\uC77C\uB9CC \uC5C5\uB85C\uB4DC\uD560 \uC218 \uC788\uC5B4\uC694")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10,
      marginTop: 'auto'
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    style: {
      flex: '1 1 0',
      height: 40,
      borderRadius: 10,
      cursor: 'pointer',
      border: "0.5px solid ".concat(t.lineStrong),
      background: t.surface,
      color: t.ink,
      fontFamily: t.sans,
      fontSize: 14,
      fontWeight: 650
    }
  }, "\uCDE8\uC18C"), /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    style: {
      flex: '1 1 0',
      height: 40,
      borderRadius: 10,
      cursor: 'pointer',
      border: 'none',
      background: ACCENT,
      color: '#FFF7EE',
      fontFamily: t.sans,
      fontSize: 14,
      fontWeight: 800
    }
  }, "\uCD94\uCD9C\uD558\uAE30"))));
}
function WebStepApp() {
  var t = BASE_TOKENS;
  var _useTweaks = useTweaks(STEP_TWEAK_DEFAULTS),
    _useTweaks2 = _slicedToArray(_useTweaks, 2),
    tw = _useTweaks2[0],
    setTweak = _useTweaks2[1];
  var _React$useState3 = React.useState(getSiteLanguage),
    _React$useState4 = _slicedToArray(_React$useState3, 1),
    baseLanguage = _React$useState4[0];
  var _React$useState5 = React.useState(function () {
      return _objectSpread(_objectSpread({}, INITIAL_FORM), {}, {
        mediaLanguage: getSiteLanguage()
      });
    }),
    _React$useState6 = _slicedToArray(_React$useState5, 2),
    form = _React$useState6[0],
    setForm = _React$useState6[1];
  var selectedLangs = [baseLanguage];
  var _React$useState7 = React.useState(1),
    _React$useState8 = _slicedToArray(_React$useState7, 2),
    current = _React$useState8[0],
    setCurrent = _React$useState8[1];
  var _React$useState9 = React.useState(null),
    _React$useState0 = _slicedToArray(_React$useState9, 2),
    savedAt = _React$useState0[0],
    setSavedAt = _React$useState0[1];
  var _React$useState1 = React.useState(false),
    _React$useState10 = _slicedToArray(_React$useState1, 2),
    submitOpen = _React$useState10[0],
    setSubmitOpen = _React$useState10[1];
  var _React$useState11 = React.useState(false),
    _React$useState12 = _slicedToArray(_React$useState11, 2),
    doneOpen = _React$useState12[0],
    setDoneOpen = _React$useState12[1];
  var _React$useState13 = React.useState(true),
    _React$useState14 = _slicedToArray(_React$useState13, 2),
    aiIntroOpen = _React$useState14[0],
    setAiIntroOpen = _React$useState14[1];
  var _React$useState15 = React.useState(false),
    _React$useState16 = _slicedToArray(_React$useState15, 2),
    aiUploadOpen = _React$useState16[0],
    setAiUploadOpen = _React$useState16[1];
  var set = function set(k, v) {
    return setForm(function (f) {
      return _objectSpread(_objectSpread({}, f), {}, _defineProperty({}, k, v));
    });
  };
  var setLangItem = function setLangItem(listKey, language, k, v) {
    return setForm(function (f) {
      return _objectSpread(_objectSpread({}, f), {}, _defineProperty({}, listKey, f[listKey].map(function (x) {
        return x.language === language ? _objectSpread(_objectSpread({}, x), {}, _defineProperty({}, k, v)) : x;
      })));
    });
  };
  var total = STEP_DEFS.length;
  var props = {
    form: form,
    set: set,
    setLangItem: setLangItem,
    langList: selectedLangs,
    baseLanguage: baseLanguage,
    onAiUpload: function onAiUpload() {
      return setAiUploadOpen(true);
    },
    t: t
  };
  var goTo = function goTo(k) {
    var _document$querySelect;
    setCurrent(k);
    (_document$querySelect = document.querySelector('[data-nc-scroll]')) === null || _document$querySelect === void 0 || _document$querySelect.scrollTo({
      top: 0
    });
  };
  var onSave = function onSave() {
    return setSavedAt(nowHHMM());
  };
  var renderStep = function renderStep() {
    if (current === 1) return /*#__PURE__*/React.createElement(WebBasicSection, props);
    if (current === 2) return /*#__PURE__*/React.createElement(WebMediaSection, props);
    return /*#__PURE__*/React.createElement(WebReviewSection, props);
  };
  var side = tw.stepNav === 'side';
  var cur = STEP_DEFS[current - 1];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: '100vw',
      height: '100vh',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      background: t.bg
    }
  }, /*#__PURE__*/React.createElement(DashTopNav, {
    t: t,
    active: "\uCF58\uD150\uCE20",
    notifications: 2
  }), /*#__PURE__*/React.createElement("div", {
    "data-nc-scroll": true,
    style: {
      flex: 1,
      overflow: 'auto'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 'min(960px, calc(100vw - 80px))',
      margin: '0 auto',
      padding: '32px 0 48px',
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 22
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
      marginBottom: 10,
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
  })), "\uCF58\uD150\uCE20 \uBAA9\uB85D"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
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
  }, "\uC0C8 \uCF58\uD150\uCE20 \uB4F1\uB85D"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: t.mono,
      fontSize: 12.5,
      color: t.inkFaint
    }
  }, "\uB2E8\uACC4 ", current, " / ", total, " \xB7 ", cur.label), savedAt && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: t.mono,
      fontSize: 11.5,
      color: t.inkFaint,
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
  }), "\uC784\uC2DC\uC800\uC7A5\uB428 ", savedAt))), !side && /*#__PURE__*/React.createElement(Stepper, {
    steps: STEP_DEFS,
    current: current,
    maxReached: total,
    onJump: goTo,
    t: t
  }), side ? /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: -252,
      top: 0,
      width: 220
    }
  }, /*#__PURE__*/React.createElement(StepRail, {
    steps: STEP_DEFS,
    current: current,
    maxReached: total,
    onJump: goTo,
    t: t
  })), /*#__PURE__*/React.createElement("div", null, renderStep())) : renderStep())), /*#__PURE__*/React.createElement(FooterBar, {
    wizard: true,
    current: current,
    total: total,
    maxW: 960,
    onPrev: function onPrev() {
      return goTo(Math.max(1, current - 1));
    },
    onNext: function onNext() {
      return goTo(Math.min(total, current + 1));
    },
    onSave: onSave,
    onSubmit: function onSubmit() {
      return setSubmitOpen(true);
    },
    t: t
  }), submitOpen && /*#__PURE__*/React.createElement(SubmitModal, {
    form: form,
    t: t,
    onClose: function onClose() {
      return setSubmitOpen(false);
    },
    onConfirm: function onConfirm() {
      setSubmitOpen(false);
      setDoneOpen(true);
    }
  }), doneOpen && /*#__PURE__*/React.createElement(SubmittedToast, {
    t: t,
    onClose: function onClose() {
      return setDoneOpen(false);
    }
  }), aiIntroOpen && /*#__PURE__*/React.createElement(AIIntroModal, {
    t: t,
    onLater: function onLater() {
      return setAiIntroOpen(false);
    },
    onTry: function onTry() {
      setAiIntroOpen(false);
      setAiUploadOpen(true);
    }
  }), aiUploadOpen && /*#__PURE__*/React.createElement(AIPlanUploadModal, {
    t: t,
    onClose: function onClose() {
      return setAiUploadOpen(false);
    }
  }), /*#__PURE__*/React.createElement(TweaksPanel, {
    title: "Tweaks"
  }, /*#__PURE__*/React.createElement(TweakSection, {
    label: "\uB2E8\uACC4 \uB0B4\uBE44"
  }), /*#__PURE__*/React.createElement(TweakRadio, {
    label: "\uD615\uD0DC",
    value: tw.stepNav,
    options: [{
      value: 'top',
      label: '상단 스텝퍼'
    }, {
      value: 'side',
      label: '좌측 레일'
    }],
    onChange: function onChange(v) {
      return setTweak('stepNav', v);
    }
  })));
}
ReactDOM.createRoot(document.getElementById('root')).render(/*#__PURE__*/React.createElement(WebStepApp, null));
