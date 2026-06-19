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
// 새 콘텐츠 등록 — 공용 폼 섹션/헬퍼 (렌더 없음)
// nc-web.jsx (단일 페이지) 와 nc-web-explore.jsx (시안 캔버스) 가 함께 사용.
// 의존: nc-fields(Field·TextInput…·ACCENT) · nc-data(ENUMS·GENRES…) · nc-translations(MultiLangEditor·*_FIELDS)

function webContentGroups(form) {
  var license = [{
    key: 'coProduction',
    label: '유통권 보유 형태',
    kind: 'seg',
    enumKey: 'coProduction',
    cols: 12
  }, {
    key: 'licenseType',
    label: '라이선스 유형',
    kind: 'seg',
    enumKey: 'licenseType',
    cols: 6
  }, {
    key: 'licenseTerritory',
    label: '라이선스 가능 지역',
    kind: 'seg',
    enumKey: 'licenseTerritory',
    cols: 6
  }, {
    key: 'distributionHistory',
    label: '유통 이력',
    kind: 'choice',
    enumKey: 'distributionHistory',
    cols: 12,
    hint: '기존 공개 여부'
  }];
  if (form.distributionHistory === 'NEW') {
    license.push({
      key: 'desiredReleaseDate',
      label: '희망 릴리즈 일정',
      kind: 'text',
      cols: 12,
      ph: '예: 2026년 7월, 3분기, 협의 가능',
      hint: '공개 희망 시점'
    });
  }
  if (form.distributionHistory === 'RELEASED') {
    license.push({
      key: 'exclusive',
      label: '독점 여부',
      kind: 'toggle',
      cols: 12
    });
    license.push({
      key: 'previousReleases',
      label: '기존 유통 플랫폼',
      kind: 'text',
      cols: 12,
      ph: '예: YouTube, TikTok',
      hint: '공개됐던 플랫폼'
    });
  }
  return [{
    title: '작품 기본 정보',
    fields: [{
      key: 'productionStatus',
      label: '제작 상태',
      kind: 'seg',
      enumKey: 'productionStatus',
      cols: 12,
      hint: '제작 상태에 따라 필수 항목이 달라집니다.'
    }, {
      key: 'originalTitle',
      label: '원제',
      kind: 'text',
      cols: 12,
      required: true,
      ph: '작품 원제'
    }, {
      key: 'title',
      label: '제목',
      kind: 'text',
      source: 'translation',
      cols: 12,
      required: true,
      ph: '언어별 제목',
      hint: '현재 사이트 언어로 표시되는 제목입니다. 원제와 언어가 다른 경우 번역 제목을 입력해주세요.'
    }, {
      key: 'logline',
      label: '로그라인',
      kind: 'text',
      source: 'translation',
      cols: 12,
      ph: '한 줄 소개'
    }, {
      key: 'synopsis',
      label: '시놉시스',
      kind: 'area',
      source: 'translation',
      rows: 4,
      cols: 12,
      ph: '줄거리'
    }, {
      key: 'characterDescription',
      label: '인물 소개',
      kind: 'area',
      source: 'translation',
      rows: 3,
      cols: 12,
      ph: '주요 인물 설명'
    }, {
      key: 'director',
      label: '감독',
      kind: 'text',
      source: 'crew',
      cols: 6
    }, {
      key: 'writer',
      label: '작가',
      kind: 'text',
      source: 'crew',
      cols: 6
    }, {
      key: 'cast',
      label: '출연진',
      kind: 'text',
      source: 'crew',
      cols: 12,
      ph: '주연 · 조연'
    }, {
      key: 'genreCodes',
      label: '장르',
      kind: 'chips',
      cols: 12,
      hint: '복수 선택'
    }]
  }, {
    title: '제작 정보',
    fields: [{
      key: 'mediaCategory',
      label: '미디어 카테고리',
      kind: 'seg',
      enumKey: 'mediaCategory',
      cols: 6
    }, {
      key: 'productionYear',
      label: '제작연도',
      kind: 'num',
      suffix: '년',
      cols: 6
    }, {
      key: 'isAiGenerated',
      label: 'AI 생성 콘텐츠 여부',
      kind: 'checkbox',
      cols: 6,
      required: false,
      hint: '생성형 AI로 영상 또는 주요 이미지를 제작한 경우 체크해주세요.'
    }, {
      key: 'contentLanguage',
      label: '콘텐츠 언어',
      kind: 'seg',
      enumKey: 'contentLanguage',
      hint: '원본 언어',
      cols: 6,
      divider: true
    }, {
      key: 'episodes',
      label: '총 회차 수',
      kind: 'num',
      suffix: '화',
      cols: 4
    }, {
      key: 'runtime',
      label: '회차당 러닝타임',
      kind: 'text',
      ph: '예: 1~3분, 90초',
      cols: 4,
      divider: true
    }, {
      key: 'totalRuntime',
      label: '총 러닝타임 (분)',
      kind: 'num',
      cols: 4,
      divider: true
    }]
  }, {
    title: '라이선스 · 유통',
    fields: license
  }, {
    title: '공개 · 등급',
    fields: [{
      key: 'startPoint',
      label: '유료 시청 시작 회차',
      kind: 'num',
      suffix: '화부터',
      hint: '이 회차부터 유료',
      cols: 6
    }, {
      key: 'contentType',
      label: '콘텐츠 유형',
      kind: 'seg',
      enumKey: 'contentType',
      cols: 6
    }, {
      key: 'ageRating',
      label: '영상 등급',
      kind: 'seg',
      enumKey: 'ageRating',
      cols: 12
    }]
  }];
}
function WebControl(_ref) {
  var f = _ref.f,
    form = _ref.form,
    set = _ref.set,
    setLangItem = _ref.setLangItem,
    activeLanguage = _ref.activeLanguage,
    translation = _ref.translation,
    crew = _ref.crew,
    t = _ref.t;
  var source = f.source || 'form';
  var data = source === 'translation' ? translation : source === 'crew' ? crew : form;
  var v = data[f.key];
  var change = function change(x) {
    if (source === 'translation') return setLangItem('translations', activeLanguage, f.key, x);
    if (source === 'crew') return setLangItem('crew', activeLanguage, f.key, x);
    return set(f.key, x);
  };
  switch (f.kind) {
    case 'text':
      return /*#__PURE__*/React.createElement(TextInput, {
        value: v,
        onChange: change,
        placeholder: f.ph,
        t: t
      });
    case 'area':
      return /*#__PURE__*/React.createElement(TextArea, {
        value: v,
        onChange: change,
        placeholder: f.ph,
        rows: f.rows || 3,
        t: t
      });
    case 'num':
      return /*#__PURE__*/React.createElement(NumberInput, {
        value: v,
        onChange: change,
        suffix: f.suffix,
        t: t
      });
    case 'seg':
      return /*#__PURE__*/React.createElement(SelectMenu, {
        options: ENUMS[f.enumKey],
        value: v,
        onChange: change,
        t: t,
        placeholder: "\uC120\uD0DD"
      });
    case 'status':
      return /*#__PURE__*/React.createElement("div", {
        style: {
          minHeight: 36,
          display: 'flex',
          alignItems: 'center'
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          display: 'flex',
          gap: 4,
          background: t.surface,
          border: "0.5px solid ".concat(t.line),
          borderRadius: 9,
          padding: 3
        }
      }, ENUMS.productionStatus.map(function (option) {
        var selected = v === option.v;
        return /*#__PURE__*/React.createElement("button", {
          key: option.v,
          onClick: function onClick() {
            return change(option.v);
          },
          style: {
            border: 'none',
            cursor: 'pointer',
            borderRadius: 6,
            padding: '7px 14px',
            background: selected ? '#25272B' : 'transparent',
            color: selected ? '#FFFFFF' : t.inkMute,
            fontFamily: t.sans,
            fontSize: 13,
            fontWeight: selected ? 700 : 500,
            whiteSpace: 'nowrap'
          }
        }, option.label);
      })));
    case 'choice':
      return /*#__PURE__*/React.createElement(InlineRadioChoice, {
        options: ENUMS[f.enumKey],
        value: v,
        onChange: change,
        t: t
      });
    case 'checkbox':
      return /*#__PURE__*/React.createElement("label", {
        style: {
          minHeight: 36,
          display: 'inline-flex',
          alignItems: 'center',
          gap: 9,
          cursor: 'pointer',
          fontFamily: t.sans,
          fontSize: 13,
          color: t.ink
        }
      }, /*#__PURE__*/React.createElement("input", {
        type: "checkbox",
        checked: Boolean(v),
        onChange: function onChange(event) {
          return change(event.target.checked);
        },
        style: {
          width: 16,
          height: 16,
          margin: 0,
          accentColor: ACCENT,
          cursor: 'pointer'
        }
      }));
    case 'chips':
      return /*#__PURE__*/React.createElement(ChipMulti, {
        options: GENRES,
        value: v,
        onChange: change,
        t: t
      });
    case 'date':
      return /*#__PURE__*/React.createElement(DateInput, {
        value: v,
        onChange: change,
        t: t
      });
    case 'toggle':
      return /*#__PURE__*/React.createElement(SelectMenu, {
        options: [{
          v: true,
          label: '독점'
        }, {
          v: false,
          label: '비독점'
        }],
        value: v,
        onChange: change,
        t: t,
        placeholder: "\uC120\uD0DD"
      });
    case 'tags':
      return /*#__PURE__*/React.createElement(TagInput, {
        value: v || [],
        onChange: change,
        suggestions: PLATFORM_SUGGEST,
        placeholder: "\uD50C\uB7AB\uD3FC \uC785\uB825 \uD6C4 Enter",
        t: t
      });
    default:
      return null;
  }
}
function GroupHead(_ref2) {
  var title = _ref2.title,
    t = _ref2.t,
    flush = _ref2.flush;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 9,
      marginBottom: flush ? 0 : 12
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 6,
      height: 6,
      borderRadius: 999,
      background: ACCENT,
      flexShrink: 0
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: t.sans,
      fontSize: 12.5,
      fontWeight: 700,
      letterSpacing: 0.4,
      color: t.inkMute,
      whiteSpace: 'nowrap'
    }
  }, title));
}
function SubHead(_ref3) {
  var title = _ref3.title,
    desc = _ref3.desc,
    t = _ref3.t;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      margin: '34px 0 20px',
      paddingTop: 26,
      borderTop: "0.5px solid ".concat(t.line)
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: t.sans,
      fontSize: 15,
      fontWeight: 700,
      color: t.ink,
      letterSpacing: -0.2
    }
  }, title), desc && /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: t.sans,
      fontSize: 12.5,
      color: t.inkMute,
      marginTop: 4
    }
  }, desc));
}

