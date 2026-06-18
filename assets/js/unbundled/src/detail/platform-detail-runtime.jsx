function installDetailLayoutTweaks() {
    const style = document.createElement('style');
    style.id = '__detail_layout_tweaks';
    style.textContent = `
      body {
        min-width: 0 !important;
      }
      #root {
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
    `;
    document.head.appendChild(style);
  }

function installDetailFieldTweaks() {
    const targetFields = [
      { label: '제작 상태', value: '제작 완료' },
      { label: '라이선스 형태', value: '비독점' },
      { label: '라이선스 지역', value: '전 세계' },
      { label: '플랫폼', value: 'NovaShort / PlayStory / VeloDrama' },
      { label: '장르', value: '회귀, 성장 드라마, 연예계, 로맨스' },
      { label: '에피소드', value: '80 ep x 2 mins' },
      { label: '감독', value: '이태준' },
      { label: '작가', value: '박서윤' },
      { label: '배우', value: '차우진, 김하린, 서민혁' },
      {
        label: '추천 포인트',
        value: '- 인생 2회차의 통쾌한 복수극: 배신당하고 모든 것을 잃은 톱스타의 두 번째 도전\n- 연예계 성장 서사: 무명 시절로 돌아가 다시 정상에 오르는 과정\n- 미래를 아는 주인공의 전략 플레이: 과거의 실수를 바로잡으며 운명을 바꿔나감\n- 사랑과 우정의 재발견: 잃어버렸던 소중한 인연들을 다시 만나는 감동'
      }
    ];
    const hashtags = [
      '#회귀물',
      '#톱스타성장기',
      '#연예계드라마',
      '#복수서사',
      '#인생2회차'
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

      const title = root.querySelector('h1');
      const backButton = Array.from(root.querySelectorAll('button')).find(function(button) {
        return normalize(button.textContent) === '뒤로 가기';
      });
      if (
        backButton &&
        window.__SHORTFLOW_DETAIL_ENTRY_ROLE__ === 'platform' &&
        backButton.dataset.platformBackBound !== 'true'
      ) {
        backButton.dataset.platformBackBound = 'true';
        backButton.addEventListener('click', function() {
          window.location.href = 'content-list.html';
        });
      }

      if (title && normalize(title.textContent) !== '죽었다가 회귀한 톱스타 (2026)') {
        const year = document.createElement('span');
        year.textContent = '(2026)';
        title.style.fontWeight = '700';
        title.style.fontSize = '27px';
        title.replaceChildren(document.createTextNode('죽었다가 회귀한 톱스타 '), year);
      }
      if (title) {
        title.style.lineHeight = '1.2';
        const titleColumn = title.parentElement;
        if (titleColumn) {
          titleColumn.style.flex = '1 1 0';
          titleColumn.style.minWidth = '0';
          titleColumn.style.width = 'auto';
        }
        const year = title.querySelector('span');
        if (year) {
          year.style.display = 'inline-block';
          year.style.color = '#6B7280';
          year.style.fontSize = '22px';
          year.style.fontWeight = '600';
          year.style.verticalAlign = '2px';
        }
      }

      const contractButton = Array.from(root.querySelectorAll('button')).find(function(button) {
        const text = normalize(button.textContent);
        return text === '계약 완료' || text === '계약 가능';
      });
      if (contractButton && normalize(contractButton.textContent) !== '계약 가능') {
        const textNode = Array.from(contractButton.childNodes).find(function(node) {
          return node.nodeType === Node.TEXT_NODE && node.textContent.trim();
        });
        if (textNode) {
          textNode.textContent = ' 계약 가능';
        } else {
          contractButton.appendChild(document.createTextNode('계약 가능'));
        }
      }

      if (!root.querySelector('[data-detail-poster]')) {
        const posterBrand = Array.from(root.querySelectorAll('div')).find(function(node) {
          return normalize(node.textContent) === "PARK'N MEDIA";
        });
        const poster = posterBrand && posterBrand.parentElement;
        if (poster) {
          const image = document.createElement('img');
          image.src = 'images/죽었다가회귀한.png';
          image.alt = '죽었다가 회귀한 톱스타 포스터';
          image.dataset.detailPoster = 'true';
          image.style.display = 'block';
          image.style.width = '100%';
          image.style.height = '100%';
          image.style.objectFit = 'cover';
          poster.style.aspectRatio = '2 / 3';
          poster.style.background = 'none';
          poster.parentElement.style.gap = '36px';
          poster.replaceChildren(image);
        }
      }

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
        row.style.display = 'grid';
        row.style.gridTemplateColumns = '80px minmax(0, 1fr)';
        row.style.columnGap = '36px';
        row.style.alignItems = 'start';
        row.style.width = '100%';
        row.style.marginLeft = '0';
        row.children[0].style.lineHeight = '1.7';
        row.children[1].style.minWidth = '0';
        row.children[1].style.lineHeight = '1.7';
        if (!rowsByLabel.has(label)) rowsByLabel.set(label, row);
      });

      const templateRow = rowsByLabel.get('제작 상태') || rowsByLabel.get('플랫폼') || rowsByLabel.get('장르');
      if (templateRow && templateRow.parentElement) {
        const parent = templateRow.parentElement;
        parent.style.width = '100%';
        parent.style.maxWidth = '100%';
        parent.style.marginLeft = '0';
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
      const hashtagNodes = Array.from(root.querySelectorAll('span')).filter(function(node) {
        return node.textContent.trim().startsWith('#');
      });
      hashtagNodes.forEach(function(node, index) {
        if (index < hashtags.length) {
          if (node.textContent !== hashtags[index]) node.textContent = hashtags[index];
        } else {
          node.remove();
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

  installDetailLayoutTweaks();
  installDetailFieldTweaks();

});
