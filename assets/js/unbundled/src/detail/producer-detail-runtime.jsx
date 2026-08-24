function installProducerBackNavigation() {
    if (document.documentElement.dataset.producerBackBound === 'true') return;
    document.documentElement.dataset.producerBackBound = 'true';

    document.addEventListener('click', function(event) {
      const control = event.target.closest('button, a');
      if (!control) return;

      const label = control.textContent.replace(/\s+/g, ' ').trim();
      if (label !== '뒤로가기' && label !== '뒤로 가기' && label !== '목록으로' && !/^Back$/i.test(label)) {
        return;
      }

      event.preventDefault();
      event.stopImmediatePropagation();
      window.location.href = 'contentlist-prod.html';
    }, true);
  }

function installDetailLayoutTweaks() {
    const style = document.createElement('style');
    style.id = '__detail_layout_tweaks';
    style.textContent = `
      body {
        min-width: 0 !important;
      }
      #root {
        position: relative !important;
        width: min(960px, calc(100% - 32px)) !important;
        max-width: 960px !important;
        margin-left: auto !important;
        margin-right: auto !important;
      }
      #root *,
      #root *::before,
      #root *::after {
        box-sizing: border-box !important;
      }
      #root > *,
      #root main,
      #root section,
      #root [style*="1200"],
      #root [style*="1080"],
      #root [style*="1024"] {
        max-width: 100% !important;
      }
      #root main {
        padding-left: 0 !important;
        padding-right: 0 !important;
      }
      @media (max-width: 720px) {
        #root {
          width: calc(100% - 24px) !important;
        }
      }
      .my-content-actionbar {
        position: fixed;
        top: 0;
        left: 0;
        display: flex;
        flex-direction: column;
        gap: 8px;
        width: 118px;
        padding: 10px;
        border: 1px solid rgba(17,17,17,0.1);
        border-radius: 16px;
        background: rgba(255,255,255,0.96);
        box-shadow: 0 6px 16px rgba(15,23,42,0.08);
        backdrop-filter: blur(12px);
        z-index: 1000;
      }
      .my-content-actionbar::before {
        content: "";
        width: 28px;
        height: 4px;
        margin: 0 auto 1px;
        border-radius: 999px;
        background: #dedbd3;
      }
      .my-content-remote-title {
        color: #8b8f98;
        font-size: 10px;
        font-weight: 800;
        letter-spacing: 0.06em;
        text-align: center;
      }
      .my-content-remote-status {
        color: #9b9da3;
        display: block;
        font-size: 11px;
        font-weight: 600;
        line-height: 1.2;
        text-align: center;
      }
      .my-content-floating-btn {
        width: 100%;
        height: 34px;
        padding: 0 10px;
        border-radius: 10px;
        font-family: inherit;
        font-size: 12px;
        font-weight: 750;
        cursor: pointer;
        white-space: nowrap;
      }
      .my-content-edit-btn {
        border: 1px solid #e4e2dc;
        background: #fff;
        color: #222;
      }
      .my-content-edit-btn:hover {
        background: #f7f6f2;
      }
      .my-content-review-btn {
        border: 1px solid #e4e2dc;
        background: #fff;
        color: #333;
      }
      .my-content-review-btn:hover {
        background: #f7f6f2;
      }
      .my-content-workflow-btn {
        border: 1px solid #e4e2dc;
        background: #fff;
        color: #333;
      }
      .my-content-workflow-btn:hover {
        background: #f7f6f2;
      }
      @media (max-width: 720px) {
        .my-content-actionbar {
          width: 104px;
          padding: 6px;
        }
        .my-content-floating-btn {
          height: 32px;
          padding: 0 10px;
        }
      }
    `;
    document.head.appendChild(style);
  }

