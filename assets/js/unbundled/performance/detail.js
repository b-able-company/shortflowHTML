// 퍼포먼스 콘텐츠 상세 — 정산 상세(아코디언) 레이아웃 기반.
// 헤더: 포스터 + 제목(릴리즈 우측) + 플랫폼 합산 누적 타일.
// 본문: 플랫폼별 펼침 행 — 접힘=대표 지표, 펼침=4지표 전체(누적값).
// performance-clean.jsx(PerfTopNav) + performance-data.jsx 헬퍼에 의존.

// ── 헤더 타일 ────────────────────────────────────────────────
function PerfTile(_ref) {
  var label = _ref.label,
    value = _ref.value,
    full = _ref.full,
    t = _ref.t;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: t.surface,
      border: "0.5px solid ".concat(t.line),
      borderRadius: 12,
      padding: '14px 18px',
      flex: 1,
      minWidth: 0,
      display: 'flex',
      flexDirection: 'column',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: t.inkMute,
      letterSpacing: 0.4,
      textTransform: 'uppercase',
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
      fontVariantNumeric: 'tabular-nums',
      lineHeight: 1.1
    }
  }, value == null ? '—' : compact(value)), value != null && full && /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: t.mono,
      fontSize: 11,
      color: t.inkFaint,
      fontVariantNumeric: 'tabular-nums'
    }
  }, fullNum(value)));
}
function PerfMetaCell(_ref2) {
  var label = _ref2.label,
    value = _ref2.value,
    last = _ref2.last,
    t = _ref2.t;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
      paddingRight: last ? 0 : 18,
      marginRight: last ? 0 : 18,
      borderRight: last ? 'none' : "0.5px solid ".concat(t.line)
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 10,
      color: t.inkMute,
      letterSpacing: 0.4,
      textTransform: 'uppercase',
      fontWeight: 700
    }
  }, label), /*#__PURE__*/React.createElement("span", {
    style: {
      color: t.ink,
      fontSize: 12
    }
  }, value));
}

// ── 플랫폼 행 (항상 펼침 — 데이터가 적어 접지 않음) ─────────────
function PerfPlatformRow(_ref3) {
  var p = _ref3.p,
    _ref3$t = _ref3.t,
    t = _ref3$t === void 0 ? BASE_TOKENS : _ref3$t;
  var has = platformHasAny(p);
  var present = presentMetrics(p);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: t.surface,
      border: "0.5px solid ".concat(t.line),
      borderRadius: 14,
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '16px 20px',
      display: 'flex',
      alignItems: 'center',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 17,
      fontWeight: 700,
      letterSpacing: -0.3,
      color: t.ink
    }
  }, p.name), has ? /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      padding: '3px 9px',
      borderRadius: 6,
      background: t.surfaceAlt,
      color: t.inkMute,
      fontFamily: t.sans,
      fontSize: 11,
      fontWeight: 600,
      letterSpacing: 0.2
    }
  }, "\uC9C0\uD45C ", present.length, "/4") : /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      padding: '3px 9px',
      borderRadius: 6,
      background: t.surfaceAlt,
      color: t.inkMute,
      border: "0.5px dashed ".concat(t.lineStrong),
      fontFamily: t.sans,
      fontSize: 11,
      fontWeight: 600,
      letterSpacing: 0.2
    }
  }, "\uB370\uC774\uD130 \uBBF8\uC81C\uACF5"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginLeft: 'auto',
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 10,
      color: t.inkMute,
      letterSpacing: 0.4,
      textTransform: 'uppercase',
      fontWeight: 700
    }
  }, "\uCD9C\uC2DC\uC77C"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: t.mono,
      fontSize: 12,
      color: t.ink,
      fontVariantNumeric: 'tabular-nums'
    }
  }, p.releaseDate || '—'))), /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: "0.5px solid ".concat(t.line)
    }
  }, !has ? /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '24px 20px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
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
  }, "\u2014"), "\uC774 \uD50C\uB7AB\uD3FC\uC740 \uC9C0\uD45C\uB97C \uC81C\uACF5\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4") : /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)'
    }
  }, METRIC_ORDER.map(function (m, i) {
    var v = p[m.key];
    return /*#__PURE__*/React.createElement("div", {
      key: m.key,
      style: {
        padding: '18px 20px',
        borderRight: i < 3 ? "0.5px solid ".concat(t.line) : 'none'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 10.5,
        color: t.inkMute,
        fontWeight: 700,
        letterSpacing: 0.4,
        textTransform: 'uppercase',
        marginBottom: 8
      }
    }, m.label), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: t.mono,
        fontSize: 22,
        fontWeight: 700,
        letterSpacing: -0.5,
        color: v == null ? t.inkFaint : t.ink,
        fontVariantNumeric: 'tabular-nums',
        lineHeight: 1
      }
    }, v == null ? '미제공' : compact(v)), v != null && /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: t.mono,
        fontSize: 11,
        color: t.inkFaint,
        marginTop: 5,
        fontVariantNumeric: 'tabular-nums'
      }
    }, fullNum(v)));
  }))));
}

