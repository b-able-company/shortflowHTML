try {
  localStorage.removeItem('shortflow-sidebar-collapsed');
} catch (error) {
  // localStorage가 제한된 환경에서는 기본 펼침 상태를 사용합니다.
}

if (!document.querySelector('script[data-utility-remote-script]')) {
  const utilityScript = document.createElement('script');
  utilityScript.src = '../utility-remote.js';
  utilityScript.dataset.utilityRemoteScript = 'true';
  document.head.appendChild(utilityScript);
}

document.addEventListener('DOMContentLoaded', () => {
  const sidebar = document.querySelector('.sb');
  const toggle = document.querySelector('.sb-toggle');
  const topbar = document.querySelector('.main > .topbar');

  const breadcrumbMap = {
    'dashboard-admin.html': ['대시보드', () => '운영 현황'],
    'kpi-admin.html': ['대시보드', () => 'KPI'],
    'member-admin.html': ['회원 관리', () =>
      document.getElementById('view-companies')?.classList.contains('active') ? '회사' : '유저'],
    'content-admin-full.html': ['콘텐츠 관리', () => {
      const activeContentTab = document.querySelector('.nav [data-main-tab].active')?.dataset.mainTab || location.hash.slice(1);
      if (activeContentTab === 'plans') return '전체 기획안';
      return document.getElementById('pane-revisions')?.style.display === 'flex' ? '수정 요청' : '전체 콘텐츠';
    }],
    'workflow-admin.html': ['거래 관리', () => {
      const activeView = document.querySelector('.view.active')?.id;
      const tradeType = activeView === 'view-bundle' ? '묶음 거래' : activeView === 'view-turnkey' ? '턴키 거래' : '단일 거래';
      return ['워크플로우', tradeType];
    }],
    'turnkey-intent-admin.html': ['거래 관리', () => '문의함'],
    'platform-contract-admin.html': ['거래 관리', () => '유통 계약 관리'],
    'settlement-admin.html': ['정산', () => {
      const activeView = document.querySelector('.view.active')?.id;
      return activeView === 'view-settlement' || activeView === 'view-completed' ? '정산 진행 관리' : '계약관리';
    }],
    'mail-admin.html': ['운영', () => '메일 발송'],
    'audit-log.html': ['운영', () => '관리 이력'],
    'mail-history.html': ['운영', () => '메일 이력'],
    'admin-profile.html': ['관리자', () => '관리자 정보'],
  };

  const pageHelpMap = {
    'audit-log.html': '관리자 화면에서 처리된 주요 작업 이력을 확인하는 페이지입니다. 처리자, 작업 유형, 대상, 처리 일시를 기준으로 운영 기록을 조회할 수 있습니다.',
    'mail-history.html': '시스템 자동 메일로 발송된 내역을 확인하는 페이지입니다. 수신자, 메일 종류, 발송 일시와 함께 성공/실패 여부를 조회할 수 있습니다.',
  };

  const renderBreadcrumb = () => {
    if (!topbar) return;
    const fileName = location.pathname.split('/').pop() || 'dashboard-admin.html';
    const config = breadcrumbMap[fileName];
    if (!config) return;
    const [parent, getCurrent] = config;
    const currentItems = [getCurrent()].flat().filter(Boolean);
    const current = currentItems[currentItems.length - 1] || '';
    const key = `${parent}/${currentItems.join('/')}`;
    if (topbar.dataset.breadcrumbKey === key) return;
    topbar.dataset.breadcrumbKey = key;
    const helpText = pageHelpMap[fileName];
    topbar.innerHTML = `
      <div class="admin-breadcrumb">
        <span>${parent}</span>
        ${currentItems.map((item, index) => `
          <span class="admin-breadcrumb-separator">/</span>
          <span class="${index === currentItems.length - 1 ? 'admin-breadcrumb-current' : ''}">${item}</span>
        `).join('')}
        ${helpText ? `<button class="page-help" type="button" aria-label="${current} 페이지 설명" data-tooltip="${helpText}">i</button>` : ''}
      </div>
    `;
  };

  renderBreadcrumb();

  if (topbar) {
    let breadcrumbFrame = 0;
    const scheduleBreadcrumb = () => {
      cancelAnimationFrame(breadcrumbFrame);
      breadcrumbFrame = requestAnimationFrame(renderBreadcrumb);
    };
    const breadcrumbObserver = new MutationObserver(scheduleBreadcrumb);
    breadcrumbObserver.observe(document.querySelector('.main'), {
      subtree: true,
      attributes: true,
      attributeFilter: ['class', 'style'],
    });
    window.addEventListener('hashchange', scheduleBreadcrumb);
  }

  const initResizableSplits = () => {
    document.querySelectorAll('.main .split').forEach((split, index) => {
      if (split.classList.contains('content-split')) return;
      if (split.classList.contains('workflow-split')) return;
      if (split.classList.contains('intent-split')) return;
      if (split.classList.contains('contract-split')) return;
      if (split.dataset.resizableBound) return;

      const leftPane = Array.from(split.children).find(child => child.classList.contains('lp'));
      const rightPane = Array.from(split.children).find(child => child.classList.contains('dp'));
      if (!leftPane || !rightPane) return;

      split.dataset.resizableBound = '1';
      split.classList.add('admin-resizable-split');

      const resizer = document.createElement('div');
      resizer.className = 'admin-split-resizer';
      resizer.setAttribute('role', 'separator');
      resizer.setAttribute('aria-orientation', 'vertical');
      resizer.setAttribute('aria-label', '목록과 상세 영역 크기 조절');
      resizer.setAttribute('tabindex', '0');
      split.insertBefore(resizer, rightPane);

      const fileName = location.pathname.split('/').pop() || 'admin';
      const viewId = split.closest('.view')?.id || `split-${index}`;
      const storageKey = `shortflow-admin-split:${fileName}:${viewId}`;

      const applyLeftWidth = (width, save = false) => {
        const available = split.clientWidth - resizer.offsetWidth;
        if (available <= 0) return;
        const minLeft = Math.min(360, available * .4);
        const minRight = Math.min(380, available * .4);
        const nextWidth = Math.max(minLeft, Math.min(width, available - minRight));
        leftPane.style.flex = `0 0 ${nextWidth}px`;
        leftPane.style.width = `${nextWidth}px`;
        rightPane.style.flex = '1 1 0';
        resizer.setAttribute('aria-valuenow', String(Math.round((nextWidth / available) * 100)));
        if (save) {
          try {
            localStorage.setItem(storageKey, String(nextWidth / available));
          } catch (error) {
            // 저장이 제한된 환경에서는 현재 세션의 크기만 유지합니다.
          }
        }
      };

      let savedRatio = 0;
      try {
        savedRatio = Number(localStorage.getItem(storageKey));
      } catch (error) {
        // 저장값을 읽을 수 없으면 기본 비율을 사용합니다.
      }

      if (savedRatio > 0 && savedRatio < 1) {
        let restored = false;
        const restoreSavedRatio = () => {
          const available = split.clientWidth - resizer.offsetWidth;
          if (restored || available <= 0) return;
          applyLeftWidth(available * savedRatio);
          restored = true;
        };
        requestAnimationFrame(restoreSavedRatio);
        const splitObserver = new ResizeObserver(restoreSavedRatio);
        splitObserver.observe(split);
      }

      const resetSplit = () => {
        leftPane.style.removeProperty('flex');
        leftPane.style.removeProperty('width');
        rightPane.style.removeProperty('flex');
        resizer.removeAttribute('aria-valuenow');
        try {
          localStorage.removeItem(storageKey);
        } catch (error) {
          // 저장소 접근이 제한된 경우 무시합니다.
        }
      };

      resizer.addEventListener('dblclick', resetSplit);
      resizer.addEventListener('pointerdown', event => {
        if (event.button !== 0) return;
        event.preventDefault();
        resizer.setPointerCapture(event.pointerId);
        resizer.classList.add('dragging');
        document.body.classList.add('admin-split-resizing');

        const splitRect = split.getBoundingClientRect();
        const onMove = moveEvent => {
          applyLeftWidth(moveEvent.clientX - splitRect.left);
        };
        const onEnd = endEvent => {
          if (resizer.hasPointerCapture(endEvent.pointerId)) {
            resizer.releasePointerCapture(endEvent.pointerId);
          }
          resizer.classList.remove('dragging');
          document.body.classList.remove('admin-split-resizing');
          const available = split.clientWidth - resizer.offsetWidth;
          applyLeftWidth(leftPane.getBoundingClientRect().width, available > 0);
          resizer.removeEventListener('pointermove', onMove);
          resizer.removeEventListener('pointerup', onEnd);
          resizer.removeEventListener('pointercancel', onEnd);
        };

        resizer.addEventListener('pointermove', onMove);
        resizer.addEventListener('pointerup', onEnd);
        resizer.addEventListener('pointercancel', onEnd);
      });

      resizer.addEventListener('keydown', event => {
        if (!['ArrowLeft', 'ArrowRight', 'Home'].includes(event.key)) return;
        event.preventDefault();
        if (event.key === 'Home') {
          resetSplit();
          return;
        }
        const direction = event.key === 'ArrowLeft' ? -1 : 1;
        applyLeftWidth(leftPane.getBoundingClientRect().width + direction * 24, true);
      });
    });
  };

  initResizableSplits();

  if (!document.querySelector('.utility-remote')) {
    const remote = document.createElement('div');
    remote.className = 'utility-remote';
    remote.innerHTML = `
      <div class="utility-remote-title">VIEW SWITCH</div>
      <a class="utility-toggle platform-view-toggle" href="../content-list.html">플랫폼 입장 뷰</a>
      <a class="utility-toggle producer-view-toggle" href="../contentlist-prod.html">제작사 입장 뷰</a>
      <a class="utility-toggle admin-toggle active" href="index.html">관리자 입장 뷰</a>
      <a class="utility-toggle first-login-toggle" href="../first-login-setup.html">첫로그인</a>
      <a class="utility-toggle login-view-toggle" href="../login/login.html">로그인 뷰</a>
      <a class="utility-toggle signup-view-toggle" href="../login/index.html">회원가입 뷰</a>
      <a class="utility-toggle video-view-toggle" href="../video-view.html">영상 조회 페이지</a>
    `;
    document.body.appendChild(remote);
    window.ShortflowUtilityRemote?.init(remote);
  }

  if (!sidebar) return;

  const logoMain = sidebar.querySelector('.sb-logo-main');
  if (logoMain && !logoMain.dataset.logoMounted) {
    logoMain.dataset.logoMounted = '1';
    logoMain.innerHTML = `
      <span class="admin-sidebar-logo-stack">
        <a class="admin-sidebar-logo-link" href="dashboard-admin.html" aria-label="숏플로우 관리자 홈">
          <img class="admin-sidebar-logo-img" src="../images/ui/shortflow-logo.svg" alt="shortflow">
        </a>
        <span class="admin-sidebar-logo-sub">Admin</span>
      </span>
    `;
    logoMain.nextElementSibling?.classList.contains('sb-logo-sub')
      && (logoMain.nextElementSibling.hidden = true);
  }

  const menuLabel = sidebar.querySelector('.nav > .nav-label');
  if (menuLabel) {
    menuLabel.textContent = 'MENU';
    menuLabel.classList.add('admin-menu-label');
  }

  const dashboardLink = sidebar.querySelector('.nav > a[href="dashboard-admin.html"]');
  if (dashboardLink) {
    dashboardLink.innerHTML = '<i class="ti ti-home"></i> 대시보드';

    let dashboardSub = dashboardLink.nextElementSibling;
    const hasDashboardSub = dashboardSub?.classList.contains('sub')
      && dashboardSub.querySelector('a[href="kpi-admin.html"]');

    if (!hasDashboardSub) {
      dashboardSub = document.createElement('div');
      dashboardSub.className = 'sub';
      dashboardSub.innerHTML = `
        <a class="ni" href="dashboard-admin.html">운영 현황</a>
        <a class="ni" href="kpi-admin.html">KPI</a>
      `;
      dashboardLink.insertAdjacentElement('afterend', dashboardSub);
    }

    const currentFile = location.pathname.split('/').pop();
    const isDashboardSection = ['dashboard-admin.html', 'kpi-admin.html'].includes(currentFile);
    dashboardLink.classList.toggle('active', isDashboardSection);
    dashboardSub.querySelector('a[href="dashboard-admin.html"]')
      ?.classList.toggle('active', currentFile === 'dashboard-admin.html');
    dashboardSub.querySelector('a[href="kpi-admin.html"]')
      ?.classList.toggle('active', currentFile === 'kpi-admin.html');
  }

  const nav = sidebar.querySelector('.nav');
  if (nav && !nav.querySelector('a[href="content-admin-full.html#plans"], a[href="#plans"][data-main-tab="plans"]')) {
    const contentSub = Array.from(nav.children)
      .find((child) => child.classList?.contains('sub')
        && child.querySelector('a[href="content-admin-full.html#list"], a[href="#list"][data-main-tab="contents"]'));
    const revisionsLink = contentSub?.querySelector('a[href="content-admin-full.html#revisions"], a[href="#revisions"][data-main-tab="revisions"]');

    if (contentSub) {
      const plansLink = document.createElement('a');
      plansLink.className = 'ni';
      plansLink.href = 'content-admin-full.html#plans';
      plansLink.textContent = '전체 기획안';
      if (revisionsLink) {
        revisionsLink.insertAdjacentElement('beforebegin', plansLink);
      } else {
        contentSub.appendChild(plansLink);
      }
    }
  }

  if (nav && !nav.querySelector('[data-admin-trade-parent]')) {
    const currentFile = location.pathname.split('/').pop() || 'dashboard-admin.html';
    const workflowLink = Array.from(nav.children)
      .find((child) => child.matches?.('a[href="workflow-admin.html"]'));
    const workflowSub = workflowLink?.nextElementSibling?.classList.contains('sub')
      ? workflowLink.nextElementSibling
      : null;
    const intentLink = Array.from(nav.children)
      .find((child) => child.matches?.('a[href="turnkey-intent-admin.html"]'));
    const contractLink = Array.from(nav.children)
      .find((child) => child.matches?.('a[href="platform-contract-admin.html"]'));

    if (workflowLink || intentLink || contractLink) {
      const tradeParent = document.createElement('a');
      tradeParent.className = 'ni';
      tradeParent.href = 'workflow-admin.html';
      tradeParent.dataset.adminTradeParent = 'true';
      tradeParent.innerHTML = '<i class="ti ti-briefcase"></i> 거래 관리';

      const tradeSub = document.createElement('div');
      tradeSub.className = 'sub';
      tradeSub.innerHTML = `
        <a class="ni${currentFile === 'workflow-admin.html' ? ' active' : ''}" href="workflow-admin.html">워크플로우</a>
        <a class="ni${currentFile === 'platform-contract-admin.html' ? ' active' : ''}" href="platform-contract-admin.html">유통 계약 관리</a>
        <a class="ni${currentFile === 'turnkey-intent-admin.html' ? ' active' : ''}" href="turnkey-intent-admin.html">문의함</a>
      `;

      (workflowLink || intentLink || contractLink).insertAdjacentElement('beforebegin', tradeParent);
      tradeParent.insertAdjacentElement('afterend', tradeSub);
      workflowSub?.remove();
      workflowLink?.remove();
      intentLink?.remove();
      contractLink?.remove();
    }
  }

  if (nav && !nav.querySelector('[data-admin-ops-parent]')) {
    const currentFile = location.pathname.split('/').pop() || 'dashboard-admin.html';
    const mailLink = Array.from(nav.children)
      .find((child) => child.matches?.('a[href="mail-admin.html"]'));
    const auditLink = Array.from(nav.children)
      .find((child) => child.matches?.('a[href="audit-log.html"]'));
    const mailHistoryLink = Array.from(nav.children)
      .find((child) => child.matches?.('a[href="mail-history.html"]'));

    if (mailLink || auditLink) {
      const opsParent = document.createElement('a');
      opsParent.className = 'ni';
      opsParent.href = 'mail-admin.html';
      opsParent.dataset.adminOpsParent = 'true';
      opsParent.innerHTML = '<i class="ti ti-settings"></i> 운영';

      const opsSub = document.createElement('div');
      opsSub.className = 'sub';
      opsSub.innerHTML = `
        <a class="ni${currentFile === 'mail-admin.html' ? ' active' : ''}" href="mail-admin.html">메일 발송</a>
        <a class="ni${currentFile === 'audit-log.html' ? ' active' : ''}" href="audit-log.html">관리 이력</a>
        <a class="ni${currentFile === 'mail-history.html' ? ' active' : ''}" href="mail-history.html">메일 이력</a>
      `;

      (mailLink || auditLink).insertAdjacentElement('beforebegin', opsParent);
      opsParent.insertAdjacentElement('afterend', opsSub);
      mailLink?.remove();
      auditLink.remove();
      mailHistoryLink?.remove();
    }
  }

  const navOpenStorageKey = 'shortflow-admin-open-nav';
  const readOpenNavKeys = () => {
    try {
      const parsed = JSON.parse(localStorage.getItem(navOpenStorageKey) || '[]');
      return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
      return [];
    }
  };
  let openNavKeys = readOpenNavKeys();
  const getNavSubKey = (sub) => {
    const parent = sub?.previousElementSibling;
    if (!parent?.classList?.contains('ni')) return '';
    const href = parent.getAttribute('href') || '';
    const label = parent.textContent.replace(/\s+/g, ' ').trim();
    return `${href}::${label}`;
  };
  const saveOpenNavKeys = () => {
    try {
      localStorage.setItem(navOpenStorageKey, JSON.stringify(openNavKeys));
    } catch (error) {
      // 저장소 접근이 제한된 경우 현재 페이지 상태만 유지합니다.
    }
  };
  const setNavSubOpen = (sub, open, save = true) => {
    const parent = sub?.previousElementSibling;
    if (!sub || !parent?.classList?.contains('ni')) return;
    const key = getNavSubKey(sub);
    parent.setAttribute('aria-expanded', String(open));
    sub.classList.toggle('admin-sub-open', open);
    if (!save || !key) return;
    const keySet = new Set(openNavKeys);
    if (open) {
      keySet.add(key);
    } else {
      keySet.delete(key);
    }
    openNavKeys = Array.from(keySet);
    saveOpenNavKeys();
  };

  if (nav && !nav.dataset.submenuCaptureBound) {
    nav.dataset.submenuCaptureBound = '1';
    nav.addEventListener('click', (event) => {
      const clickTarget = event.target instanceof Element ? event.target : event.target?.parentElement;
      const clickedItem = clickTarget?.closest('.ni');
      if (!clickedItem || !nav.contains(clickedItem)) return;

      const childSub = clickedItem.nextElementSibling?.classList.contains('sub')
        ? clickedItem.nextElementSibling
        : null;
      if (childSub) {
        event.preventDefault();
        event.stopImmediatePropagation();

        const willOpen = !childSub.classList.contains('admin-sub-open');
        setNavSubOpen(childSub, willOpen);
        return;
      }

      const parentSub = clickedItem.closest('.sub');
      if (parentSub?.classList.contains('admin-nav-sub')) {
        setNavSubOpen(parentSub, true);
      }
    }, true);
  }

  sidebar.querySelectorAll('.nav > .sub').forEach((sub) => {
    const parent = sub.previousElementSibling;
    if (!parent?.classList.contains('ni')) return;

    sub.classList.add('admin-nav-sub');
    parent.classList.add('admin-nav-parent');
    parent.setAttribute('aria-expanded', 'false');

    if (!parent.querySelector('.admin-nav-chevron')) {
      const chevron = document.createElement('span');
      chevron.className = 'admin-nav-chevron';
      chevron.innerHTML = '<i class="ti ti-chevron-right"></i>';
      parent.insertBefore(chevron, parent.firstChild);
    }

    const shouldOpen = sub.querySelector('.ni.active') || openNavKeys.includes(getNavSubKey(sub));
    if (shouldOpen) {
      parent.classList.remove('active');
      setNavSubOpen(sub, true, false);
    }
  });

  const adminInfo = sidebar.querySelector('.sb-foot');
  if (adminInfo && !adminInfo.dataset.profileBound) {
    adminInfo.dataset.profileBound = '1';
    const profileTarget = Array.from(adminInfo.children).find((child) => !child.classList.contains('ava'));

    if (profileTarget) {
      profileTarget.classList.add('sb-profile-link');
      profileTarget.setAttribute('role', 'link');
      profileTarget.setAttribute('tabindex', '0');
      profileTarget.setAttribute('title', '관리자 정보');
    }

    const goProfile = () => {
      window.location.href = 'admin-profile.html';
    };

    profileTarget?.addEventListener('click', goProfile);
    profileTarget?.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        goProfile();
      }
    });

    const logoutButton = document.createElement('a');
    logoutButton.className = 'admin-logout-btn';
    logoutButton.href = '../login/login.html';
    logoutButton.setAttribute('aria-label', '로그아웃');
    logoutButton.setAttribute('title', '로그아웃');
    logoutButton.innerHTML = '<i class="ti ti-logout"></i>';
    adminInfo.appendChild(logoutButton);
  }

  document.documentElement.classList.remove('admin-sidebar-collapsed-pending');
  sidebar.classList.remove('collapsed');

  if (!toggle) return;
  toggle.hidden = true;
  toggle.setAttribute('aria-hidden', 'true');
});
