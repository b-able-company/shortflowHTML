function installPerformancePosterImages() {
    const posters = {
      '대표님이 내 전남친입니다': 'images/posters/대표님이내전남친입니다.png',
      '재벌집 막내 비서': 'images/posters/재벌집막내비서.png',
      '죽었다가 회귀한 톱스타': 'images/posters/죽었다가회귀한.png',
      '우리 집에 킬러가 산다': 'images/posters/우리집에킬러가산다.png',
      '오늘부터 악녀 대행합니다': 'images/posters/오늘부터악녀대행.png'
    };

    const findPosterSlot = function(titleNode) {
      let container = titleNode.parentElement;
      while (container && container.id !== 'root') {
        const slot = Array.from(container.children).find(function(child) {
          if (!(child instanceof HTMLElement)) return false;
          const width = parseFloat(child.style.width);
          const height = parseFloat(child.style.height);
          return width >= 36 && width <= 150 && height >= width * 1.25 && height <= width * 1.55;
        });
        if (slot) return slot;
        container = container.parentElement;
      }
      return null;
    };

    const syncPosters = function() {
      const root = document.getElementById('root');
      if (!root) return;

      root.querySelectorAll('div').forEach(function(node) {
        if (node.children.length || !posters[node.textContent.trim()]) return;
        if (node.tagName !== 'H1') {
          node.style.fontSize = '15px';
          node.style.fontWeight = '500';
        }
      });

      root.querySelectorAll('div, span').forEach(function(node) {
        if (node.children.length) return;
        const text = node.textContent.trim();
        if (text !== '최초 릴리즈' && text !== '마지막 업데이트') return;

        const badge = node.parentElement;
        if (!badge || badge.dataset.performanceUpdateBadge === 'true') return;
        const badgeText = badge.textContent.trim();
        if (
          !badgeText.includes('최초 릴리즈') &&
          !badgeText.includes('가장 빠른 플랫폼 기준') &&
          !badgeText.includes('가장 최근 플랫폼 기준') &&
          !(text === '마지막 업데이트' && badge.children.length > 1)
        ) return;

        const label = document.createElement('span');
        label.textContent = '마지막 업데이트';
        label.style.fontFamily = 'Pretendard, sans-serif';

        const title = root.querySelector('h1');
        const contents = window.PERF_CONTENTS || [];
        const content = title && contents.find(function(item) {
          return item.title === title.textContent.trim();
        });
        const latestDate = content && content.platforms
          .map(function(platform) { return platform.lastUpdate; })
          .filter(Boolean)
          .sort()
          .reverse()[0];

        if (latestDate) {
          const date = document.createElement('span');
          date.textContent = latestDate;
          date.style.fontFamily = 'Geist Mono, monospace';
          date.style.color = '#202124';
          date.style.fontWeight = '500';
          badge.replaceChildren(label, date);
          badge.style.gap = '8px';
        } else {
          badge.replaceChildren(label);
          badge.style.gap = '0';
        }
        badge.dataset.performanceUpdateBadge = 'true';
      });

      root.querySelectorAll('div, span').forEach(function(node) {
        const text = node.textContent.trim();
        if (!node.children.length && (/^지표\s*\d+\s*\/\s*\d+$/.test(text) || text === '데이터 미제공')) {
          node.remove();
        }
      });

      const platformNames = new Set(['NovaShort', 'PlayStory', 'VeloDrama', 'StoryWave', 'MiniStage']);
      root.querySelectorAll('div').forEach(function(node) {
        if (node.children.length || !platformNames.has(node.textContent.trim())) return;

        let header = node.parentElement;
        for (let depth = 0; header && depth < 3; depth += 1, header = header.parentElement) {
          if (header.style.padding === '16px 20px' || header.style.padding === '12px 20px') {
            header.style.padding = '12px 20px';
            header.style.background = 'rgb(250, 250, 250)';
            break;
          }
        }
      });

      root.querySelectorAll('div').forEach(function(label) {
        if (label.children.length || !/^(?:누적\s*)?(조회수|팔로우수|좋아요수|광고수)$/.test(label.textContent.trim())) return;
        const metricCell = label.parentElement;
        if (!metricCell) return;

        const values = Array.from(metricCell.children).filter(function(child) {
          return child !== label && !child.children.length;
        });
        const value = values[0];
        if (!value) return;

        if (metricCell.style.padding === '14px 18px') {
          values.slice(1).forEach(function(extra) {
            if (/^\d{1,3}(?:,\d{3})*$/.test(extra.textContent.trim())) extra.remove();
          });
          return;
        }
        if (metricCell.style.padding !== '18px 20px') return;

        const fullValue = values.find(function(child) {
          return child !== value && /^\d{1,3}(?:,\d{3})*$/.test(child.textContent.trim());
        });
        if (fullValue) {
          value.textContent = fullValue.textContent.trim();
          fullValue.remove();
        }

        value.style.fontSize = '16px';
        value.style.fontWeight = '600';
        value.style.letterSpacing = '-0.2px';
      });

      root.querySelectorAll('div, h1').forEach(function(node) {
        if (node.children.length || !posters[node.textContent.trim()]) return;
        const slot = findPosterSlot(node);
        if (!slot || slot.dataset.performancePoster === node.textContent.trim()) return;

        const title = node.textContent.trim();
        const image = document.createElement('img');
        image.src = new URL(posters[title], window.location.href).href;
        image.alt = title + ' 포스터';
        image.style.cssText = 'display:block;width:100%;height:100%;object-fit:cover;';

        slot.replaceChildren(image);
        slot.dataset.performancePoster = title;
        slot.style.padding = '0';
        slot.style.overflow = 'hidden';
        slot.style.background = '#f4f4f2';
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
        syncPosters();
        observer.observe(root, { childList: true, subtree: true });
      });
    });

    observer.observe(root, { childList: true, subtree: true });
    syncPosters();
  }

document.addEventListener('DOMContentLoaded', function() {
  installPerformancePosterImages();
});
