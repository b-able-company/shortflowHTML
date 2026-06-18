function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
// 퍼포먼스 대시보드 — 시안 변형 모음.
// performance-clean.jsx (PerfTopNav, PageHead, SectionHead, PlatformDots ...) 와
// performance-data.jsx 헬퍼에 의존. 디자인 캔버스에서 비교용으로 사용.

// ════════════════════════════════════════════════════════════
//  목록 화면 시안
// ════════════════════════════════════════════════════════════

// ── 시안 B · 컴팩트 리스트 (행 단위 + 인라인 4지표) ──────────────
function PerfListCompact(_ref) {
  var _ref$t = _ref.t,
    t = _ref$t === void 0 ? BASE_TOKENS : _ref$t,
    onOpen = _ref.onOpen;
  var list = _toConsumableArray(PERF_CONTENTS).sort(function (a, b) {
    return (contentTotals(b).views || 0) - (contentTotals(a).views || 0);
  });
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
  }, /*#__PURE__*/React.createElement(SectionHead, {
    t: t,
    eyebrow: "\uD37C\uD3EC\uBA3C\uC2A4 \uB300\uC2DC\uBCF4\uB4DC",
    title: "\uB0B4 \uCF58\uD150\uCE20 \uB9AC\uC2A4\uD2B8"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      background: t.surface,
      border: "0.5px solid ".concat(t.line),
      borderRadius: 14,
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '56px 1.4fr repeat(4, 1fr) 90px 24px',
      padding: '12px 22px',
      fontSize: 10.5,
      color: t.inkMute,
      fontWeight: 700,
      textTransform: 'uppercase',
      letterSpacing: 0.6,
      alignItems: 'center',
      borderBottom: "0.5px solid ".concat(t.line),
      background: t.surfaceAlt
    }
  }, /*#__PURE__*/React.createElement("div", null), /*#__PURE__*/React.createElement("div", null, "\uCF58\uD150\uCE20"), cols.map(function (c) {
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
  }, "\uD50C\uB7AB\uD3FC"), /*#__PURE__*/React.createElement("div", null), "          "), list.map(function (c, i) {
    var tot = contentTotals(c);
    return /*#__PURE__*/React.createElement("div", {
      key: c.id,
      onClick: function onClick() {
        return onOpen && onOpen(c.id);
      },
      style: {
        display: 'grid',
        gridTemplateColumns: '56px 1.4fr repeat(4, 1fr) 90px 24px',
        padding: '14px 22px',
        alignItems: 'center',
        cursor: 'pointer',
        borderBottom: i === list.length - 1 ? 'none' : "0.5px solid ".concat(t.line)
      },
      onMouseEnter: function onMouseEnter(e) {
        return e.currentTarget.style.background = t.surfaceAlt;
      },
      onMouseLeave: function onMouseLeave(e) {
        return e.currentTarget.style.background = 'transparent';
      }
    }, /*#__PURE__*/React.createElement(Poster, {
      tone: c.posterTone,
      size: 40,
      label: ""
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 14.5,
        fontWeight: 700,
        letterSpacing: -0.2,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap'
      }
    }, c.title)), cols.map(function (col) {
      return /*#__PURE__*/React.createElement("div", {
        key: col.key,
        style: {
          textAlign: 'right',
          fontFamily: t.mono,
          fontSize: 14,
          fontWeight: 600,
          color: tot[col.key] == null ? t.inkFaint : t.ink,
          fontVariantNumeric: 'tabular-nums'
        }
      }, tot[col.key] == null ? '—' : compact(tot[col.key]));
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        textAlign: 'right',
        fontSize: 12,
        color: t.inkMute,
        fontFamily: t.mono,
        fontVariantNumeric: 'tabular-nums'
      }
    }, c.platforms.length, "\uAC1C"), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        justifyContent: 'flex-end'
      }
    }, /*#__PURE__*/React.createElement(Chevron, {
      dir: "right",
      color: t.inkFaint
    })));
  }))));
}

