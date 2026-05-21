(function () {
  const primaryNavItems = [
    { id: 'content', label: '콘텐츠', href: 'content-list.html' },
    { id: 'concierge', label: 'IP 컨시어지', href: 'concierge.html' },
    { id: 'dashboard', label: '대시보드', href: 'shortflow-dashboard.html' },
    { id: 'guide', label: '이용가이드', href: '#' },
  ];

  const dashboardTabs = [
    { id: 'workflow', label: '워크플로우' },
    { id: 'messages', label: '문의함' },
  ];

  const icons = {
    bell: '<svg class="nav-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>',
    cart: '<svg class="nav-icon" viewBox="0 0 24 24" aria-hidden="true"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h8.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>',
    moon: '<svg class="nav-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z"/></svg>',
  };

  function renderTopNav(activePage) {
    const currentPage = activePage || 'dashboard';

    return `
      <header class="top-nav">
        <div class="nav-inner">
          <div class="brand"><span>short</span><b>flow</b></div>
          <nav class="primary-nav" aria-label="주 메뉴">
            ${primaryNavItems.map(item => `
              <a class="${item.id === currentPage ? 'active' : ''}" href="${item.href}" ${item.id === currentPage ? 'aria-current="page"' : ''}>${item.label}</a>
            `).join('')}
          </nav>
          <div class="nav-actions">
            <button class="icon-action" aria-label="알림">${icons.bell}</button>
            <a class="icon-action cart" href="cart.html" aria-label="카트">${icons.cart}</a>
            <button class="icon-action" aria-label="테마">${icons.moon}</button>
            <button class="lang">한국어</button>
            <span class="user">Reelio</span>
            <button class="logout">로그아웃</button>
          </div>
        </div>
      </header>
    `;
  }

  function renderDashboardSubNav(activeTab) {
    return `
      <div class="sub-nav">
        <div class="sub-nav-inner">
          ${dashboardTabs.map(tab => `
            <button class="${tab.id === activeTab ? 'active' : ''}" data-tab="${tab.id}">${tab.label}</button>
          `).join('')}
        </div>
      </div>
    `;
  }

  function renderShell(contentHtml, options) {
    const config = options || {};
    const activePage = config.activePage || 'dashboard';
    const subNavHtml = config.showDashboardSubNav === false
      ? ''
      : renderDashboardSubNav(config.activeTab);

    return `
      ${renderTopNav(activePage)}
      ${subNavHtml}
      <main class="main">${contentHtml}</main>
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

  function mount(options) {
    const config = options || {};
    const target = config.target || '[data-shortflow-nav]';
    let node = typeof target === 'string' ? document.querySelector(target) : target;

    if (!node) {
      node = document.createElement('div');
      node.setAttribute('data-shortflow-nav', config.active || 'dashboard');
      document.body.prepend(node);
    }

    mountTopNav(node, config.active || node.dataset.shortflowNav || 'dashboard');
  }

  function mountDeclarativeNavs() {
    document.querySelectorAll('[data-shortflow-nav]').forEach(node => {
      mountTopNav(node, node.dataset.shortflowNav);
    });
    
    // Add admin toggle button to top-right corner
    addAdminToggleButton();
  }

  function addAdminToggleButton() {
    // Check if button already exists
    if (document.querySelector('.admin-toggle')) return;
    
    const adminButton = document.createElement('a');
    adminButton.className = 'admin-toggle';
    adminButton.href = 'admin/index.html';
    adminButton.setAttribute('aria-label', '관리자');
    adminButton.textContent = 'ADMIN 화면 보기';
    document.body.appendChild(adminButton);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mountDeclarativeNavs);
  } else {
    mountDeclarativeNavs();
  }

  window.ShortflowNav = {
    renderTopNav,
    renderDashboardSubNav,
    renderShell,
    mountTopNav,
    mount,
  };
})();
