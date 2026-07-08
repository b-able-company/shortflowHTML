(function () {
  const root = document.getElementById('app');
  const { appState } = window.ShortflowCommon;
  const { renderShell } = window.ShortflowNav;
  const { renderWorkflowView } = window.ShortflowWorkflow;
  const { renderMessagesView } = window.ShortflowMessages;
  const { renderContractsView } = window.ShortflowContracts;
  const dashboardTabs = new Set(['workflow', 'contracts', 'messages']);
  const DEFAULT_INQUIRY_TYPE = '컨시어지판매';

  function syncTabFromUrl() {
    const tab = new URLSearchParams(window.location.search).get('tab');
    if (dashboardTabs.has(tab)) appState.tab = tab;
  }

  function render() {
    const view = appState.tab === 'messages'
      ? renderMessagesView(appState)
      : appState.tab === 'contracts'
        ? renderContractsView(appState)
        : renderWorkflowView(appState, { dashboardKind: 'platform' });
    root.innerHTML = renderShell(view, {
      activePage: 'platform-dashboard',
      activeTab: appState.tab,
      dashboardKind: 'platform',
      hideFooter: appState.tab === 'workflow' || appState.tab === 'messages',
    });
  }

  root.addEventListener('click', event => {
    const tabButton = event.target.closest('[data-tab]');
    if (tabButton) {
      if (!dashboardTabs.has(tabButton.dataset.tab)) return;
      event.preventDefault();
      appState.tab = tabButton.dataset.tab;
      window.history.replaceState(null, '', `shortflow-dashboard.html?tab=${appState.tab}`);
      render();
      return;
    }

    const messageButton = event.target.closest('[data-message-id]');
    if (messageButton) {
      appState.selectedMessageId = messageButton.dataset.messageId;
      render();
      return;
    }

    const workflowButton = event.target.closest('[data-workflow-id]');
    if (workflowButton) {
      appState.selectedWorkflowId = workflowButton.dataset.workflowId;
      render();
      return;
    }

    const contractFilterButton = event.target.closest('[data-contract-filter]');
    if (contractFilterButton) {
      appState.contractFilter = contractFilterButton.dataset.contractFilter;
      appState.contractPage = 1;
      render();
      return;
    }

    const contractPageButton = event.target.closest('[data-contract-page]');
    if (contractPageButton && !contractPageButton.disabled) {
      appState.contractPage = Number(contractPageButton.dataset.contractPage) || 1;
      render();
    }
  });

  root.addEventListener('input', event => {
    if (event.target.matches('.content-search')) {
      appState.workflowSearch = event.target.value;
      render();
      const nextInput = root.querySelector('.content-search');
      if (nextInput) {
        nextInput.focus();
        nextInput.setSelectionRange(nextInput.value.length, nextInput.value.length);
      }
    }

    if (event.target.matches('.contract-search')) {
      appState.contractSearch = event.target.value;
      appState.contractPage = 1;
      render();
      const nextInput = root.querySelector('.contract-search');
      if (nextInput) {
        nextInput.focus();
        nextInput.setSelectionRange(nextInput.value.length, nextInput.value.length);
      }
    }
  });

  root.addEventListener('change', event => {
    if (event.target.matches('.message-type-filter')) {
      appState.messageTypeFilter = event.target.value;
      const firstMatch = window.ShortflowData.messageItems.find(message =>
        appState.messageTypeFilter === 'all'
        || (message.inquiryType || DEFAULT_INQUIRY_TYPE) === appState.messageTypeFilter
      );
      if (firstMatch) appState.selectedMessageId = firstMatch.id;
      render();
    }
  });

  syncTabFromUrl();
  render();
})();
