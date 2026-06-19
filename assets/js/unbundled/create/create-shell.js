// 새 콘텐츠 생성 — 셸 (헤더 · 단계 이동 3시안 · 푸터 · 제출 모달)

// ─── 페이지 헤더 ───────────────────────────────────────
'use strict';

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

function NCHeader(_ref) {
  var savedAt = _ref.savedAt;
  var t = _ref.t;

  return React.createElement(
    'div',
    { style: { marginBottom: 24 } },
    React.createElement(
      'button',
      { onClick: function () {
          return window.history.back();
        }, style: { display: 'inline-flex', alignItems: 'center', gap: 6, fontFamily: t.sans, fontSize: 12.5, fontWeight: 600, color: t.inkMute, marginBottom: 9, whiteSpace: 'nowrap', border: 'none', background: 'transparent', cursor: 'pointer', padding: 0 } },
      React.createElement(
        'svg',
        { width: '14', height: '14', viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: '2' },
        React.createElement('path', { d: 'M15 18l-6-6 6-6', strokeLinecap: 'round', strokeLinejoin: 'round' })
      ),
      React.createElement(
        'span',
        null,
        '뒤로가기'
      )
    ),
    React.createElement(
      'div',
      { style: { display: 'flex', alignItems: 'flex-end', gap: 12 } },
      React.createElement('h1', { style: { margin: 0, fontFamily: t.sans, fontSize: 27, fontWeight: 700, letterSpacing: -0.7, color: t.ink } }),
      savedAt && React.createElement(
        'span',
        { style: { fontFamily: t.mono, fontSize: 11.5, color: t.inkFaint, paddingBottom: 5, display: 'inline-flex', alignItems: 'center', gap: 5 } },
        React.createElement('span', { style: { width: 6, height: 6, borderRadius: 999, background: t.paid } }),
        '임시저장됨 ',
        savedAt
      )
    )
  );
}

// ─── 입력 기준 언어 선택 바 ───────────────────────
function InputLanguageBar(_ref2) {
  var value = _ref2.value;
  var onChange = _ref2.onChange;
  var t = _ref2.t;
  var _ref2$embedded = _ref2.embedded;
  var embedded = _ref2$embedded === undefined ? false : _ref2$embedded;

  var opts = [{ v: 'KO', label: '한국어' }, { v: 'EN', label: 'English' }, { v: 'ZH', label: '中文' }];
  var selector = React.createElement(
    'div',
    { style: { display: 'flex', gap: 4, background: t.surface, border: '0.5px solid ' + t.line, borderRadius: 9, padding: 3, flexShrink: 0 } },
    opts.map(function (o) {
      var sel = value === o.v;
      return React.createElement(
        'button',
        { key: o.v, onClick: function () {
            return onChange(o.v);
          }, style: {
            border: 'none', cursor: 'pointer', borderRadius: 6, padding: embedded ? '7px 14px' : '8px 16px',
            background: sel ? '#25272B' : 'transparent', color: sel ? '#FFFFFF' : t.inkMute,
            fontFamily: t.sans, fontSize: 13, fontWeight: sel ? 700 : 500, whiteSpace: 'nowrap'
          } },
        o.label
      );
    })
  );

  if (embedded) {
    return React.createElement(
      'div',
      { style: { minHeight: 38, display: 'flex', alignItems: 'center' } },
      selector
    );
  }

  return React.createElement(
    'div',
    { style: {
        display: 'flex', alignItems: 'center', gap: 16, marginBottom: 22,
        padding: '14px 18px', background: ACCENT_SOFT, border: '0.5px solid #F2C3AE', borderRadius: 14
      } },
    React.createElement(
      'div',
      { style: { display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 34, height: 34, borderRadius: 9, background: t.surface, border: '0.5px solid #F2C3AE', flexShrink: 0 } },
      React.createElement(
        'svg',
        { width: '17', height: '17', viewBox: '0 0 24 24', fill: 'none', stroke: ACCENT, strokeWidth: '1.9' },
        React.createElement('path', { d: 'M5 8l6 6M4 14l6-6 2-3M2 5h12M7 2h1M22 22l-5-10-5 10M14 18h6', strokeLinecap: 'round', strokeLinejoin: 'round' })
      )
    ),
    React.createElement(
      'div',
      { style: { minWidth: 0 } },
      React.createElement(
        'div',
        { style: { fontFamily: t.sans, fontSize: 13.5, fontWeight: 700, color: t.ink, letterSpacing: -0.2 } },
        '입력 기준 언어'
      ),
      React.createElement(
        'div',
        { style: { fontFamily: t.sans, fontSize: 11.5, color: t.inkMute, marginTop: 2 } },
        '콘텐츠 정보를 입력할 언어예요. 자막도 이 언어 기준으로 업로드됩니다.'
      )
    ),
    React.createElement('div', { style: { flex: 1 } }),
    selector
  );
}