// ── 시안 C · 매거진형 와이드 카드 (2열, 큰 포스터 + 지표 칩) ──────
function PerfListMag(_ref2) {
  var _ref2$t = _ref2.t,
    t = _ref2$t === void 0 ? BASE_TOKENS : _ref2$t,
    onOpen = _ref2.onOpen;
  var list = _toConsumableArray(PERF_CONTENTS).sort(function (a, b) {
    return (contentTotals(b).views || 0) - (contentTotals(a).views || 0);
  });
  var metricRow = [{
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
    }, "\xB7"), "\uCF58\uD150\uCE20\uBCC4 \uB204\uC801 \uC131\uACFC")
  }), /*#__PURE__*/React.createElement(SectionHead, {
    t: t,
    eyebrow: "\uB0B4 \uCF58\uD150\uCE20",
    title: "".concat(PERF_CONTENTS.length, "\uD3B8 \xB7 \uB204\uC801 \uC870\uD68C\uC21C")
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: 16
    }
  }, list.map(function (c) {
    var tot = contentTotals(c);
    return /*#__PURE__*/React.createElement("div", {
      key: c.id,
      onClick: function onClick() {
        return onOpen && onOpen(c.id);
      },
      style: {
        background: t.surface,
        border: "0.5px solid ".concat(t.line),
        borderRadius: 16,
        padding: 20,
        display: 'flex',
        gap: 18,
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
      size: 96,
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
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        marginBottom: 4
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 17,
        fontWeight: 700,
        letterSpacing: -0.3,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap'
      }
    }, c.title)), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        color: t.inkMute,
        marginBottom: 14
      }
    }, c.subtitle), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        gap: 8,
        flexWrap: 'wrap',
        marginTop: 'auto'
      }
    }, metricRow.map(function (m) {
      return /*#__PURE__*/React.createElement("div", {
        key: m.key,
        style: {
          flex: '1 1 0',
          minWidth: 80,
          background: t.surfaceAlt,
          borderRadius: 10,
          padding: '10px 12px'
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 9.5,
          color: t.inkMute,
          letterSpacing: 0.4,
          textTransform: 'uppercase',
          fontWeight: 700,
          marginBottom: 5
        }
      }, m.label), /*#__PURE__*/React.createElement("div", {
        style: {
          fontFamily: t.mono,
          fontSize: 17,
          fontWeight: 700,
          letterSpacing: -0.4,
          color: tot[m.key] == null ? t.inkFaint : t.ink,
          fontVariantNumeric: 'tabular-nums'
        }
      }, tot[m.key] == null ? '—' : compact(tot[m.key])));
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        marginTop: 14
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
        flexShrink: 0
      }
    }, "\uC5C5\uB370\uC774\uD2B8 ", c.lastUpdate))));
  }))));
}

// ════════════════════════════════════════════════════════════
//  상세 화면 — 플랫폼 블록 시안 (PerfDetailClean 의 renderPlatforms 로 주입)
// ════════════════════════════════════════════════════════════

var METRIC_DEFS = [{
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
function NoDataRow(_ref3) {
  var t = _ref3.t;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      color: t.inkMute,
      fontSize: 13
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 24,
      height: 24,
      borderRadius: 12,
      border: "1px dashed ".concat(t.lineStrong),
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: t.inkFaint,
      fontFamily: t.mono,
      fontSize: 12
    }
  }, "\u2014"), "\uB370\uC774\uD130 \uBBF8\uC81C\uACF5");
}

