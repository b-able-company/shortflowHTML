function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
// Content detail page — recreation of live UI + 3 action-placement options.
// Goal: favorite + cart buttons live OFF the poster, equal-weight & visually unified.

// ─── Top nav (matches live screenshot: bell, theme, lang, user, logout) ───
function DetailTopNav(_ref) {
  var _ref$t = _ref.t,
    t = _ref$t === void 0 ? BASE_TOKENS : _ref$t;
  var items = [{
    k: 'content',
    label: '콘텐츠',
    active: true
  }, {
    k: 'dashboard',
    label: '대시보드'
  }, {
    k: 'guide',
    label: '이용가이드'
  }];
  var IconBtn = function IconBtn(_ref2) {
    var children = _ref2.children;
    return /*#__PURE__*/React.createElement("button", {
      style: {
        width: 32,
        height: 32,
        borderRadius: 8,
        border: 'none',
        background: 'transparent',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#6B7280'
      }
    }, children);
  };
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
      maxWidth: 1280,
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
        color: it.active ? '#E85D2C' : '#6B7280',
        fontWeight: it.active ? 600 : 400
      }
    }, it.label);
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      marginLeft: 'auto',
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      color: '#6B7280',
      fontSize: 14
    }
  }, /*#__PURE__*/React.createElement(IconBtn, null, /*#__PURE__*/React.createElement("svg", {
    width: "17",
    height: "17",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.8",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M10.3 21a1.94 1.94 0 0 0 3.4 0"
  }))), /*#__PURE__*/React.createElement(IconBtn, null, /*#__PURE__*/React.createElement("svg", {
    width: "17",
    height: "17",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.8",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
  }))), /*#__PURE__*/React.createElement("button", {
    style: {
      height: 32,
      padding: '0 10px',
      borderRadius: 8,
      border: 'none',
      background: 'transparent',
      cursor: 'pointer',
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      fontSize: 13,
      color: '#6B7280',
      fontFamily: t.sans
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "15",
    height: "15",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.8",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "10"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M2 12h20M12 2a15 15 0 0 1 4 10 15 15 0 0 1-4 10 15 15 0 0 1-4-10 15 15 0 0 1 4-10z"
  })), "\uD55C\uAD6D\uC5B4", /*#__PURE__*/React.createElement("svg", {
    width: "11",
    height: "11",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "m6 9 6 6 6-6"
  }))), /*#__PURE__*/React.createElement("span", {
    style: {
      color: t.ink,
      fontWeight: 500,
      fontSize: 14,
      marginLeft: 6
    }
  }, "Reelio"), /*#__PURE__*/React.createElement("button", {
    style: {
      background: 'transparent',
      border: 'none',
      cursor: 'pointer',
      display: 'inline-flex',
      alignItems: 'center',
      gap: 4,
      fontSize: 13,
      color: '#6B7280',
      padding: '0 6px'
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
    d: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"
  })), "\uB85C\uADF8\uC544\uC6C3"))));
}

// ─── Poster (no heart on poster anymore) ─────────────────────
function DetailPoster(_ref3) {
  var t = _ref3.t;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      width: 360,
      aspectRatio: '3/4',
      borderRadius: 6,
      overflow: 'hidden',
      background: "linear-gradient(180deg, #d4ccc0 0%, #6b5a4e 100%)",
      boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 14,
      left: 16,
      fontFamily: t.sans,
      fontSize: 11,
      fontWeight: 600,
      color: 'rgba(255,255,255,0.75)',
      letterSpacing: 1.5
    }
  }, "PARK'N MEDIA"), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 64,
      height: 64,
      borderRadius: 32,
      background: 'rgba(255,255,255,0.18)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "22",
    height: "22",
    viewBox: "0 0 24 24",
    fill: "#fff",
    stroke: "none"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M8 5v14l11-7z"
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      bottom: 16,
      right: 18,
      textAlign: 'right',
      fontFamily: '"Geist", serif',
      color: '#fff',
      lineHeight: 0.9
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 44,
      fontWeight: 800,
      letterSpacing: -1.5
    }
  }, "THE"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 44,
      fontWeight: 800,
      letterSpacing: -1.5
    }
  }, "TOUCH"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      fontWeight: 500,
      marginTop: 8,
      letterSpacing: 1.5,
      opacity: 0.9
    }
  }, "BAE EUNWOO \xA0\xA0 KIM DONGWON")));
}

// ─── Metadata row (label + value) ─────────────────────────────
function MetaRow(_ref4) {
  var label = _ref4.label,
    children = _ref4.children,
    t = _ref4.t;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 36,
      paddingBottom: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 80,
      fontSize: 14,
      color: t.ink,
      fontWeight: 700,
      flexShrink: 0
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      color: t.ink,
      lineHeight: 1.7,
      flex: 1
    }
  }, children));
}

// ─── Hashtag chip ────────────────────────────────────────────
function HashChip(_ref5) {
  var children = _ref5.children,
    t = _ref5.t;
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-block',
      padding: '6px 12px',
      borderRadius: 16,
      border: "0.5px solid ".concat(t.line),
      background: t.surface,
      fontSize: 13,
      color: t.ink,
      fontFamily: t.sans
    }
  }, children);
}
function ContractBadge(_ref6) {
  var t = _ref6.t;
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      height: 24,
      padding: '0 9px',
      borderRadius: 6,
      border: '1px solid #D7DAE2',
      background: '#F7F8FA',
      color: '#303642',
      fontSize: 12,
      fontWeight: 700,
      fontFamily: t.sans,
      lineHeight: 1,
      whiteSpace: 'nowrap'
    }
  }, "\uAC70\uB798\uC911");
}

