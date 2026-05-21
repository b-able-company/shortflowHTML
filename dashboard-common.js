(function () {
  const appState = {
    tab: 'workflow',
    workflowSearch: '',
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
    return `
      <section class="profile-card">
        <div class="avatar">R</div>
        <strong>Reelio</strong>
        <span>플랫폼</span>
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
