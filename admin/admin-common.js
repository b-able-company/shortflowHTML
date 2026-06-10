document.addEventListener('DOMContentLoaded', () => {
  const sidebar = document.querySelector('.sb');
  const toggle = document.querySelector('.sb-toggle');

  if (!document.querySelector('.utility-remote')) {
    const remote = document.createElement('div');
    remote.className = 'utility-remote';
    remote.innerHTML = `
      <div class="utility-remote-title">VIEW SWITCH</div>
      <a class="utility-toggle platform-view-toggle" href="../content-list.html">플랫폼 입장 뷰</a>
      <a class="utility-toggle producer-view-toggle" href="../contentlist-prod.html">제작사 입장 뷰</a>
      <a class="utility-toggle first-login-toggle" href="../first-login-setup.html">첫로그인</a>
      <a class="utility-toggle login-view-toggle" href="../login/login.html">로그인 뷰</a>
      <a class="utility-toggle signup-view-toggle" href="../login/index.html">회원가입 뷰</a>
      <a class="utility-toggle admin-toggle" href="index.html">ADMIN 화면 보기</a>
    `;
    document.body.appendChild(remote);
  }

  if (!sidebar) return;

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

  toggle.addEventListener('click', () => {
    setCollapsed(!sidebar.classList.contains('collapsed'));
  });

});