// ─── Metadata column (shared by all variants) ────────────────
function DetailMeta(_ref7) {
  var t = _ref7.t,
    _ref7$includeStatus = _ref7.includeStatus,
    includeStatus = _ref7$includeStatus === void 0 ? false : _ref7$includeStatus;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement(MetaRow, {
    label: "\uC81C\uC791\uC5F0\uB3C4",
    t: t
  }, "2025"), includeStatus && /*#__PURE__*/React.createElement(MetaRow, {
    label: "\uC81C\uC791 \uC0C1\uD0DC",
    t: t
  }, "\uC81C\uC791 \uC644\uB8CC"), /*#__PURE__*/React.createElement(MetaRow, {
    label: "\uAC70\uB798 \uC0C1\uD0DC",
    t: t
  }, "Reelio\uC640 \uAC70\uB798\uC911"), /*#__PURE__*/React.createElement(MetaRow, {
    label: "\uD50C\uB7AB\uD3FC",
    t: t
  }, "testRelease, testReleased2"), /*#__PURE__*/React.createElement(MetaRow, {
    label: "\uC7A5\uB974",
    t: t
  }, "\uB85C\uB9E8\uC2A4, \uCE58\uC815, \uB85C\uB9E8\uC2A4, \uB85C\uB9E8\uC2A4"), /*#__PURE__*/React.createElement(MetaRow, {
    label: "\uC5D0\uD53C\uC18C\uB4DC",
    t: t
  }, "90 ep x 2 mins"), /*#__PURE__*/React.createElement(MetaRow, {
    label: "\uAC10\uB3C5",
    t: t
  }, "\uAE40\uC9C4\uC218"), /*#__PURE__*/React.createElement(MetaRow, {
    label: "\uC791\uAC00",
    t: t
  }, "\uD669\uC9C0\uC12D"), /*#__PURE__*/React.createElement(MetaRow, {
    label: "\uBC30\uC6B0",
    t: t
  }, "\uD61C\uB9AC, \uAE40\uB3D9\uD604"), /*#__PURE__*/React.createElement(MetaRow, {
    label: "\uCD94\uCC9C \uD3EC\uC778\uD2B8",
    t: t
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: '100%',
      maxWidth: '100%',
      minWidth: 0,
      overflow: 'hidden'
    }
  }, "- \uAE08\uAE30\uB41C \uAD00\uACC4 \uC11C\uC0AC: \uB538\uC758 \uC5F0\uC778\uACFC \uC5C4\uB9C8 \uC0AC\uC774\uC758 \uB3C4\uB355\uC801 \uACBD\uACC4\uB97C \uB118\uB294 \uD30C\uACA9\uC801 \uAD00\uACC4 \uAD6C\uC870"), /*#__PURE__*/React.createElement("div", null, "- \uC695\uB9DD\uACFC \uAC10\uC815\uC758 \uCDA9\uB3CC: \uC774\uC131\uACFC \uBCF8\uB2A5 \uC0AC\uC774\uC5D0\uC11C \uD754\uB4E4\uB9AC\uB294 \uC778\uAC04\uC758 \uBCF5\uD569\uC801 \uC2EC\uB9AC"), /*#__PURE__*/React.createElement("div", null, "- \uAC00\uC871 \uAD00\uACC4\uC758 \uBD95\uAD34\uC640 \uC7AC\uAD6C\uC131: \uC0AC\uB791\uC73C\uB85C \uC778\uD574 \uBB34\uB108\uC9C0\uB294 \uAC00\uC871\uACFC \uADF8 \uC548\uC758 \uAC08\uB4F1"), /*#__PURE__*/React.createElement("div", null, "- \uC131\uC219\uD55C \uC5EC\uC131 \uC11C\uC0AC: \uC911\uB144 \uC5EC\uC131\uC758 \uC695\uB9DD\uACFC \uAC10\uC815\uC744 \uC804\uBA74\uC5D0 \uB4DC\uB7EC\uB0B8 \uD604\uC2E4\uC801 \uC774\uC57C\uAE30"), /*#__PURE__*/React.createElement("div", null, "- \uCE58\uC720\uC640 \uC131\uC7A5: \uC0C1\uCC98\uB97C \uB9C8\uC8FC\uD558\uACE0 \uAC10\uC815\uC744 \uBC1B\uC544\uB4E4\uC774\uB294 \uACFC\uC815")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: 8,
      marginTop: 18
    }
  }, ['#금기된사랑', '#치정로맨스', '#가족붕괴', '#욕망과감정', '#성숙로맨스', '#심리드라마'].map(function (h) {
    return /*#__PURE__*/React.createElement(HashChip, {
      key: h,
      t: t
    }, h);
  })));
}