// ─── 시안 B: 상단 가로 스텝퍼 ──────────────────────────
function Stepper(_ref3) {
  var steps = _ref3.steps;
  var current = _ref3.current;
  var maxReached = _ref3.maxReached;
  var onJump = _ref3.onJump;
  var t = _ref3.t;

  return React.createElement(
    'div',
    { style: { width: 'calc(100% - 80px)', margin: '0 auto 16px', display: 'flex', alignItems: 'flex-start', padding: '12px 24px 18px' } },
    steps.map(function (s, i) {
      var done = s.k < current;
      var active = s.k === current;
      var reachable = s.k <= maxReached;
      return React.createElement(
        React.Fragment,
        { key: s.k },
        React.createElement(
          'button',
          { onClick: function () {
              return reachable && onJump(s.k);
            }, style: {
              flex: '0 0 auto', minWidth: 76, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 7, border: 'none', background: 'transparent',
              cursor: reachable ? 'pointer' : 'default', padding: 0, textAlign: 'center'
            } },
          React.createElement(
            'span',
            { style: {
                width: 30, height: 30, borderRadius: 999, flexShrink: 0,
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: t.mono, fontSize: 13, fontWeight: 600,
                background: active ? ACCENT : done ? ACCENT_SOFT : t.surfaceAlt,
                color: active ? '#FFF7EE' : done ? ACCENT : t.inkFaint,
                border: active ? 'none' : '0.5px solid ' + t.line
              } },
            done ? React.createElement(
              'svg',
              { width: '14', height: '14', viewBox: '0 0 24 24', fill: 'none', stroke: ACCENT, strokeWidth: '3' },
              React.createElement('path', { d: 'M20 6L9 17l-5-5', strokeLinecap: 'round', strokeLinejoin: 'round' })
            ) : s.k
          ),
          React.createElement(
            'span',
            { style: { fontFamily: t.sans, fontSize: 12.5, fontWeight: active ? 600 : 500, color: active ? t.ink : done ? t.inkMute : t.inkFaint, letterSpacing: -0.2, whiteSpace: 'nowrap' } },
            s.label
          )
        ),
        i < steps.length - 1 && React.createElement('div', { style: { flex: 1, height: 2, background: s.k < current ? ACCENT_SOFT : t.line, borderRadius: 2, margin: '15px 16px 0' } })
      );
    })
  );
}

// ─── 시안 C: 좌측 사이드 레일 ──────────────────────────
function SideRail(_ref4) {
  var steps = _ref4.steps;
  var current = _ref4.current;
  var maxReached = _ref4.maxReached;
  var onJump = _ref4.onJump;
  var t = _ref4.t;

  return React.createElement(
    'div',
    { style: { position: 'sticky', top: 0, display: 'flex', flexDirection: 'column', gap: 6 } },
    steps.map(function (s) {
      var done = s.k < current;
      var active = s.k === current;
      var reachable = s.k <= maxReached;
      return React.createElement(
        'button',
        { key: s.k, onClick: function () {
            return reachable && onJump(s.k);
          }, style: {
            display: 'flex', alignItems: 'center', gap: 12, padding: '13px 14px', borderRadius: 12, textAlign: 'left',
            cursor: reachable ? 'pointer' : 'default',
            background: active ? ACCENT_SOFT : 'transparent',
            border: '0.5px solid ' + (active ? '#F2C3AE' : 'transparent')
          } },
        React.createElement(
          'span',
          { style: {
              width: 28, height: 28, borderRadius: 999, flexShrink: 0,
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: t.mono, fontSize: 12.5, fontWeight: 700,
              background: active ? ACCENT : done ? t.surface : t.surfaceAlt,
              color: active ? '#FFF7EE' : done ? ACCENT : t.inkFaint,
              border: active ? 'none' : '0.5px solid ' + t.line
            } },
          done ? React.createElement(
            'svg',
            { width: '13', height: '13', viewBox: '0 0 24 24', fill: 'none', stroke: ACCENT, strokeWidth: '3' },
            React.createElement('path', { d: 'M20 6L9 17l-5-5', strokeLinecap: 'round', strokeLinejoin: 'round' })
          ) : s.k
        ),
        React.createElement(
          'span',
          null,
          React.createElement(
            'div',
            { style: { fontFamily: t.sans, fontSize: 13.5, fontWeight: active ? 700 : 600, color: active ? t.ink : t.inkMute, letterSpacing: -0.2 } },
            s.label
          ),
          React.createElement(
            'div',
            { style: { fontFamily: t.sans, fontSize: 11, color: t.inkFaint, marginTop: 2 } },
            s.hint
          )
        )
      );
    })
  );
}

