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

  function workflowSummary(item, isProducer) {
    if (!isProducer) return '';
    return item.contentKind || '콘텐츠';
  }

  function workflowStatusClass(item) {
    if (!item) return '';
    if (item.statusLabel === '검토중') return 'is-review';
    if (item.statusLabel === '승인완료') return 'is-approved';
    return '';
  }

  const producerMaterialGroups = [
    {
      title: '영상',
      rows: [
        ['자막O & 음악O', '20/50'],
        ['자막X & 음악O', '0/50'],
        ['자막O & 음악X', '0/50'],
        ['자막X & 음악X', '0/50'],
      ],
    },
    {
      title: '음향트랙',
      rows: [
        ['대사', '20/50'],
        ['음악 & 대사', '20/50'],
      ],
    },
    {
      title: '자막',
      rows: [
        ['영어', '20/50'],
        ['한국어', '0/50'],
        ['일본어', '20/50'],
        ['기타언어', '0/50'],
      ],
    },
    {
      title: '예고편',
      rows: [
        ['자막O & 음악O', '2 개'],
        ['자막X & 음악O', '1 개'],
      ],
    },
    {
      title: '기타 자료',
      rows: [
        ['심의필증', '1 개'],
        ['작품소개서', '1 개'],
        ['포스터', '1 개'],
        ['홍보자료', '2 개'],
      ],
    },
  ];

  function renderProducerMaterialsPanel(item) {
    const renderMaterialCell = (entry) => {
      if (!entry) return '<td></td><td></td>';
      const [label, count] = entry;
      const isEmpty = count === '0개' || count === '0 개' || count.startsWith('0/');
      const countHtml = count.includes('/')
        ? count.replace(/^([^/]+)(\/\d+)$/, '<span class="count-current">$1</span><span class="count-total">$2</span>')
        : `<strong>${escapeHtml(count)}</strong>`;
      return `
        <td class="${isEmpty ? 'is-empty' : ''}">${escapeHtml(label)}</td>
        <td class="count ${isEmpty ? 'is-empty' : ''}">${countHtml}</td>
      `;
    };

    const renderGroupRows = (rows) => {
      const pairedRows = [];
      for (let index = 0; index < rows.length; index += 2) {
        pairedRows.push([rows[index], rows[index + 1]]);
      }

      return pairedRows.map(([left, right]) => `
        <tr>
          ${renderMaterialCell(left)}
          ${renderMaterialCell(right)}
        </tr>
      `).join('');
    };

    return `
      <div class="workflow-material-panel">
        ${producerMaterialGroups.map(group => `
          <section class="workflow-material-group">
            <h4><span></span>${escapeHtml(group.title)}</h4>
            <table class="workflow-material-table">
              <tbody>
                ${renderGroupRows(group.rows)}
              </tbody>
            </table>
          </section>
        `).join('')}
        <div class="workflow-material-submit">
          <p>자료 업로드를 모두 마쳤다면 완료 상태로 알려주세요.</p>
          <button type="button" data-material-upload-complete="${escapeHtml(item.id)}">
            업로드 완료
          </button>
        </div>
      </div>
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
    PRODUCTION_CONTENT_SUBMITTED: [
      { title: '콘텐츠 등록을 신청했어요.', active: true },
      { title: '콘텐츠 등록 신청이 접수되었습니다.' },
      { title: '콘텐츠 정보가 저장되었습니다.' },
    ],
    PRODUCTION_CONTENT_APPROVED: [
      { title: '관리자가 콘텐츠 등록을 승인했어요.', active: true },
      { title: '콘텐츠 등록 신청이 접수되었습니다.' },
    ],
    PRODUCTION_REVISION_REQUESTED: [
      { title: '콘텐츠 수정을 신청했어요.', active: true },
      { title: '콘텐츠 등록이 승인되었습니다.' },
    ],
    PRODUCTION_REVISION_APPROVED: [
      { title: '관리자가 수정 신청을 승인했어요.', active: true },
      { title: '콘텐츠 수정 신청이 접수되었습니다.' },
      { title: '콘텐츠 등록이 승인되었습니다.' },
    ],
    PRODUCTION_REVISION_CANCELLED: [
      { title: '제작사가 수정 신청을 취소했어요.', active: true },
      { title: '콘텐츠 수정 신청이 접수되었습니다.' },
      { title: '콘텐츠 등록이 승인되었습니다.' },
    ],
  };

  function producerTimelineForItem(item) {
    const kind = item.contentKind || '콘텐츠';
    const timelines = {
      PRODUCTION_CONTENT_SUBMITTED: [
        { title: `${kind} 등록을 신청했어요.`, active: true },
        { title: `${kind} 등록 신청이 접수되었습니다.` },
        { title: `${kind} 정보가 저장되었습니다.` },
      ],
      PRODUCTION_CONTENT_APPROVED: [
        { title: `관리자가 ${kind} 등록을 승인했어요.`, active: true },
        { title: `${kind} 등록 신청이 접수되었습니다.` },
      ],
    };
    return timelines[item.status] || producerTimelineByStatus[item.status] || [];
  }

  function renderWorkflowList(items, search, selectedId, isProducer) {
    const keyword = search.trim().toLowerCase();
    const filteredItems = items.filter(item => {
      if (!keyword) return true;
      return `${item.title} ${item.englishTitle || ''} ${item.status} ${item.statusLabel || ''}`.toLowerCase().includes(keyword);
    });

    return `
      <section class="list-card workflow-list">
        <div class="workflow-search-bar">
          <div class="workflow-search-field">
            <input class="content-search" type="search" placeholder="콘텐츠명으로 검색" value="${escapeHtml(search)}">
            <span class="workflow-search-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" focusable="false">
                <circle cx="11" cy="11" r="6"></circle>
                <path d="M16 16l4 4"></path>
              </svg>
            </span>
          </div>
        </div>
        ${filteredItems.map(item => `
          <button class="workflow-item ${item.id === selectedId ? 'selected' : ''}" data-workflow-id="${item.id}" data-status="${escapeHtml(item.status)}">
            ${renderPoster(item, false)}
            <span class="workflow-copy">
              <span class="workflow-title-row">
                <strong>${escapeHtml(item.title)}</strong>
                <small class="${workflowStatusClass(item)}">${escapeHtml(item.statusLabel || item.status)}</small>
              </span>
              ${isProducer && workflowSummary(item, isProducer)
                ? `<em>${escapeHtml(workflowSummary(item, isProducer))}</em>`
                : !isProducer && item.englishTitle ? `<em>${escapeHtml(item.englishTitle)}</em>` : ''}
              <span class="workflow-meta">
                <time>${escapeHtml(item.date)}</time>
              </span>
            </span>
          </button>
        `).join('')}
      </section>
    `;
  }

  function renderWorkflowDetail(item, isProducer, detailMode, state) {
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
    const subtitle = isUnconfirmedPlatformItem ? '' : (isProducer ? workflowSummary(item, isProducer) : item.englishTitle);
    const subtitleHtml = isUnconfirmedPlatformItem
      ? '<p class="detail-subtitle-placeholder" aria-hidden="true">&nbsp;</p>'
      : subtitle ? `<p>${escapeHtml(subtitle)}</p>` : '';
    const status = isUnconfirmedPlatformItem ? '메타데이터 전달됨' : (item.statusLabel || item.status);
    const statusClass = workflowStatusClass(item);
    const materialUploadEvents = isProducer && state.materialUploadEvents && state.materialUploadEvents[item.id]
      ? state.materialUploadEvents[item.id]
      : [];
    const baseTimeline = isProducer
      ? (item.timeline || producerTimelineForItem(item)).map(step => ({ ...step, date: step.date || item.date }))
      : timelineItems;
    const detailTimeline = materialUploadEvents.length
      ? [
          ...materialUploadEvents.map((step, index) => ({ ...step, active: index === 0 })),
          ...baseTimeline.map(step => ({ ...step, active: false })),
        ]
      : baseTimeline;
    const showGoogleDrive = isProducer && item.status !== 'PRODUCTION_CONTENT_SUBMITTED' && item.driveUrl;
    const showMaterials = isProducer && detailMode === 'materials';
    const detailUrl = item.detailUrl || `my-content-detail.html?title=${encodeURIComponent(item.title)}`;

    return `
      <section class="workflow-detail">
        <div class="workflow-detail-head">
          ${renderPoster(item, true)}
          <div class="detail-copy">
            <div class="detail-copy-top">
              <div class="detail-copy-main">
                <span class="detail-status ${statusClass}">${escapeHtml(status)}</span>
                <h2>${escapeHtml(title)}</h2>
                ${subtitleHtml}
              </div>
              ${isProducer ? `
                <div class="detail-external-actions">
                  <a class="detail-external-action" href="${escapeHtml(detailUrl)}" aria-label="상세보기">
                    <span>상세보기</span>
                    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                      <path d="M7 17L17 7"></path>
                      <path d="M9 7h8v8"></path>
                    </svg>
                  </a>
                  ${item.driveUrl ? `
                    <a class="detail-external-action drive-action" href="${escapeHtml(item.driveUrl)}" target="_blank" rel="noopener noreferrer" aria-label="구글 드라이브 바로가기">
                      <span>구글 드라이브 바로가기</span>
                      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                        <path d="M4 6.5h6l2 2h8v9a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-11Z"></path>
                      </svg>
                    </a>
                  ` : ''}
                </div>
              ` : ''}
            </div>
            ${isProducer ? `
              <div class="detail-switch ${showMaterials ? 'is-materials' : 'is-timeline'}" role="tablist" aria-label="상세 보기 전환">
                <span class="detail-switch-thumb" aria-hidden="true"></span>
                <button class="${!showMaterials ? 'active' : ''}" type="button" data-workflow-detail-mode="timeline">워크플로우</button>
                ${showGoogleDrive ? `<button class="${showMaterials ? 'active' : ''}" type="button" data-workflow-detail-mode="materials">구글 드라이브</button>` : ''}
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
        ${showMaterials ? renderProducerMaterialsPanel(item) : `
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
        `}
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
          ${renderWorkflowDetail(selected, isProducer, state.workflowDetailMode || 'timeline', state)}
        </section>
      </div>
    `;
  }

  window.ShortflowWorkflow = { renderWorkflowView };
})();
