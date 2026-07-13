(function () {
  const { escapeHtml } = window.ShortflowCommon;
  const {
    workflowItems,
    workflowStats,
    producerWorkflowItems,
    producerWorkflowStats,
  } = window.ShortflowData;

  function posterClass(tone) {
    if (!tone || tone === 'none') return 'poster none';
    return `poster ${tone}`;
  }

  function renderPoster(item, detail) {
    const className = `${posterClass(item.poster)}${detail ? ' detail-poster' : ''}${item.image ? ' has-image' : ''}`;
    const content = item.image
      ? `<img src="${escapeHtml(item.image)}" alt="${escapeHtml(item.title)} 포스터">`
      : item.poster === 'none' ? '▧' : '';
    return `<span class="${className}">${content}</span>`;
  }

  function renderStats(stats, isProducer) {
    return `
      <section class="stats-card">
        <div class="section-label"><span></span>워크플로우 현황</div>
        <div class="stats-grid">
          ${stats.map(stat => `
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
    { title: '메타데이터 다운로드가 완료되었습니다.', date: '2026년 4월 22일 오후 01:43', active: true },
    { title: '메타데이터 다운로드가 완료되었습니다.', date: '2026년 4월 21일 오전 10:11' },
    { title: '메타데이터 권한이 부여되었습니다.', date: '2026년 4월 21일 오전 10:10' },
    { title: '제안 조건을 승인했습니다.', date: '2026년 4월 21일 오전 10:10' },
    { title: '제안 조건이 수신되었습니다.', date: '2026년 4월 21일 오전 10:09' },
    { title: '유통 제안이 접수되었습니다.', date: '2026년 4월 21일 오전 10:06' },
  ];

  const producerTimelineByStatus = {
    CONTENT_DRAFT: [
      { title: '콘텐츠 정보가 임시 저장되었습니다.', active: true },
      { title: '필수 정보를 입력한 뒤 검토 요청할 수 있습니다.' },
    ],
    CONTENT_SUBMITTED: [
      { title: '관리자 검토가 진행 중입니다.', active: true },
      { title: '콘텐츠 등록 신청이 접수되었습니다.' },
      { title: '콘텐츠 정보가 저장되었습니다.' },
    ],
    CONTENT_APPROVED: [
      { title: '콘텐츠 등록이 승인되었습니다.', active: true },
      { title: '콘텐츠 등록 신청이 접수되었습니다.' },
    ],
    REVISION_REQUESTED: [
      { title: '콘텐츠 수정 신청이 접수되었습니다.', active: true },
      { title: '콘텐츠 등록이 승인되었습니다.' },
    ],
    REVISION_APPROVED: [
      { title: '콘텐츠 수정이 승인되었습니다.', active: true },
      { title: '콘텐츠 수정 신청이 접수되었습니다.' },
      { title: '콘텐츠 등록이 승인되었습니다.' },
    ],
  };

  function renderWorkflowList(items, search, selectedId, isProducer) {
    const keyword = search.trim().toLowerCase();
    const filteredItems = items.filter(item => {
      if (!keyword) return true;
      return `${item.title} ${item.sub} ${item.status} ${item.statusLabel || ''}`.toLowerCase().includes(keyword);
    });

    return `
      <section class="list-card workflow-list">
        <div class="workflow-search-bar">
          <input class="content-search" type="search" placeholder="콘텐츠명 검색..." value="${escapeHtml(search)}">
        </div>
        ${filteredItems.map(item => `
          <button class="workflow-item ${item.id === selectedId ? 'selected' : ''}" data-workflow-id="${item.id}" data-status="${escapeHtml(item.status)}">
            ${renderPoster(item, false)}
            <span class="workflow-copy">
              <strong>${escapeHtml(item.title)}</strong>
              ${isProducer && item.sub
                ? `<em>${escapeHtml(item.sub)}</em>`
                : item.englishTitle ? `<em>${escapeHtml(item.englishTitle)}</em>` : ''}
              <span class="workflow-meta">
                <small>${escapeHtml(item.statusLabel || item.status)}</small>
                <time>${escapeHtml(item.date)}</time>
              </span>
            </span>
          </button>
        `).join('')}
      </section>
    `;
  }

  function renderWorkflowDetail(item, isProducer) {
    if (!item) {
      return `
        <section class="empty-panel">
          <div class="empty-icon">▤</div>
          <p>${isProducer ? '콘텐츠를 선택하세요' : '워크플로우를 선택하세요'}</p>
        </section>
      `;
    }

    const isUnconfirmedPlatformItem = !isProducer && item.id === 'w1';
    const title = isUnconfirmedPlatformItem ? '콘텐츠 미확정' : item.title;
    const subtitle = isUnconfirmedPlatformItem ? '' : (isProducer ? item.sub : item.englishTitle);
    const subtitleHtml = isUnconfirmedPlatformItem
      ? '<p class="detail-subtitle-placeholder" aria-hidden="true">&nbsp;</p>'
      : subtitle ? `<p>${escapeHtml(subtitle)}</p>` : '';
    const status = isUnconfirmedPlatformItem ? '메타데이터 전달됨' : (item.statusLabel || item.status);
    const detailTimeline = isProducer
      ? (item.timeline || producerTimelineByStatus[item.status] || []).map(step => ({ ...step, date: step.date || item.date }))
      : timelineItems;
    const showGoogleDrive = isProducer && item.status !== 'CONTENT_SUBMITTED' && item.driveUrl;
    const detailUrl = item.detailUrl || `my-content-detail.html?title=${encodeURIComponent(item.title)}`;

    return `
      <section class="workflow-detail">
        <div class="workflow-detail-head">
          ${renderPoster(item, true)}
          <div class="detail-copy">
            <span class="detail-status">${escapeHtml(status)}</span>
            <h2>${escapeHtml(title)}</h2>
            ${subtitleHtml}
            ${isProducer ? `
              <div class="detail-actions">
                <a href="${escapeHtml(detailUrl)}">콘텐츠 상세 보기</a>
                ${showGoogleDrive ? `<a href="${escapeHtml(item.driveUrl)}" target="_blank" rel="noopener noreferrer">구글 드라이브</a>` : ''}
              </div>
            ` : `
              <div class="detail-actions">
                <button>보낸 유통 제안 보기</button>
                <button>받은 제안 조건 확인</button>
                <button>↔ 비교</button>
                <button>↓ 메타데이터 다운로드</button>
              </div>
            `}
          </div>
        </div>
        <div class="timeline-panel">
          <h3>${isProducer ? '상태 변경 이력' : '진행 타임라인'}</h3>
          <ol class="timeline-list">
            ${detailTimeline.map(step => `
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

  function renderWorkflowView(state, options) {
    const isProducer = options && options.dashboardKind === 'producer';
    const items = isProducer ? producerWorkflowItems : workflowItems;
    const stats = isProducer ? producerWorkflowStats : workflowStats;
    const selected = items.find(item => item.id === state.selectedWorkflowId);
    return `
      <div class="dashboard-grid workflow-grid">
        <aside class="left-column">
          ${renderWorkflowList(items, state.workflowSearch, state.selectedWorkflowId, isProducer)}
        </aside>
        <section class="right-column">
          ${renderStats(stats, isProducer)}
          ${renderWorkflowDetail(selected, isProducer)}
        </section>
      </div>
    `;
  }

  window.ShortflowWorkflow = { renderWorkflowView };
})();
