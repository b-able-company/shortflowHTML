(function () {
  const root = document.getElementById('app');
  const { appState } = window.ShortflowCommon;
  const { renderShell } = window.ShortflowNav;
  const { renderWorkflowView } = window.ShortflowWorkflow;

  const initialParams = new URLSearchParams(window.location.search);
  const workflowTabs = new Set(['workflow']);
  const initialTab = workflowTabs.has(initialParams.get('tab'))
    ? initialParams.get('tab')
    : 'workflow';
  const initialWorkflowId = initialParams.get('workflow');
  appState.tab = initialTab;

  if (initialWorkflowId) {
    appState.selectedWorkflowId = initialWorkflowId;
  } else if (!appState.selectedWorkflowId) {
    appState.selectedWorkflowId = 'prod-secret-marriage';
  }

  let detailModeTimer = null;

  function render() {
    root.innerHTML = renderShell(renderWorkflowView(appState, { dashboardKind: 'producer' }), {
      activePage: 'producer-dashboard',
      activeTab: appState.tab,
      dashboardKind: 'producer',
      hideFooter: true,
    });
  }

  function renderPreservingWorkflowScroll() {
    const workflowList = root.querySelector('.workflow-list');
    const scrollTop = workflowList ? workflowList.scrollTop : 0;
    render();
    const nextWorkflowList = root.querySelector('.workflow-list');
    if (nextWorkflowList) nextWorkflowList.scrollTop = scrollTop;
  }

  function formatWorkflowTimestamp(date) {
    const hours = date.getHours();
    const period = hours < 12 ? '오전' : '오후';
    const displayHours = hours % 12 || 12;
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일 ${period} ${String(displayHours).padStart(2, '0')}:${minutes}`;
  }

  function workflowPageUrl(workflowId) {
    return workflowId
      ? `producer-dashboard.html?tab=workflow&workflow=${encodeURIComponent(workflowId)}`
      : 'producer-dashboard.html?tab=workflow';
  }

  root.addEventListener('click', event => {
    const settlementOpenButton = event.target.closest('[data-workflow-version-settlement-open]');
    if (settlementOpenButton) {
      event.preventDefault();
      appState.workflowVersionSettlementModalOpen = true;
      render();
      document.body.style.overflow = 'hidden';
      return;
    }

    const settlementCloseButton = event.target.closest('[data-workflow-version-settlement-close]');
    const settlementBackdrop = event.target.matches('[data-workflow-version-modal-backdrop]');
    if (settlementCloseButton || settlementBackdrop) {
      appState.workflowVersionSettlementModalOpen = false;
      render();
      document.body.style.overflow = '';
      return;
    }

    const settlementConfirmButton = event.target.closest('[data-workflow-version-settlement-confirm]');
    if (settlementConfirmButton) {
      appState.workflowVersionSettlementStatus = 'CONFIRMED';
      appState.workflowVersionSettlementModalOpen = false;
      render();
      document.body.style.overflow = '';
      return;
    }

    const tabButton = event.target.closest('[data-tab]');
    if (tabButton && workflowTabs.has(tabButton.dataset.tab)) {
      if (tabButton.dataset.tab !== appState.tab) return;
      event.preventDefault();
      appState.tab = tabButton.dataset.tab;
      window.history.replaceState(null, '', workflowPageUrl());
      render();
      return;
    }

    const statFilterButton = event.target.closest('[data-workflow-stat-filter]');
    if (statFilterButton) {
      appState.workflowKindFilter = statFilterButton.dataset.workflowStatFilter || 'all';
      appState.workflowDetailMode = 'timeline';
      appState.selectedWorkflowId = '';
      renderPreservingWorkflowScroll();
      return;
    }

    const workflowButton = event.target.closest('[data-workflow-id]');
    if (workflowButton) {
      appState.selectedWorkflowId = workflowButton.dataset.workflowId;
      appState.workflowDetailMode = 'timeline';
      window.history.replaceState(null, '', workflowPageUrl(appState.selectedWorkflowId));
      renderPreservingWorkflowScroll();
      return;
    }

    const detailModeButton = event.target.closest('[data-workflow-detail-mode]');
    if (detailModeButton) {
      const nextMode = detailModeButton.dataset.workflowDetailMode;
      if (appState.workflowDetailMode === nextMode) return;
      const switcher = detailModeButton.closest('.detail-switch');
      if (switcher) {
        const thumb = switcher.querySelector('.detail-switch-thumb');
        const activeButton = switcher.querySelector('[data-workflow-detail-mode].active');
        const nextButton = switcher.querySelector(`[data-workflow-detail-mode="${nextMode}"]`);
        const animate = callback => {
          if (window.requestAnimationFrame) {
            window.requestAnimationFrame(callback);
            return;
          }
          window.setTimeout(callback, 16);
        };
        if (thumb && activeButton && nextButton) {
          const getThumbX = button => button.offsetLeft - 2;
          const startX = getThumbX(activeButton);
          const endX = getThumbX(nextButton);
          thumb.style.transition = 'none';
          thumb.style.width = `${activeButton.offsetWidth}px`;
          thumb.style.transform = `translateX(${startX}px)`;
          thumb.offsetHeight;
          animate(() => {
            thumb.style.transition = 'transform 300ms cubic-bezier(0.22, 1, 0.36, 1), width 300ms cubic-bezier(0.22, 1, 0.36, 1)';
            thumb.style.width = `${nextButton.offsetWidth}px`;
            thumb.style.transform = `translateX(${endX}px)`;
            switcher.classList.toggle('is-materials', nextMode === 'materials');
            switcher.classList.toggle('is-timeline', nextMode !== 'materials');
            switcher.querySelectorAll('[data-workflow-detail-mode]').forEach(button => {
              button.classList.toggle('active', button.dataset.workflowDetailMode === nextMode);
            });
          });
        } else {
          switcher.classList.toggle('is-materials', nextMode === 'materials');
          switcher.classList.toggle('is-timeline', nextMode !== 'materials');
        }
      }
      window.clearTimeout(detailModeTimer);
      detailModeTimer = window.setTimeout(() => {
        appState.workflowDetailMode = nextMode;
        render();
      }, 320);
      return;
    }

    const uploadCompleteButton = event.target.closest('[data-material-upload-complete]');
    if (uploadCompleteButton) {
      const workflowId = uploadCompleteButton.dataset.materialUploadComplete;
      appState.materialUploadEvents = appState.materialUploadEvents || {};
      appState.materialUploadEvents[workflowId] = appState.materialUploadEvents[workflowId] || [];
      appState.materialUploadEvents[workflowId].unshift({
        title: '메타데이터 자료 업로드를 완료했습니다.',
        date: formatWorkflowTimestamp(new Date()),
      });
      appState.workflowDetailMode = 'timeline';
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

  document.addEventListener('keydown', event => {
    if (event.key !== 'Escape' || !appState.workflowVersionSettlementModalOpen) return;
    appState.workflowVersionSettlementModalOpen = false;
    render();
    document.body.style.overflow = '';
  });

  render();
})();
