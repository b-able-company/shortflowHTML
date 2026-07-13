const PLAN_STEPS = [{
  k: 1,
  label: '기획안 정보',
  hint: '기본 정보 · 텍스트',
  sec: 'sec-plan-basic'
}, {
  k: 2,
  label: '미디어',
  hint: '포스터 · 레퍼런스',
  sec: 'sec-plan-media'
}, {
  k: 3,
  label: '검토 요청',
  hint: '요약 · 제출 확인',
  sec: 'sec-plan-review'
}];
const PLAN_INITIAL_FORM = {
  title: '',
  genre: [],
  synopsis: '',
  status: '기획',
  episodeCount: null,
  runtime: '',
  casting: '',
  mainPoster: [],
  referenceImages: [],
  referenceVideos: [],
  reviewNote: ''
};
const PLAN_STATUS_OPTIONS = [{
  v: '기획',
  label: '기획'
}, {
  v: '시놉 확정',
  label: '시놉 확정'
}, {
  v: '대본 확보',
  label: '대본 확보'
}, {
  v: '캐스팅 확정',
  label: '캐스팅 확정'
}, {
  v: '파일럿 완료',
  label: '파일럿 완료'
}, {
  v: '제작 준비완료',
  label: '제작 준비완료'
}];
function planArr(value) {
  return Array.isArray(value) ? value : value ? [value] : [];
}
function planNowHHMM() {
  const d = new Date();
  return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
}
function PlanDotLabel({
  children
}) {
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 9
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 6,
      height: 6,
      borderRadius: 999,
      background: ACCENT,
      flexShrink: 0
    }
  }), /*#__PURE__*/React.createElement("span", null, children));
}
const PLAN_BASIC_FIELDS = [{
  key: 'title',
  label: '제목',
  kind: 'text',
  cols: 12,
  required: true,
  ph: '작품 제목을 입력하세요'
}, {
  key: 'episodeCount',
  label: '예정 부작수',
  kind: 'num',
  cols: 6,
  required: true,
  suffix: '부작',
  ph: '예: 12'
}, {
  key: 'runtime',
  label: '편당 러닝타임',
  kind: 'text',
  cols: 6,
  required: true,
  divider: true,
  ph: '예: 8분'
}, {
  key: 'synopsis',
  label: '시놉시스',
  kind: 'area',
  cols: 12,
  required: true,
  rows: 5,
  ph: '작품의 핵심 설정과 전개를 입력하세요.'
}, {
  key: 'casting',
  label: '캐스팅 정보',
  kind: 'area',
  cols: 12,
  required: false,
  rows: 4,
  ph: '확정 또는 희망 캐스팅, 주요 캐릭터 정보를 입력하세요.'
}, {
  key: 'genre',
  label: '장르',
  kind: 'chips',
  cols: 12,
  required: true,
  hint: '복수 선택'
}, {
  key: 'status',
  label: '진행상황',
  kind: 'select',
  cols: 12,
  required: true
}];
function renderPlanBasicControl(f, form, set, t) {
  const value = form[f.key];
  const onChange = v => set(f.key, v);
  if (f.kind === 'select') {
    return /*#__PURE__*/React.createElement(SelectMenu, {
      options: PLAN_STATUS_OPTIONS,
      value: value,
      onChange: onChange,
      t: t,
      placeholder: "\uC120\uD0DD"
    });
  }
  if (f.kind === 'chips') {
    return /*#__PURE__*/React.createElement(ChipMulti, {
      options: GENRES,
      value: value || [],
      onChange: onChange,
      t: t
    });
  }
  if (f.kind === 'num') {
    return /*#__PURE__*/React.createElement(NumberInput, {
      value: value,
      onChange: onChange,
      suffix: f.suffix,
      placeholder: f.ph,
      t: t
    });
  }
  if (f.kind === 'area') {
    return /*#__PURE__*/React.createElement(TextArea, {
      value: value,
      onChange: onChange,
      placeholder: f.ph,
      rows: f.rows,
      t: t
    });
  }
  return /*#__PURE__*/React.createElement(TextInput, {
    value: value,
    onChange: onChange,
    placeholder: f.ph,
    t: t
  });
}
function PlanBasicSection({
  form,
  set,
  t
}) {
  return /*#__PURE__*/React.createElement(SectionCard, {
    id: "sec-plan-basic",
    title: "\uAE30\uD68D\uC548 \uC815\uBCF4",
    desc: null,
    t: t
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
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
    title: "\uAE30\uD68D\uC548 \uC815\uBCF4",
    t: t,
    flush: true
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(12, minmax(0, 1fr))',
      gap: 0,
      borderLeft: `0.5px solid ${t.line}`,
      borderRight: `0.5px solid ${t.line}`,
      borderBottom: `0.5px solid ${t.line}`
    }
  }, PLAN_BASIC_FIELDS.map((f, fi) => {
    const cols = fieldCols(f);
    const position = fieldGridPosition(PLAN_BASIC_FIELDS, fi);
    const inset = f.divider || cols < 12 && !position.startsRow;
    const needsRowFiller = position.endsRow && position.remainder > 0;
    const roomy = f.kind === 'area' || f.kind === 'chips';
    return /*#__PURE__*/React.createElement(React.Fragment, {
      key: f.key
    }, /*#__PURE__*/React.createElement(RowField, {
      label: f.label,
      hint: f.hint,
      required: f.required,
      cols: cols,
      inset: inset,
      strongDivider: !!f.divider,
      roomy: roomy,
      t: t
    }, renderPlanBasicControl(f, form, set, t)), needsRowFiller && /*#__PURE__*/React.createElement("div", {
      "aria-hidden": "true",
      style: {
        gridColumn: `span ${position.remainder}`,
        borderTop: `0.5px solid ${t.line}`
      }
    }));
  }))));
}
function PlanMediaSection({
  form,
  set,
  t
}) {
  return /*#__PURE__*/React.createElement(SectionCard, {
    id: "sec-plan-media",
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
    label: /*#__PURE__*/React.createElement(PlanDotLabel, null, "\uBA54\uC778 \uD3EC\uC2A4\uD130"),
    required: true,
    hint: "\uC138\uB85C \uD3EC\uC2A4\uD130 1\uC7A5",
    gap: 12,
    t: t
  }, /*#__PURE__*/React.createElement(MediaUpload, {
    variant: "dropzone",
    kind: "image",
    multiple: false,
    max: 1,
    value: form.mainPoster,
    onChange: v => set('mainPoster', v),
    placeholder: "\uBA54\uC778 \uD3EC\uC2A4\uD130 \uC5C5\uB85C\uB4DC",
    t: t
  })), /*#__PURE__*/React.createElement(Field, {
    label: /*#__PURE__*/React.createElement(PlanDotLabel, null, "\uB808\uD37C\uB7F0\uC2A4 \uC774\uBBF8\uC9C0"),
    hint: "\uBB34\uB4DC\uBCF4\uB4DC, \uC2A4\uD2F8\uCEF7, \uD0A4\uC544\uD2B8 \uB4F1 \xB7 \uCD5C\uB300 10\uC7A5",
    gap: 12,
    t: t
  }, /*#__PURE__*/React.createElement(MediaUpload, {
    variant: "dropzone",
    kind: "image",
    multiple: true,
    max: 10,
    value: form.referenceImages,
    onChange: v => set('referenceImages', v),
    placeholder: "\uB808\uD37C\uB7F0\uC2A4 \uC774\uBBF8\uC9C0 \uC5C5\uB85C\uB4DC",
    t: t
  })), /*#__PURE__*/React.createElement(Field, {
    label: /*#__PURE__*/React.createElement(PlanDotLabel, null, "\uB808\uD37C\uB7F0\uC2A4 \uC601\uC0C1"),
    hint: "\uC0D8\uD50C \uC601\uC0C1, \uD2F0\uC800 \uB4F1 \xB7 \uCD5C\uB300 5\uAC1C",
    gap: 12,
    t: t
  }, /*#__PURE__*/React.createElement(MediaUpload, {
    variant: "dropzone",
    kind: "video",
    multiple: true,
    max: 5,
    value: form.referenceVideos,
    onChange: v => set('referenceVideos', v),
    placeholder: "\uB808\uD37C\uB7F0\uC2A4 \uC601\uC0C1 \uC5C5\uB85C\uB4DC",
    t: t
  }))));
}
function PlanReviewRow({
  label,
  value,
  ok = true,
  required = false,
  t
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '160px minmax(0, 1fr)',
      minHeight: 38,
      borderTop: `0.5px solid ${t.line}`
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 6,
      padding: '0 10px',
      background: '#F7F7F4',
      borderRight: `0.5px solid ${t.line}`,
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
      color: ok ? t.ink : t.inkFaint,
      minWidth: 0
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
      border: `1px solid ${ok ? ACCENT : t.lineStrong}`,
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
  }))), /*#__PURE__*/React.createElement("span", {
    style: {
      minWidth: 0,
      overflowWrap: 'anywhere'
    }
  }, value || '미입력')));
}
function PlanReviewGroup({
  title,
  children,
  t
}) {
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(GroupHead, {
    title: title,
    t: t
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      borderLeft: `0.5px solid ${t.line}`,
      borderRight: `0.5px solid ${t.line}`,
      borderBottom: `0.5px solid ${t.line}`
    }
  }, children));
}
function PlanReviewSection({
  form,
  set,
  t
}) {
  const mainPoster = planArr(form.mainPoster);
  const referenceImages = planArr(form.referenceImages);
  const referenceVideos = planArr(form.referenceVideos);
  const genreText = planArr(form.genre).map(genreLabel).join(', ');
  return /*#__PURE__*/React.createElement(SectionCard, {
    id: "sec-plan-review",
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
      border: `0.5px solid ${t.line}`,
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
      border: `1px solid ${t.inkMute}`,
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
      fontWeight: 500,
      color: '#555A63',
      lineHeight: 1.5
    }
  }, "\uAC80\uD1A0 \uC694\uCCAD\uC744 \uC804\uC1A1\uD558\uAE30 \uC804\uC5D0 \uC785\uB825\uD55C \uB0B4\uC6A9\uC744 \uB9C8\uC9C0\uB9C9\uC73C\uB85C \uD655\uC778\uD574\uC8FC\uC138\uC694.")), /*#__PURE__*/React.createElement(PlanReviewGroup, {
    title: "\uAE30\uD68D\uC548 \uC815\uBCF4",
    t: t
  }, /*#__PURE__*/React.createElement(PlanReviewRow, {
    label: "\uC81C\uBAA9",
    value: form.title,
    ok: !!form.title,
    required: true,
    t: t
  }), /*#__PURE__*/React.createElement(PlanReviewRow, {
    label: "\uC608\uC815 \uBD80\uC791\uC218",
    value: form.episodeCount ? `${form.episodeCount}부작` : '',
    ok: !!form.episodeCount,
    required: true,
    t: t
  }), /*#__PURE__*/React.createElement(PlanReviewRow, {
    label: "\uD3B8\uB2F9 \uB7EC\uB2DD\uD0C0\uC784",
    value: form.runtime,
    ok: !!form.runtime,
    required: true,
    t: t
  }), /*#__PURE__*/React.createElement(PlanReviewRow, {
    label: "\uC2DC\uB189\uC2DC\uC2A4",
    value: form.synopsis,
    ok: !!form.synopsis,
    required: true,
    t: t
  }), /*#__PURE__*/React.createElement(PlanReviewRow, {
    label: "\uCE90\uC2A4\uD305 \uC815\uBCF4",
    value: form.casting,
    ok: !!form.casting,
    t: t
  }), /*#__PURE__*/React.createElement(PlanReviewRow, {
    label: "\uC7A5\uB974",
    value: genreText,
    ok: !!genreText,
    required: true,
    t: t
  }), /*#__PURE__*/React.createElement(PlanReviewRow, {
    label: "\uC9C4\uD589\uC0C1\uD669",
    value: form.status,
    ok: !!form.status,
    required: true,
    t: t
  })), /*#__PURE__*/React.createElement(PlanReviewGroup, {
    title: "\uBBF8\uB514\uC5B4",
    t: t
  }, /*#__PURE__*/React.createElement(PlanReviewRow, {
    label: "\uBA54\uC778 \uD3EC\uC2A4\uD130",
    value: mainPoster.length ? `${mainPoster.length}장` : '',
    ok: mainPoster.length > 0,
    required: true,
    t: t
  }), /*#__PURE__*/React.createElement(PlanReviewRow, {
    label: "\uB808\uD37C\uB7F0\uC2A4 \uC774\uBBF8\uC9C0",
    value: referenceImages.length ? `${referenceImages.length}장` : '',
    ok: referenceImages.length > 0,
    t: t
  }), /*#__PURE__*/React.createElement(PlanReviewRow, {
    label: "\uB808\uD37C\uB7F0\uC2A4 \uC601\uC0C1",
    value: referenceVideos.length ? `${referenceVideos.length}개` : '',
    ok: referenceVideos.length > 0,
    t: t
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 12,
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 9,
      minWidth: 0
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
  }, "\uAD00\uB9AC\uC790 \uC804\uB2EC \uBA54\uBAA8")), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: t.sans,
      fontSize: 11.5,
      color: t.inkFaint,
      whiteSpace: 'nowrap'
    }
  }, "\uC120\uD0DD")), /*#__PURE__*/React.createElement("textarea", {
    value: form.reviewNote || '',
    onChange: event => set('reviewNote', event.target.value),
    placeholder: "\uAC80\uD1A0 \uC2DC \uCC38\uACE0\uD560 \uB0B4\uC6A9\uC774 \uC788\uC73C\uBA74 \uC785\uB825\uD574\uC8FC\uC138\uC694.",
    rows: 4,
    style: {
      width: '100%',
      minHeight: 110,
      padding: 14,
      borderRadius: 10,
      border: `0.5px solid ${t.line}`,
      background: t.surface,
      color: t.ink,
      fontFamily: t.sans,
      fontSize: 13.5,
      lineHeight: 1.6,
      resize: 'vertical',
      outline: 'none'
    }
  }))));
}
function missingPlanRequiredItems(form) {
  const missing = [];
  if (!form.title) missing.push('제목');
  if (!planArr(form.genre).length) missing.push('장르');
  if (!form.synopsis) missing.push('시놉시스');
  if (!form.status) missing.push('진행상황');
  if (!form.episodeCount) missing.push('예정 부작수');
  if (!form.runtime) missing.push('편당 러닝타임');
  if (planArr(form.mainPoster).length === 0) missing.push('메인 포스터');
  return missing;
}
function PlanSubmittedToast({
  onClose,
  t
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'fixed',
      inset: 0,
      zIndex: 15000,
      background: 'rgba(15,17,21,0.42)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 24
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 330,
      height: 270,
      maxWidth: '100%',
      background: t.surface,
      borderRadius: 18,
      boxShadow: 'none',
      padding: '28px 26px 22px',
      textAlign: 'center',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 60,
      height: 60,
      borderRadius: 999,
      background: '#FFF3EC',
      border: `2px solid ${ACCENT}`,
      color: ACCENT,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "30",
    height: "30",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2.5"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M20 6L9 17l-5-5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }))), /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      fontFamily: t.sans,
      fontSize: 18,
      fontWeight: 700,
      color: t.ink
    }
  }, "\uAC80\uD1A0 \uC694\uCCAD\uC744 \uBCF4\uB0C8\uC5B4\uC694"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '8px 0 0',
      fontFamily: t.sans,
      fontSize: 13,
      color: t.inkMute,
      lineHeight: 1.6
    }
  }, "\uD50C\uB7AB\uD3FC\uC0AC \uAC80\uD1A0\uAC00 \uC2DC\uC791\uB429\uB2C8\uB2E4.", /*#__PURE__*/React.createElement("br", null), "\uC9C4\uD589 \uC0C1\uD669\uC740 \uC6CC\uD06C\uD50C\uB85C\uC6B0\uC5D0\uC11C \uD655\uC778\uD560 \uC218 \uC788\uC5B4\uC694."), /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    style: {
      marginTop: 22,
      width: '100%',
      height: 42,
      borderRadius: 10,
      cursor: 'pointer',
      border: `1px solid ${t.line}`,
      background: t.surface,
      color: t.ink,
      fontFamily: t.sans,
      fontSize: 14,
      fontWeight: 600
    }
  }, "\uC81C\uC791\uD611\uC5C5 \uAE30\uD68D\uC548\uC73C\uB85C")));
}
function ProducerPlanApp() {
  const t = BASE_TOKENS;
  const [form, setForm] = React.useState(PLAN_INITIAL_FORM);
  const [current, setCurrent] = React.useState(1);
  const [savedAt, setSavedAt] = React.useState(null);
  const [doneOpen, setDoneOpen] = React.useState(false);
  const total = PLAN_STEPS.length;
  const currentStep = PLAN_STEPS[current - 1];
  const set = (key, value) => setForm(prev => ({
    ...prev,
    [key]: value
  }));
  const goTo = step => {
    setCurrent(step);
    document.querySelector('[data-nc-scroll]')?.scrollTo({
      top: 0
    });
  };
  const renderStep = () => {
    if (current === 1) return /*#__PURE__*/React.createElement(PlanBasicSection, {
      form: form,
      set: set,
      t: t
    });
    if (current === 2) return /*#__PURE__*/React.createElement(PlanMediaSection, {
      form: form,
      set: set,
      t: t
    });
    return /*#__PURE__*/React.createElement(PlanReviewSection, {
      form: form,
      set: set,
      t: t
    });
  };
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
      marginBottom: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
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
  }, "\uC0C8 \uC81C\uC791\uD611\uC5C5 \uAE30\uD68D\uC548"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: t.mono,
      fontSize: 12.5,
      color: t.inkFaint
    }
  }, "\uB2E8\uACC4 ", current, " / ", total, " \xB7 ", currentStep.label), savedAt && /*#__PURE__*/React.createElement("span", {
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
  }), "\uC784\uC2DC\uC800\uC7A5\uB428 ", savedAt))), /*#__PURE__*/React.createElement(Stepper, {
    steps: PLAN_STEPS,
    current: current,
    maxReached: total,
    onJump: goTo,
    t: t
  }), renderStep())), /*#__PURE__*/React.createElement(FooterBar, {
    wizard: true,
    current: current,
    total: total,
    maxW: 960,
    onPrev: () => goTo(Math.max(1, current - 1)),
    onNext: () => goTo(Math.min(total, current + 1)),
    onSave: () => setSavedAt(planNowHHMM()),
    onSubmit: () => setDoneOpen(true),
    missingCount: missingPlanRequiredItems(form).length,
    t: t
  }), doneOpen && /*#__PURE__*/React.createElement(PlanSubmittedToast, {
    t: t,
    onClose: () => window.location.href = 'producer-collaboration.html'
  }));
}
ReactDOM.createRoot(document.getElementById('root')).render(/*#__PURE__*/React.createElement(ProducerPlanApp, null));
