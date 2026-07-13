function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
try {
  localStorage.removeItem("perf.screen");
} catch (e) {}
PerfTopNav = function PerfTopNav() {
  return null;
};
BASE_TOKENS.surfaceAlt = "rgb(250, 250, 250)";
var PERF_MOCK_CONTENT = {
  p1: {
    title: "대표님이 내 전남친입니다",
    subtitle: "80부작 · 로맨스",
    posterImage: "images/대표님이내전남친입니다.png",
    platforms: ["NovaShort", "PlayStory", "VeloDrama", "StoryWave"]
  },
  p2: {
    title: "재벌집 막내 비서",
    subtitle: "72부작 · 로맨스 · 여성향",
    posterImage: "images/재벌집막내비서.png",
    platforms: ["NovaShort", "PlayStory", "StoryWave"]
  },
  p3: {
    title: "죽었다가 회귀한 톱스타",
    subtitle: "80부작 · 타임슬립 · 액션",
    posterImage: "images/죽었다가회귀한.png",
    platforms: ["NovaShort", "VeloDrama"]
  },
  p4: {
    title: "우리 집에 킬러가 산다",
    subtitle: "64부작 · 스릴러 · 코미디",
    posterImage: "images/우리집에킬러가.png",
    platforms: ["NovaShort", "PlayStory", "VeloDrama", "StoryWave", "MiniStage"]
  },
  p5: {
    title: "오늘부터 악녀 대행합니다",
    subtitle: "70부작 · 로맨스 · 코미디",
    posterImage: "images/오늘부터악녀대행.png",
    platforms: ["NovaShort", "PlayStory"]
  }
};
PERF_CONTENTS.forEach(function (c) {
  var mock = PERF_MOCK_CONTENT[c.id];
  if (!mock) return;
  c.title = mock.title;
  c.subtitle = mock.subtitle;
  c.posterImage = new URL(mock.posterImage, window.location.href).href;
  c.platforms.forEach(function (p, i) {
    p.name = mock.platforms[i] || "Stage" + (i + 1);
  });
});
var fullNumber = function fullNumber(value) {
  return Number(value).toLocaleString("ko-KR");
};
var compactK = function compactK(value) {
  var number = Number(value);
  if (number < 1000) return fullNumber(number);
  var scaled = number / 1000;
  return scaled.toLocaleString("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 1
  }) + "K";
};
var PERF_VISIBLE_METRICS = METRIC_ORDER.filter(function (metric) {
  return metric.key !== "ads";
});
var perfPageButtonStyle = function perfPageButtonStyle(t, active, disabled) {
  return {
    minWidth: 28,
    height: 28,
    padding: "0 8px",
    border: 0,
    borderRadius: 7,
    background: active ? "rgba(26, 26, 24, 0.09)" : "transparent",
    color: disabled ? t.inkFaint : active ? t.ink : t.inkMute,
    fontFamily: t.sans,
    fontSize: 12,
    fontWeight: 700,
    cursor: disabled ? "default" : "pointer"
  };
};
var latestUpdateDate = function latestUpdateDate(platforms) {
  return platforms.map(function (p) {
    return p.lastUpdate;
  }).filter(Boolean).sort().reverse()[0] || "-";
};
var PERF_PLATFORM_LAST_UPDATES = {
  p1: {
    "NovaShort": "2026-04-29",
    "PlayStory": "2026-04-28",
    "VeloDrama": "2026-04-26",
    "StoryWave": "2026-04-24"
  },
  p2: {
    "NovaShort": "2026-04-28",
    "PlayStory": "2026-04-27",
    "StoryWave": "2026-04-25"
  },
  p3: {
    "NovaShort": "2026-04-25",
    "VeloDrama": "2026-04-21"
  },
  p4: {
    "NovaShort": "2026-04-29",
    "PlayStory": "2026-04-29",
    "VeloDrama": "2026-04-27",
    "StoryWave": "2026-04-25",
    "MiniStage": "2026-04-20"
  },
  p5: {
    "NovaShort": "2026-04-29",
    "PlayStory": "2026-04-28"
  }
};
PERF_CONTENTS.forEach(function (c) {
  return c.platforms.forEach(function (p) {
    p.lastUpdate = PERF_PLATFORM_LAST_UPDATES[c.id] && PERF_PLATFORM_LAST_UPDATES[c.id][p.name] || p.lastUpdate || c.lastUpdate;
  });
});
var PerfPoster = window.PerfPoster = function PerfPoster(_ref) {
  var c = _ref.c,
    size = _ref.size;
  return c.posterImage ? /*#__PURE__*/React.createElement("div", {
    style: {
      width: size,
      height: Math.round(size * 1.4),
      borderRadius: 7,
      overflow: "hidden",
      flexShrink: 0,
      boxShadow: "inset 0 0 0 0.5px rgba(0,0,0,0.08)"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: c.posterImage,
    alt: c.title + " 포스터",
    style: {
      display: "block",
      width: "100%",
      height: "100%",
      objectFit: "cover"
    }
  })) : /*#__PURE__*/React.createElement(Poster, {
    tone: c.posterTone,
    size: size,
    label: ""
  });
};
PerfTile = function PerfTile(_ref2) {
  var label = _ref2.label,
    value = _ref2.value,
    full = _ref2.full,
    t = _ref2.t;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: t.surface,
      border: "0.5px solid " + t.line,
      borderRadius: 12,
      padding: "14px 18px",
      flex: 1,
      minWidth: 0,
      display: "flex",
      flexDirection: "column",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: t.inkMute,
      letterSpacing: 0.4,
      textTransform: "uppercase",
      fontWeight: 700,
      fontFamily: t.sans
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: t.mono,
      fontSize: 24,
      fontWeight: 700,
      color: value == null ? t.inkFaint : t.ink,
      letterSpacing: -0.5,
      fontVariantNumeric: "tabular-nums",
      lineHeight: 1.1
    }
  }, value == null ? "-" : compactK(value)));
};
PerfPlatformRow = function PerfPlatformRow(_ref3) {
  var p = _ref3.p,
    _ref3$t = _ref3.t,
    t = _ref3$t === void 0 ? BASE_TOKENS : _ref3$t;
  var has = PERF_VISIBLE_METRICS.some(function (metric) {
    return p[metric.key] != null;
  });
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: t.surface,
      border: "0.5px solid " + t.line,
      borderRadius: 14,
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "12px 20px",
      display: "flex",
      alignItems: "flex-start",
      justifyContent: "space-between",
      gap: 16,
      background: t.surfaceAlt
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 17,
      fontWeight: 700,
      letterSpacing: -0.3,
      color: t.ink
    }
  }, p.name), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 14,
      flexWrap: "wrap",
      marginTop: 8,
      color: t.inkMute,
      fontSize: 12,
      lineHeight: "18px"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11,
      color: t.inkFaint
    }
  }, "\uCD9C\uC2DC"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: t.mono,
      color: t.inkMute,
      fontVariantNumeric: "tabular-nums"
    }
  }, p.releaseDate || "-")), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11,
      color: t.inkFaint
    }
  }, "\uC5C5\uB370\uC774\uD2B8"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: t.mono,
      color: t.inkMute,
      fontVariantNumeric: "tabular-nums"
    }
  }, p.lastUpdate || "-"))))), /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: "0.5px solid " + t.line
    }
  }, !has ? /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "24px 20px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 24,
      height: 24,
      borderRadius: 12,
      border: "1px dashed " + t.lineStrong,
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      color: t.inkFaint,
      fontFamily: t.mono,
      fontSize: 12
    }
  }, "-")) : /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)"
    }
  }, PERF_VISIBLE_METRICS.map(function (m, i) {
    var v = p[m.key];
    return /*#__PURE__*/React.createElement("div", {
      key: m.key,
      style: {
        padding: "18px 20px",
        borderRight: i < PERF_VISIBLE_METRICS.length - 1 ? "0.5px solid " + t.line : "none"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 10.5,
        color: t.inkMute,
        fontWeight: 700,
        letterSpacing: 0.4,
        textTransform: "uppercase",
        marginBottom: 8
      }
    }, m.label), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: t.mono,
        fontSize: 16,
        fontWeight: 600,
        letterSpacing: -0.2,
        color: v == null ? t.inkFaint : t.ink,
        fontVariantNumeric: "tabular-nums",
        lineHeight: 1
      }
    }, v == null ? "-" : fullNumber(v)));
  }))));
};
PerfDetailAccordion = function PerfDetailAccordion(_ref4) {
  var _ref4$t = _ref4.t,
    t = _ref4$t === void 0 ? BASE_TOKENS : _ref4$t,
    contentId = _ref4.contentId,
    onBack = _ref4.onBack;
  var c = PERF_CONTENTS.find(function (x) {
    return x.id === contentId;
  }) || PERF_CONTENTS[0];
  var tot = contentTotals(c);
  var tiles = METRIC_ORDER.filter(function (m) {
    return tot[m.key] != null;
  });
  var posterSize = 136;
  var posterHeight = Math.round(posterSize * 1.4);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      minHeight: "100%",
      background: t.bg,
      color: t.ink,
      fontFamily: t.sans
    }
  }, /*#__PURE__*/React.createElement(PerfTopNav, {
    t: t
  }), /*#__PURE__*/React.createElement("main", {
    style: {
      margin: "0 auto",
      padding: "32px 64px 80px",
      maxWidth: 1280
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: onBack,
    style: {
      background: "transparent",
      border: "none",
      padding: 0,
      cursor: "pointer",
      display: "inline-flex",
      alignItems: "center",
      gap: 6,
      marginBottom: 18,
      fontFamily: t.sans,
      fontSize: 13,
      color: t.inkMute
    }
  }, /*#__PURE__*/React.createElement(Chevron, {
    dir: "left",
    size: 11,
    color: t.inkMute
  }), "\uD37C\uD3EC\uBA3C\uC2A4"), /*#__PURE__*/React.createElement("section", {
    style: {
      display: "block",
      marginBottom: 30
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 22,
      alignItems: "flex-start"
    }
  }, /*#__PURE__*/React.createElement(PerfPoster, {
    c: c,
    size: posterSize
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0,
      minHeight: posterHeight,
      display: "flex",
      flexDirection: "column"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "flex-start",
      justifyContent: "space-between",
      gap: 18,
      minHeight: 30
    }
  }, /*#__PURE__*/React.createElement("h1", {
    style: {
      fontSize: 26,
      fontWeight: 700,
      letterSpacing: -0.6,
      margin: "6px 0 0",
      lineHeight: 1.15,
      color: t.ink
    }
  }, c.title), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 8,
      alignSelf: "flex-start",
      padding: "4px 10px",
      borderRadius: 8,
      background: t.surfaceAlt,
      fontSize: 12,
      color: t.inkMute,
      whiteSpace: "nowrap",
      flexShrink: 0,
      lineHeight: "18px"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: t.sans
    }
  }, "\uB9C8\uC9C0\uB9C9 \uC5C5\uB370\uC774\uD2B8"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: t.mono,
      color: t.ink,
      fontWeight: 500,
      fontVariantNumeric: "tabular-nums"
    }
  }, latestUpdateDate(c.platforms)))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 10,
      marginTop: "auto"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      letterSpacing: 0.6,
      color: t.inkMute,
      fontFamily: t.mono,
      textTransform: "uppercase",
      lineHeight: "12px"
    }
  }, "\uD50C\uB7AB\uD3FC \uD569\uC0B0 \uB204\uC801 (\uC785\uB825\uB41C \uC9C0\uD45C \uAE30\uC900)"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))",
      gap: 10
    }
  }, tiles.length > 0 ? tiles.map(function (m) {
    return /*#__PURE__*/React.createElement(PerfTile, {
      key: m.key,
      label: m.label,
      value: tot[m.key],
      t: t
    });
  }) : /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      padding: "18px",
      borderRadius: 12,
      background: t.surfaceAlt,
      color: t.inkFaint,
      fontFamily: t.mono,
      fontSize: 13,
      textAlign: "center"
    }
  }, "-")))))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 14,
      paddingBottom: 12,
      borderBottom: "0.5px solid " + t.line
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      letterSpacing: 0.6,
      color: t.inkMute,
      fontFamily: t.mono,
      textTransform: "uppercase",
      marginBottom: 6
    }
  }, "\uD50C\uB7AB\uD3FC\uBCC4 \uB204\uC801 \uC9C0\uD45C"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 18,
      fontWeight: 700,
      letterSpacing: -0.3
    }
  }, c.platforms.length, "\uAC1C \uD50C\uB7AB\uD3FC \uC5F0\uB3D9")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 12
    }
  }, c.platforms.map(function (p) {
    return /*#__PURE__*/React.createElement(PerfPlatformRow, {
      key: p.name,
      p: p,
      t: t
    });
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 28,
      padding: "14px 18px",
      background: t.surfaceAlt,
      borderRadius: 10,
      fontSize: 12,
      color: t.inkMute,
      lineHeight: 1.6,
      display: "flex",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: t.mono,
      fontSize: 10,
      color: t.inkFaint,
      border: "0.5px solid " + t.lineStrong,
      padding: "0 7px",
      borderRadius: 999,
      height: 18,
      lineHeight: "18px",
      alignSelf: "flex-start",
      letterSpacing: 0.4
    }
  }, "NOTE"), /*#__PURE__*/React.createElement("div", null, "\uBAA8\uB4E0 \uC218\uCE58\uB294 \uCD9C\uC2DC \uC774\uD6C4 ", /*#__PURE__*/React.createElement("strong", {
    style: {
      color: t.ink,
      fontWeight: 600
    }
  }, "\uB204\uC801\uAC12"), "\uC774\uBA70 \uC2DC\uC810\uBCC4 \uCD94\uC774\uB294 \uC81C\uACF5\uB418\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4. \uC785\uB825\uB418\uC9C0 \uC54A\uC740 \uD56D\uBAA9\uC740 ", /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: t.mono
    }
  }, "-"), "\uB85C \uB098\uD0C0\uB0C5\uB2C8\uB2E4."))));
};
PerfListCompact = function PerfListCompact(_ref5) {
  var _ref5$t = _ref5.t,
    t = _ref5$t === void 0 ? BASE_TOKENS : _ref5$t,
    onOpen = _ref5.onOpen;
  var list = _toConsumableArray(PERF_CONTENTS).sort(function (a, b) {
    return (contentTotals(b).views || 0) - (contentTotals(a).views || 0);
  });
  var pageSize = 10;
  var pageState = React.useState(1),
    page = pageState[0],
    setPage = pageState[1];
  var totalPages = Math.max(1, Math.ceil(list.length / pageSize));
  var currentPage = Math.min(page, totalPages);
  var pageItems = list.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  var cols = [{
    key: "views",
    label: "조회수"
  }, {
    key: "follows",
    label: "팔로우수"
  }, {
    key: "likes",
    label: "좋아요수"
  }, {
    key: "ads",
    label: "광고수"
  }];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      minHeight: "100%",
      background: t.bg,
      color: t.ink,
      fontFamily: t.sans
    }
  }, /*#__PURE__*/React.createElement(PerfTopNav, {
    t: t
  }), /*#__PURE__*/React.createElement("main", {
    style: {
      margin: "0 auto",
      padding: "36px 64px 80px",
      maxWidth: 1280
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "flex-end",
      justifyContent: "space-between",
      marginBottom: 14,
      paddingBottom: 12,
      borderBottom: "0.5px solid " + t.line,
      gap: 16,
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 18,
      fontWeight: 700,
      letterSpacing: -0.3,
      color: t.ink
    }
  }, "\uB0B4 \uCF58\uD150\uCE20 \uB9AC\uC2A4\uD2B8"))), /*#__PURE__*/React.createElement("div", {
    style: {
      background: t.surface,
      border: "0.5px solid " + t.line,
      borderRadius: 14,
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "56px minmax(180px,1.25fr) repeat(3, minmax(92px,1fr)) minmax(64px,0.7fr) 72px",
      padding: "12px 22px",
      fontSize: 10.5,
      color: t.inkMute,
      fontWeight: 700,
      textTransform: "uppercase",
      letterSpacing: 0.6,
      alignItems: "center",
      borderBottom: "0.5px solid " + t.line,
      background: t.surfaceAlt
    }
  }, /*#__PURE__*/React.createElement("div", null), /*#__PURE__*/React.createElement("div", null, "\uCF58\uD150\uCE20"), cols.map(function (c) {
    return /*#__PURE__*/React.createElement("div", {
      key: c.key,
      style: {
        textAlign: "right"
      }
    }, c.label);
  }), /*#__PURE__*/React.createElement("div", null)), pageItems.map(function (c, i) {
    var tot = contentTotals(c);
    return /*#__PURE__*/React.createElement("div", {
      key: c.id,
      onClick: function onClick() {
        return onOpen && onOpen(c.id);
      },
      style: {
        display: "grid",
        gridTemplateColumns: "56px minmax(180px,1.25fr) repeat(3, minmax(92px,1fr)) minmax(64px,0.7fr) 72px",
        padding: "14px 22px",
        alignItems: "center",
        cursor: "pointer",
        borderBottom: i === pageItems.length - 1 ? "none" : "0.5px solid " + t.line
      },
      onMouseEnter: function onMouseEnter(e) {
        return e.currentTarget.style.background = t.surfaceAlt;
      },
      onMouseLeave: function onMouseLeave(e) {
        return e.currentTarget.style.background = "transparent";
      }
    }, /*#__PURE__*/React.createElement(PerfPoster, {
      c: c,
      size: 40
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 15,
        fontWeight: 500,
        letterSpacing: -0.2,
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap"
      }
    }, c.title)), cols.map(function (col) {
      return /*#__PURE__*/React.createElement("div", {
        key: col.key,
        style: {
          textAlign: "right",
          fontFamily: t.mono,
          fontSize: 14,
          fontWeight: 600,
          color: tot[col.key] == null ? t.inkFaint : t.ink,
          fontVariantNumeric: "tabular-nums"
        }
      }, tot[col.key] == null ? "-" : compact(tot[col.key]));
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        justifyContent: "flex-end"
      }
    }, /*#__PURE__*/React.createElement(Chevron, {
      dir: "right",
      color: t.inkFaint
    })));
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 20,
      padding: "14px 18px",
      background: t.surfaceAlt,
      borderRadius: 10,
      fontSize: 12,
      color: t.inkMute,
      lineHeight: 1.6,
      display: "flex",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: t.mono,
      fontSize: 10,
      color: t.inkFaint,
      border: "0.5px solid " + t.lineStrong,
      padding: "0 7px",
      borderRadius: 999,
      height: 18,
      lineHeight: "18px",
      alignSelf: "flex-start",
      letterSpacing: 0.4
    }
  }, "NOTE"), /*#__PURE__*/React.createElement("div", null, "\uBAA8\uB4E0 \uC9C0\uD45C\uB294 ", /*#__PURE__*/React.createElement("strong", {
    style: {
      color: t.ink,
      fontWeight: 600
    }
  }, "\uB204\uC801\uAC12"), " \uAE30\uC900\uC785\uB2C8\uB2E4.")), totalPages > 1 && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 4,
      minHeight: 34,
      marginTop: 34
    }
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    disabled: currentPage === 1,
    onClick: function onClick() {
      return setPage(Math.max(1, currentPage - 1));
    },
    style: perfPageButtonStyle(t, false, currentPage === 1),
    "aria-label": "이전 페이지"
  }, "\u2039"), Array.from({
    length: totalPages
  }, function (_, index) {
    var nextPage = index + 1;
    return /*#__PURE__*/React.createElement("button", {
      key: nextPage,
      type: "button",
      onClick: function onClick() {
        return setPage(nextPage);
      },
      style: perfPageButtonStyle(t, nextPage === currentPage, false),
      "aria-label": nextPage + "\uD398\uC774\uC9C0",
      "aria-current": nextPage === currentPage ? "page" : undefined
    }, nextPage);
  }), /*#__PURE__*/React.createElement("button", {
    type: "button",
    disabled: currentPage === totalPages,
    onClick: function onClick() {
      return setPage(Math.min(totalPages, currentPage + 1));
    },
    style: perfPageButtonStyle(t, false, currentPage === totalPages),
    "aria-label": "다음 페이지"
  }, "\u203A"))));
};