// 컨트롤을 제 너비만큼만 — 숫자 좁게, 텍스트 적당히, 세그먼트·칩·태그는 풀폭
function ControlCap(_ref4) {
  var kind = _ref4.kind,
    children = _ref4.children;
  var cap = {
    date: 200
  }[kind];
  return cap ? /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: cap
    }
  }, children) : children;
}

// 한 행 최대 두 필드. 각 필드는 라벨 왼쪽, 입력 오른쪽으로 읽힌다.
function RowField(_ref5) {
  var label = _ref5.label,
    hint = _ref5.hint,
    required = _ref5.required,
    _ref5$cols = _ref5.cols,
    cols = _ref5$cols === void 0 ? 6 : _ref5$cols,
    _ref5$inset = _ref5.inset,
    inset = _ref5$inset === void 0 ? false : _ref5$inset,
    _ref5$strongDivider = _ref5.strongDivider,
    strongDivider = _ref5$strongDivider === void 0 ? false : _ref5$strongDivider,
    _ref5$roomy = _ref5.roomy,
    roomy = _ref5$roomy === void 0 ? false : _ref5$roomy,
    t = _ref5.t,
    children = _ref5.children;
  var _React$useState = React.useState(false),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    hintOpen = _React$useState2[0],
    setHintOpen = _React$useState2[1];
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
      borderLeft: inset ? "".concat(strongDivider ? 1 : 0.5, "px solid ").concat(t.line) : 'none'
    }
  }, /*#__PURE__*/React.createElement("div", {
    onMouseEnter: function onMouseEnter() {
      return hint && setHintOpen(true);
    },
    onMouseLeave: function onMouseLeave() {
      return setHintOpen(false);
    },
    style: {
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'flex-start',
      gap: 2,
      minWidth: 0,
      alignSelf: 'stretch',
      minHeight: roomy ? 88 : 36,
      background: '#F7F7F4',
      borderRadius: 0,
      padding: '0 10px',
      borderRight: "0.5px solid ".concat(t.line),
      cursor: 'default'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 5,
      minWidth: 0
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
  }, label), required && /*#__PURE__*/React.createElement("span", {
    style: {
      color: ACCENT,
      fontSize: 12,
      fontWeight: 700
    }
  }, "*"), hint && /*#__PURE__*/React.createElement("span", {
    "aria-label": hint,
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: 14,
      height: 14,
      borderRadius: 999,
      border: "0.5px solid ".concat(t.lineStrong),
      color: '#9A9DA3',
      fontFamily: t.sans,
      fontSize: 10,
      fontWeight: 700,
      lineHeight: 1
    }
  }, "?")), hint && hintOpen && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 10,
      top: 'calc(100% + 6px)',
      zIndex: 100,
      width: 'max-content',
      maxWidth: 220,
      padding: '8px 10px',
      borderRadius: 7,
      background: '#2B2D31',
      color: '#FFFFFF',
      boxShadow: '0 10px 26px rgba(0,0,0,0.18)',
      fontFamily: t.sans,
      fontSize: 11.5,
      fontWeight: 600,
      lineHeight: 1.45,
      whiteSpace: 'normal',
      pointerEvents: 'none'
    }
  }, hint)), /*#__PURE__*/React.createElement("div", {
    style: {
      minWidth: 0,
      padding: roomy ? '12px 10px' : '0 10px'
    }
  }, children));
}
function fieldCols(f) {
  return f.cols || (f.span === 2 ? 12 : 6);
}
function fieldStartsRow(fields, index) {
  var used = fields.slice(0, index).reduce(function (sum, f) {
    return sum + fieldCols(f);
  }, 0);
  return used % 12 === 0;
}
function WebBasicSection(_ref6) {
  var form = _ref6.form,
    set = _ref6.set,
    setLangItem = _ref6.setLangItem,
    baseLanguage = _ref6.baseLanguage,
    onAiUpload = _ref6.onAiUpload,
    t = _ref6.t;
  var activeLanguage = baseLanguage || LANG_LIST[0];
  var translation = form.translations.find(function (x) {
    return x.language === activeLanguage;
  }) || {};
  var crew = form.crew.find(function (x) {
    return x.language === activeLanguage;
  }) || {};
  var groups = webContentGroups(form);
  return /*#__PURE__*/React.createElement(SectionCard, {
    id: "sec-basic",
    title: "\uCF58\uD150\uCE20 \uC815\uBCF4",
    desc: null,
    t: t
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 32
    }
  }, groups.map(function (g) {
    return /*#__PURE__*/React.createElement("div", {
      key: g.title,
      style: {
        padding: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        marginBottom: 12
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1
      }
    }, /*#__PURE__*/React.createElement(GroupHead, {
      title: g.title,
      t: t,
      flush: true
    })), g.title === '작품 기본 정보' && /*#__PURE__*/React.createElement("button", {
      onClick: onAiUpload,
      onMouseEnter: function onMouseEnter(e) {
        e.currentTarget.style.borderColor = '#D9A38E';
        e.currentTarget.style.background = '#FFF9F6';
      },
      onMouseLeave: function onMouseLeave(e) {
        e.currentTarget.style.borderColor = t.lineStrong;
        e.currentTarget.style.background = t.surface;
      },
      style: {
        height: 34,
        padding: '0 13px',
        borderRadius: 9,
        border: "0.5px solid ".concat(t.lineStrong),
        background: t.surface,
        color: '#34363B',
        cursor: 'pointer',
        fontFamily: t.sans,
        fontSize: 13,
        fontWeight: 650,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 7,
        flexShrink: 0,
        transition: 'background 140ms ease, border-color 140ms ease'
      }
    }, "AI \uC790\uB3D9 \uCD94\uCD9C")), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: 'repeat(12, minmax(0, 1fr))',
        gap: 0,
        borderLeft: "0.5px solid ".concat(t.line),
        borderRight: "0.5px solid ".concat(t.line),
        borderBottom: "0.5px solid ".concat(t.line)
      }
    }, g.fields.map(function (f, fi) {
      var cols = fieldCols(f);
      var inset = f.divider || cols < 12 && !fieldStartsRow(g.fields, fi);
      var roomy = f.kind === 'chips' || f.kind === 'area';
      var optionalInPlanning = form.productionStatus === 'PLANNING' && ['director', 'writer', 'cast', 'ageRating'].includes(f.key);
      var required = f.required !== false && f.key !== 'startPoint' && !optionalInPlanning;
      return /*#__PURE__*/React.createElement(RowField, {
        key: "".concat(f.source || 'form', "-").concat(f.key),
        label: f.label,
        hint: f.hint,
        required: required,
        cols: cols,
        inset: inset,
        strongDivider: !!f.divider,
        roomy: roomy,
        t: t
      }, /*#__PURE__*/React.createElement(ControlCap, {
        kind: f.kind
      }, /*#__PURE__*/React.createElement(WebControl, {
        f: f,
        form: form,
        set: set,
        setLangItem: setLangItem,
        activeLanguage: activeLanguage,
        translation: translation,
        crew: crew,
        t: t
      })));
    })));
  })));
}

