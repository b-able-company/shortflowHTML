(function () {
  const { escapeHtml, previewText } = window.ShortflowCommon;
  const { messageItems } = window.ShortflowData;
  const DEFAULT_INQUIRY_TYPE = '컨시어지판매';

  function inquiryTypeOf(message) {
    return message.inquiryType || DEFAULT_INQUIRY_TYPE;
  }

  function inquiryTypeClass(type) {
    if (type === '제작협업') return 'is-production';
    if (type === '컨시어지판매') return 'is-concierge';
    return 'is-general';
  }

  function inquiryTypeIcon(type) {
    if (type === '제작협업') {
      return '<img src="images/icon/handshake.png" alt="">';
    }
    if (type === '컨시어지판매') {
      return '<img src="images/icon/sell.png" alt="">';
    }
    return `
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M4 7h16M4 12h16M4 17h10"/>
      </svg>
    `;
  }

  function renderInquiryTypeChip(message) {
    const type = inquiryTypeOf(message);
    return `<span class="message-sender-name">${escapeHtml(type)}</span>`;
  }

  function renderInquiryTypeAvatar(message) {
    const type = inquiryTypeOf(message);
    return `<span class="message-type-avatar ${inquiryTypeClass(type)}" aria-hidden="true">${inquiryTypeIcon(type)}</span>`;
  }

  function renderStatus(label) {
    const tone = label === '전송됨' ? 'sent' : 'checked';
    return `<span class="status-pill ${tone}"><i></i>${escapeHtml(label)}</span>`;
  }

  function renderCommentBadge(message) {
    const count = message.adminComments ? message.adminComments.length : 0;
    if (!count) return '';
    return `
      <span class="comment-badge" aria-label="관리자 댓글 ${count}개">
        ${count}
      </span>
    `;
  }

  function renderAdminIcon() {
    return '<img src="images/wlogo.png" alt="">';
  }

  function renderMessageList(selectedId, activeType, filteredItems) {
    const inquiryTypes = [...new Set(messageItems.map(inquiryTypeOf))];
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
            ${renderInquiryTypeAvatar(message)}
            <span class="message-item-content">
              <span class="message-item-head">
                ${renderInquiryTypeChip(message)}
                <time>${escapeHtml(message.date)}</time>
              </span>
              <span class="message-preview-row">
                <span class="message-title">${escapeHtml(previewText(message.full, 34))}</span>
                <span class="message-comment-slot">${renderCommentBadge(message)}</span>
              </span>
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
        <div class="message-thread">
          <article class="message-bubble-row is-user">
            <div class="message-bubble">
              <div class="message-bubble-meta">
                <strong>문의 내용</strong>
                <time>${escapeHtml(selected.date)} ${escapeHtml(selected.time)}</time>
              </div>
              <div class="message-body">${escapeHtml(selected.full)}</div>
            </div>
            ${renderInquiryTypeAvatar(selected)}
          </article>

          ${comments.length ? comments.map(comment => `
            <article class="message-bubble-row is-admin">
              <div class="message-avatar" aria-hidden="true">${renderAdminIcon()}</div>
              <div class="message-bubble">
                <div class="message-bubble-meta">
                  <strong>${escapeHtml(comment.name)}</strong>
                  <time>${escapeHtml(comment.date)} ${escapeHtml(comment.time)}</time>
                </div>
                <div class="admin-comment-body">${escapeHtml(comment.body)}</div>
              </div>
            </article>
          `).join('') : '<div class="admin-comment-empty">아직 등록된 관리자 댓글이 없습니다.</div>'}
        </div>
      </section>
    `;
  }

  function renderMessagesView(state) {
    const activeType = state.messageTypeFilter || 'all';
    const filteredItems = activeType === 'all'
      ? messageItems
      : messageItems.filter(item => inquiryTypeOf(item) === activeType);
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