// ─── 하단 액션 바 ──────────────────────────────────────
function FooterBar(_ref5) {
  var wizard = _ref5.wizard;
  var current = _ref5.current;
  var total = _ref5.total;
  var onPrev = _ref5.onPrev;
  var onNext = _ref5.onNext;
  var onSave = _ref5.onSave;
  var onSubmit = _ref5.onSubmit;
  var _ref5$missingCount = _ref5.missingCount;
  var missingCount = _ref5$missingCount === undefined ? 0 : _ref5$missingCount;
  var onDevBypass = _ref5.onDevBypass;
  var t = _ref5.t;
  var _ref5$maxW = _ref5.maxW;
  var maxW = _ref5$maxW === undefined ? 1180 : _ref5$maxW;

  var ghost = {
    height: 42, padding: '0 18px', borderRadius: 9, cursor: 'pointer',
    border: '0.5px solid ' + t.lineStrong, background: t.surface, color: t.ink,
    fontFamily: t.sans, fontSize: 13.5, fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: 7
  };
  var primary = {
    height: 42, padding: '0 22px', borderRadius: 9, cursor: 'pointer', border: 'none',
    background: ACCENT, color: '#FFF7EE', fontFamily: t.sans, fontSize: 13.5, fontWeight: 700,
    display: 'inline-flex', alignItems: 'center', gap: 8
  };
  var onLast = current >= total;
  return React.createElement(
    'div',
    { style: {
        flexShrink: 0, borderTop: '0.5px solid ' + t.line, background: t.surface,
        padding: '14px 40px', display: 'flex', alignItems: 'center', gap: 12
      } },
    React.createElement(
      'div',
      { style: { maxWidth: maxW, margin: '0 auto', width: '100%', display: 'flex', alignItems: 'center', gap: 12 } },
      wizard && React.createElement(
        'button',
        { onClick: onPrev, disabled: current <= 1, style: _extends({}, ghost, { opacity: current <= 1 ? 0.4 : 1, cursor: current <= 1 ? 'default' : 'pointer' }) },
        React.createElement(
          'svg',
          { width: '15', height: '15', viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: '2' },
          React.createElement('path', { d: 'M15 18l-6-6 6-6', strokeLinecap: 'round' })
        ),
        '이전'
      ),
      React.createElement(
        'button',
        { onClick: onSave, style: ghost },
        React.createElement(
          'svg',
          { width: '15', height: '15', viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: '1.7' },
          React.createElement('path', { d: 'M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z' }),
          React.createElement('path', { d: 'M17 21v-8H7v8M7 3v5h8' })
        ),
        '임시저장'
      ),
      React.createElement('div', { style: { flex: 1 } }),
      wizard && !onLast && React.createElement(
        'button',
        { onClick: onNext, style: primary },
        '다음',
        React.createElement(
          'svg',
          { width: '15', height: '15', viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: '2' },
          React.createElement('path', { d: 'M9 18l6-6-6-6', strokeLinecap: 'round' })
        )
      ),
      (!wizard || onLast) && (function () {
        var canSubmit = missingCount === 0;
        return React.createElement(
          'div',
          { style: { position: 'relative', display: 'inline-flex', gap: 8 }, className: 'submit-wrap' },
          onDevBypass && !canSubmit && React.createElement('button', { onClick: onDevBypass, style: _extends({}, ghost, { fontSize: 12, color: t.inkFaint, borderStyle: 'dashed' }) }, '전체 입력 상태 만들기'),
          React.createElement(
            'button',
            {
              onClick: canSubmit ? onSubmit : undefined,
              disabled: !canSubmit,
              style: _extends({}, primary, { opacity: canSubmit ? 1 : 0.45, cursor: canSubmit ? 'pointer' : 'not-allowed' })
            },
            React.createElement(
              'svg',
              { width: '16', height: '16', viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: '2' },
              React.createElement('path', { d: 'M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z', strokeLinecap: 'round', strokeLinejoin: 'round' })
            ),
            '검토 요청 보내기'
          ),
          !canSubmit && React.createElement(
            'span',
            { style: {
                position: 'absolute', bottom: 'calc(100% + 8px)', right: 0,
                background: 'rgba(15,17,21,0.88)', color: '#fff', fontSize: 12, fontFamily: t.sans,
                padding: '6px 10px', borderRadius: 7, whiteSpace: 'nowrap', pointerEvents: 'none',
                opacity: 0, transition: 'opacity 0.15s'
              }, className: 'submit-tooltip' },
            '필수 항목 ',
            missingCount,
            '개를 먼저 입력해주세요'
          )
        );
      })(),
      React.createElement(
        'style',
        null,
        '.submit-wrap:hover .submit-tooltip { opacity: 1 !important; }'
      )
    )
  );
}

