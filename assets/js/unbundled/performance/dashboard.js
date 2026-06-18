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
// 퍼포먼스 대시보드 (제작사) — 정산 대시보드와 동일한 디자인 언어.
// 화면 1: 콘텐츠 목록(카드)  →  화면 2: 콘텐츠별 연동 플랫폼 퍼포먼스(누적값).
// 지표 4종 views/follows/likes/ads 는 모두 선택값. 전부 누적값이라 시계열 없음.
// tokens.jsx, ui.jsx(Poster·Chevron), performance-data.jsx 에 의존.

// ── 공유 TopNav 와 동일한 외형 ───────────────────────────────
function PerfTopNav(_ref) {
  var _ref$t = _ref.t,
    t = _ref$t === void 0 ? BASE_TOKENS : _ref$t;
  var items = [{
    k: 'my',
    label: '내 콘텐츠'
  }, {
    k: 'dashboard',
    label: '대시보드'
  }, {
    k: 'ai',
    label: 'AI 대본분석'
  }, {
    k: 'guide',
    label: '이용가이드'
  }];
  var active = 'dashboard';
  var ic = {
    width: 18,
    height: 18,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.6,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    style: {
      cursor: 'pointer'
    }
  };
  return /*#__PURE__*/React.createElement("header", {
    style: {
      borderBottom: "0.5px solid ".concat(t.line),
      background: t.surface,
      padding: '0 80px',
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
      display: 'flex',
      alignItems: 'center',
      gap: 40,
      whiteSpace: 'nowrap'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 40,
      flexShrink: 0
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
      gap: 28,
      flexShrink: 0
    }
  }, items.map(function (it) {
    return /*#__PURE__*/React.createElement("div", {
      key: it.k,
      style: {
        fontSize: 14,
        cursor: 'pointer',
        whiteSpace: 'nowrap',
        color: it.k === active ? t.ink : '#6B7280',
        fontWeight: it.k === active ? 600 : 400
      }
    }, it.label);
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginLeft: 'auto',
      display: 'flex',
      alignItems: 'center',
      gap: 20,
      color: '#6B7280',
      fontSize: 14,
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("svg", ic, /*#__PURE__*/React.createElement("path", {
    d: "M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M10.3 21a1.94 1.94 0 0 0 3.4 0"
  })), /*#__PURE__*/React.createElement("svg", ic, /*#__PURE__*/React.createElement("path", {
    d: "M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      cursor: 'pointer',
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "16",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.6",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "9"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M3 12h18"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M12 3a14 14 0 0 1 0 18a14 14 0 0 1 0-18"
  })), "\uD55C\uAD6D\uC5B4", /*#__PURE__*/React.createElement("svg", {
    width: "10",
    height: "10",
    viewBox: "0 0 12 12",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.6",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M3 4.5l3 3 3-3"
  }))), /*#__PURE__*/React.createElement("span", {
    style: {
      color: t.ink,
      fontWeight: 500,
      fontSize: 14
    }
  }, "QuickFrame Studio"), /*#__PURE__*/React.createElement("span", {
    style: {
      cursor: 'pointer',
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "16",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.6",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"
  }), /*#__PURE__*/React.createElement("polyline", {
    points: "16 17 21 12 16 7"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "21",
    y1: "12",
    x2: "9",
    y2: "12"
  })), "\uB85C\uADF8\uC544\uC6C3"))));
}

