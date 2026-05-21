document.addEventListener('DOMContentLoaded', () => {
  const sidebar = document.querySelector('.sb');
  const toggle = document.querySelector('.sb-toggle');

  if (!sidebar || !toggle) return;

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