// ─── 제출 확인 모달 ────────────────────────────────────
function arr(v) {
  return Array.isArray(v) ? v : v ? [v] : [];
}

function hasRequiredValue(value) {
  if (Array.isArray(value)) return value.length > 0;
  if (typeof value === 'string') return value.trim().length > 0;
  return value !== null && value !== undefined && value !== '';
}

function missingSubmitRequiredItems(form, baseLanguage) {
  var language = baseLanguage || form.mediaLanguage || LANG_LIST[0];
  var translation = form.translations.find(function (item) {
    return item.language === language;
  }) || {};
  var crew = form.crew.find(function (item) {
    return item.language === language;
  }) || {};
  var missing = [];

  webContentGroups(form).forEach(function (group) {
    group.fields.forEach(function (field) {
      var optionalInPlanning = form.productionStatus === 'PLANNING' && ['director', 'writer', 'cast', 'ageRating'].includes(field.key);
      var required = field.required !== false && field.key !== 'startPoint' && !optionalInPlanning;
      if (!required) return;
      var source = field.source === 'translation' ? translation : field.source === 'crew' ? crew : form;
      if (!hasRequiredValue(source[field.key])) missing.push(field.label);
    });
  });

  if (arr(form.mainImageKey).length === 0) missing.push('대표 이미지');
  return [].concat(_toConsumableArray(new Set(missing)));
}