// ─── Tabs (프리뷰 / 상세정보 / 스틸컷) ─────────────────────
function DetailTabs(_ref8) {
  var t = _ref8.t,
    active = _ref8.active,
    onChange = _ref8.onChange;
  var tabs = [{
    id: 'preview',
    label: '프리뷰'
  }, {
    id: 'detail',
    label: '상세정보'
  }, {
    id: 'stills',
    label: '스틸컷'
  }];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      borderBottom: "0.5px solid ".concat(t.line),
      marginTop: 64,
      marginBottom: 34
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      height: 100
    }
  }, tabs.map(function (tab) {
    var isActive = active === tab.id;
    return /*#__PURE__*/React.createElement("button", {
      key: tab.id,
      onClick: function onClick() {
        return onChange(tab.id);
      },
      style: {
        position: 'relative',
        border: 'none',
        background: 'transparent',
        cursor: 'pointer',
        fontFamily: t.sans,
        fontSize: 16,
        fontWeight: 700,
        color: isActive ? '#E85D2C' : '#747482',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
        padding: '0 0 18px'
      }
    }, tab.label, isActive && /*#__PURE__*/React.createElement("span", {
      style: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: -0.5,
        height: 2,
        background: '#E85D2C'
      }
    }));
  })));
}
function PreviewSection(_ref9) {
  var t = _ref9.t;
  var _React$useState = React.useState(null),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    modalItem = _React$useState2[0],
    setModalItem = _React$useState2[1];
  var teaserVideos = [{
    type: '예고편',
    title: '예고편',
    duration: '00:48',
    tone: 'linear-gradient(145deg, #151923 0%, #332536 48%, #9f6a55 100%)',
    thumbnail: 'images/media/비밀사내예고편.png'
  }];
  var freeEpisodes = [{
    type: '무료회차',
    title: '1화',
    duration: '12:04',
    thumbnail: 'images/media/비밀사내결혼무료1.png'
  }, {
    type: '무료회차',
    title: '2화',
    duration: '11:38',
    thumbnail: 'images/media/비밀사내결혼무료2.png'
  }, {
    type: '무료회차',
    title: '3화',
    duration: '12:21',
    thumbnail: 'images/media/비밀사내결혼무료3.png'
  }, {
    type: '무료회차',
    title: '4화',
    duration: '10:57',
    thumbnail: 'images/media/비밀사내결혼무료4.png'
  }, {
    type: '무료회차',
    title: '5화',
    duration: '11:42',
    thumbnail: 'images/media/비밀사내결혼무료5.png'
  }, {
    type: '무료회차',
    title: '6화',
    duration: '12:16',
    thumbnail: 'images/media/비밀사내결혼무료6.png'
  }, {
    type: '무료회차',
    title: '7화',
    duration: '11:29',
    thumbnail: 'images/media/비밀사내결혼무료7.png'
  }];
  var openPreview = function openPreview(item) {
    return setModalItem(item);
  };
  var PlayIcon = function PlayIcon(_ref0) {
    var _ref0$size = _ref0.size,
      size = _ref0$size === void 0 ? 15 : _ref0$size;
    return /*#__PURE__*/React.createElement("svg", {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "currentColor",
      "aria-hidden": "true"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M8 5v14l11-7z"
    }));
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: '100%',
      maxWidth: '100%',
      minWidth: 0,
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gap: 28,
      width: '100%',
      maxWidth: '100%',
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("section", {
    style: {
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      fontWeight: 800,
      color: t.ink,
      marginBottom: 12
    }
  }, "\uC608\uACE0\uD3B8"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 12,
      width: '100%',
      maxWidth: '100%',
      minWidth: 0,
      overflowX: 'auto',
      overflowY: 'hidden',
      paddingBottom: 6,
      WebkitOverflowScrolling: 'touch'
    }
  }, teaserVideos.map(function (video) {
    return /*#__PURE__*/React.createElement("button", {
      key: video.title,
      onClick: function onClick() {
        return openPreview(video);
      },
      style: {
        width: 180,
        flex: '0 0 180px',
        aspectRatio: '9 / 16',
        minHeight: 0,
        border: '0.5px solid ' + t.line,
        borderRadius: 14,
        overflow: 'hidden',
        background: video.thumbnail ? '#111827' : video.tone,
        cursor: 'pointer',
        position: 'relative',
        color: '#fff',
        fontFamily: t.sans,
        textAlign: 'left',
        padding: 16,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
      }
    }, video.thumbnail && /*#__PURE__*/React.createElement("img", {
      src: video.thumbnail,
      alt: video.title + ' 썸네일',
      style: {
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        objectFit: 'cover'
      }
    }), video.thumbnail && /*#__PURE__*/React.createElement("span", {
      "aria-hidden": "true",
      style: {
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(180deg, rgba(0,0,0,0.24) 0%, rgba(0,0,0,0.06) 48%, rgba(0,0,0,0.42) 100%)'
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'relative',
        zIndex: 1,
        fontSize: 11,
        letterSpacing: 1.1,
        color: 'rgba(255,255,255,0.68)'
      }
    }, "TRAILER"), /*#__PURE__*/React.createElement("span", {
      style: {
        position: 'relative',
        zIndex: 1,
        alignSelf: 'center',
        width: 46,
        height: 46,
        borderRadius: '50%',
        background: 'rgba(17,24,39,0.34)',
        border: '1px solid rgba(255,255,255,0.72)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
        boxShadow: '0 12px 30px rgba(0,0,0,0.22)'
      }
    }, /*#__PURE__*/React.createElement(PlayIcon, {
      size: 18
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'relative',
        zIndex: 1
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 15,
        fontWeight: 800
      }
    }, video.title)));
  }))), /*#__PURE__*/React.createElement("section", {
    style: {
      minWidth: 0,
      borderTop: '0.5px solid ' + t.line,
      paddingTop: 26
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      fontWeight: 800,
      color: t.ink,
      marginBottom: 12
    }
  }, "\uBB34\uB8CC\uD68C\uCC28"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 12,
      width: '100%',
      maxWidth: '100%',
      minWidth: 0,
      overflowX: 'auto',
      overflowY: 'hidden',
      paddingBottom: 6,
      WebkitOverflowScrolling: 'touch'
    }
  }, freeEpisodes.map(function (episode, i) {
    return /*#__PURE__*/React.createElement("button", {
      key: episode.title,
      onClick: function onClick() {
        return openPreview(episode);
      },
      style: {
        width: 180,
        flex: '0 0 180px',
        aspectRatio: '9 / 16',
        minHeight: 0,
        border: '0.5px solid ' + t.line,
        borderRadius: 14,
        overflow: 'hidden',
        background: episode.thumbnail ? '#111827' : ['linear-gradient(145deg, #1b2433 0%, #4c596f 58%, #d8b7a1 100%)', 'linear-gradient(145deg, #201b2b 0%, #604557 58%, #d7a79a 100%)', 'linear-gradient(145deg, #17212a 0%, #445c60 58%, #c2d2c6 100%)', 'linear-gradient(145deg, #251d21 0%, #6d473d 58%, #e0b88d 100%)', 'linear-gradient(145deg, #151923 0%, #3f4657 58%, #bfa7c6 100%)'][i % 5],
        cursor: 'pointer',
        position: 'relative',
        color: '#fff',
        fontFamily: t.sans,
        textAlign: 'left',
        padding: 16,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
      }
    }, episode.thumbnail && /*#__PURE__*/React.createElement("img", {
      src: episode.thumbnail,
      alt: episode.title + ' 썸네일',
      style: {
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        objectFit: 'cover'
      }
    }), episode.thumbnail && /*#__PURE__*/React.createElement("span", {
      "aria-hidden": "true",
      style: {
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(180deg, rgba(0,0,0,0.28) 0%, rgba(0,0,0,0.08) 48%, rgba(0,0,0,0.46) 100%)'
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'relative',
        zIndex: 1,
        fontSize: 11,
        letterSpacing: 1.1,
        color: 'rgba(255,255,255,0.68)',
        fontWeight: 800
      }
    }, "FREE EPISODE"), /*#__PURE__*/React.createElement("span", {
      style: {
        position: 'relative',
        zIndex: 1,
        alignSelf: 'center',
        width: 46,
        height: 46,
        borderRadius: '50%',
        background: 'rgba(17,24,39,0.34)',
        border: '1px solid rgba(255,255,255,0.72)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
        boxShadow: '0 12px 30px rgba(0,0,0,0.22)'
      }
    }, /*#__PURE__*/React.createElement(PlayIcon, {
      size: 18
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'relative',
        zIndex: 1
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 18,
        fontWeight: 800,
        color: '#fff'
      }
    }, episode.title)));
  })))), modalItem && /*#__PURE__*/React.createElement("div", {
    onClick: function onClick() {
      return setModalItem(null);
    },
    style: {
      position: 'fixed',
      inset: 0,
      zIndex: 9999,
      background: 'rgba(17,24,39,0.62)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 28
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: function onClick(event) {
      return event.stopPropagation();
    },
    style: {
      width: 'min(390px, calc(100vw - 48px))',
      borderRadius: 22,
      overflow: 'hidden',
      background: 'transparent',
      boxShadow: '0 24px 80px rgba(0,0,0,0.32)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      aspectRatio: '9 / 16',
      position: 'relative',
      background: modalItem.thumbnail ? '#111827' : modalItem.tone || 'linear-gradient(145deg, #151923 0%, #3b465a 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, modalItem.thumbnail && /*#__PURE__*/React.createElement("img", {
    src: modalItem.thumbnail,
    alt: modalItem.title + ' 썸네일',
    style: {
      position: 'absolute',
      inset: 0,
      width: '100%',
      height: '100%',
      objectFit: 'cover'
    }
  }), modalItem.thumbnail && /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      position: 'absolute',
      inset: 0,
      background: 'linear-gradient(180deg, rgba(0,0,0,0.24) 0%, rgba(0,0,0,0.08) 50%, rgba(0,0,0,0.46) 100%)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 16,
      left: 18,
      right: 14,
      zIndex: 2,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 18,
      color: '#fff',
      fontWeight: 900
    }
  }, modalItem.title), /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      return setModalItem(null);
    },
    style: {
      width: 34,
      height: 34,
      borderRadius: 17,
      border: 'none',
      background: 'transparent',
      cursor: 'pointer',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#fff'
    },
    "aria-label": "\uB2EB\uAE30"
  }, /*#__PURE__*/React.createElement("svg", {
    width: "20",
    height: "20",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "3",
    strokeLinecap: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M18 6 6 18M6 6l12 12"
  })))), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'relative',
      zIndex: 1,
      width: 72,
      height: 72,
      borderRadius: 36,
      background: 'rgba(17,24,39,0.34)',
      border: '1px solid rgba(255,255,255,0.76)',
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
      color: '#fff',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: '0 18px 44px rgba(0,0,0,0.28)'
    }
  }, /*#__PURE__*/React.createElement(PlayIcon, {
    size: 28
  }))))));
}
function StillsSection(_ref1) {
  var t = _ref1.t;
  var stills = ['images/posters/비밀사내결혼.png', 'images/media/비밀사내결혼스틸컷1.png', 'images/media/비밀사내결혼스틸컷2.png'];
  var _React$useState3 = React.useState(null),
    _React$useState4 = _slicedToArray(_React$useState3, 2),
    selected = _React$useState4[0],
    setSelected = _React$useState4[1];
  React.useEffect(function () {
    if (!selected) return undefined;
    var previousOverflow = document.body.style.overflow;
    var closeOnEscape = function closeOnEscape(event) {
      if (event.key === 'Escape') setSelected(null);
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', closeOnEscape);
    return function () {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', closeOnEscape);
    };
  }, [selected]);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
      gap: 14
    }
  }, stills.map(function (src, index) {
    return /*#__PURE__*/React.createElement("button", {
      key: src,
      type: "button",
      onClick: function onClick() {
        return setSelected(src);
      },
      "aria-label": '스틸컷 ' + (index + 1) + ' 크게 보기',
      style: {
        display: 'block',
        width: '100%',
        aspectRatio: '16 / 10',
        padding: 0,
        border: 'none',
        borderRadius: 10,
        background: '#F3F4F6',
        overflow: 'hidden',
        cursor: 'zoom-in'
      }
    }, /*#__PURE__*/React.createElement("img", {
      src: src,
      alt: '비밀 사내 결혼 스틸컷 ' + (index + 1),
      style: {
        display: 'block',
        width: '100%',
        height: '100%',
        objectFit: 'cover'
      }
    }));
  })), selected && /*#__PURE__*/React.createElement("div", {
    role: "dialog",
    "aria-modal": "true",
    "aria-label": "\uC2A4\uD2F8\uCEF7 \uD06C\uAC8C \uBCF4\uAE30",
    onClick: function onClick() {
      return setSelected(null);
    },
    style: {
      position: 'fixed',
      inset: 0,
      zIndex: 10050,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 32,
      background: 'rgba(0, 0, 0, 0.82)',
      cursor: 'zoom-out'
    }
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: function onClick() {
      return setSelected(null);
    },
    "aria-label": "\uC2A4\uD2F8\uCEF7 \uB2EB\uAE30",
    style: {
      position: 'fixed',
      top: 22,
      right: 24,
      zIndex: 1,
      width: 42,
      height: 42,
      padding: 0,
      border: 'none',
      background: 'transparent',
      color: '#fff',
      fontFamily: 'Arial, sans-serif',
      fontSize: 36,
      fontWeight: 300,
      lineHeight: '42px',
      textShadow: '0 2px 10px rgba(0,0,0,0.55)',
      cursor: 'pointer'
    }
  }, "\xD7"), /*#__PURE__*/React.createElement("img", {
    src: selected,
    alt: "\uD655\uB300\uB41C \uC2A4\uD2F8\uCEF7",
    onClick: function onClick(event) {
      return event.stopPropagation();
    },
    style: {
      display: 'block',
      maxWidth: 'min(900px, 92vw)',
      maxHeight: '88vh',
      width: 'auto',
      height: 'auto',
      borderRadius: 8,
      boxShadow: '0 24px 70px rgba(0,0,0,0.45)',
      cursor: 'default'
    }
  })));
}
function DetailContentTabs(_ref10) {
  var t = _ref10.t;
  var _React$useState5 = React.useState('preview'),
    _React$useState6 = _slicedToArray(_React$useState5, 2),
    active = _React$useState6[0],
    setActive = _React$useState6[1];
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(DetailTabs, {
    t: t,
    active: active,
    onChange: setActive
  }), active === 'preview' && /*#__PURE__*/React.createElement(PreviewSection, {
    t: t
  }), active === 'detail' && /*#__PURE__*/React.createElement(LoglineSection, {
    t: t
  }), active === 'stills' && /*#__PURE__*/React.createElement(StillsSection, {
    t: t
  }));
}
function LoglineSection(_ref11) {
  var t = _ref11.t;
  var sections = [{
    title: '로그라인',
    body: '회사에서는 완벽한 동료, 퇴근 후에는 비밀 부부인 두 사람이 모두의 시선 속에서 사랑과 일을 지켜내는 오피스 로맨스.'
  }, {
    title: '시놉시스',
    body: '기획마케팅팀의 에이스 차서연은 일도 사람도 흐트러짐 없이 처리하는 완벽주의자다. 그런 그녀에게 단 하나의 약점이 있다면, 전환기획팀의 강지훈 과장과 이미 비밀리에 결혼했다는 사실이다. 두 사람은 같은 회사, 같은 층, 같은 프로젝트 안에서 매일 마주치지만 회사에서는 철저히 남처럼 행동한다. 회의실에서는 의견을 날카롭게 주고받고, 복도에서는 아무렇지 않게 스쳐 지나가며, 사내 메신저에서도 업무용 문장만 남긴다. 하지만 감춰둔 마음은 작은 순간마다 새어 나온다.\n\n대형 신규 캠페인을 함께 맡게 되면서 두 사람의 비밀은 점점 위험해진다. 야근, 출장, 합동 회의, 팀 회식까지 이어지는 일정 속에서 서로를 챙기지 않는 척하는 일이 오히려 더 어려워진다. 여기에 눈치 빠른 동료 한지윤과 사내 정치에 능한 박도현이 두 사람의 묘한 기류를 의심하기 시작하면서, 완벽했던 비밀 결혼 생활은 균열을 맞는다. 들키면 커리어도 관계도 흔들릴 수 있는 상황에서 서연과 지훈은 처음으로 질문하게 된다. 사랑을 지키기 위해 숨겨야 하는 걸까, 아니면 사랑하기 때문에 드러내야 하는 걸까.'
  }, {
    title: '캐릭터 설명',
    body: '차서연 | 기획마케팅팀 차석 대리. 빠른 판단력과 꼼꼼한 실행력으로 회사 안에서 인정받는 실무형 에이스다. 감정을 쉽게 드러내지 않고 언제나 프로답게 행동하려 하지만, 지훈 앞에서는 오래 참아온 불안과 애정이 동시에 새어 나온다. 비밀 결혼을 유지하는 것이 서로를 지키는 방법이라고 믿지만, 시간이 지날수록 숨기는 일이 사랑을 작게 만드는 건 아닌지 고민한다.\n\n강지훈 | 전환기획팀 과장. 차분하고 단단한 태도로 팀을 이끄는 사람이며, 회사 안에서는 냉정할 만큼 선을 잘 지킨다. 서연과의 관계를 보호하기 위해 일부러 더 무심하게 굴지만, 사실 누구보다 서연의 하루와 감정을 세심하게 보고 있다. 완벽한 팀워크 뒤에 감춰진 진심을 언젠가는 정면으로 말해야 한다는 걸 알고 있다.\n\n한지윤 | 서연의 동료이자 가장 가까운 관찰자. 밝고 솔직한 성격으로 팀 분위기를 살리지만, 사람 사이의 미묘한 변화에는 누구보다 빠르다. 서연과 지훈 사이의 어색할 만큼 완벽한 거리감을 이상하게 여기며 두 사람의 비밀에 가장 먼저 다가선다.\n\n박도현 | 경쟁 부서의 핵심 실무자. 능력 있고 매력적이지만 원하는 결과를 위해 관계를 전략적으로 활용하는 인물이다. 서연과 지훈의 관계를 의심하면서 프로젝트와 사내 권력 구도에 두 사람의 비밀을 이용하려 한다.'
  }];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gap: 58,
      maxWidth: 900
    }
  }, sections.map(function (section) {
    return /*#__PURE__*/React.createElement("section", {
      key: section.title,
      style: {
        paddingBottom: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 22,
        fontWeight: 800,
        color: '#E85D2C',
        marginBottom: 14,
        letterSpacing: -0.2
      }
    }, section.title), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 15,
        color: t.ink,
        lineHeight: 1.85,
        whiteSpace: 'pre-line',
        letterSpacing: -0.1
      }
    }, section.body));
  }));
}