// 추가 메타는 콘텐츠 정보 단계로 흡수// 추가 메타는 콘텐츠 정보 단계로 흡수

// 언어별 자막 업로더 (영상은 언어 공용, 자막만 언어별)
function SubtitleByLang(_ref7) {
  var value = _ref7.value,
    _onChange = _ref7.onChange,
    langList = _ref7.langList,
    t = _ref7.t;
  var v = value || {};
  var ll = langList || LANG_LIST;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      border: "0.5px solid ".concat(t.line),
      borderRadius: 12,
      background: t.surfaceAlt,
      padding: '14px 16px',
      display: 'flex',
      flexDirection: 'column',
      gap: 13
    }
  }, ll.map(function (lg) {
    return /*#__PURE__*/React.createElement("div", {
      key: lg,
      style: {
        display: 'grid',
        gridTemplateColumns: '70px minmax(0, 1fr)',
        gap: 14,
        alignItems: 'start'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        marginTop: 6,
        justifySelf: 'start',
        fontFamily: t.sans,
        fontSize: 12.5,
        fontWeight: 700,
        color: t.ink,
        padding: '4px 11px',
        borderRadius: 7,
        background: t.surface,
        border: "0.5px solid ".concat(t.line)
      }
    }, LANG_SHORT[lg]), /*#__PURE__*/React.createElement(MediaUpload, {
      variant: "buttons",
      kind: "subtitle",
      multiple: true,
      max: 10,
      value: v[lg] || [],
      onChange: function onChange(x) {
        return _onChange(_objectSpread(_objectSpread({}, v), {}, _defineProperty({}, lg, x)));
      },
      placeholder: ".srt \xB7 .vtt \uD30C\uC77C \uC120\uD0DD",
      t: t
    }));
  }));
}
function SubLabel(_ref8) {
  var children = _ref8.children,
    hint = _ref8.hint,
    t = _ref8.t,
    _ref8$compact = _ref8.compact,
    compact = _ref8$compact === void 0 ? false : _ref8$compact;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      gap: 8,
      margin: compact ? '0 0 9px' : '14px 0 9px'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: t.sans,
      fontSize: 12.5,
      fontWeight: 700,
      color: t.ink
    }
  }, children), hint && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: t.sans,
      fontSize: 11,
      color: t.inkFaint
    }
  }, hint));
}
function WebMediaSection(_ref9) {
  var form = _ref9.form,
    set = _ref9.set,
    langList = _ref9.langList,
    t = _ref9.t;
  var ll = langList || LANG_LIST;
  var subtitleLang = ll[0] || LANG_LIST[0];
  var subtitleLabel = LANG_SHORT[subtitleLang] || subtitleLang;
  return /*#__PURE__*/React.createElement(SectionCard, {
    id: "sec-media",
    title: "\uBBF8\uB514\uC5B4",
    desc: null,
    t: t
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 32
    }
  }, /*#__PURE__*/React.createElement(Field, {
    label: "\uB300\uD45C \uC774\uBBF8\uC9C0",
    required: true,
    hint: "\uC138\uB85C \uD3EC\uC2A4\uD130 1\uC7A5",
    t: t
  }, /*#__PURE__*/React.createElement(MediaUpload, {
    variant: "dropzone",
    kind: "image",
    multiple: false,
    max: 1,
    value: form.mainImageKey,
    onChange: function onChange(v) {
      return set('mainImageKey', v);
    },
    placeholder: "\uB300\uD45C \uC774\uBBF8\uC9C0 \uC5C5\uB85C\uB4DC",
    t: t
  })), /*#__PURE__*/React.createElement(Field, {
    label: "\uAD00\uB828 \uC774\uBBF8\uC9C0",
    hint: "\uCD5C\uB300 10\uC7A5",
    t: t
  }, /*#__PURE__*/React.createElement(MediaUpload, {
    variant: "dropzone",
    kind: "image",
    multiple: true,
    max: 10,
    value: form.contentImageKeys,
    onChange: function onChange(v) {
      return set('contentImageKeys', v);
    },
    placeholder: "\uC2A4\uD2F8\uCEF7 \xB7 \uD0A4\uC544\uD2B8 \uC5C5\uB85C\uB4DC",
    t: t
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 18,
      border: "0.5px solid ".concat(t.line),
      borderRadius: 14,
      background: '#FCFCFA'
    }
  }, /*#__PURE__*/React.createElement(Field, {
    label: "\uD2F0\uC800 \uC601\uC0C1",
    hint: "\uCD5C\uB300 10\uAC1C",
    t: t
  }, /*#__PURE__*/React.createElement(MediaUpload, {
    variant: "dropzone",
    kind: "video",
    multiple: true,
    max: 10,
    value: form.teaserKeys,
    onChange: function onChange(v) {
      return set('teaserKeys', v);
    },
    placeholder: "\uD2F0\uC800 \uC601\uC0C1 \uC5C5\uB85C\uB4DC",
    t: t
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 22,
      paddingTop: 18,
      borderTop: "0.5px solid ".concat(t.line)
    }
  }, /*#__PURE__*/React.createElement(SubLabel, {
    compact: true,
    hint: "".concat(subtitleLabel, " \uC790\uB9C9 \uD30C\uC77C"),
    t: t
  }, "\uD2F0\uC800 \uC790\uB9C9"), /*#__PURE__*/React.createElement(SubtitleByLang, {
    value: form.teaserSubtitles,
    onChange: function onChange(v) {
      return set('teaserSubtitles', v);
    },
    langList: ll,
    t: t
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 18,
      border: "0.5px solid ".concat(t.line),
      borderRadius: 14,
      background: '#FCFCFA'
    }
  }, /*#__PURE__*/React.createElement(Field, {
    label: "\uBB34\uB8CC\uD68C\uCC28 \uC601\uC0C1",
    hint: "\uCD5C\uB300 10\uAC1C",
    t: t
  }, /*#__PURE__*/React.createElement(MediaUpload, {
    variant: "dropzone",
    kind: "video",
    multiple: true,
    max: 10,
    value: form.freeEpisodeKeys,
    onChange: function onChange(v) {
      return set('freeEpisodeKeys', v);
    },
    placeholder: "\uBB34\uB8CC\uD68C\uCC28 \uC601\uC0C1 \uC5C5\uB85C\uB4DC",
    t: t
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 22,
      paddingTop: 18,
      borderTop: "0.5px solid ".concat(t.line)
    }
  }, /*#__PURE__*/React.createElement(SubLabel, {
    compact: true,
    hint: "".concat(subtitleLabel, " \uC790\uB9C9 \uD30C\uC77C"),
    t: t
  }, "\uBB34\uB8CC\uD68C\uCC28 \uC790\uB9C9"), /*#__PURE__*/React.createElement(SubtitleByLang, {
    value: form.freeEpisodeSubtitles,
    onChange: function onChange(v) {
      return set('freeEpisodeSubtitles', v);
    },
    langList: ll,
    t: t
  })))));
}
function reviewArr(v) {
  return Array.isArray(v) ? v : v ? [v] : [];
}
function ReviewRow(_ref0) {
  var label = _ref0.label,
    value = _ref0.value,
    _ref0$ok = _ref0.ok,
    ok = _ref0$ok === void 0 ? true : _ref0$ok,
    _ref0$required = _ref0.required,
    required = _ref0$required === void 0 ? false : _ref0$required,
    t = _ref0.t;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '160px minmax(0, 1fr)',
      minHeight: 38,
      borderTop: "0.5px solid ".concat(t.line)
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 6,
      padding: '0 10px',
      background: '#F7F7F4',
      borderRight: "0.5px solid ".concat(t.line),
      fontFamily: t.sans,
      fontSize: 12.5,
      fontWeight: 700,
      color: '#5F646D'
    }
  }, /*#__PURE__*/React.createElement("span", null, label), required && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      fontWeight: 700,
      color: ACCENT,
      flexShrink: 0
    }
  }, "*")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      padding: '0 10px',
      fontFamily: t.sans,
      fontSize: 13.5,
      fontWeight: ok ? 500 : 400,
      color: ok ? t.ink : t.inkFaint
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 16,
      height: 16,
      borderRadius: 999,
      flexShrink: 0,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: ok ? ACCENT : 'transparent',
      border: "1px solid ".concat(ok ? ACCENT : t.lineStrong),
      color: '#FFFFFF'
    }
  }, ok && /*#__PURE__*/React.createElement("svg", {
    width: "10",
    height: "10",
    viewBox: "0 0 12 12",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M2.5 6.2 5 8.5 9.5 3.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }))), /*#__PURE__*/React.createElement("span", null, value || '미입력')));
}
function ReviewGroup(_ref1) {
  var title = _ref1.title,
    children = _ref1.children,
    t = _ref1.t;
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(GroupHead, {
    title: title,
    t: t
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      borderLeft: "0.5px solid ".concat(t.line),
      borderRight: "0.5px solid ".concat(t.line),
      borderBottom: "0.5px solid ".concat(t.line)
    }
  }, children));
}
function WebReviewSection(_ref10) {
  var form = _ref10.form,
    baseLanguage = _ref10.baseLanguage,
    rightsConfirmed = _ref10.rightsConfirmed,
    onRightsChange = _ref10.onRightsChange,
    t = _ref10.t;
  var lang = baseLanguage || LANG_LIST[0];
  var langLabel = LANG_SHORT[lang] || lang;
  var tr = form.translations.find(function (x) {
    return x.language === lang;
  }) || {};
  var crew = form.crew.find(function (x) {
    return x.language === lang;
  }) || {};
  var mainImages = reviewArr(form.mainImageKey);
  var freeVideos = reviewArr(form.freeEpisodeKeys);
  var teaserVideos = reviewArr(form.teaserKeys);
  var contentImages = reviewArr(form.contentImageKeys);
  var freeSubs = reviewArr((form.freeEpisodeSubtitles || {})[lang]);
  var teaserSubs = reviewArr((form.teaserSubtitles || {})[lang]);
  var genreText = (form.genreCodes || []).map(function (c) {
    return genreLabel(c);
  }).join(' · ');
  var isPlanning = form.productionStatus === 'PLANNING';
  var distributionLabel = form.distributionHistory === 'NEW' ? '미유통 (신작)' : form.distributionHistory === 'RELEASED' ? '기유통' : '';
  return /*#__PURE__*/React.createElement(SectionCard, {
    id: "sec-review",
    title: "\uAC80\uD1A0 \uC694\uCCAD",
    desc: null,
    t: t
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 32
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '13px 16px',
      border: "0.5px solid ".concat(t.line),
      borderRadius: 10,
      background: '#F4F4F1',
      display: 'flex',
      alignItems: 'center',
      gap: 9
    }
  }, /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      width: 18,
      height: 18,
      borderRadius: 999,
      border: "1px solid ".concat(t.inkMute),
      color: t.inkMute,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
      fontFamily: t.sans,
      fontSize: 11,
      fontWeight: 700
    }
  }, "!"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: t.sans,
      fontSize: 13,
      fontWeight: 550,
      color: '#555A63',
      lineHeight: 1.5
    }
  }, "\uAC80\uD1A0 \uC694\uCCAD\uC744 \uC804\uC1A1\uD558\uAE30 \uC804\uC5D0 \uC785\uB825\uD55C \uB0B4\uC6A9\uC744 \uB9C8\uC9C0\uB9C9\uC73C\uB85C \uD655\uC778\uD574\uC8FC\uC138\uC694.")), /*#__PURE__*/React.createElement(ReviewGroup, {
    title: "\uC791\uD488 \uAE30\uBCF8 \uC815\uBCF4",
    t: t
  }, /*#__PURE__*/React.createElement(ReviewRow, {
    label: "\uC81C\uC791 \uC0C1\uD0DC",
    value: enumLabel('productionStatus', form.productionStatus),
    ok: !!form.productionStatus,
    required: true,
    t: t
  }), /*#__PURE__*/React.createElement(ReviewRow, {
    label: "\uC6D0\uC81C",
    value: form.originalTitle,
    ok: !!form.originalTitle,
    required: true,
    t: t
  }), /*#__PURE__*/React.createElement(ReviewRow, {
    label: "\uC81C\uBAA9",
    value: tr.title,
    ok: !!tr.title,
    required: true,
    t: t
  }), /*#__PURE__*/React.createElement(ReviewRow, {
    label: "\uB85C\uADF8\uB77C\uC778",
    value: tr.logline,
    ok: !!tr.logline,
    required: true,
    t: t
  }), /*#__PURE__*/React.createElement(ReviewRow, {
    label: "\uC2DC\uB189\uC2DC\uC2A4",
    value: tr.synopsis,
    ok: !!tr.synopsis,
    required: true,
    t: t
  }), /*#__PURE__*/React.createElement(ReviewRow, {
    label: "\uC778\uBB3C \uC18C\uAC1C",
    value: tr.characterDescription,
    ok: !!tr.characterDescription,
    required: true,
    t: t
  }), /*#__PURE__*/React.createElement(ReviewRow, {
    label: "\uAC10\uB3C5",
    value: crew.director,
    ok: isPlanning || !!crew.director,
    required: !isPlanning,
    t: t
  }), /*#__PURE__*/React.createElement(ReviewRow, {
    label: "\uC791\uAC00",
    value: crew.writer,
    ok: isPlanning || !!crew.writer,
    required: !isPlanning,
    t: t
  }), /*#__PURE__*/React.createElement(ReviewRow, {
    label: "\uCD9C\uC5F0\uC9C4",
    value: crew.cast,
    ok: isPlanning || !!crew.cast,
    required: !isPlanning,
    t: t
  }), /*#__PURE__*/React.createElement(ReviewRow, {
    label: "\uC7A5\uB974",
    value: genreText,
    ok: !!genreText,
    required: true,
    t: t
  })), /*#__PURE__*/React.createElement(ReviewGroup, {
    title: "\uC81C\uC791 \uC815\uBCF4",
    t: t
  }, /*#__PURE__*/React.createElement(ReviewRow, {
    label: "\uBBF8\uB514\uC5B4 \uCE74\uD14C\uACE0\uB9AC",
    value: enumLabel('mediaCategory', form.mediaCategory),
    ok: !!form.mediaCategory,
    required: true,
    t: t
  }), /*#__PURE__*/React.createElement(ReviewRow, {
    label: "\uC81C\uC791\uC5F0\uB3C4",
    value: form.productionYear ? "".concat(form.productionYear, "\uB144") : '',
    ok: !!form.productionYear,
    required: true,
    t: t
  }), /*#__PURE__*/React.createElement(ReviewRow, {
    label: "AI \uC0DD\uC131 \uCF58\uD150\uCE20 \uC5EC\uBD80",
    value: form.isAiGenerated ? '예' : '아니오',
    ok: true,
    t: t
  }), /*#__PURE__*/React.createElement(ReviewRow, {
    label: "\uCF58\uD150\uCE20 \uC5B8\uC5B4",
    value: enumLabel('contentLanguage', form.contentLanguage),
    ok: !!form.contentLanguage,
    required: true,
    t: t
  }), /*#__PURE__*/React.createElement(ReviewRow, {
    label: "\uCD1D \uD68C\uCC28 \uC218",
    value: form.episodes ? "".concat(form.episodes, "\uD654") : '',
    ok: !!form.episodes,
    required: true,
    t: t
  }), /*#__PURE__*/React.createElement(ReviewRow, {
    label: "\uD68C\uCC28\uB2F9 \uB7EC\uB2DD\uD0C0\uC784",
    value: form.runtime,
    ok: !!form.runtime,
    required: true,
    t: t
  }), /*#__PURE__*/React.createElement(ReviewRow, {
    label: "\uCD1D \uB7EC\uB2DD\uD0C0\uC784 (\uBD84)",
    value: form.totalRuntime ? "".concat(form.totalRuntime, "\uBD84") : '',
    ok: !!form.totalRuntime,
    required: true,
    t: t
  })), /*#__PURE__*/React.createElement(ReviewGroup, {
    title: "\uB77C\uC774\uC120\uC2A4 \xB7 \uC720\uD1B5",
    t: t
  }, /*#__PURE__*/React.createElement(ReviewRow, {
    label: "\uC720\uD1B5\uAD8C \uBCF4\uC720 \uD615\uD0DC",
    value: enumLabel('coProduction', form.coProduction),
    ok: !!form.coProduction,
    required: true,
    t: t
  }), /*#__PURE__*/React.createElement(ReviewRow, {
    label: "\uB77C\uC774\uC120\uC2A4 \uC720\uD615",
    value: enumLabel('licenseType', form.licenseType),
    ok: !!form.licenseType,
    required: true,
    t: t
  }), /*#__PURE__*/React.createElement(ReviewRow, {
    label: "\uB77C\uC774\uC120\uC2A4 \uAC00\uB2A5 \uC9C0\uC5ED",
    value: enumLabel('licenseTerritory', form.licenseTerritory),
    ok: !!form.licenseTerritory,
    required: true,
    t: t
  }), /*#__PURE__*/React.createElement(ReviewRow, {
    label: "\uC720\uD1B5 \uC774\uB825",
    value: distributionLabel,
    ok: !!form.distributionHistory,
    required: true,
    t: t
  }), form.distributionHistory === 'NEW' && /*#__PURE__*/React.createElement(ReviewRow, {
    label: "\uD76C\uB9DD \uB9B4\uB9AC\uC988 \uC77C\uC815",
    value: form.desiredReleaseDate,
    ok: !!form.desiredReleaseDate,
    required: true,
    t: t
  }), form.distributionHistory === 'RELEASED' && /*#__PURE__*/React.createElement(ReviewRow, {
    label: "\uB3C5\uC810 \uC5EC\uBD80",
    value: form.exclusive ? '독점' : '비독점',
    ok: form.exclusive !== undefined && form.exclusive !== null,
    required: true,
    t: t
  }), form.distributionHistory === 'RELEASED' && /*#__PURE__*/React.createElement(ReviewRow, {
    label: "\uAE30\uC874 \uC720\uD1B5 \uD50C\uB7AB\uD3FC",
    value: form.previousReleases,
    ok: !!form.previousReleases,
    required: true,
    t: t
  })), /*#__PURE__*/React.createElement(ReviewGroup, {
    title: "\uACF5\uAC1C \xB7 \uB4F1\uAE09",
    t: t
  }, /*#__PURE__*/React.createElement(ReviewRow, {
    label: "\uC720\uB8CC \uC2DC\uCCAD \uC2DC\uC791 \uD68C\uCC28",
    value: form.startPoint ? "".concat(form.startPoint, "\uD654\uBD80\uD130") : '',
    ok: true,
    t: t
  }), /*#__PURE__*/React.createElement(ReviewRow, {
    label: "\uCF58\uD150\uCE20 \uC720\uD615",
    value: enumLabel('contentType', form.contentType),
    ok: !!form.contentType,
    required: true,
    t: t
  }), /*#__PURE__*/React.createElement(ReviewRow, {
    label: "\uC601\uC0C1 \uB4F1\uAE09",
    value: enumLabel('ageRating', form.ageRating),
    ok: isPlanning || !!form.ageRating,
    required: !isPlanning,
    t: t
  })), /*#__PURE__*/React.createElement(ReviewGroup, {
    title: "\uBBF8\uB514\uC5B4",
    t: t
  }, /*#__PURE__*/React.createElement(ReviewRow, {
    label: "\uB300\uD45C \uC774\uBBF8\uC9C0",
    value: mainImages.length ? "".concat(mainImages.length, "\uC7A5") : '',
    ok: mainImages.length > 0,
    required: true,
    t: t
  }), /*#__PURE__*/React.createElement(ReviewRow, {
    label: "\uBB34\uB8CC\uD68C\uCC28 \uC601\uC0C1",
    value: "".concat(freeVideos.length, "\uAC1C"),
    ok: freeVideos.length > 0,
    t: t
  }), /*#__PURE__*/React.createElement(ReviewRow, {
    label: "\uBB34\uB8CC\uD68C\uCC28 \uC790\uB9C9",
    value: "".concat(freeSubs.length, "\uAC1C"),
    ok: freeSubs.length > 0,
    t: t
  }), /*#__PURE__*/React.createElement(ReviewRow, {
    label: "\uD2F0\uC800 \uC601\uC0C1",
    value: "".concat(teaserVideos.length, "\uAC1C"),
    ok: teaserVideos.length > 0,
    t: t
  }), /*#__PURE__*/React.createElement(ReviewRow, {
    label: "\uD2F0\uC800 \uC790\uB9C9",
    value: "".concat(teaserSubs.length, "\uAC1C"),
    ok: teaserSubs.length > 0,
    t: t
  }), /*#__PURE__*/React.createElement(ReviewRow, {
    label: "\uAD00\uB828 \uC774\uBBF8\uC9C0",
    value: "".concat(contentImages.length, "\uC7A5"),
    ok: contentImages.length > 0,
    t: t
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '20px 22px',
      border: "0.5px solid ".concat(t.line),
      borderRadius: 12,
      background: t.surface
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '0 0 7px',
      fontFamily: t.sans,
      fontSize: 13.5,
      color: '#555A63',
      fontWeight: 450,
      lineHeight: 1.65
    }
  }, "\uB2F9\uC0AC\uB294 \uD574\uB2F9 \uC791\uD488\uC758 \uC800\uC791\uAD8C\uC790 \uB610\uB294 \uC801\uBC95\uD55C \uAD8C\uB9AC\uC790\uC774\uBA70, \uC791\uD488\uC744 \uC774\uC6A9\uD5C8\uB77D\uD560 \uC218 \uC788\uB294 \uAD8C\uD55C\uC744 \uBCF4\uC720\uD558\uACE0 \uC788\uC74C\uC744 \uBCF4\uC99D\uD569\uB2C8\uB2E4."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: t.sans,
      fontSize: 13.5,
      color: '#555A63',
      fontWeight: 450,
      lineHeight: 1.65
    }
  }, "\uB610\uD55C \uC774\uB97C \uC785\uC99D\uD560 \uC790\uB8CC\uB97C \uC81C\uCD9C\uD560 \uC218 \uC788\uC74C\uC744 \uD655\uC778\uD569\uB2C8\uB2E4."), /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
      marginLeft: 'auto',
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    checked: rightsConfirmed,
    onChange: function onChange(event) {
      return onRightsChange(event.target.checked);
    },
    style: {
      width: 16,
      height: 16,
      margin: 0,
      accentColor: ACCENT,
      cursor: 'pointer'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: t.sans,
      fontSize: 12.5,
      color: t.ink,
      fontWeight: 600
    }
  }, "\uC704 \uB0B4\uC6A9\uC744 \uD655\uC778\uD558\uACE0 \uB3D9\uC758\uD569\uB2C8\uB2E4."))))));
}
function WebPageHeader(_ref11) {
  var t = _ref11.t,
    compact = _ref11.compact;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: compact ? 16 : 22
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
      marginBottom: 12,
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
  })), "\uCF58\uD150\uCE20 \uBAA9\uB85D"), /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: 0,
      fontFamily: t.sans,
      fontSize: 28,
      fontWeight: 700,
      letterSpacing: -0.7,
      color: t.ink
    }
  }, "\uC0C8 \uCF58\uD150\uCE20 \uB4F1\uB85D"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: t.sans,
      fontSize: 13.5,
      color: t.inkMute,
      marginTop: 6,
      lineHeight: 1.5
    }
  }, "\uC791\uD488 \uC815\uBCF4\uB97C \uC785\uB825\uD558\uACE0 \uAC80\uD1A0\uB97C \uC694\uCCAD\uD558\uC138\uC694. \uC785\uB825 \uB0B4\uC6A9\uC740 \uC784\uC2DC\uC800\uC7A5\uC73C\uB85C \uBCF4\uAD00\uB429\uB2C8\uB2E4."));
}
function nowHHMM() {
  var d = new Date();
  return "".concat(String(d.getHours()).padStart(2, '0'), ":").concat(String(d.getMinutes()).padStart(2, '0'));
}

// 진행 상황 계산 (시안 공용)
function webSections(form, baseLanguage) {
  var tr = form.translations.find(function (x) {
    return x.language === baseLanguage;
  }) || {};
  return [{
    id: 'sec-basic',
    label: '콘텐츠 정보',
    done: !!(form.originalTitle || '').trim() && !!(tr.title || '').trim()
  }, {
    id: 'sec-media',
    label: '미디어',
    done: !!form.mainImageKey
  }, {
    id: 'sec-review',
    label: '검토 요청',
    done: !!(form.originalTitle || '').trim() && !!(tr.title || '').trim() && !!form.mainImageKey
  }];
}
Object.assign(window, {
  webContentGroups: webContentGroups,
  WebControl: WebControl,
  GroupHead: GroupHead,
  SubHead: SubHead,
  WebBasicSection: WebBasicSection,
  WebMediaSection: WebMediaSection,
  WebReviewSection: WebReviewSection,
  SubtitleByLang: SubtitleByLang,
  SubLabel: SubLabel,
  WebPageHeader: WebPageHeader,
  nowHHMM: nowHHMM,
  webSections: webSections
});