function SubmitModal(_ref6) {
  var form = _ref6.form;
  var baseLanguage = _ref6.baseLanguage;
  var onClose = _ref6.onClose;
  var onConfirm = _ref6.onConfirm;
  var t = _ref6.t;

  var _React$useState = React.useState(false);

  var _React$useState2 = _slicedToArray(_React$useState, 2);

  var rightsConfirmed = _React$useState2[0];
  var setRightsConfirmed = _React$useState2[1];

  return React.createElement(
    'div',
    { onClick: onClose, style: {
        position: 'fixed', inset: 0, zIndex: 2000, background: 'rgba(15,17,21,0.42)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24
      } },
    React.createElement(
      'div',
      { onClick: function (e) {
          return e.stopPropagation();
        }, style: {
          width: 560, maxWidth: '100%', maxHeight: '88vh', overflow: 'auto', background: t.surface,
          borderRadius: 18, boxShadow: '0 30px 80px rgba(0,0,0,0.3)', padding: '28px 30px 26px'
        } },
      React.createElement(
        'h2',
        { style: { margin: 0, fontFamily: t.sans, fontSize: 20, fontWeight: 700, color: t.ink, letterSpacing: -0.4 } },
        '검토 요청을 보낼까요?'
      ),
      React.createElement(
        'p',
        { style: { margin: '8px 0 22px', fontFamily: t.sans, fontSize: 13.5, color: t.inkMute, lineHeight: 1.6 } },
        '제출 후에는 관리자 검토가 시작되며, 검토 중에는 수정이 제한됩니다.'
      ),
      React.createElement(
        'label',
        { style: { display: 'flex', alignItems: 'flex-start', gap: 10, marginTop: 18, padding: '14px 15px', border: '0.5px solid ' + (rightsConfirmed ? '#F2C3AE' : t.line), borderRadius: 12, background: rightsConfirmed ? '#FFF7F2' : t.surface, cursor: 'pointer' } },
        React.createElement('input', {
          type: 'checkbox',
          checked: rightsConfirmed,
          onChange: function (e) {
            return setRightsConfirmed(e.target.checked);
          },
          style: { width: 16, height: 16, marginTop: 2, flexShrink: 0, accentColor: ACCENT, cursor: 'pointer' }
        }),
        React.createElement(
          'span',
          { style: { fontFamily: t.sans, fontSize: 12.5, color: t.inkMute, lineHeight: 1.6, textAlign: 'left' } },
          '당사는 모든 권리를 보유하고 있거나 해당 작품의 저작권자 또는 적법한 권리자임을 보증하며, 해당 작품을 이용허락할 수 있는 적법한 권한을 보유하고 있음을 보증한다. 또한, 이를 입증할 수 있는 자료를 제출할 수 있음을 확인합니다.'
        )
      ),
      React.createElement(
        'div',
        { style: { display: 'flex', gap: 10, marginTop: 18 } },
        React.createElement(
          'button',
          { onClick: onClose, style: {
              flex: 1, height: 44, borderRadius: 10, cursor: 'pointer', border: '0.5px solid ' + t.lineStrong,
              background: t.surface, color: t.ink, fontFamily: t.sans, fontSize: 14, fontWeight: 600
            } },
          '취소'
        ),
        React.createElement(
          'button',
          { disabled: !rightsConfirmed, onClick: onConfirm, style: {
              flex: 1, height: 44, borderRadius: 10, border: 'none',
              background: rightsConfirmed ? ACCENT : t.lineStrong, color: rightsConfirmed ? '#FFF7EE' : t.inkFaint, fontFamily: t.sans, fontSize: 14, fontWeight: 700, cursor: rightsConfirmed ? 'pointer' : 'not-allowed',
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8
            } },
          React.createElement(
            'svg',
            { width: '16', height: '16', viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: '2' },
            React.createElement('path', { d: 'M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z', strokeLinecap: 'round', strokeLinejoin: 'round' })
          ),
          '검토 요청 보내기'
        )
      )
    )
  );
}

// ─── 제출 완료 토스트/화면 ─────────────────────────────
function SubmittedToast(_ref7) {
  var onClose = _ref7.onClose;
  var t = _ref7.t;

  return React.createElement(
    'div',
    { style: { position: 'fixed', inset: 0, zIndex: 2000, background: 'rgba(15,17,21,0.42)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 } },
    React.createElement(
      'div',
      { style: { width: 420, maxWidth: '100%', background: t.surface, borderRadius: 18, boxShadow: '0 30px 80px rgba(0,0,0,0.3)', padding: '34px 30px', textAlign: 'center' } },
      React.createElement(
        'div',
        { style: { width: 56, height: 56, borderRadius: 999, background: t.paidTint, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 } },
        React.createElement(
          'svg',
          { width: '28', height: '28', viewBox: '0 0 24 24', fill: 'none', stroke: t.paid, strokeWidth: '2.4' },
          React.createElement('path', { d: 'M20 6L9 17l-5-5', strokeLinecap: 'round', strokeLinejoin: 'round' })
        )
      ),
      React.createElement(
        'h2',
        { style: { margin: 0, fontFamily: t.sans, fontSize: 19, fontWeight: 700, color: t.ink } },
        '검토 요청을 보냈어요'
      ),
      React.createElement(
        'p',
        { style: { margin: '8px 0 22px', fontFamily: t.sans, fontSize: 13.5, color: t.inkMute, lineHeight: 1.6 } },
        '관리자 검토가 시작됩니다. 진행 상황은 워크플로우에서 확인할 수 있어요.'
      ),
      React.createElement(
        'button',
        { onClick: onClose, style: { height: 42, padding: '0 24px', borderRadius: 10, cursor: 'pointer', border: 'none', background: ACCENT, color: '#FFF7EE', fontFamily: t.sans, fontSize: 14, fontWeight: 700 } },
        '내 콘텐츠로'
      )
    )
  );
}

Object.assign(window, { NCHeader: NCHeader, InputLanguageBar: InputLanguageBar, Stepper: Stepper, SideRail: SideRail, FooterBar: FooterBar, SubmitModal: SubmitModal, SubmittedToast: SubmittedToast, missingSubmitRequiredItems: missingSubmitRequiredItems });
