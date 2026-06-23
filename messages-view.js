(function () {
  const { escapeHtml, previewText } = window.ShortflowCommon;
  const { messageItems } = window.ShortflowData;

  function renderStatus(label) {
    const tone = label === '전송됨' ? 'sent' : 'checked';
    return `<span class="status-pill ${tone}"><i></i>${escapeHtml(label)}</span>`;
  }

  function renderCommentBadge(message) {
    const count = message.adminComments ? message.adminComments.length : 0;
    if (!count) return '';
    return `
      <span class="comment-badge" aria-label="관리자 댓글 있음">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4Z"/>
        </svg>
        ${count}
      </span>
    `;
  }

  function renderAdminIcon() {
    return '<img src="images/wlogo.png" alt="">';
  }

  function renderMessageList(selectedId, activeType, filteredItems) {
    const inquiryTypes = [...new Set(messageItems.map(message => message.inquiryType || '컨시어지판매'))];
    return `
      <section class="list-card message-list">
        <div class="message-filter-bar">
          <div class="message-type-select-wrap">
            <select class="message-type-filter" aria-label="문의 유형 필터">
              <option value="all" ${activeType === 'all' ? 'selected' : ''}>전체 문의 유형</option>
              ${inquiryTypes.map(type => `
                <option value="${escapeHtml(type)}" ${activeType === type ? 'selected' : ''}>${escapeHtml(type)}</option>
              `).join('')}
            </select>
          </div>
        </div>
        ${filteredItems.map(message => `
          <button class="message-item ${message.id === selectedId ? 'selected' : ''}" data-message-id="${message.id}">
            <span class="message-item-top">
              <span class="message-top-left">
                <span class="message-type">${escapeHtml(message.inquiryType || '컨시어지판매')}</span>
                <time>${escapeHtml(message.date)} ${escapeHtml(message.time)}</time>
              </span>
              ${renderStatus(message.statusLabel)}
            </span>
            <span class="message-item-preview">
              <strong class="message-title">${escapeHtml(previewText(message.full, 20))}</strong>
              <span class="message-comment-slot">${renderCommentBadge(message)}</span>
            </span>
          </button>
        `).join('') || '<div class="message-empty">해당 유형의 문의가 없습니다.</div>'}
      </section>
    `;
  }

  function renderMessageDetail(selected) {
    const comments = selected.adminComments || [];
    return `
      <section class="message-detail">
        <div class="message-section">
          <div class="message-section-head">
            <h3>${escapeHtml(selected.inquiryType || '컨시어지판매')}</h3>
            <div class="message-detail-meta">
              <time>${escapeHtml(selected.date)} ${escapeHtml(selected.time)}</time>
              ${renderStatus(selected.statusLabel)}
            </div>
          </div>
          <div class="message-body">${escapeHtml(selected.full)}</div>
        </div>
        <div class="admin-comment-section">
          <h3>관리자 댓글</h3>
          ${comments.length ? comments.map(comment => `
            <article class="admin-comment">
              <div class="admin-comment-dot" aria-hidden="true">${renderAdminIcon()}</div>
              <div class="admin-comment-content">
                <div class="admin-comment-meta">
                  <strong>${escapeHtml(comment.name)}</strong>
                  <time>${escapeHtml(comment.date)} ${escapeHtml(comment.time)}</time>
                </div>
                <div class="admin-comment-body">${escapeHtml(comment.body)}</div>
              </div>
            </article>
          `).join('') : '<div class="admin-comment-empty">등록된 관리자 댓글이 없습니다.</div>'}
        </div>
      </section>
    `;
  }

  function renderMessagesView(state) {
    const activeType = state.messageTypeFilter || 'all';
    const filteredItems = activeType === 'all'
      ? messageItems
      : messageItems.filter(item => (item.inquiryType || '컨시어지판매') === activeType);
    const selected = filteredItems.find(item => item.id === state.selectedMessageId) || filteredItems[0] || messageItems[0];
    return `
      <div class="dashboard-grid messages-grid">
        <aside class="left-column">
          ${renderMessageList(selected.id, activeType, filteredItems)}
        </aside>
        <section class="right-column message-right">
          ${renderMessageDetail(selected)}
        </section>
      </div>
    `;
  }

  window.ShortflowMessages = { renderMessagesView };
})();
