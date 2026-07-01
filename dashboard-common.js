(function () {
  const appState = {
    tab: 'workflow',
    workflowSearch: '',
    messageTypeFilter: 'all',
    contractFilter: 'all',
    contractSearch: '',
    contractPage: 1,
    selectedWorkflowId: null,
    selectedMessageId: 'm1',
  };

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function previewText(value, length) {
    const compact = String(value).replace(/\s+/g, ' ').trim();
    return compact.length > length ? compact.slice(0, length) + '…' : compact;
  }

  function profileCard(options) {
    const showSearch = options && options.showSearch;
    const role = options && options.role ? options.role : '플랫폼';
    return `
      <section class="profile-card">
        <div class="avatar">R</div>
        <strong>Reelio</strong>
        <span>${escapeHtml(role)}</span>
        ${showSearch ? '<input class="content-search" type="search" placeholder="콘텐츠명 검색..." value="' + escapeHtml(appState.workflowSearch) + '">' : ''}
      </section>
    `;
  }

  window.ShortflowCommon = {
    appState,
    escapeHtml,
    previewText,
    profileCard,
  };
})();
