(function () {
  const root = document.getElementById('app');
  const { appState } = window.ShortflowCommon;
  const { renderShell } = window.ShortflowNav;
  const { renderWorkflowView } = window.ShortflowWorkflow;
  const { renderMessagesView } = window.ShortflowMessages;

  function render() {
    const view = appState.tab === 'messages'
      ? renderMessagesView(appState)
      : renderWorkflowView(appState);
    root.innerHTML = renderShell(view, { activeTab: appState.tab });
  }

  root.addEventListener('click', event => {
    const tabButton = event.target.closest('[data-tab]');
    if (tabButton) {
      appState.tab = tabButton.dataset.tab;
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
