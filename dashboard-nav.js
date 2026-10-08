(function () {
  const previewStorageKey = 'shortflow-admin-company-preview';
  const previewParams = new URLSearchParams(window.location.search);
  let adminPreview = null;
  try {
    const encoded = previewParams.get('adminCompanyPreview');
    const stored = encoded || sessionStorage.getItem(previewStorageKey);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (parsed && parsed.id && parsed.name && ['PRODUCTION', 'PLATFORM'].includes(parsed.type)) {
        adminPreview = parsed;
        sessionStorage.setItem(previewStorageKey, JSON.stringify(parsed));
      }
    }
  } catch (error) {
    adminPreview = null;
  }
  if (adminPreview && previewParams.has('adminCompanyPreview')) {
    previewParams.delete('adminCompanyPreview');
    const remaining = previewParams.toString();
    history.replaceState(null, '', `${location.pathname}${remaining ? `?${remaining}` : ''}${location.hash}`);
  }
  window.ShortflowAdminPreview = {
    company: adminPreview,
    applyProfile(companyInfo, companyProfile, userProfile, companyMembers, options = {}) {
      if (!adminPreview) return;
      companyInfo.name = adminPreview.name;
      companyInfo.type = adminPreview.type === 'PRODUCTION' ? '제작사' : '플랫폼';
      companyInfo.inviteCode = adminPreview.inviteCode || '-';
      Object.assign(companyProfile, {
        name: adminPreview.name,
        email: adminPreview.email || '',
        country: adminPreview.country || '',
        description: adminPreview.description || '',
        phone: adminPreview.phone || '',
        website: adminPreview.website || '',
        address: adminPreview.address || '',
      });
      if (adminPreview.type === 'PLATFORM') {
        companyProfile.appUrl = adminPreview.appUrl || '';
        companyProfile.appDescription = adminPreview.appDescription || '';
      } else {
        companyProfile.googleEmail = adminPreview.googleEmail || '';
      }
      const representative = adminPreview.representative || {};
      userProfile.name = representative.name || '회사 관리자';
      userProfile.email = representative.email || adminPreview.email || '';
      userProfile.phone = representative.phone || '';
      if (options.emailVerification) options.emailVerification.draftEmail = userProfile.email;
      companyMembers.splice(0, companyMembers.length, ...(adminPreview.members || []).map(member => ({
        id: String(member.id), name: member.name, email: member.email, role: member.role,
        permission: member.permission, joined: member.joined, you: member.role === 'OWNER',
      })));
      if (options.creditInfo) {
        options.creditInfo.balance = '-';
        options.creditInfo.updatedAt = '-';
        options.creditInfo.history.splice(0);
      }
      if (options.representativeWorks) {
        options.representativeWorks.splice(0, options.representativeWorks.length, ...(adminPreview.portfolios || []));
      }
    },
    exit() {
      try { sessionStorage.removeItem(previewStorageKey); } catch (error) { /* Storage can be unavailable. */ }
    },
  };

  if (adminPreview) {
    const isFilter = element => element.matches('input[type="search"], [data-admin-preview-filter], .content-search, .contract-search')
      || /search|filter|sort/i.test(`${element.id} ${element.className}`);
    const protectFields = () => {
      document.querySelectorAll('input, textarea, select, [contenteditable="true"]').forEach(element => {
        if (element.closest('.admin-preview-banner') || isFilter(element)) return;
        if (element.matches('[contenteditable]')) element.contentEditable = 'false';
        else if (element.matches('select, input[type="checkbox"], input[type="radio"], input[type="file"], input[type="date"], input[type="month"]')) element.disabled = true;
        else if (!element.matches('input[type="hidden"]')) element.readOnly = true;
      });
    };
    let scheduled = false;
    const scheduleProtection = () => {
      if (scheduled) return;
      scheduled = true;
      requestAnimationFrame(() => { scheduled = false; protectFields(); });
    };
    const showBlockedNotice = () => {
      let notice = document.getElementById('admin-preview-notice');
      if (!notice) {
        notice = document.createElement('div');
        notice.id = 'admin-preview-notice';
        notice.className = 'admin-preview-notice';
        notice.setAttribute('role', 'status');
        document.body.appendChild(notice);
      }
      notice.textContent = '관리자 조회 모드에서는 변경할 수 없습니다.';
      notice.classList.add('show');
      clearTimeout(notice._hideTimer);
      notice._hideTimer = setTimeout(() => notice.classList.remove('show'), 2300);
    };
    const block = event => { event.preventDefault(); event.stopImmediatePropagation(); showBlockedNotice(); };
    document.addEventListener('click', event => {
      const exitLink = event.target.closest('[data-admin-preview-exit]');
      if (exitLink) { window.ShortflowAdminPreview.exit(); return; }
      const link = event.target.closest('a');
      if (link) {
        if (link.matches('[data-onboarding-trigger]') || /(?:login\/|first-login-setup|admin\/)/.test(link.getAttribute('href') || '')) block(event);
        return;
      }
      const control = event.target.closest('button, [role="button"], input[type="submit"], input[type="button"]');
      if (!control) return;
      if (control.closest('.top-nav, .sub-nav') || control.matches('[data-admin-preview-allow]')) return;
      const description = [control.textContent, control.getAttribute('aria-label'), control.title, control.dataset.action, control.getAttribute('onclick')].filter(Boolean).join(' ');
      if (/(?:go|open)[A-Za-z]*Detail\(/.test(control.getAttribute('onclick') || '')) return;
      if (/(?:저장|수정|삭제|등록|추가|생성|발송|전송|보내|제출|승인|거절|신청|구매|결제|충전|차감|업로드|업데이트|초대|탈퇴|로그아웃|장바구니|문의하기|확정|확인|계약 체결)/i.test(description)) { block(event); return; }
      if (control.matches('[data-tab], [data-workflow-id], [data-message-id], [data-platform-workflow-stage], [data-workflow-detail-mode], [data-workflow-stat-filter], [data-contract-filter], [data-contract-page]')) return;
      if (/(?:보기|상세|닫기|취소|뒤로|이전|다음|목록|검색|필터|정렬|페이지|펼치기|접기|복사|선택|조회|미리보기|전체)/.test(description)) return;
      block(event);
    }, true);
    document.addEventListener('submit', block, true);
    document.addEventListener('beforeinput', event => {
      if (!isFilter(event.target)) block(event);
    }, true);
    document.addEventListener('change', event => {
      if (event.target.matches('input, textarea, select') && !isFilter(event.target)) block(event);
    }, true);
    document.addEventListener('drop', block, true);
    const startProtection = () => {
      protectFields();
      new MutationObserver(scheduleProtection).observe(document.body, { childList: true, subtree: true });
    };
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', startProtection, { once: true });
    else startProtection();
  }

  if (!adminPreview && !window.__SHORTFLOW_DEFER_NAV__ && !document.querySelector('script[data-utility-remote-script]')) {
    const utilityScript = document.createElement('script');
    utilityScript.src = 'utility-remote.js';
    utilityScript.dataset.utilityRemoteScript = 'true';
    document.head.appendChild(utilityScript);
  }

  const primaryNavItems = [
    { id: 'content', label: '콘텐츠', href: 'content-list.html', role: 'platform' },
    { id: 'platform-collab', label: '제작협업', href: 'platform-collaboration.html', role: 'platform' },
    { id: 'platform-dashboard', label: '대시보드', href: 'shortflow-dashboard.html', aliases: ['dashboard'], role: 'platform' },
    { id: 'my-content', label: '콘텐츠 관리', href: 'contentlist-prod.html', role: 'producer' },
    { id: 'producer-dashboard', label: '대시보드', href: 'distribution-version.html', role: 'producer' },
    { id: 'script-analysis', label: 'AI Studio', href: 'shortflow-ai-studio/index.html', role: 'producer' },
  ];
  const rolePages = {
    platform: new Set(['platform-collab', 'content', 'concierge', 'platform-dashboard', 'dashboard']),
    producer: new Set(['my-content', 'producer-dashboard', 'script-analysis']),
  };

  const platformDashboardTabs = [
    { id: 'workflow', label: '워크플로우', href: 'shortflow-dashboard.html?tab=workflow' },
    { id: 'contracts', label: '계약 현황', href: 'shortflow-dashboard.html?tab=contracts' },
    { id: 'messages', label: '문의함', href: 'shortflow-dashboard.html?tab=messages' },
  ];

  const producerDashboardTabs = [
    { id: 'workflow', label: '워크플로우', href: 'producer-dashboard.html?tab=workflow' },
    { id: 'distribution', label: '배급현황', href: 'distribution-status.html' },
    { id: 'settlement', label: '정산', href: 'settlement-list.html' },
    { id: 'performance', label: '퍼포먼스', href: 'performance.html' },
    { id: 'distribution-version', label: '배급현황버전', href: 'distribution-version.html' },
  ];

  const producerContentTabs = [
    { id: 'contents', label: '유통 콘텐츠', href: 'contentlist-prod.html' },
    { id: 'collaboration-plans', label: '제작협업 기획안', href: 'producer-collaboration.html' },
  ];

  const icons = {
    bell: '<svg class="nav-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>',
    cart: '<svg class="nav-icon" viewBox="0 0 24 24" aria-hidden="true"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h8.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>',
    globe: '<svg class="lang-globe" viewBox="0 0 16 16" aria-hidden="true"><circle cx="8" cy="8" r="6.5"/><path d="M8 1.5C5.5 4 5.5 12 8 14.5M8 1.5C10.5 4 10.5 12 8 14.5M1.5 8h13"/></svg>',
    chevronDown: '<svg class="lang-chevron" viewBox="0 0 12 12" aria-hidden="true"><path d="M3 4.5 6 7.5 9 4.5"/></svg>',
    user: '<svg class="account-user-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M20 21a8 8 0 0 0-16 0"/><circle cx="12" cy="7" r="4"/></svg>',
  };
  const languageOptions = ['KR', 'CN', 'EN'];
  const accountProfiles = {
    platform: { company: 'Reelio', roleLabel: '플랫폼', accountHref: 'owner.html' },
    producer: { company: 'Reelio', roleLabel: '제작사', accountHref: 'owner-prod.html' },
  };

  const homeLinks = {
    platform: 'content-list.html',
    producer: 'contentlist-prod.html',
  };

  function getPreferredLanguage() {
    try {
      const saved = localStorage.getItem('shortflow-language');
      return languageOptions.includes(saved) ? saved : 'KR';
    } catch (error) {
      return 'KR';
    }
  }

  function renderTopNav(activePage) {
    const currentPage = activePage || 'platform-dashboard';
    const currentRole = resolveViewRole(currentPage);
    const currentLanguage = getPreferredLanguage();
    const account = adminPreview
      ? { company: adminPreview.name, roleLabel: adminPreview.type === 'PRODUCTION' ? '제작사' : '플랫폼', accountHref: adminPreview.type === 'PRODUCTION' ? 'owner-prod.html' : 'owner.html' }
      : accountProfiles[currentRole] || accountProfiles.platform;
    const adminReturnHref = adminPreview ? `admin/member-admin.html?company=${encodeURIComponent(adminPreview.id)}#companies` : '';
    const escapeHtml = value => String(value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');

    return `
      ${adminPreview ? `
        <div class="admin-preview-banner" role="region" aria-label="관리자 조회 모드">
          <div class="admin-preview-inner">
            <div class="admin-preview-context">
              <span class="admin-preview-label"><span class="admin-preview-dot" aria-hidden="true"></span>관리자 조회</span>
              <span class="admin-preview-divider" aria-hidden="true"></span>
              <strong class="admin-preview-company" title="${escapeHtml(adminPreview.name)}">${escapeHtml(adminPreview.name)}</strong>
              <span class="admin-preview-readonly">읽기 전용</span>
            </div>
            <a class="admin-preview-exit" href="${adminReturnHref}" data-admin-preview-exit aria-label="관리자로 돌아가기" title="관리자로 돌아가기">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m9 5-5 5 5 5"/><path d="M4 10h10a6 6 0 0 1 6 6v3"/></svg>
              <span class="admin-preview-exit-label">관리자로 돌아가기</span>
            </a>
          </div>
        </div>` : ''}
      <header class="top-nav">
        <div class="nav-inner">
          <a class="brand" href="${homeLinks[currentRole] || homeLinks.platform}" aria-label="숏플로우 홈">
            <img class="brand-logo" src="images/ui/shortflow-logo.svg" alt="숏플로우 Shortflow">
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
            <div class="lang-wrap">
              <button class="lang" type="button" aria-label="사이트 언어 선택" aria-haspopup="listbox" aria-expanded="false" data-lang-trigger>
                ${icons.globe}
                <span data-lang-current>${currentLanguage}</span>
                ${icons.chevronDown}
              </button>
              <div class="lang-menu" role="listbox" aria-label="사이트 언어">
                ${languageOptions.map(code => `
                  <button class="lang-option ${code === currentLanguage ? 'active' : ''}" type="button" role="option" aria-selected="${code === currentLanguage ? 'true' : 'false'}" data-lang-code="${code}">
                    <span>${code}</span>
                  </button>
                `).join('')}
              </div>
            </div>
            <button class="icon-action" aria-label="알림">${icons.bell}</button>
            <div class="account-wrap">
              <button class="account-trigger ${currentPage === 'mypage' ? 'active' : ''}" type="button" aria-label="계정 메뉴" aria-haspopup="true">
                ${icons.user}
              </button>
              <div class="account-menu" role="menu">
                <a class="account-head" href="${account.accountHref}" role="menuitem">
                  <strong>${escapeHtml(account.company)}</strong>
                  <span>${account.roleLabel}</span>
                </a>
                ${currentRole === 'platform' ? `
                  <a class="account-menu-item" href="cart.html" role="menuitem">
                    ${icons.cart}
                    <span>장바구니</span>
                  </a>
                ` : ''}
                <a class="account-menu-item danger" href="${adminPreview ? adminReturnHref : 'login/login.html'}" role="menuitem" ${adminPreview ? 'data-admin-preview-exit' : ''}>
                  <span class="account-menu-icon">↪</span>
                  <span>${adminPreview ? '관리자로 돌아가기' : '로그아웃'}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </header>
    `;
  }

  function resolveViewRole(currentPage) {
    if (adminPreview) return adminPreview.type === 'PRODUCTION' ? 'producer' : 'platform';
    if (rolePages.platform.has(currentPage)) {
      rememberViewRole('platform');
      return 'platform';
    }
    if (rolePages.producer.has(currentPage)) {
      rememberViewRole('producer');
      return 'producer';
    }
    try {
      const savedRole = localStorage.getItem('shortflow-view-role');
      return ['platform', 'producer'].includes(savedRole) ? savedRole : 'platform';
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
    if (kind === 'producer') return '';
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

  function renderContentManageSubNav(activeTab) {
    return `
      <div class="sub-nav">
        <div class="sub-nav-inner">
          ${producerContentTabs.map(tab => `
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
            <a class="footer-cta" href="#onboarding-inquiry" data-onboarding-trigger>온보딩 문의하기</a>
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
      ${renderOnboardingModal()}
    `;
  }

  function renderOnboardingModal() {
    return `
      <div class="onboarding-modal-backdrop" id="onboardingInquiryModal" role="dialog" aria-modal="true" aria-labelledby="onboardingInquiryTitle">
        <section class="onboarding-modal" id="onboardingInquiryPanel">
          <button class="onboarding-modal-close" type="button" data-onboarding-close aria-label="닫기">×</button>
          <form class="onboarding-form" id="onboardingInquiryForm">
            <div class="onboarding-form-head">
              <h2 id="onboardingInquiryTitle">Contact us</h2>
              <p>필요한 내용을 남겨주시면 담당자가 확인 후 연락드립니다.</p>
            </div>
            <div class="onboarding-field">
              <label for="onboardingName">이름<span>*</span></label>
              <input id="onboardingName" name="name" type="text" autocomplete="name" required placeholder="이름*">
            </div>
            <div class="onboarding-field">
              <label for="onboardingEmail">이메일<span>*</span></label>
              <input id="onboardingEmail" name="email" type="email" autocomplete="email" required placeholder="이메일*">
            </div>
            <div class="onboarding-field">
              <label for="onboardingCompany">소속회사</label>
              <input id="onboardingCompany" name="company" type="text" autocomplete="organization" placeholder="소속회사">
            </div>
            <div class="onboarding-field">
              <label for="onboardingMessage">문의내용<span>*</span></label>
              <textarea id="onboardingMessage" name="message" required placeholder="문의내용*"></textarea>
            </div>
            <div class="onboarding-complete" aria-live="polite">
              <div class="onboarding-check" aria-hidden="true">
                <svg viewBox="0 0 62 62">
                  <circle cx="31" cy="31" r="26"></circle>
                  <path d="M20 31.5l7.2 7.2L43 23.8"></path>
                </svg>
              </div>
              <strong>문의가 접수되었습니다</strong>
              <span>담당자가 확인 후 연락드릴게요.</span>
            </div>
            <div class="onboarding-actions">
              <button class="onboarding-submit" type="submit">온보딩 문의하기</button>
              <button class="onboarding-confirm" type="button" data-onboarding-close>확인</button>
            </div>
          </form>
        </section>
      </div>
    `;
  }

  function renderShell(contentHtml, options) {
    const config = options || {};
    const activePage = config.activePage || 'platform-dashboard';
    const subNavHtml = config.showDashboardSubNav === false
      ? ''
      : renderDashboardSubNav(config.activeTab, config.dashboardKind);
    const footerHtml = config.hideFooter ? '' : renderFooter();

    return `
      ${renderTopNav(activePage)}
      ${subNavHtml}
      <main class="main">${contentHtml}</main>
      ${footerHtml}
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
    if (document.querySelector('.content-footer')) {
      ensureOnboardingModal();
      return;
    }
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
    if (adminPreview) return;
    if (document.querySelector('.utility-remote')) return;

    const remote = document.createElement('div');
    remote.className = 'utility-remote';
    remote.style.visibility = 'hidden';

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

    const videoViewButton = document.createElement('a');
    videoViewButton.className = 'utility-toggle video-view-toggle';
    videoViewButton.href = 'video-view.html';
    videoViewButton.setAttribute('aria-label', '영상 조회 페이지');
    videoViewButton.textContent = '영상 조회 페이지';
    remote.appendChild(videoViewButton);

    document.body.appendChild(remote);
    window.ShortflowUtilityRemote?.init(remote);
  }

  const prefetchedPages = new Set();

  function prefetchPage(href) {
    if (!href) return;

    let url;
    try {
      url = new URL(href, window.location.href);
    } catch (error) {
      return;
    }

    if (url.origin !== window.location.origin || !url.pathname.endsWith('.html')) return;
    if (url.pathname === window.location.pathname && url.search === window.location.search) return;

    const key = url.href;
    if (prefetchedPages.has(key)) return;
    prefetchedPages.add(key);

    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.as = 'document';
    link.href = key;
    document.head.appendChild(link);
  }

  function setupPagePrefetch() {
    if (document.documentElement.dataset.shortflowPrefetch === 'true') return;
    document.documentElement.dataset.shortflowPrefetch = 'true';

    const prepareLink = (event) => {
      if (!(event.target instanceof Element)) return;
      const anchor = event.target.closest('a[href]');
      if (!anchor) return;
      prefetchPage(anchor.href);
    };

    document.addEventListener('pointerover', prepareLink, { passive: true });
    document.addEventListener('focusin', prepareLink);
  }

  function closeLanguageMenus() {
    document.querySelectorAll('.lang-wrap.open').forEach(wrapper => {
      wrapper.classList.remove('open');
      wrapper.querySelector('[data-lang-trigger]')?.setAttribute('aria-expanded', 'false');
    });
  }

  function syncLanguageSelection(code) {
    document.querySelectorAll('[data-lang-current]').forEach(label => {
      label.textContent = code;
    });
    document.querySelectorAll('[data-lang-code]').forEach(option => {
      const active = option.dataset.langCode === code;
      option.classList.toggle('active', active);
      option.setAttribute('aria-selected', active ? 'true' : 'false');
    });
  }

  function setupLanguageDropdown() {
    if (document.documentElement.dataset.shortflowLanguageDropdown === 'true') return;
    document.documentElement.dataset.shortflowLanguageDropdown = 'true';

    document.addEventListener('click', event => {
      if (!(event.target instanceof Element)) return;

      const option = event.target.closest('[data-lang-code]');
      if (option) {
        const code = option.dataset.langCode;
        if (!languageOptions.includes(code)) return;
        try {
          localStorage.setItem('shortflow-language', code);
        } catch (error) {
          // The selector is visual only, so storage failure is fine.
        }
        syncLanguageSelection(code);
        closeLanguageMenus();
        return;
      }

      const trigger = event.target.closest('[data-lang-trigger]');
      if (trigger) {
        const wrapper = trigger.closest('.lang-wrap');
        const willOpen = !wrapper?.classList.contains('open');
        closeLanguageMenus();
        if (wrapper && willOpen) {
          wrapper.classList.add('open');
          trigger.setAttribute('aria-expanded', 'true');
        }
        return;
      }

      if (!event.target.closest('.lang-wrap')) {
        closeLanguageMenus();
      }
    });

    document.addEventListener('keydown', event => {
      if (event.key === 'Escape') {
        closeLanguageMenus();
      }
    });
  }

  function ensureOnboardingModal() {
    if (document.getElementById('onboardingInquiryModal')) return;
    document.body.insertAdjacentHTML('beforeend', renderOnboardingModal());
  }

  function openOnboardingModal() {
    ensureOnboardingModal();
    const modal = document.getElementById('onboardingInquiryModal');
    const panel = document.getElementById('onboardingInquiryPanel');
    const form = document.getElementById('onboardingInquiryForm');
    if (!modal || !panel || !form) return;

    form.reset();
    panel.classList.remove('is-submitted');
    modal.classList.add('is-open');
    document.body.classList.add('onboarding-modal-open');
    setTimeout(() => document.getElementById('onboardingName')?.focus(), 0);
  }

  function closeOnboardingModal() {
    const modal = document.getElementById('onboardingInquiryModal');
    const panel = document.getElementById('onboardingInquiryPanel');
    modal?.classList.remove('is-open');
    panel?.classList.remove('is-submitted');
    document.body.classList.remove('onboarding-modal-open');
  }

  function saveOnboardingInquiry(form) {
    const formData = new FormData(form);
    const inquiry = {
      id: `onboarding-${Date.now()}`,
      name: String(formData.get('name') || '').trim(),
      email: String(formData.get('email') || '').trim(),
      company: String(formData.get('company') || '').trim(),
      message: String(formData.get('message') || '').trim(),
      createdAt: new Date().toISOString(),
    };

    try {
      const key = 'shortflow-onboarding-inquiries';
      const saved = JSON.parse(localStorage.getItem(key) || '[]');
      localStorage.setItem(key, JSON.stringify([inquiry, ...saved].slice(0, 30)));
    } catch (error) {
      // Demo submissions should not fail if storage is unavailable.
    }
  }

  function setupOnboardingModal() {
    if (document.documentElement.dataset.shortflowOnboardingModal === 'true') return;
    document.documentElement.dataset.shortflowOnboardingModal = 'true';

    document.addEventListener('click', event => {
      if (!(event.target instanceof Element)) return;

      const trigger = event.target.closest('[data-onboarding-trigger]');
      if (trigger) {
        event.preventDefault();
        openOnboardingModal();
        return;
      }

      if (event.target.closest('[data-onboarding-close]')) {
        closeOnboardingModal();
        return;
      }

      const modal = document.getElementById('onboardingInquiryModal');
      if (modal && event.target === modal) {
        closeOnboardingModal();
      }
    });

    document.addEventListener('submit', event => {
      const form = event.target;
      if (!(form instanceof HTMLFormElement) || form.id !== 'onboardingInquiryForm') return;
      event.preventDefault();
      if (!form.reportValidity()) return;
      saveOnboardingInquiry(form);
      document.getElementById('onboardingInquiryPanel')?.classList.add('is-submitted');
    });

    document.addEventListener('keydown', event => {
      if (event.key === 'Escape') closeOnboardingModal();
    });
  }

  if (!window.__SHORTFLOW_DEFER_NAV__) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', mountDeclarativeNavs);
    } else {
      mountDeclarativeNavs();
    }
  }

  setupPagePrefetch();
  setupLanguageDropdown();
  setupOnboardingModal();

  window.ShortflowNav = {
    renderTopNav,
    renderDashboardSubNav,
    renderContentManageSubNav,
    renderFooter,
    renderOnboardingModal,
    renderShell,
    mountTopNav,
    mountFooter,
    mount,
    prefetchPage,
  };
})();
