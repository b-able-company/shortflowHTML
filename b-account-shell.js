(function () {
  const accountName = 'star pictures';

  function favoriteIcon() {
    return '<svg class="nav-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 1 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8Z"/></svg>';
  }

  function currentPage() {
    const script = document.querySelector('script[data-b-account-page]');
    return script?.dataset.bAccountPage || '';
  }

  function setCurrent(link, active) {
    link.classList.toggle('is-current', active);
    if (active) {
      link.setAttribute('aria-current', 'page');
    } else {
      link.removeAttribute('aria-current');
    }
  }

  function patchTopNav(activePage = currentPage()) {
    document.querySelectorAll('.primary-nav a[href="content-list.html"]').forEach((contentLink) => {
      contentLink.href = 'content-list-b.html';
      contentLink.classList.remove('active');
      contentLink.removeAttribute('aria-current');
    });

    document.querySelectorAll('.primary-nav a[href="shortflow-dashboard.html"]').forEach((dashboardLink) => {
      dashboardLink.href = 'content-list-b.html#platformDashboardCopy';
      dashboardLink.classList.remove('active');
      dashboardLink.removeAttribute('aria-current');
    });

    document.querySelectorAll('.account-head').forEach((head) => {
      head.href = 'owner-b.html';
      const name = head.querySelector('strong');
      if (name && /^Reel(?:io|oo)$/.test(name.textContent.trim())) {
        name.textContent = accountName;
      }
      setCurrent(head, activePage === 'mypage');
    });

    document.querySelectorAll('.account-menu-item[href="cart.html"], .account-menu-item[href="cart-b.html"]').forEach((cartItem) => {
      cartItem.href = 'cart-b.html';
      setCurrent(cartItem, activePage === 'cart');
      const menu = cartItem.closest('.account-menu');
      if (!menu || menu.querySelector('.account-favorite-link')) return;
      cartItem.insertAdjacentHTML('afterend', `
        <a class="account-menu-item account-favorite-link" href="content-favorites-b.html" role="menuitem">
          ${favoriteIcon()}
          <span>즐겨찾기</span>
        </a>
      `);
    });

    document.querySelectorAll('.account-favorite-link').forEach((favoriteLink) => {
      favoriteLink.href = 'content-favorites-b.html';
      setCurrent(favoriteLink, activePage === 'favorites');
    });
  }

  function init() {
    patchTopNav();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  window.ShortflowBAccountShell = {
    patchTopNav,
  };
})();
