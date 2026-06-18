var _excluded = ["variant"];
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
// 새 콘텐츠 생성 — 미디어 업로드 (2시안: 드롭존 / 버튼 리스트)
// 목업이므로 '파일 선택' 클릭 시 가짜 파일을 추가. value = [{id,name}] 배열.

var _fid = 100;
function fakeFile(kind) {
  _fid += 1;
  var names = {
    image: ['poster_main.jpg', 'still_01.jpg', 'still_02.jpg', 'keyart.png'],
    video: ['EP01_1080p.mp4', 'EP02_1080p.mp4', 'teaser_30s.mp4', 'highlight.mp4'],
    doc: ['기획안_v3.pdf', 'proposal.pdf'],
    subtitle: ['EP01.srt', 'EP02.srt', 'teaser.vtt', 'subtitle.srt']
  }[kind] || ['file.bin'];
  return {
    id: 'f' + _fid,
    name: names[Math.floor(Math.random() * names.length)]
  };
}
var POSTER_KEYS = ['rose', 'indigo', 'teal', 'amber', 'slate'];

// ─── 썸네일 타일 ───────────────────────────────────────
function FileThumb(_ref) {
  var file = _ref.file,
    kind = _ref.kind,
    idx = _ref.idx,
    onRemove = _ref.onRemove,
    t = _ref.t;
  var removeBtn = /*#__PURE__*/React.createElement("button", {
    onClick: onRemove,
    style: {
      position: 'absolute',
      top: 5,
      right: 5,
      width: 20,
      height: 20,
      borderRadius: 999,
      border: 'none',
      cursor: 'pointer',
      background: 'rgba(15,17,21,0.62)',
      color: '#FFF',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "11",
    height: "11",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2.6"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M18 6L6 18M6 6l12 12",
    strokeLinecap: "round"
  })));
  if (kind === 'image') {
    var tone = POSTER_TONES[POSTER_KEYS[idx % POSTER_KEYS.length]];
    return /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'relative',
        width: '100%',
        aspectRatio: '3/4',
        borderRadius: 10,
        overflow: 'hidden',
        background: "linear-gradient(165deg, ".concat(tone.bg, ", ").concat(shade(tone.bg, -12), ")"),
        boxShadow: 'inset 0 0 0 0.5px rgba(0,0,0,0.08)'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        position: 'absolute',
        bottom: 6,
        left: 7,
        right: 24,
        fontFamily: t.mono,
        fontSize: 9,
        color: tone.ink,
        opacity: 0.8,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap'
      }
    }, file.name), removeBtn);
  }
  if (kind === 'video') {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'relative',
        width: '100%',
        aspectRatio: '9/16',
        borderRadius: 10,
        overflow: 'hidden',
        background: 'linear-gradient(165deg, #2A2E36, #15171B)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }
    }, /*#__PURE__*/React.createElement("svg", {
      width: "22",
      height: "22",
      viewBox: "0 0 24 24",
      fill: "rgba(255,255,255,0.92)"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M8 5v14l11-7z"
    })), /*#__PURE__*/React.createElement("span", {
      style: {
        position: 'absolute',
        bottom: 6,
        left: 8,
        right: 24,
        fontFamily: t.mono,
        fontSize: 9.5,
        color: 'rgba(255,255,255,0.82)',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap'
      }
    }, file.name), removeBtn);
  }
  return null;
}

// 문서/단일 파일 행
function FileRow(_ref2) {
  var file = _ref2.file,
    onRemove = _ref2.onRemove,
    t = _ref2.t;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 11,
      padding: '10px 12px',
      borderRadius: 9,
      background: t.surfaceAlt,
      border: "0.5px solid ".concat(t.line)
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "17",
    height: "17",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: ACCENT,
    strokeWidth: "1.7"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M14 2v6h6"
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      fontFamily: t.sans,
      fontSize: 13,
      color: t.ink,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap'
    }
  }, file.name), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: t.mono,
      fontSize: 10.5,
      color: t.paid
    }
  }, "\uC5C5\uB85C\uB4DC\uB428"), /*#__PURE__*/React.createElement("button", {
    onClick: onRemove,
    style: {
      border: 'none',
      background: 'transparent',
      cursor: 'pointer',
      color: t.inkFaint,
      padding: 2,
      display: 'inline-flex'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "14",
    height: "14",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M18 6L6 18M6 6l12 12",
    strokeLinecap: "round"
  }))));
}

// 공통 로직
function useUploader(kind, multiple, max, value, onChange) {
  var arr = Array.isArray(value) ? value : value ? [value] : [];
  var full = multiple ? arr.length >= max : arr.length >= 1;
  var add = function add() {
    if (full) return;
    var next = multiple ? [].concat(_toConsumableArray(arr), [fakeFile(kind)]) : [fakeFile(kind)];
    onChange && onChange(next);
  };
  var remove = function remove(id) {
    return onChange && onChange(arr.filter(function (f) {
      return f.id !== id;
    }));
  };
  return {
    arr: arr,
    full: full,
    add: add,
    remove: remove
  };
}

