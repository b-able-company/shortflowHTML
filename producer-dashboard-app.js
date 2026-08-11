(function () {
  const root = document.getElementById('app');
  const { appState } = window.ShortflowCommon;
  const { renderShell } = window.ShortflowNav;
  const { renderWorkflowView } = window.ShortflowWorkflow;

  const initialParams = new URLSearchParams(window.location.search);
  const initialWorkflowId = initialParams.get('workflow');

  if (initialWorkflowId) {
    appState.selectedWorkflowId = initialWorkflowId;
  } else if (!appState.selectedWorkflowId) {
    appState.selectedWorkflowId = 'prod-secret-marriage';
  }

  let detailModeTimer = null;

  function render() {
    root.innerHTML = renderShell(renderWorkflowView(appState, { dashboardKind: 'producer' }), {
      activePage: 'producer-dashboard',
      activeTab: 'workflow',
      dashboardKind: 'producer',
      hideFooter: true,
    });
  }

  function formatWorkflowTimestamp(date) {
    const hours = date.getHours();
    const period = hours < 12 ? '오전' : '오후';
    const displayHours = hours % 12 || 12;
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일 ${period} ${String(displayHours).padStart(2, '0')}:${minutes}`;
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
      appState.workflowDetailMode = 'timeline';
      window.history.replaceState(null, '', `producer-dashboard.html?tab=workflow&workflow=${encodeURIComponent(appState.selectedWorkflowId)}`);
      render();
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

  render();
})();
