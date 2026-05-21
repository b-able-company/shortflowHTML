(function () {
  const { escapeHtml, previewText, profileCard } = window.ShortflowCommon;
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
    return `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M12 3 5 6v5c0 4.4 2.9 8.4 7 10 4.1-1.6 7-5.6 7-10V6l-7-3Z"/>
        <path d="M9 12h6"/>
        <path d="M12 9v6"/>
      </svg>
    `;
  }

  function renderMessageList(selectedId) {
    return `
      <section class="list-card message-list">
        ${messageItems.map(message => `
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
        `).join('')}
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
    const selected = messageItems.find(item => item.id === state.selectedMessageId) || messageItems[0];
    return `
      <div class="dashboard-grid messages-grid">
        <aside class="left-column">
          ${profileCard({ showSearch: false })}
          ${renderMessageList(selected.id)}
        </aside>
        <section class="right-column message-right">
          ${renderMessageDetail(selected)}
        </section>
      </div>
    `;
  }

  window.ShortflowMessages = { renderMessagesView };
})();