// ─── Heart icon button (square ghost) ────────────────────────
function FavSquareBtn(_ref12) {
  var active = _ref12.active,
    onClick = _ref12.onClick,
    t = _ref12.t,
    _ref12$size = _ref12.size,
    size = _ref12$size === void 0 ? 44 : _ref12$size;
  return /*#__PURE__*/React.createElement("button", {
    onClick: onClick,
    style: {
      width: size,
      height: size,
      borderRadius: 10,
      border: "0.5px solid ".concat(active ? '#E85D2C' : t.lineStrong),
      background: active ? '#FFF1EC' : t.surface,
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
      padding: 0
    }
  }, /*#__PURE__*/React.createElement(HeartIcon, {
    filled: true,
    size: 18
  }));
}

// ═══════════════════════════════════════════════════════════════
// VARIANT A: Side-by-side equal pills replacing 제안하기
//   [♡ 즐겨찾기] [+ 장바구니에 담기]
//   둘 다 같은 크기 ghost 스타일, 차이는 카트가 채워진 주황.
// ═══════════════════════════════════════════════════════════════
function DetailVariantA(_ref13) {
  var t = _ref13.t;
  var _React$useState7 = React.useState(false),
    _React$useState8 = _slicedToArray(_React$useState7, 2),
    fav = _React$useState8[0],
    setFav = _React$useState8[1];
  var _React$useState9 = React.useState(false),
    _React$useState0 = _slicedToArray(_React$useState9, 2),
    inCart = _React$useState0[0],
    setInCart = _React$useState0[1];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 12,
      marginTop: 14,
      marginBottom: 30
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      return setFav(!fav);
    },
    style: {
      height: 44,
      padding: '0 18px',
      borderRadius: 10,
      border: "0.5px solid ".concat(fav ? '#E85D2C' : t.lineStrong),
      background: fav ? '#FFF1EC' : t.surface,
      color: fav ? '#E85D2C' : t.ink,
      cursor: 'pointer',
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
      fontFamily: t.sans,
      fontSize: 14,
      fontWeight: fav ? 600 : 500
    }
  }, /*#__PURE__*/React.createElement(HeartIcon, {
    filled: true,
    size: 15
  }), fav ? '즐겨찾기' : '즐겨찾기'), /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      return setInCart(!inCart);
    },
    style: {
      height: 44,
      padding: '0 20px',
      borderRadius: 10,
      border: 'none',
      background: inCart ? '#1A1A1A' : '#E85D2C',
      color: '#fff',
      cursor: 'pointer',
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
      fontFamily: t.sans,
      fontSize: 14,
      fontWeight: 600
    }
  }, inCart ? /*#__PURE__*/React.createElement(CheckIcon, {
    size: 13,
    color: "#fff",
    weight: 2.5
  }) : /*#__PURE__*/React.createElement(PlusIcon, {
    size: 14,
    color: "#fff"
  }), inCart ? '장바구니에 담김' : '장바구니에 담기'));
}