// 작은 플랫폼 도트 스택
function PlatformDots(_ref2) {
  var platforms = _ref2.platforms,
    t = _ref2.t;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex'
    }
  }, platforms.slice(0, 4).map(function (p, idx) {
    var ps = platformStyle(p.name);
    return /*#__PURE__*/React.createElement("span", {
      key: p.name,
      title: p.name,
      style: {
        width: 14,
        height: 14,
        borderRadius: 7,
        background: ps.dot,
        border: "1.5px solid ".concat(t.surface),
        marginLeft: idx === 0 ? 0 : -5
      }
    });
  }), platforms.length > 4 && /*#__PURE__*/React.createElement("span", {
    style: {
      marginLeft: -5,
      height: 14,
      padding: '0 5px',
      borderRadius: 7,
      background: t.surfaceAlt,
      border: "1.5px solid ".concat(t.surface),
      fontFamily: t.mono,
      fontSize: 9,
      color: t.inkMute,
      display: 'inline-flex',
      alignItems: 'center'
    }
  }, "+", platforms.length - 4));
}

// 페이지 머리말 (정산 대시보드와 동일 패턴)
function PageHead(_ref3) {
  var crumb = _ref3.crumb,
    title = _ref3.title,
    desc = _ref3.desc,
    t = _ref3.t;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 28
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10.5,
      color: t.inkMute,
      marginBottom: 6,
      fontFamily: t.mono,
      letterSpacing: 0.5,
      textTransform: 'uppercase'
    }
  }, crumb), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-end',
      gap: 18,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("h1", {
    style: {
      fontSize: 32,
      fontWeight: 700,
      letterSpacing: -0.9,
      margin: 0,
      color: t.ink,
      lineHeight: 1.1
    }
  }, title), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13.5,
      color: t.inkMute,
      paddingBottom: 6,
      lineHeight: 1.5
    }
  }, desc)));
}

// 섹션 머리말 (eyebrow + 제목 + 우측 슬롯)
function SectionHead(_ref4) {
  var eyebrow = _ref4.eyebrow,
    title = _ref4.title,
    right = _ref4.right,
    t = _ref4.t;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'space-between',
      marginBottom: 14,
      paddingBottom: 12,
      borderBottom: "0.5px solid ".concat(t.line),
      gap: 16,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10.5,
      letterSpacing: 0.6,
      color: t.inkMute,
      fontFamily: t.mono,
      textTransform: 'uppercase',
      marginBottom: 6
    }
  }, eyebrow), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 18,
      fontWeight: 700,
      letterSpacing: -0.3,
      color: t.ink
    }
  }, title)), right);
}