// ════════════════════════════════════════════════════════
// 시안 A — 드롭존 + 썸네일 그리드
// ════════════════════════════════════════════════════════
function Dropzone(_ref3) {
  var kind = _ref3.kind,
    multiple = _ref3.multiple,
    max = _ref3.max,
    value = _ref3.value,
    onChange = _ref3.onChange,
    t = _ref3.t,
    placeholder = _ref3.placeholder;
  var _useUploader = useUploader(kind, multiple, max, value, onChange),
    arr = _useUploader.arr,
    full = _useUploader.full,
    add = _useUploader.add,
    remove = _useUploader.remove;
  var isThumb = kind === 'image' || kind === 'video';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 12
    }
  }, !full && /*#__PURE__*/React.createElement("button", {
    onClick: add,
    style: {
      width: '100%',
      border: "1.5px dashed ".concat(t.lineStrong),
      background: t.surfaceAlt,
      borderRadius: 12,
      cursor: 'pointer',
      padding: '26px 16px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 8,
      transition: 'border-color .12s, background .12s'
    },
    onMouseEnter: function onMouseEnter(e) {
      e.currentTarget.style.borderColor = ACCENT;
      e.currentTarget.style.background = ACCENT_SOFT;
    },
    onMouseLeave: function onMouseLeave(e) {
      e.currentTarget.style.borderColor = t.lineStrong;
      e.currentTarget.style.background = t.surfaceAlt;
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "22",
    height: "22",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: ACCENT,
    strokeWidth: "1.8"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M12 16V4M12 4l-5 5M12 4l5 5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M4 17v2a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-2",
    strokeLinecap: "round"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: t.sans,
      fontSize: 13,
      fontWeight: 600,
      color: t.ink
    }
  }, placeholder || '파일을 끌어다 놓거나 클릭'), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: t.sans,
      fontSize: 11.5,
      color: t.inkFaint
    }
  }, multiple ? "\uCD5C\uB300 ".concat(max, "\uAC1C") : '1개', kind === 'video' ? ' · MP4 · 세로 9:16 · 1080p+' : kind === 'image' ? ' · JPG/PNG' : kind === 'subtitle' ? ' · SRT/VTT' : ' · PDF')), isThumb && arr.length > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: kind === 'image' ? 'repeat(5, 1fr)' : 'repeat(auto-fill, minmax(112px, 128px))',
      gap: 10
    }
  }, arr.map(function (f, i) {
    return /*#__PURE__*/React.createElement(FileThumb, {
      key: f.id,
      file: f,
      kind: kind,
      idx: i,
      onRemove: function onRemove() {
        return remove(f.id);
      },
      t: t
    });
  })), !isThumb && arr.map(function (f) {
    return /*#__PURE__*/React.createElement(FileRow, {
      key: f.id,
      file: f,
      onRemove: function onRemove() {
        return remove(f.id);
      },
      t: t
    });
  }), multiple && arr.length > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: t.mono,
      fontSize: 11,
      color: t.inkFaint
    }
  }, arr.length, "/", max));
}

// ════════════════════════════════════════════════════════
// 시안 B — 심플 '파일 선택' 버튼 + 파일 리스트
// ════════════════════════════════════════════════════════
function ButtonUploader(_ref4) {
  var kind = _ref4.kind,
    multiple = _ref4.multiple,
    max = _ref4.max,
    value = _ref4.value,
    onChange = _ref4.onChange,
    t = _ref4.t,
    placeholder = _ref4.placeholder;
  var _useUploader2 = useUploader(kind, multiple, max, value, onChange),
    arr = _useUploader2.arr,
    full = _useUploader2.full,
    add = _useUploader2.add,
    remove = _useUploader2.remove;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 9
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 11
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: add,
    disabled: full,
    style: {
      height: 38,
      padding: '0 15px',
      borderRadius: 9,
      cursor: full ? 'default' : 'pointer',
      border: "0.5px solid ".concat(t.lineStrong),
      background: full ? t.surfaceAlt : t.surface,
      color: full ? t.inkFaint : t.ink,
      fontFamily: t.sans,
      fontSize: 13,
      fontWeight: 600,
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
      whiteSpace: 'nowrap'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "15",
    height: "15",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.8"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M21.4 11.05L12.25 20.2a4 4 0 0 1-5.66-5.66l9.2-9.19a2.5 2.5 0 0 1 3.54 3.54l-9.2 9.19a1 1 0 0 1-1.41-1.41l8.49-8.49",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  })), "\uD30C\uC77C \uC120\uD0DD"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: t.sans,
      fontSize: 12,
      color: t.inkFaint
    }
  }, arr.length === 0 ? placeholder || '선택된 파일 없음' : multiple ? "".concat(arr.length, "/").concat(max, "\uAC1C \uC120\uD0DD\uB428") : arr[0].name)), arr.length > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 7
    }
  }, arr.map(function (f) {
    return /*#__PURE__*/React.createElement(FileRow, {
      key: f.id,
      file: f,
      onRemove: function onRemove() {
        return remove(f.id);
      },
      t: t
    });
  })));
}

// 래퍼 — variant 에 따라 분기
function MediaUpload(_ref5) {
  var variant = _ref5.variant,
    props = _objectWithoutProperties(_ref5, _excluded);
  return variant === 'dropzone' ? /*#__PURE__*/React.createElement(Dropzone, props) : /*#__PURE__*/React.createElement(ButtonUploader, props);
}
Object.assign(window, {
  MediaUpload: MediaUpload,
  Dropzone: Dropzone,
  ButtonUploader: ButtonUploader,
  FileThumb: FileThumb,
  FileRow: FileRow
});