// ═══════════════════════════════════════════════════════════════
// VARIANT B: Both ghost outline, fully equal weight ("동급")
//   같은 색, 같은 스타일, 같은 크기. 카트가 primary가 아님.
//   "둘 다 똑같이 중요한 액션" 메시지를 가장 강하게 전달.
// ═══════════════════════════════════════════════════════════════
function DetailVariantB(_ref14) {
  var t = _ref14.t;
  var _React$useState1 = React.useState(false),
    _React$useState10 = _slicedToArray(_React$useState1, 2),
    fav = _React$useState10[0],
    setFav = _React$useState10[1];
  var _React$useState11 = React.useState(false),
    _React$useState12 = _slicedToArray(_React$useState11, 2),
    inCart = _React$useState12[0],
    setInCart = _React$useState12[1];
  var Btn = function Btn(_ref15) {
    var active = _ref15.active,
      activeBg = _ref15.activeBg,
      icon = _ref15.icon,
      label = _ref15.label,
      labelActive = _ref15.labelActive,
      onClick = _ref15.onClick;
    return /*#__PURE__*/React.createElement("button", {
      onClick: onClick,
      style: {
        flex: 1,
        maxWidth: 220,
        height: 48,
        borderRadius: 10,
        border: "0.5px solid ".concat(active ? '#E85D2C' : t.lineStrong),
        background: active ? activeBg : t.surface,
        color: active ? '#E85D2C' : t.ink,
        cursor: 'pointer',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        fontFamily: t.sans,
        fontSize: 14,
        fontWeight: active ? 600 : 500
      }
    }, icon, active ? labelActive : label);
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10,
      marginTop: 14,
      marginBottom: 30
    }
  }, /*#__PURE__*/React.createElement(Btn, {
    active: fav,
    activeBg: "#FFF1EC",
    icon: /*#__PURE__*/React.createElement(HeartIcon, {
      filled: true,
      size: 15
    }),
    label: "\uC990\uACA8\uCC3E\uAE30",
    labelActive: "\uC990\uACA8\uCC3E\uAE30",
    onClick: function onClick() {
      return setFav(!fav);
    }
  }), /*#__PURE__*/React.createElement(Btn, {
    active: inCart,
    activeBg: "#FFF1EC",
    icon: inCart ? /*#__PURE__*/React.createElement(CheckIcon, {
      size: 13,
      color: "#E85D2C",
      weight: 2.5
    }) : /*#__PURE__*/React.createElement(CartIcon, {
      size: 15
    }),
    label: "\uC7A5\uBC14\uAD6C\uB2C8 \uB2F4\uAE30",
    labelActive: "\uC7A5\uBC14\uAD6C\uB2C8\uC5D0 \uB2F4\uAE40",
    onClick: function onClick() {
      return setInCart(!inCart);
    }
  }));
}

