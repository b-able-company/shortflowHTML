(function () {
  const root = document.getElementById('app');
  const { appState } = window.ShortflowCommon;
  const { renderShell } = window.ShortflowNav;
  const { renderWorkflowView } = window.ShortflowWorkflow;

  function render() {
    root.innerHTML = renderShell(renderWorkflowView(appState), {
      activePage: 'producer-dashboard',
      activeTab: 'workflow',
      dashboardKind: 'producer',
    });
  }

  root.addEventListener('click', event => {
    const tabButton = event.target.closest('[data-tab]');
    if (tabButton && tabButton.dataset.tab === 'workflow') {
      event.preventDefault();
      window.history.replaceState(null, '', 'producer-dashboard.html?tab=workflow');
      render();
      return;
    }

    const workflowButton = event.target.closest('[data-workflow-id]');
    if (workflowButton) {
      appState.selectedWorkflowId = workflowButton.dataset.workflowId;
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
  });

  render();
})();
