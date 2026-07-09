try {
  if (localStorage.getItem('shortflow-sidebar-collapsed') === '1') {
    document.documentElement.classList.add('admin-sidebar-collapsed-pending');
  }
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
    'content-admin-full.html': ['콘텐츠 관리', () =>
      document.getElementById('pane-revisions')?.style.display === 'flex' ? '수정 요청' : '전체 콘텐츠'],
    'workflow-admin.html': ['워크플로우', () => {
      const activeView = document.querySelector('.view.active')?.id;
      return activeView === 'view-bundle' ? '묶음 거래' : activeView === 'view-turnkey' ? '턴키 거래' : '단일 거래';
    }],
    'turnkey-intent-admin.html': ['거래', () => '문의함'],
    'settlement-admin.html': ['정산', () => {
      const activeView = document.querySelector('.view.active')?.id;
      return activeView === 'view-settlement' ? '정산처리' : activeView === 'view-completed' ? '정산완료' : '계약관리';
    }],
    'mail-admin.html': ['운영', () => '메일 발송'],
    'audit-log.html': ['운영', () => '관리 이력'],
    'admin-profile.html': ['관리자', () => '관리자 정보'],
  };

  const renderBreadcrumb = () => {
    if (!topbar) return;
    const fileName = location.pathname.split('/').pop() || 'dashboard-admin.html';
    const config = breadcrumbMap[fileName];
    if (!config) return;
    const [parent, getCurrent] = config;
    const current = getCurrent();
    const key = `${parent}/${current}`;
    if (topbar.dataset.breadcrumbKey === key) return;
    topbar.dataset.breadcrumbKey = key;
    topbar.innerHTML = `
      <div class="admin-breadcrumb">
        <span>${parent}</span>
        <span class="admin-breadcrumb-separator">/</span>
        <span class="admin-breadcrumb-current">${current}</span>
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
    `;
    document.body.appendChild(remote);
    window.ShortflowUtilityRemote?.init(remote);
  }

  if (!sidebar) return;

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

  if (!toggle) return;

  const setCollapsed = (collapsed) => {
    sidebar.classList.toggle('collapsed', collapsed);
    toggle.setAttribute('aria-expanded', String(!collapsed));
    toggle.setAttribute('title', collapsed ? '네비 펼치기' : '네비 접기');
    localStorage.setItem('shortflow-sidebar-collapsed', collapsed ? '1' : '0');
  };

  setCollapsed(localStorage.getItem('shortflow-sidebar-collapsed') === '1');
  document.documentElement.classList.remove('admin-sidebar-collapsed-pending');

  toggle.addEventListener('click', () => {
    setCollapsed(!sidebar.classList.contains('collapsed'));
  });

});