// ── 플랫폼 시안 B · 카드 그리드 ───────────────────────────────
function renderPlatformCards(c, t) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: 14
    }
  }, c.platforms.map(function (p) {
    var ps = platformStyle(p.name);
    var has = platformHasAny(p);
    var present = METRIC_DEFS.filter(function (m) {
      return p[m.key] != null;
    });
    var missing = METRIC_DEFS.filter(function (m) {
      return p[m.key] == null;
    });
    return /*#__PURE__*/React.createElement("div", {
      key: p.name,
      style: {
        background: t.surface,
        border: "0.5px solid ".concat(t.line),
        borderRadius: 14,
        overflow: 'hidden'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        background: ps.tint,
        padding: '13px 18px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: "0.5px solid ".concat(t.line)
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 9
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 8,
        height: 8,
        borderRadius: 4,
        background: ps.dot
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 14,
        fontWeight: 700,
        color: ps.ink
      }
    }, p.name)), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: t.mono,
        fontSize: 11,
        color: ps.ink,
        opacity: 0.7
      }
    }, "\uCD9C\uC2DC ", p.releaseDate || '—')), !has ? /*#__PURE__*/React.createElement("div", {
      style: {
        padding: '30px 18px',
        display: 'flex',
        justifyContent: 'center'
      }
    }, /*#__PURE__*/React.createElement(NoDataRow, {
      t: t
    })) : /*#__PURE__*/React.createElement("div", {
      style: {
        padding: '18px'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        rowGap: 18,
        columnGap: 16
      }
    }, present.map(function (m) {
      return /*#__PURE__*/React.createElement("div", {
        key: m.key
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 10.5,
          color: t.inkMute,
          fontWeight: 700,
          letterSpacing: 0.4,
          textTransform: 'uppercase',
          marginBottom: 5
        }
      }, m.label), /*#__PURE__*/React.createElement("div", {
        style: {
          fontFamily: t.mono,
          fontSize: 24,
          fontWeight: 700,
          color: t.ink,
          letterSpacing: -0.6,
          fontVariantNumeric: 'tabular-nums',
          lineHeight: 1
        }
      }, compact(p[m.key])));
    })), missing.length > 0 && /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 16,
        paddingTop: 12,
        borderTop: "0.5px dashed ".concat(t.line),
        display: 'flex',
        flexWrap: 'wrap',
        gap: 6,
        alignItems: 'center',
        fontFamily: t.mono,
        fontSize: 11,
        color: t.inkFaint
      }
    }, /*#__PURE__*/React.createElement("span", null, "\uBBF8\uC81C\uACF5"), missing.map(function (m) {
      return /*#__PURE__*/React.createElement("span", {
        key: m.key,
        style: {
          padding: '1px 7px',
          borderRadius: 999,
          background: t.surfaceAlt,
          color: t.inkMute
        }
      }, m.label);
    }))));
  }));
}

// ── 플랫폼 시안 C · 사이드 스트라이프 행 ──────────────────────
function renderPlatformStripe(c, t) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 12
    }
  }, c.platforms.map(function (p) {
    var ps = platformStyle(p.name);
    var has = platformHasAny(p);
    return /*#__PURE__*/React.createElement("div", {
      key: p.name,
      style: {
        background: t.surface,
        border: "0.5px solid ".concat(t.line),
        borderRadius: 14,
        display: 'flex',
        overflow: 'hidden',
        minHeight: 96
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: 8,
        background: ps.dot,
        flexShrink: 0
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        padding: '16px 22px'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        marginBottom: 16
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 15,
        fontWeight: 700,
        color: t.ink,
        letterSpacing: -0.2
      }
    }, p.name), /*#__PURE__*/React.createElement("span", {
      style: {
        padding: '2px 8px',
        borderRadius: 999,
        background: ps.tint,
        color: ps.ink,
        fontFamily: t.mono,
        fontSize: 10,
        fontWeight: 500
      }
    }, "\uCD9C\uC2DC ", p.releaseDate || '—')), !has ? /*#__PURE__*/React.createElement(NoDataRow, {
      t: t
    }) : /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        gap: 36,
        flexWrap: 'wrap'
      }
    }, METRIC_DEFS.map(function (m) {
      return /*#__PURE__*/React.createElement("div", {
        key: m.key
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 10.5,
          color: t.inkMute,
          fontWeight: 700,
          letterSpacing: 0.4,
          textTransform: 'uppercase',
          marginBottom: 6
        }
      }, m.label), /*#__PURE__*/React.createElement("div", {
        style: {
          fontFamily: t.mono,
          fontSize: 23,
          fontWeight: 700,
          letterSpacing: -0.5,
          fontVariantNumeric: 'tabular-nums',
          color: p[m.key] == null ? t.inkFaint : t.ink
        }
      }, p[m.key] == null ? '—' : compact(p[m.key])));
    }))));
  }));
}
Object.assign(window, {
  PerfListCompact: PerfListCompact,
  PerfListMag: PerfListMag,
  renderPlatformCards: renderPlatformCards,
  renderPlatformStripe: renderPlatformStripe
});