function installMyContentActions() {
    let observer = null;

    const renderActionbar = function() {
      const root = document.getElementById('root');
      if (!root || document.querySelector('.my-content-actionbar')) return;
      if (!root.children.length) return;

      const actionbar = document.createElement('div');
      actionbar.className = 'my-content-actionbar';

      const title = document.createElement('div');
      title.className = 'my-content-remote-title';
      title.textContent = 'MY CONTENT';

      const status = document.createElement('div');
      status.className = 'my-content-remote-status';
      status.textContent = '관리 도구';

      const editButton = document.createElement('button');
      editButton.className = 'my-content-floating-btn my-content-edit-btn';
      editButton.type = 'button';
      editButton.textContent = '수정하기';
      editButton.addEventListener('click', function() {
        alert('콘텐츠 수정 화면으로 이동합니다.');
      });

      const reviewButton = document.createElement('button');
      reviewButton.className = 'my-content-floating-btn my-content-review-btn';
      reviewButton.type = 'button';
      reviewButton.textContent = '검토 요청';
      reviewButton.addEventListener('click', function() {
        alert('검토 요청을 보냈습니다.');
      });

      const workflowButton = document.createElement('button');
      workflowButton.className = 'my-content-floating-btn my-content-workflow-btn';
      workflowButton.type = 'button';
      workflowButton.textContent = '워크플로우';
      workflowButton.addEventListener('click', function() {
        window.location.href = 'workflow-version-detail.html?id=0&from=distribution-version';
      });

      actionbar.appendChild(title);
      actionbar.appendChild(status);
      actionbar.appendChild(editButton);
      actionbar.appendChild(reviewButton);
      actionbar.appendChild(workflowButton);
      actionbar.style.visibility = 'hidden';
      document.body.appendChild(actionbar);

      const positionActionbar = function() {
        const rootRect = root.getBoundingClientRect();
        const backTarget = Array.from(root.querySelectorAll('button, a, div, span'))
          .find(function(node) {
            const text = node.textContent.replace(/\s+/g, ' ').trim();
            return text === '뒤로가기' || text === '뒤로 가기' || text === '목록으로' || /^Back$/i.test(text);
          });
        const backControl = backTarget ? (backTarget.closest('button, a') || backTarget) : null;
        const backRect = backControl ? backControl.getBoundingClientRect() : rootRect;

        const gap = 14;
        const panelWidth = actionbar.offsetWidth || 112;
        const outsideLeft = rootRect.right + gap;
        const insideLeft = rootRect.right - panelWidth - gap;
        const hasOutsideRoom = outsideLeft + panelWidth <= window.innerWidth - 12;

        actionbar.style.top = Math.max(64, backRect.top) + 'px';
        actionbar.style.left = Math.max(12, hasOutsideRoom ? outsideLeft : insideLeft) + 'px';
      };

      observer?.disconnect();
      requestAnimationFrame(function() {
        positionActionbar();
        actionbar.style.visibility = 'visible';
      });
      window.addEventListener('resize', positionActionbar);
      window.addEventListener('scroll', positionActionbar, { passive: true });
    };

    renderActionbar();
    if (!document.querySelector('.my-content-actionbar')) {
      const root = document.getElementById('root');
      if (!root) return;
      observer = new MutationObserver(renderActionbar);
      observer.observe(root, { childList: true, subtree: true });
    }
  }

