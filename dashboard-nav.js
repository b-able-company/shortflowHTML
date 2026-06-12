(function () {
  if (!window.__SHORTFLOW_DEFER_NAV__ && !document.querySelector('script[data-utility-remote-script]')) {
    const utilityScript = document.createElement('script');
    utilityScript.src = 'utility-remote.js';
    utilityScript.dataset.utilityRemoteScript = 'true';
    document.head.appendChild(utilityScript);
  }

  const primaryNavItems = [
    { id: 'content', label: '콘텐츠', href: 'content-list.html', role: 'platform' },
    { id: 'concierge', label: '컨시어지', href: 'concierge.html', role: 'platform' },
    { id: 'platform-dashboard', label: '대시보드', href: 'shortflow-dashboard.html', aliases: ['dashboard'], role: 'platform' },
    { id: 'my-content', label: '내콘텐츠', href: 'contentlist-prod.html', role: 'producer' },
    { id: 'producer-dashboard', label: '대시보드', href: 'producer-dashboard.html', role: 'producer' },
    { id: 'script-analysis', label: 'AI 대본분석', href: '#', role: 'producer' },
    { id: 'guide', label: '이용가이드', href: '#', role: 'shared' },
  ];
  const rolePages = {
    platform: new Set(['content', 'concierge', 'platform-dashboard', 'dashboard']),
    producer: new Set(['my-content', 'producer-dashboard', 'script-analysis']),
  };

  const platformDashboardTabs = [
    { id: 'workflow', label: '워크플로우', href: 'shortflow-dashboard.html?tab=workflow' },
    { id: 'messages', label: '문의함', href: 'shortflow-dashboard.html?tab=messages' },
  ];

  const producerDashboardTabs = [
    { id: 'workflow', label: '워크플로우', href: 'producer-dashboard.html?tab=workflow' },
    { id: 'settlement', label: '정산', href: 'settlement-list.html' },
    { id: 'performance', label: '퍼포먼스', href: 'performance.html' },
  ];

  const icons = {
    bell: '<svg class="nav-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>',
    cart: '<svg class="nav-icon" viewBox="0 0 24 24" aria-hidden="true"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h8.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>',
    moon: '<svg class="nav-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z"/></svg>',
  };

  function renderTopNav(activePage) {
    const currentPage = activePage || 'platform-dashboard';
    const currentRole = resolveViewRole(currentPage);

    return `
      <header class="top-nav">
        <div class="nav-inner">
          <a class="brand" href="${currentRole === 'producer' ? 'contentlist-prod.html' : 'content-list.html'}" aria-label="숏플로우 홈">
            <img class="brand-logo" src="images/shortflow-logo.svg" alt="숏플로우 Shortflow">
          </a>
          <nav class="primary-nav" aria-label="주 메뉴">
            ${primaryNavItems.filter(item => item.role === 'shared' || item.role === currentRole).map(item => {
              const active = item.id === currentPage || (item.aliases || []).includes(currentPage);
              return `
                <a class="${active ? 'active' : ''}" href="${item.href}" ${active ? 'aria-current="page"' : ''}>${item.label}</a>
              `;
            }).join('')}
          </nav>
          <div class="nav-actions">
            <button class="icon-action" aria-label="알림">${icons.bell}</button>
            ${currentRole === 'platform' ? `<a class="icon-action cart" href="cart.html" aria-label="카트">${icons.cart}</a>` : ''}
            <button class="icon-action" aria-label="테마">${icons.moon}</button>
            <button class="lang">한국어</button>
            <a class="user ${currentPage === 'mypage' ? 'active' : ''}" href="${currentRole === 'producer' ? 'owner-prod.html' : 'owner.html'}" ${currentPage === 'mypage' ? 'aria-current="page"' : ''}>Reelio</a>
            <a class="logout" href="login/login.html">로그아웃</a>
          </div>
        </div>
      </header>
    `;
  }

  function resolveViewRole(currentPage) {
    if (rolePages.platform.has(currentPage)) {
      rememberViewRole('platform');
      return 'platform';
    }
    if (rolePages.producer.has(currentPage)) {
      rememberViewRole('producer');
      return 'producer';
    }
    try {
      return localStorage.getItem('shortflow-view-role') === 'producer' ? 'producer' : 'platform';
    } catch (error) {
      return 'platform';
    }
  }

  function rememberViewRole(role) {
    try {
      localStorage.setItem('shortflow-view-role', role);
    } catch (error) {
      // Local storage can be unavailable in restricted preview contexts.
    }
  }

  function dashboardTabsFor(kind) {
    return kind === 'producer' ? producerDashboardTabs : platformDashboardTabs;
  }

  function renderDashboardSubNav(activeTab, kind) {
    const dashboardTabs = dashboardTabsFor(kind);
    return `
      <div class="sub-nav">
        <div class="sub-nav-inner">
          ${dashboardTabs.map(tab => `
            <a class="${tab.id === activeTab ? 'active' : ''}" href="${tab.href}" data-tab="${tab.id}" ${tab.id === activeTab ? 'aria-current="page"' : ''}>${tab.label}</a>
          `).join('')}
        </div>
      </div>
    `;
  }

  function renderFooter() {
    return `
      <footer class="content-footer">
        <div class="footer-inner">
          <div class="footer-top">
            <a class="footer-brand" href="content-list.html"><span>short</span><b>flow</b></a>
            <nav class="footer-links" aria-label="푸터 링크">
              <a href="#">개인정보 처리방침</a>
              <a href="#">이용약관</a>
            </nav>
            <a class="footer-cta" href="concierge.html">온보딩 문의하기</a>
          </div>
          <div class="footer-info">
            <span>(주) 비에이블컴퍼니</span>
            <span>|</span>
            <span>대표이사 강다해</span>
            <span>|</span>
            <span>주소: 서울시 강남구 테헤란로 123, 6층</span>
            <span>|</span>
            <span>Tel: 070-5151-1827</span>
            <span>고객문의: shortflow@bable-company.com</span>
          </div>
          <div class="footer-divider"></div>
          <div class="footer-copy">© 2026 shortflow. All rights reserved.</div>
        </div>
      </footer>
    `;
  }

  function renderShell(contentHtml, options) {
    const config = options || {};
    const activePage = config.activePage || 'platform-dashboard';
    const subNavHtml = config.showDashboardSubNav === false
      ? ''
      : renderDashboardSubNav(config.activeTab, config.dashboardKind);

    return `
      ${renderTopNav(activePage)}
      ${subNavHtml}
      <main class="main">${contentHtml}</main>
      ${renderFooter()}
    `;
  }

  function ensureNavStylesheet() {
    if (document.querySelector('link[href="dashboard-common.css"]')) return;
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'dashboard-common.css';
    document.head.appendChild(link);
  }

  function mountTopNav(target, activePage) {
    const node = typeof target === 'string' ? document.querySelector(target) : target;
    if (!node) return;
    ensureNavStylesheet();
    node.innerHTML = renderTopNav(activePage);
  }

  function mountFooter() {
    if (document.querySelector('.content-footer')) return;
    document.body.insertAdjacentHTML('beforeend', renderFooter());
  }

  function mount(options) {
    const config = options || {};
    const target = config.target || '[data-shortflow-nav]';
    let node = typeof target === 'string' ? document.querySelector(target) : target;

    if (!node) {
      node = document.createElement('div');
      node.setAttribute('data-shortflow-nav', config.active || 'platform-dashboard');
      document.body.prepend(node);
    }

    mountTopNav(node, config.active || node.dataset.shortflowNav || 'dashboard');
    mountFooter();
    addUtilityShortcutButtons();
  }

  function mountDeclarativeNavs() {
    document.querySelectorAll('[data-shortflow-nav]').forEach(node => {
      mountTopNav(node, node.dataset.shortflowNav);
    });
    mountFooter();
    
    // Add temporary view switcher outside the design canvas.
    addUtilityShortcutButtons();
  }

  function addUtilityShortcutButtons() {
    if (document.querySelector('.utility-remote')) return;

    const remote = document.createElement('div');
    remote.className = 'utility-remote';

    const title = document.createElement('div');
    title.className = 'utility-remote-title';
    title.textContent = 'VIEW SWITCH';
    remote.appendChild(title);

    const currentRole = resolveViewRole(document.querySelector('[data-shortflow-nav]')?.dataset.shortflowNav);

    const platformButton = document.createElement('a');
    platformButton.className = 'utility-toggle platform-view-toggle' + (currentRole === 'platform' ? ' active' : '');
    platformButton.href = 'content-list.html';
    platformButton.setAttribute('aria-label', '플랫폼 입장 화면');
    platformButton.textContent = '플랫폼 입장 뷰';
    platformButton.addEventListener('click', function() {
      rememberViewRole('platform');
    });
    remote.appendChild(platformButton);

    const producerButton = document.createElement('a');
    producerButton.className = 'utility-toggle producer-view-toggle' + (currentRole === 'producer' ? ' active' : '');
    producerButton.href = 'contentlist-prod.html';
    producerButton.setAttribute('aria-label', '제작사 입장 화면');
    producerButton.textContent = '제작사 입장 뷰';
    producerButton.addEventListener('click', function() {
      rememberViewRole('producer');
    });
    remote.appendChild(producerButton);

    const adminButton = document.createElement('a');
    adminButton.className = 'utility-toggle admin-toggle';
    adminButton.href = 'admin/index.html';
    adminButton.setAttribute('aria-label', '관리자 입장 화면');
    adminButton.textContent = '관리자 입장 뷰';
    remote.appendChild(adminButton);

    const firstLoginButton = document.createElement('a');
    firstLoginButton.className = 'utility-toggle first-login-toggle';
    firstLoginButton.href = 'first-login-setup.html';
    firstLoginButton.setAttribute('aria-label', '첫 로그인 설정');
    firstLoginButton.textContent = '첫로그인';
    remote.appendChild(firstLoginButton);

    const loginButton = document.createElement('a');
    loginButton.className = 'utility-toggle login-view-toggle';
    loginButton.href = 'login/login.html';
    loginButton.setAttribute('aria-label', '로그인 화면');
    loginButton.textContent = '로그인 뷰';
    remote.appendChild(loginButton);

    const signupButton = document.createElement('a');
    signupButton.className = 'utility-toggle signup-view-toggle';
    signupButton.href = 'login/index.html';
    signupButton.setAttribute('aria-label', '회원가입 화면');
    signupButton.textContent = '회원가입 뷰';
    remote.appendChild(signupButton);

    document.body.appendChild(remote);
    window.ShortflowUtilityRemote?.init(remote);
  }

  if (!window.__SHORTFLOW_DEFER_NAV__) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', mountDeclarativeNavs);
    } else {
      mountDeclarativeNavs();
    }
  }

  window.ShortflowNav = {
    renderTopNav,
    renderDashboardSubNav,
    renderFooter,
    renderShell,
    mountTopNav,
    mountFooter,
    mount,
  };
})();