// ═══════════════════════════════════════════════════════════════
// VARIANT C: Action panel docked at the BOTTOM of the meta column
//   메타데이터 끝에 카드형 액션 영역 ("이 콘텐츠를 어떻게 할까요?")
//   포스터/타이틀 영역에 액션을 두지 않고, 메타데이터를 다 읽은 뒤
//   자연스럽게 다음 단계로 유도. 두 버튼이 동급, 풀폭.
// ═══════════════════════════════════════════════════════════════
function DetailVariantC_Header(_ref16) {
  var t = _ref16.t;
  // 헤더는 깨끗 — title + status 만
  return null;
}
function DetailVariantC_Actions(_ref17) {
  var t = _ref17.t;
  var _React$useState13 = React.useState(false),
    _React$useState14 = _slicedToArray(_React$useState13, 2),
    fav = _React$useState14[0],
    setFav = _React$useState14[1];
  var _React$useState15 = React.useState(false),
    _React$useState16 = _slicedToArray(_React$useState15, 2),
    inCart = _React$useState16[0],
    setInCart = _React$useState16[1];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 24,
      padding: 18,
      background: t.surface,
      border: "0.5px solid ".concat(t.line),
      borderRadius: 12,
      display: 'flex',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      return setFav(!fav);
    },
    style: {
      flex: 1,
      height: 48,
      borderRadius: 10,
      border: "0.5px solid ".concat(fav ? '#E85D2C' : t.lineStrong),
      background: fav ? '#FFF1EC' : '#fff',
      color: fav ? '#E85D2C' : t.ink,
      cursor: 'pointer',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
      fontFamily: t.sans,
      fontSize: 14,
      fontWeight: fav ? 600 : 500
    }
  }, /*#__PURE__*/React.createElement(HeartIcon, {
    filled: true,
    size: 15
  }), fav ? '즐겨찾기' : '즐겨찾기'), /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      return setInCart(!inCart);
    },
    style: {
      flex: 1,
      height: 48,
      borderRadius: 10,
      border: 'none',
      background: inCart ? '#1A1A1A' : '#E85D2C',
      color: '#fff',
      cursor: 'pointer',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
      fontFamily: t.sans,
      fontSize: 14,
      fontWeight: 600
    }
  }, inCart ? /*#__PURE__*/React.createElement(CheckIcon, {
    size: 13,
    color: "#fff",
    weight: 2.5
  }) : /*#__PURE__*/React.createElement(PlusIcon, {
    size: 14,
    color: "#fff"
  }), inCart ? '장바구니에 담김' : '장바구니에 담기'));
}