// ── 화면 1: 콘텐츠 목록 ─────────────────────────────────────
function MetricMini(_ref5) {
  var label = _ref5.label,
    value = _ref5.value,
    t = _ref5.t;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10.5,
      color: t.inkMute,
      letterSpacing: 0.5,
      textTransform: 'uppercase',
      fontWeight: 700,
      marginBottom: 6,
      fontFamily: t.sans
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: t.mono,
      fontSize: 24,
      fontWeight: 700,
      color: value == null ? t.inkFaint : t.ink,
      letterSpacing: -0.5,
      fontVariantNumeric: 'tabular-nums',
      lineHeight: 1
    }
  }, value == null ? '—' : compact(value)));
}
function PerfCard(_ref6) {
  var c = _ref6.c,
    t = _ref6.t,
    onClick = _ref6.onClick;
  var tot = contentTotals(c);
  return /*#__PURE__*/React.createElement("div", {
    onClick: onClick,
    style: {
      background: t.surface,
      border: "0.5px solid ".concat(t.line),
      borderRadius: 14,
      padding: 16,
      display: 'flex',
      gap: 14,
      alignItems: 'stretch',
      cursor: 'pointer',
      transition: 'box-shadow .12s ease, border-color .12s ease'
    },
    onMouseEnter: function onMouseEnter(e) {
      e.currentTarget.style.borderColor = t.lineStrong;
      e.currentTarget.style.boxShadow = '0 4px 14px rgba(15,17,21,0.06)';
    },
    onMouseLeave: function onMouseLeave(e) {
      e.currentTarget.style.borderColor = t.line;
      e.currentTarget.style.boxShadow = 'none';
    }
  }, /*#__PURE__*/React.createElement(Poster, {
    tone: c.posterTone,
    size: 68,
    label: "\uBA54\uC778"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0,
      display: 'flex',
      flexDirection: 'column'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 15,
      fontWeight: 700,
      letterSpacing: -0.3,
      color: t.ink,
      marginBottom: 4,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap'
    }
  }, c.title), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11.5,
      color: t.inkMute,
      marginBottom: 'auto',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap'
    }
  }, c.subtitle), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      color: t.inkMute,
      letterSpacing: 0.5,
      textTransform: 'uppercase',
      fontWeight: 600,
      marginBottom: 3
    }
  }, "\uB204\uC801 \uC870\uD68C\uC218"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: t.mono,
      fontSize: 22,
      fontWeight: 700,
      color: tot.views == null ? t.inkFaint : t.ink,
      letterSpacing: -0.5,
      fontVariantNumeric: 'tabular-nums'
    }
  }, tot.views == null ? '데이터 없음' : compact(tot.views))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 12,
      paddingTop: 12,
      borderTop: "0.5px solid ".concat(t.line),
      display: 'flex',
      alignItems: 'center',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11.5,
      color: t.inkMute,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap'
    }
  }, platformSummary(c.platforms)), /*#__PURE__*/React.createElement("span", {
    style: {
      marginLeft: 'auto',
      fontSize: 11,
      color: t.inkFaint,
      fontFamily: t.mono,
      fontVariantNumeric: 'tabular-nums',
      flexShrink: 0
    }
  }, c.lastUpdate))));
}
function PerfDashClean(_ref7) {
  var _ref7$t = _ref7.t,
    t = _ref7$t === void 0 ? BASE_TOKENS : _ref7$t,
    onOpen = _ref7.onOpen;
  var _React$useState = React.useState('views'),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    sort = _React$useState2[0],
    setSort = _React$useState2[1]; // views | recent
  var list = _toConsumableArray(PERF_CONTENTS).sort(function (a, b) {
    if (sort === 'recent') return b.lastUpdate.localeCompare(a.lastUpdate);
    var av = contentTotals(a).views || 0,
      bv = contentTotals(b).views || 0;
    return bv - av;
  });
  var sortBtn = function sortBtn(k, label) {
    return /*#__PURE__*/React.createElement("button", {
      onClick: function onClick() {
        return setSort(k);
      },
      style: {
        background: sort === k ? t.surface : 'transparent',
        border: "0.5px solid ".concat(sort === k ? t.lineStrong : 'transparent'),
        padding: '7px 12px',
        borderRadius: 8,
        cursor: 'pointer',
        fontFamily: t.sans,
        fontSize: 12,
        fontWeight: 500,
        color: sort === k ? t.inkMute : t.inkFaint,
        whiteSpace: 'nowrap'
      }
    }, label);
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      minHeight: '100%',
      background: t.bg,
      color: t.ink,
      fontFamily: t.sans
    }
  }, /*#__PURE__*/React.createElement(PerfTopNav, {
    t: t
  }), /*#__PURE__*/React.createElement("main", {
    style: {
      margin: '0 auto',
      padding: '36px 64px 80px',
      maxWidth: 1280
    }
  }, /*#__PURE__*/React.createElement(PageHead, {
    t: t,
    crumb: "\uB300\uC2DC\uBCF4\uB4DC \xB7 \uD37C\uD3EC\uBA3C\uC2A4",
    title: "\uD37C\uD3EC\uBA3C\uC2A4 \uB300\uC2DC\uBCF4\uB4DC",
    desc: /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("span", {
      style: {
        color: t.ink,
        fontWeight: 600
      }
    }, "QuickFrame Studio"), /*#__PURE__*/React.createElement("span", {
      style: {
        margin: '0 8px',
        color: t.inkFaint
      }
    }, "\xB7"), "\uAC01 \uD50C\uB7AB\uD3FC\uC5D0 \uC5F0\uB3D9\uB41C \uCF58\uD150\uCE20\uC758 \uB204\uC801 \uC131\uACFC\uB97C \uD55C\uB208\uC5D0 \uD655\uC778\uD558\uC138\uC694")
  }), /*#__PURE__*/React.createElement(SectionHead, {
    t: t,
    eyebrow: "\uB0B4 \uCF58\uD150\uCE20",
    title: "".concat(PERF_CONTENTS.length, "\uD3B8 \xB7 \uD50C\uB7AB\uD3FC \uB204\uC801 \uC131\uACFC \uAE30\uC900"),
    right: /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        gap: 8
      }
    }, sortBtn('views', '누적 조회순'), sortBtn('recent', '최근 업데이트순'))
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: 14
    }
  }, list.map(function (c) {
    return /*#__PURE__*/React.createElement(PerfCard, {
      key: c.id,
      c: c,
      t: t,
      onClick: function onClick() {
        return onOpen && onOpen(c.id);
      }
    });
  }))));
}

