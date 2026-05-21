(function () {
  const { escapeHtml, profileCard } = window.ShortflowCommon;
  const { workflowItems, workflowStats } = window.ShortflowData;

  function posterClass(tone) {
    if (!tone || tone === 'none') return 'poster none';
    return `poster ${tone}`;
  }

  function renderStats() {
    return `
      <section class="stats-card">
        <div class="section-label"><span></span>워크플로우 현황</div>
        <div class="stats-grid">
          ${workflowStats.map(stat => `
            <div class="stat ${stat.accent ? 'accent' : ''}">
              <strong>${stat.value}</strong>
              <span>${escapeHtml(stat.label)}</span>
            </div>
          `).join('')}
        </div>
      </section>
    `;
  }

  const timelineItems = [
    { title: '메타데이터 다운로드가 완료되었습니다.', date: '2026년 4월 22일 오후 01:43 (KST)', active: true },
    { title: '메타데이터 다운로드가 완료되었습니다.', date: '2026년 4월 21일 오전 10:11 (KST)' },
    { title: '메타데이터 권한이 부여되었습니다.', date: '2026년 4월 21일 오전 10:10 (KST)' },
    { title: '제안 조건을 승인했습니다.', date: '2026년 4월 21일 오전 10:10 (KST)' },
    { title: '제안 조건이 수신되었습니다.', date: '2026년 4월 21일 오전 10:09 (KST)' },
    { title: '유통 제안이 접수되었습니다.', date: '2026년 4월 21일 오전 10:06 (KST)' },
  ];

  function renderWorkflowList(search, selectedId) {
    const keyword = search.trim().toLowerCase();
    const items = workflowItems.filter(item => {
      if (!keyword) return true;
      return `${item.title} ${item.sub}`.toLowerCase().includes(keyword);
    });

    return `
      <section class="list-card workflow-list">
        ${items.map(item => `
          <button class="workflow-item ${item.id === selectedId ? 'selected' : ''}" data-workflow-id="${item.id}">
            <span class="${posterClass(item.poster)}">${item.poster === 'none' ? '▧' : ''}</span>
            <span class="workflow-copy">
              <strong>${escapeHtml(item.title)}</strong>
              ${item.sub ? `<em>${escapeHtml(item.sub)}</em>` : ''}
              <small>${escapeHtml(item.status)}</small>
            </span>
            <time>${escapeHtml(item.date)}</time>
          </button>
        `).join('')}
      </section>
    `;
  }

  function renderWorkflowDetail(item) {
    if (!item) {
      return `
        <section class="empty-panel">
          <div class="empty-icon">▤</div>
          <p>워크플로우를 선택하세요</p>
        </section>
      `;
    }

    const title = item.id === 'w1' ? '콘텐츠 미확정' : item.title;
    const subtitle = item.id === 'w1' ? '' : item.sub;
    const subtitleHtml = item.id === 'w1'
      ? '<p class="detail-subtitle-placeholder" aria-hidden="true">&nbsp;</p>'
      : subtitle ? `<p>${escapeHtml(subtitle)}</p>` : '';
    const status = item.id === 'w1' ? '메타데이터 전달됨' : item.status;

    return `
      <section class="workflow-detail">
        <div class="workflow-detail-head">
          <span class="${posterClass(item.poster)} detail-poster">${item.poster === 'none' ? '▧' : ''}</span>
          <div class="detail-copy">
            <span class="detail-status">${escapeHtml(status)}</span>
            <h2>${escapeHtml(title)}</h2>
            ${subtitleHtml}
            <div class="detail-actions">
              <button>보낸 유통 제안 보기</button>
              <button>받은 제안 조건 확인</button>
              <button>↔ 비교</button>
              <button>↓ 메타데이터 다운로드</button>
            </div>
          </div>
        </div>
        <div class="timeline-panel">
          <h3>진행 타임라인</h3>
          <ol class="timeline-list">
            ${timelineItems.map(step => `
              <li class="${step.active ? 'active' : ''}">
                <strong>${escapeHtml(step.title)}</strong>
                <time>${escapeHtml(step.date)}</time>
              </li>
            `).join('')}
          </ol>
        </div>
      </section>
    `;
  }

  function renderWorkflowView(state) {
    const selected = workflowItems.find(item => item.id === state.selectedWorkflowId);
    return `
      <div class="dashboard-grid workflow-grid">
        <aside class="left-column">
          ${profileCard({ showSearch: true })}
          ${renderWorkflowList(state.workflowSearch, state.selectedWorkflowId)}
        </aside>
        <section class="right-column">
          ${renderStats()}
          ${renderWorkflowDetail(selected)}
        </section>
      </div>
    `;
  }

  window.ShortflowWorkflow = { renderWorkflowView };
})();