// ═══════════════════════════════════════════════════════════════
// VARIANT D: Title on the RIGHT of the poster (reference layout)
//   포스터 좌측 고정. 우측에 [타이틀 (연도)] → [작은 pill 버튼들] → [메타]
//   2025 부제 제거. '제작 상태' 필드 추가.
//   버튼은 라이트그레이 둥근 pill (= 메타 영역에서 secondary 액션 느낌).
// ═══════════════════════════════════════════════════════════════
function MiniPill(_ref18) {
  var icon = _ref18.icon,
    children = _ref18.children,
    active = _ref18.active,
    _ref18$activeBg = _ref18.activeBg,
    activeBg = _ref18$activeBg === void 0 ? '#FFF1EC' : _ref18$activeBg,
    _ref18$activeColor = _ref18.activeColor,
    activeColor = _ref18$activeColor === void 0 ? '#E85D2C' : _ref18$activeColor,
    onClick = _ref18.onClick,
    t = _ref18.t;
  return /*#__PURE__*/React.createElement("button", {
    onClick: onClick,
    style: {
      height: 28,
      padding: '0 11px 0 10px',
      borderRadius: 14,
      border: 'none',
      background: active ? activeBg : '#F3F4F6',
      color: active ? activeColor : '#1F2937',
      cursor: 'pointer',
      display: 'inline-flex',
      alignItems: 'center',
      gap: 5,
      fontFamily: t.sans,
      fontSize: 12,
      fontWeight: active ? 600 : 500,
      whiteSpace: 'nowrap'
    }
  }, icon, children);
}
function DetailVariantD_RightCol(_ref19) {
  var t = _ref19.t;
  var _React$useState17 = React.useState(false),
    _React$useState18 = _slicedToArray(_React$useState17, 2),
    fav = _React$useState18[0],
    setFav = _React$useState18[1];
  var _React$useState19 = React.useState(false),
    _React$useState20 = _slicedToArray(_React$useState19, 2),
    inCart = _React$useState20[0],
    setInCart = _React$useState20[1];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("h1", {
    style: {
      fontSize: 28,
      fontWeight: 800,
      color: '#1A1A1A',
      margin: 0,
      letterSpacing: -0.6,
      lineHeight: 1.2
    }
  }, "The Touch ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: '#6B7280',
      fontWeight: 700
    }
  }, "(2025)")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 6,
      marginTop: 12,
      marginBottom: 26,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement(MiniPill, {
    t: t,
    active: fav,
    icon: /*#__PURE__*/React.createElement(HeartIcon, {
      filled: true,
      size: 12,
      color: fav ? '#E85D2C' : '#1F2937'
    }),
    onClick: function onClick() {
      return setFav(!fav);
    }
  }, fav ? '즐겨찾기' : '즐겨찾기'), /*#__PURE__*/React.createElement("button", {
    disabled: true,
    style: {
      height: 28,
      padding: '0 11px 0 10px',
      borderRadius: 14,
      border: 'none',
      background: '#F3F4F6',
      color: '#6B7280',
      cursor: 'not-allowed',
      display: 'inline-flex',
      alignItems: 'center',
      gap: 5,
      fontFamily: t.sans,
      fontSize: 12,
      fontWeight: 600,
      whiteSpace: 'nowrap'
    }
  }, /*#__PURE__*/React.createElement(CheckIcon, {
    size: 11,
    color: "#6B7280",
    weight: 2.5
  }), "\uACC4\uC57D \uC644\uB8CC")), /*#__PURE__*/React.createElement(DetailMeta, {
    t: t,
    includeStatus: true
  }));
}
function ContentDetailPageD(_ref20) {
  var _ref20$t = _ref20.t,
    t = _ref20$t === void 0 ? BASE_TOKENS : _ref20$t;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      minHeight: '100%',
      background: t.bg,
      color: t.ink,
      fontFamily: t.sans
    }
  }, /*#__PURE__*/React.createElement("main", {
    style: {
      margin: '0 auto',
      padding: '32px 40px 140px',
      maxWidth: 1290
    }
  }, /*#__PURE__*/React.createElement("button", {
    style: {
      background: 'transparent',
      border: 'none',
      cursor: 'pointer',
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
      fontSize: 14,
      color: t.ink,
      fontFamily: t.sans,
      padding: 0,
      marginBottom: 22
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "16",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M19 12H5M12 19l-7-7 7-7"
  })), "\uB4A4\uB85C \uAC00\uAE30"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 56
    }
  }, /*#__PURE__*/React.createElement(DetailPoster, {
    t: t
  }), /*#__PURE__*/React.createElement(DetailVariantD_RightCol, {
    t: t
  })), /*#__PURE__*/React.createElement(DetailContentTabs, {
    t: t
  })));
}