// ── 화면 ─────────────────────────────────────────────────────
function PerfDetailAccordion(_ref4) {
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
      padding: '32px 64px 80px',
      maxWidth: 1280
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: onBack,
    style: {
      background: 'transparent',
      border: 'none',
      padding: 0,
      cursor: 'pointer',
      display: 'inline-flex',
      alignItems: 'center',
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
  }), "\uD37C\uD3EC\uBA3C\uC2A4 \uB300\uC2DC\uBCF4\uB4DC"), /*#__PURE__*/React.createElement("section", {
    style: {
      display: 'flex',
      gap: 22,
      alignItems: 'flex-start',
      marginBottom: 36
    }
  }, /*#__PURE__*/React.createElement(Poster, {
    tone: c.posterTone,
    size: 120,
    label: "\uBA54\uC778"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0,
      paddingTop: 2
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      gap: 20
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      letterSpacing: 0.6,
      color: t.inkMute,
      fontFamily: t.mono,
      textTransform: 'uppercase',
      marginBottom: 8
    }
  }, "\uCF58\uD150\uCE20"), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontSize: 26,
      fontWeight: 700,
      letterSpacing: -0.6,
      margin: 0,
      lineHeight: 1.15,
      color: t.ink
    }
  }, c.title)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
      flexShrink: 0,
      padding: '6px 10px',
      borderRadius: 8,
      background: t.surfaceAlt,
      fontSize: 12,
      color: t.inkMute
    }
  }, /*#__PURE__*/React.createElement("span", null, "\uCD5C\uCD08 \uB9B4\uB9AC\uC988"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: t.mono,
      color: t.ink,
      fontWeight: 500,
      fontVariantNumeric: 'tabular-nums'
    }
  }, firstReleaseDate(c.platforms)), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11,
      color: t.inkFaint
    }
  }, "\uAC00\uC7A5 \uBE60\uB978 \uD50C\uB7AB\uD3FC \uAE30\uC900"))), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      letterSpacing: 0.6,
      color: t.inkMute,
      fontFamily: t.mono,
      textTransform: 'uppercase',
      margin: '20px 0 10px'
    }
  }, "\uD50C\uB7AB\uD3FC \uD569\uC0B0 \uB204\uC801 (\uC81C\uACF5 \uC9C0\uD45C \uAE30\uC900)"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10
    }
  }, tiles.length > 0 ? tiles.map(function (m) {
    return /*#__PURE__*/React.createElement(PerfTile, {
      key: m.key,
      label: "\uB204\uC801 ".concat(m.label),
      value: tot[m.key],
      full: true,
      t: t
    });
  }) : /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      padding: '18px',
      borderRadius: 12,
      background: t.surfaceAlt,
      color: t.inkMute,
      fontSize: 13
    }
  }, "\uC544\uC9C1 \uC81C\uACF5\uB41C \uC9C0\uD45C\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4.")))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 14,
      paddingBottom: 12,
      borderBottom: "0.5px solid ".concat(t.line)
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      letterSpacing: 0.6,
      color: t.inkMute,
      fontFamily: t.mono,
      textTransform: 'uppercase',
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
      display: 'flex',
      flexDirection: 'column',
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
  }, "\uBBF8\uC81C\uACF5"), "\uC73C\uB85C \uB098\uD0C0\uB0C5\uB2C8\uB2E4."))));
}
Object.assign(window, {
  PerfDetailAccordion: PerfDetailAccordion,
  PerfPlatformRow: PerfPlatformRow,
  PerfTile: PerfTile
});
