function installProducerBackNavigation() {
  if (document.documentElement.dataset.producerBackBound === 'true') return;
  document.documentElement.dataset.producerBackBound = 'true';
  document.addEventListener('click', function (event) {
    var control = event.target.closest('button, a');
    if (!control) return;
    var label = control.textContent.replace(/\s+/g, ' ').trim();
    if (label !== '뒤로가기' && label !== '뒤로 가기' && label !== '목록으로' && !/^Back$/i.test(label)) {
      return;
    }
    event.preventDefault();
    event.stopImmediatePropagation();
    window.location.href = 'contentlist-prod.html';
  }, true);
}
function installDetailLayoutTweaks() {
  var style = document.createElement('style');
  style.id = '__detail_layout_tweaks';
  style.textContent = "\n      body {\n        min-width: 0 !important;\n      }\n      #root {\n        position: relative !important;\n        width: min(960px, calc(100% - 32px)) !important;\n        max-width: 960px !important;\n        margin-left: auto !important;\n        margin-right: auto !important;\n      }\n      #root *,\n      #root *::before,\n      #root *::after {\n        box-sizing: border-box !important;\n      }\n      #root > *,\n      #root main,\n      #root section,\n      #root [style*=\"1200\"],\n      #root [style*=\"1080\"],\n      #root [style*=\"1024\"] {\n        max-width: 100% !important;\n      }\n      #root main {\n        padding-left: 0 !important;\n        padding-right: 0 !important;\n      }\n      @media (max-width: 720px) {\n        #root {\n          width: calc(100% - 24px) !important;\n        }\n      }\n      .my-content-actionbar {\n        position: fixed;\n        top: 0;\n        left: 0;\n        display: flex;\n        flex-direction: column;\n        gap: 8px;\n        width: 118px;\n        padding: 10px;\n        border: 1px solid rgba(17,17,17,0.1);\n        border-radius: 16px;\n        background: rgba(255,255,255,0.96);\n        box-shadow: 0 6px 16px rgba(15,23,42,0.08);\n        backdrop-filter: blur(12px);\n        z-index: 1000;\n      }\n      .my-content-actionbar::before {\n        content: \"\";\n        width: 28px;\n        height: 4px;\n        margin: 0 auto 1px;\n        border-radius: 999px;\n        background: #dedbd3;\n      }\n      .my-content-remote-title {\n        color: #8b8f98;\n        font-size: 10px;\n        font-weight: 800;\n        letter-spacing: 0.06em;\n        text-align: center;\n      }\n      .my-content-remote-status {\n        color: #9b9da3;\n        display: block;\n        font-size: 11px;\n        font-weight: 600;\n        line-height: 1.2;\n        text-align: center;\n      }\n      .my-content-floating-btn {\n        width: 100%;\n        height: 34px;\n        padding: 0 10px;\n        border-radius: 10px;\n        font-family: inherit;\n        font-size: 12px;\n        font-weight: 750;\n        cursor: pointer;\n        white-space: nowrap;\n      }\n      .my-content-edit-btn {\n        border: 1px solid #e4e2dc;\n        background: #fff;\n        color: #222;\n      }\n      .my-content-edit-btn:hover {\n        background: #f7f6f2;\n      }\n      .my-content-review-btn {\n        border: 1px solid #e4e2dc;\n        background: #fff;\n        color: #333;\n      }\n      .my-content-review-btn:hover {\n        background: #f7f6f2;\n      }\n      .my-content-workflow-btn {\n        border: 1px solid #e4e2dc;\n        background: #fff;\n        color: #333;\n      }\n      .my-content-workflow-btn:hover {\n        background: #f7f6f2;\n      }\n      @media (max-width: 720px) {\n        .my-content-actionbar {\n          width: 104px;\n          padding: 6px;\n        }\n        .my-content-floating-btn {\n          height: 32px;\n          padding: 0 10px;\n        }\n      }\n    ";
  document.head.appendChild(style);
}
function installMyContentActions() {
  var observer = null;
  var renderActionbar = function renderActionbar() {
    var _observer;
    var root = document.getElementById('root');
    if (!root || document.querySelector('.my-content-actionbar')) return;
    if (!root.children.length) return;
    var actionbar = document.createElement('div');
    actionbar.className = 'my-content-actionbar';
    var title = document.createElement('div');
    title.className = 'my-content-remote-title';
    title.textContent = 'MY CONTENT';
    var status = document.createElement('div');
    status.className = 'my-content-remote-status';
    status.textContent = '관리 도구';
    var editButton = document.createElement('button');
    editButton.className = 'my-content-floating-btn my-content-edit-btn';
    editButton.type = 'button';
    editButton.textContent = '수정하기';
    editButton.addEventListener('click', function () {
      alert('콘텐츠 수정 화면으로 이동합니다.');
    });
    var reviewButton = document.createElement('button');
    reviewButton.className = 'my-content-floating-btn my-content-review-btn';
    reviewButton.type = 'button';
    reviewButton.textContent = '검토 요청';
    reviewButton.addEventListener('click', function () {
      alert('검토 요청을 보냈습니다.');
    });
    var workflowButton = document.createElement('button');
    workflowButton.className = 'my-content-floating-btn my-content-workflow-btn';
    workflowButton.type = 'button';
    workflowButton.textContent = '워크플로우';
    workflowButton.addEventListener('click', function () {
      window.location.href = 'workflow-version-detail.html?id=0&from=distribution-version';
    });
    actionbar.appendChild(title);
    actionbar.appendChild(status);
    actionbar.appendChild(editButton);
    actionbar.appendChild(reviewButton);
    actionbar.appendChild(workflowButton);
    actionbar.style.visibility = 'hidden';
    document.body.appendChild(actionbar);
    var positionActionbar = function positionActionbar() {
      var rootRect = root.getBoundingClientRect();
      var backTarget = Array.from(root.querySelectorAll('button, a, div, span')).find(function (node) {
        var text = node.textContent.replace(/\s+/g, ' ').trim();
        return text === '뒤로가기' || text === '뒤로 가기' || text === '목록으로' || /^Back$/i.test(text);
      });
      var backControl = backTarget ? backTarget.closest('button, a') || backTarget : null;
      var backRect = backControl ? backControl.getBoundingClientRect() : rootRect;
      var gap = 14;
      var panelWidth = actionbar.offsetWidth || 112;
      var outsideLeft = rootRect.right + gap;
      var insideLeft = rootRect.right - panelWidth - gap;
      var hasOutsideRoom = outsideLeft + panelWidth <= window.innerWidth - 12;
      actionbar.style.top = Math.max(64, backRect.top) + 'px';
      actionbar.style.left = Math.max(12, hasOutsideRoom ? outsideLeft : insideLeft) + 'px';
    };
    (_observer = observer) === null || _observer === void 0 || _observer.disconnect();
    requestAnimationFrame(function () {
      positionActionbar();
      actionbar.style.visibility = 'visible';
    });
    window.addEventListener('resize', positionActionbar);
    window.addEventListener('scroll', positionActionbar, {
      passive: true
    });
  };
  renderActionbar();
  if (!document.querySelector('.my-content-actionbar')) {
    var root = document.getElementById('root');
    if (!root) return;
    observer = new MutationObserver(renderActionbar);
    observer.observe(root, {
      childList: true,
      subtree: true
    });
  }
}
function installDetailFieldTweaks() {
  var targetFields = [{
    label: '제작 상태',
    value: '제작 완료'
  }, {
    label: '라이선스 형태',
    value: '비독점'
  }, {
    label: '라이선스 지역',
    value: '태국 제외 전세계'
  }, {
    label: '플랫폼'
  }, {
    label: '장르'
  }, {
    label: '에피소드'
  }, {
    label: '감독'
  }, {
    label: '작가'
  }, {
    label: '배우'
  }, {
    label: '추천 포인트'
  }];
  var targetLabels = new Set(targetFields.map(function (field) {
    return field.label;
  }));
  var hiddenLabels = new Set(['제작연도', '거래 상태']);
  var aliases = {
    '라이센스 타입': '라이선스 형태',
    '라이선스 타입': '라이선스 형태',
    '라이센스 형태': '라이선스 형태'
  };
  var normalize = function normalize(text) {
    return text.replace(/\s+/g, ' ').trim();
  };
  var canonicalLabel = function canonicalLabel(label) {
    return aliases[label] || label;
  };
  var isCompactRow = function isCompactRow(node) {
    return node.children.length >= 2 && normalize(node.textContent).length <= 1600;
  };
  var syncRows = function syncRows() {
    var root = document.getElementById('root');
    if (!root) return;
    var rowsByLabel = new Map();
    var rows = Array.from(root.querySelectorAll('div')).filter(function (node) {
      if (!isCompactRow(node)) return false;
      var label = canonicalLabel(normalize(node.children[0].textContent));
      return targetLabels.has(label) || hiddenLabels.has(label);
    });
    rows.forEach(function (row) {
      var label = canonicalLabel(normalize(row.children[0].textContent));
      if (hiddenLabels.has(label)) {
        row.remove();
        return;
      }
      if (!rowsByLabel.has(label)) rowsByLabel.set(label, row);
    });
    var templateRow = rowsByLabel.get('제작 상태') || rowsByLabel.get('플랫폼') || rowsByLabel.get('장르');
    if (templateRow && templateRow.parentElement) {
      var parent = templateRow.parentElement;
      var firstKnownRow = Array.from(parent.children).find(function (child) {
        if (!child.children || child.children.length < 2) return false;
        return targetLabels.has(canonicalLabel(normalize(child.children[0].textContent)));
      }) || templateRow;
      var orderedRows = [];
      targetFields.forEach(function (field) {
        var existed = rowsByLabel.has(field.label);
        var row = existed ? rowsByLabel.get(field.label) : templateRow.cloneNode(true);
        var labelNode = row.children[0];
        var valueNode = row.children[1];
        if (labelNode.textContent !== field.label) labelNode.textContent = field.label;
        if (Object.prototype.hasOwnProperty.call(field, 'value')) {
          if (valueNode.textContent !== field.value) valueNode.textContent = field.value;
          valueNode.style.whiteSpace = 'pre-line';
        } else if (!existed) {
          valueNode.textContent = '-';
        }
        orderedRows.push(row);
      });
      var currentRows = Array.from(parent.children);
      var startIndex = currentRows.indexOf(firstKnownRow);
      var isOrdered = startIndex >= 0 && orderedRows.every(function (row, index) {
        return currentRows[startIndex + index] === row;
      });
      if (!isOrdered) {
        var marker = document.createComment('detail fields');
        parent.insertBefore(marker, firstKnownRow);
        orderedRows.forEach(function (row) {
          parent.insertBefore(row, marker);
        });
        marker.remove();
      }
    }
    root.querySelectorAll('div').forEach(function (node) {
      if (node.children.length < 2) return;
      var label = canonicalLabel(normalize(node.children[0].textContent));
      if (!hiddenLabels.has(label)) return;
      var rowText = normalize(node.textContent);
      if (rowText.length > 80) return;
      node.remove();
    });
    root.querySelectorAll('span').forEach(function (node) {
      if (node.textContent.trim() === '#심리드라마') node.remove();
    });
    Array.from(root.querySelectorAll('div')).forEach(function (node) {
      var text = node.textContent.trim();
      var removeTargets = new Set(['- 성숙한 여성 서사: 중년 여성의 욕망과 감정을 전면에 드러낸 현실적 이야기', '- 치유와 성장: 상처를 마주하고 감정을 받아들이는 과정']);
      if (removeTargets.has(text)) {
        node.remove();
        return;
      }
      var target = '- 금기된 관계 서사: 딸의 연인과 엄마 사이의 도덕적 경계를 넘는 파격적 관계 구조';
      if (text === target) {
        node.textContent = target.replace(/ 구조$/, '');
      }
    });
  };
  var root = document.getElementById('root');
  if (!root) return;
  var syncScheduled = false;
  var observer = new MutationObserver(function () {
    if (syncScheduled) return;
    syncScheduled = true;
    requestAnimationFrame(function () {
      syncScheduled = false;
      observer.disconnect();
      syncRows();
      observer.observe(root, {
        childList: true,
        subtree: true
      });
    });
  });
  observer.observe(root, {
    childList: true,
    subtree: true
  });
  syncRows();
}
document.addEventListener('DOMContentLoaded', function () {
  installProducerBackNavigation();
  installDetailLayoutTweaks();
  installMyContentActions();
  installDetailFieldTweaks();
});