// ─── Page shell (renders one variant) ─────────────────────────
function ContentDetailPage(_ref21) {
  var _ref21$variant = _ref21.variant,
    variant = _ref21$variant === void 0 ? 'A' : _ref21$variant,
    _ref21$t = _ref21.t,
    t = _ref21$t === void 0 ? BASE_TOKENS : _ref21$t;
  if (variant === 'D') return /*#__PURE__*/React.createElement(ContentDetailPageD, {
    t: t
  });
  return /*#__PURE__*/React.createElement("div", {
    style: {
      minHeight: '100%',
      background: t.bg,
      color: t.ink,
      fontFamily: t.sans
    }
  }, /*#__PURE__*/React.createElement("main", {
    style: {
      margin: '0 auto',
      padding: '32px 40px 140px',
      maxWidth: 1290
    }
  }, /*#__PURE__*/React.createElement("button", {
    style: {
      background: 'transparent',
      border: 'none',
      cursor: 'pointer',
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
      fontSize: 14,
      color: t.ink,
      fontFamily: t.sans,
      padding: 0,
      marginBottom: 22
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "16",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M19 12H5M12 19l-7-7 7-7"
  })), "\uB4A4\uB85C \uAC00\uAE30"), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontSize: 40,
      fontWeight: 800,
      color: '#E85D2C',
      margin: 0,
      letterSpacing: -1,
      lineHeight: 1.1
    }
  }, "The Touch"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      color: t.inkMute,
      marginTop: 10,
      fontWeight: 500
    }
  }, "2025 \xA0|\xA0 \uC81C\uC791 \uC644\uB8CC"), variant === 'A' && /*#__PURE__*/React.createElement(DetailVariantA, {
    t: t
  }), variant === 'B' && /*#__PURE__*/React.createElement(DetailVariantB, {
    t: t
  }), variant === 'C' && /*#__PURE__*/React.createElement("div", {
    style: {
      height: 22
    }
  }) /* spacer */, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 56,
      marginTop: variant === 'C' ? 14 : 0
    }
  }, /*#__PURE__*/React.createElement(DetailPoster, {
    t: t
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement(DetailMeta, {
    t: t
  }), variant === 'C' && /*#__PURE__*/React.createElement(DetailVariantC_Actions, {
    t: t
  }))), /*#__PURE__*/React.createElement(DetailContentTabs, {
    t: t
  })));
}
Object.assign(window, {
  ContentDetailPage: ContentDetailPage,
  ContentDetailPageD: ContentDetailPageD,
  DetailTopNav: DetailTopNav,
  DetailPoster: DetailPoster,
  DetailMeta: DetailMeta,
  DetailTabs: DetailTabs,
  DetailContentTabs: DetailContentTabs,
  PreviewSection: PreviewSection,
  StillsSection: StillsSection,
  LoglineSection: LoglineSection,
  DetailVariantA: DetailVariantA,
  DetailVariantB: DetailVariantB,
  DetailVariantC_Actions: DetailVariantC_Actions,
  DetailVariantD_RightCol: DetailVariantD_RightCol,
  MiniPill: MiniPill,
  FavSquareBtn: FavSquareBtn
});