function installDetailFieldTweaks() {
    const targetFields = [
      { label: '제작 상태', value: '제작 완료' },
      { label: '라이선스 형태', value: '비독점' },
      { label: '라이선스 지역', value: '태국 제외 전세계' },
      { label: '플랫폼' },
      { label: '장르' },
      { label: '에피소드' },
      { label: '감독' },
      { label: '작가' },
      { label: '배우' },
      { label: '추천 포인트' }
    ];
    const targetLabels = new Set(targetFields.map(function(field) { return field.label; }));
    const hiddenLabels = new Set(['제작연도', '거래 상태']);
    const aliases = {
      '라이센스 타입': '라이선스 형태',
      '라이선스 타입': '라이선스 형태',
      '라이센스 형태': '라이선스 형태'
    };
    const normalize = function(text) {
      return text.replace(/\s+/g, ' ').trim();
    };
    const canonicalLabel = function(label) {
      return aliases[label] || label;
    };
    const isCompactRow = function(node) {
      return node.children.length >= 2 && normalize(node.textContent).length <= 1600;
    };
    const syncRows = function() {
      const root = document.getElementById('root');
      if (!root) return;
      const rowsByLabel = new Map();
      const rows = Array.from(root.querySelectorAll('div')).filter(function(node) {
        if (!isCompactRow(node)) return false;
        const label = canonicalLabel(normalize(node.children[0].textContent));
        return targetLabels.has(label) || hiddenLabels.has(label);
      });

      rows.forEach(function(row) {
        const label = canonicalLabel(normalize(row.children[0].textContent));
        if (hiddenLabels.has(label)) {
          row.remove();
          return;
        }
        if (!rowsByLabel.has(label)) rowsByLabel.set(label, row);
      });

      const templateRow = rowsByLabel.get('제작 상태') || rowsByLabel.get('플랫폼') || rowsByLabel.get('장르');
      if (templateRow && templateRow.parentElement) {
        const parent = templateRow.parentElement;
        const firstKnownRow = Array.from(parent.children).find(function(child) {
          if (!child.children || child.children.length < 2) return false;
          return targetLabels.has(canonicalLabel(normalize(child.children[0].textContent)));
        }) || templateRow;
        const orderedRows = [];

        targetFields.forEach(function(field) {
          const existed = rowsByLabel.has(field.label);
          const row = existed ? rowsByLabel.get(field.label) : templateRow.cloneNode(true);
          const labelNode = row.children[0];
          const valueNode = row.children[1];
          if (labelNode.textContent !== field.label) labelNode.textContent = field.label;
          if (Object.prototype.hasOwnProperty.call(field, 'value')) {
            if (valueNode.textContent !== field.value) valueNode.textContent = field.value;
            valueNode.style.whiteSpace = 'pre-line';
          } else if (!existed) {
            valueNode.textContent = '-';
          }
          orderedRows.push(row);
        });

        const currentRows = Array.from(parent.children);
        const startIndex = currentRows.indexOf(firstKnownRow);
        const isOrdered = startIndex >= 0 && orderedRows.every(function(row, index) {
          return currentRows[startIndex + index] === row;
        });

        if (!isOrdered) {
          const marker = document.createComment('detail fields');
          parent.insertBefore(marker, firstKnownRow);
          orderedRows.forEach(function(row) {
            parent.insertBefore(row, marker);
          });
          marker.remove();
        }
      }

      root.querySelectorAll('div').forEach(function(node) {
        if (node.children.length < 2) return;
        const label = canonicalLabel(normalize(node.children[0].textContent));
        if (!hiddenLabels.has(label)) return;
        const rowText = normalize(node.textContent);
        if (rowText.length > 80) return;
        node.remove();
      });
      root.querySelectorAll('span').forEach(function(node) {
        if (node.textContent.trim() === '#심리드라마') node.remove();
      });
      Array.from(root.querySelectorAll('div')).forEach(function(node) {
        const text = node.textContent.trim();
        const removeTargets = new Set([
          '- 성숙한 여성 서사: 중년 여성의 욕망과 감정을 전면에 드러낸 현실적 이야기',
          '- 치유와 성장: 상처를 마주하고 감정을 받아들이는 과정'
        ]);
        if (removeTargets.has(text)) {
          node.remove();
          return;
        }
        const target = '- 금기된 관계 서사: 딸의 연인과 엄마 사이의 도덕적 경계를 넘는 파격적 관계 구조';
        if (text === target) {
          node.textContent = target.replace(/ 구조$/, '');
        }
      });
    };

    const root = document.getElementById('root');
    if (!root) return;

    let syncScheduled = false;
    const observer = new MutationObserver(function() {
      if (syncScheduled) return;
      syncScheduled = true;
      requestAnimationFrame(function() {
        syncScheduled = false;
        observer.disconnect();
        syncRows();
        observer.observe(root, { childList: true, subtree: true });
      });
    });

    observer.observe(root, { childList: true, subtree: true });
    syncRows();
  }



document.addEventListener('DOMContentLoaded', function() {

  installProducerBackNavigation();
  installDetailLayoutTweaks();
  installMyContentActions();
  installDetailFieldTweaks();

});