// ── 화면 2: 콘텐츠 상세 (연동 플랫폼별 누적 퍼포먼스) ──────────
function PlatformPerfTableClean(_ref8) {
  var platforms = _ref8.platforms,
    t = _ref8.t;
  var cols = [{
    key: 'views',
    label: '조회수'
  }, {
    key: 'follows',
    label: '팔로우수'
  }, {
    key: 'likes',
    label: '좋아요수'
  }, {
    key: 'ads',
    label: '광고수'
  }];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: t.surface,
      border: "0.5px solid ".concat(t.line),
      borderRadius: 14,
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1.5fr repeat(4, 1fr) 120px',
      padding: '13px 22px',
      fontSize: 10.5,
      color: t.inkMute,
      fontWeight: 700,
      textTransform: 'uppercase',
      letterSpacing: 0.6,
      borderBottom: "0.5px solid ".concat(t.line),
      background: t.surfaceAlt
    }
  }, /*#__PURE__*/React.createElement("div", null, "\uD50C\uB7AB\uD3FC"), cols.map(function (c) {
    return /*#__PURE__*/React.createElement("div", {
      key: c.key,
      style: {
        textAlign: 'right'
      }
    }, c.label);
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'right'
    }
  }, "\uCD9C\uC2DC\uC77C")), platforms.map(function (p, i) {
    var ps = platformStyle(p.name);
    var hasData = platformHasAny(p);
    return /*#__PURE__*/React.createElement("div", {
      key: p.name,
      style: {
        display: 'grid',
        gridTemplateColumns: '1.5fr repeat(4, 1fr) 120px',
        padding: '17px 22px',
        alignItems: 'center',
        borderBottom: i === platforms.length - 1 ? 'none' : "0.5px solid ".concat(t.line)
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 10
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 9,
        height: 9,
        borderRadius: 5,
        background: ps.dot,
        flexShrink: 0
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 14,
        fontWeight: 700,
        color: t.ink,
        letterSpacing: -0.1
      }
    }, p.name)), !hasData ? /*#__PURE__*/React.createElement("div", {
      style: {
        gridColumn: 'span 4',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        fontSize: 12.5,
        color: t.inkFaint
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 18,
        height: 18,
        borderRadius: 9,
        border: "1px dashed ".concat(t.lineStrong),
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: t.mono,
        fontSize: 11,
        color: t.inkFaint
      }
    }, "\u2014"), "\uB370\uC774\uD130 \uBBF8\uC81C\uACF5") : cols.map(function (c) {
      return /*#__PURE__*/React.createElement("div", {
        key: c.key,
        style: {
          textAlign: 'right',
          fontFamily: t.mono,
          fontSize: 15,
          fontWeight: 600,
          color: p[c.key] == null ? t.inkFaint : t.ink,
          fontVariantNumeric: 'tabular-nums'
        },
        title: p[c.key] == null ? '미제공' : fullNum(p[c.key])
      }, p[c.key] == null ? '—' : compact(p[c.key]));
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        textAlign: 'right',
        fontFamily: t.mono,
        fontSize: 12,
        color: t.inkMute,
        fontVariantNumeric: 'tabular-nums'
      }
    }, p.releaseDate || '—'));
  }));
}
function PerfDetailClean(_ref9) {
  var _ref9$t = _ref9.t,
    t = _ref9$t === void 0 ? BASE_TOKENS : _ref9$t,
    contentId = _ref9.contentId,
    onBack = _ref9.onBack,
    _ref9$renderPlatforms = _ref9.renderPlatforms,
    renderPlatforms = _ref9$renderPlatforms === void 0 ? null : _ref9$renderPlatforms;
  var c = PERF_CONTENTS.find(function (x) {
    return x.id === contentId;
  }) || PERF_CONTENTS[0];
  var tot = contentTotals(c);
  var agg = [{
    key: 'views',
    label: '조회수',
    value: tot.views
  }, {
    key: 'follows',
    label: '팔로우수',
    value: tot.follows
  }, {
    key: 'likes',
    label: '좋아요수',
    value: tot.likes
  }, {
    key: 'ads',
    label: '광고수',
    value: tot.ads
  }];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      minHeight: '100%',
      background: t.bg,
      color: t.ink,
      fontFamily: t.sans
    }
  }, /*#__PURE__*/React.createElement(PerfTopNav, {
    t: t
  }), /*#__PURE__*/React.createElement("main", {
    style: {
      margin: '0 auto',
      padding: '36px 64px 80px',
      maxWidth: 1280
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10.5,
      color: t.inkMute,
      marginBottom: 14,
      fontFamily: t.mono,
      letterSpacing: 0.5,
      textTransform: 'uppercase'
    }
  }, "\uB300\uC2DC\uBCF4\uB4DC \xB7 \uD37C\uD3EC\uBA3C\uC2A4 \xB7 \uCF58\uD150\uCE20 \uC0C1\uC138"), /*#__PURE__*/React.createElement("button", {
    onClick: onBack,
    style: {
      background: 'transparent',
      border: 'none',
      padding: 0,
      cursor: 'pointer',
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      marginBottom: 20,
      fontFamily: t.sans,
      fontSize: 13,
      color: t.inkMute
    }
  }, /*#__PURE__*/React.createElement(Chevron, {
    dir: "left",
    size: 11,
    color: t.inkMute
  }), "\uD37C\uD3EC\uBA3C\uC2A4 \uB300\uC2DC\uBCF4\uB4DC"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 18,
      alignItems: 'center',
      marginBottom: 28
    }
  }, /*#__PURE__*/React.createElement(Poster, {
    tone: c.posterTone,
    size: 76,
    label: "\uBA54\uC778"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 28,
      fontWeight: 700,
      letterSpacing: -0.7,
      lineHeight: 1.15
    }
  }, c.title), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: t.inkMute,
      marginTop: 7
    }
  }, c.subtitle, /*#__PURE__*/React.createElement("span", {
    style: {
      margin: '0 8px',
      color: t.inkFaint
    }
  }, "\xB7"), "\uC5F0\uB3D9 \uD50C\uB7AB\uD3FC ", c.platforms.length, "\uACF3 \xB7 \uC9C0\uD45C \uC81C\uACF5 ", tot.liveCount, "\uACF3")), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'right'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10.5,
      color: t.inkMute,
      marginBottom: 5,
      letterSpacing: 0.5,
      textTransform: 'uppercase',
      fontWeight: 700
    }
  }, "\uB9C8\uC9C0\uB9C9 \uC5C5\uB370\uC774\uD2B8"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: t.mono,
      fontSize: 13,
      color: t.ink,
      fontVariantNumeric: 'tabular-nums'
    }
  }, c.lastUpdate))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      background: t.surface,
      border: "0.5px solid ".concat(t.line),
      borderRadius: 16,
      marginBottom: 36,
      overflow: 'hidden'
    }
  }, agg.map(function (m, i) {
    return /*#__PURE__*/React.createElement("div", {
      key: m.key,
      style: {
        padding: '20px 24px',
        borderRight: i < 3 ? "0.5px solid ".concat(t.line) : 'none'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 10.5,
        color: t.inkMute,
        fontWeight: 700,
        letterSpacing: 0.5,
        textTransform: 'uppercase',
        marginBottom: 10
      }
    }, "\uD50C\uB7AB\uD3FC \uD569\uC0B0 ", m.label), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: t.mono,
        fontSize: 30,
        fontWeight: 700,
        letterSpacing: -1,
        color: m.value == null ? t.inkFaint : t.ink,
        fontVariantNumeric: 'tabular-nums',
        lineHeight: 1
      }
    }, m.value == null ? '—' : compact(m.value)), m.value != null && /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: t.mono,
        fontSize: 11,
        color: t.inkFaint,
        marginTop: 5,
        fontVariantNumeric: 'tabular-nums'
      }
    }, fullNum(m.value)));
  })), /*#__PURE__*/React.createElement(SectionHead, {
    t: t,
    eyebrow: "\uC5F0\uB3D9 \uD50C\uB7AB\uD3FC",
    title: "".concat(c.platforms.length, "\uAC1C \uD50C\uB7AB\uD3FC \xB7 \uB204\uC801 \uC9C0\uD45C"),
    right: /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: t.mono,
        fontSize: 11,
        color: t.inkMute,
        letterSpacing: 0.2,
        paddingBottom: 4
      }
    }, "\uC9C0\uD45C \uC81C\uACF5 ", tot.liveCount, " / ", c.platforms.length)
  }), renderPlatforms ? renderPlatforms(c, t) : /*#__PURE__*/React.createElement(PlatformPerfTableClean, {
    platforms: c.platforms,
    t: t
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 28,
      padding: '14px 18px',
      background: t.surfaceAlt,
      borderRadius: 10,
      fontSize: 12,
      color: t.inkMute,
      lineHeight: 1.6,
      display: 'flex',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: t.mono,
      fontSize: 10,
      color: t.inkFaint,
      border: "0.5px solid ".concat(t.lineStrong),
      padding: '2px 7px',
      borderRadius: 999,
      height: 18,
      alignSelf: 'flex-start',
      letterSpacing: 0.4
    }
  }, "NOTE"), /*#__PURE__*/React.createElement("div", null, "\uBAA8\uB4E0 \uC218\uCE58\uB294 \uCD9C\uC2DC \uC774\uD6C4 ", /*#__PURE__*/React.createElement("strong", {
    style: {
      color: t.ink,
      fontWeight: 600
    }
  }, "\uB204\uC801\uAC12"), "\uC774\uBA70 \uC2DC\uC810\uBCC4 \uCD94\uC774\uB294 \uC81C\uACF5\uB418\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4. \uC9C0\uD45C\uB294 \uAC01 \uD50C\uB7AB\uD3FC\uC774 \uC81C\uACF5\uD558\uB294 \uBC94\uC704 \uB0B4\uC5D0\uC11C\uB9CC \uD45C\uC2DC\uB418\uBA70, \uBBF8\uC81C\uACF5 \uD56D\uBAA9\uC740 ", /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: t.mono
    }
  }, "\u2014"), " \uB85C \uB098\uD0C0\uB0C5\uB2C8\uB2E4."))));
}
Object.assign(window, {
  PerfTopNav: PerfTopNav,
  PerfDashClean: PerfDashClean,
  PerfDetailClean: PerfDetailClean,
  PlatformPerfTableClean: PlatformPerfTableClean,
  PerfCard: PerfCard,
  PageHead: PageHead,
  SectionHead: SectionHead,
  PlatformDots: PlatformDots,
  MetricMini: MetricMini
});
