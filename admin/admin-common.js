document.addEventListener('DOMContentLoaded', () => {
  const sidebar = document.querySelector('.sb');
  const toggle = document.querySelector('.sb-toggle');

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

  // Add USER switch button to top-right corner (fixed position)
  const userLink = document.createElement('a');
  userLink.className = 'user-toggle';
  userLink.href = '../content-list.html';
  userLink.textContent = 'USER 화면 보기';
  userLink.setAttribute('aria-label', 'Switch to user view');
  document.body.appendChild(userLink);
});
