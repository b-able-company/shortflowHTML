// Mount once per document; sessionStorage bridges the admin's full-page navigation.
(() => {
  if (window.flobi || document.getElementById('flobi-root')) return;
  const key = 'shortflow-adminbot-session-v1';
  const adminBase = new URL('../admin/', document.currentScript.src);
  let saved = {};
  try {
    saved = JSON.parse(sessionStorage.getItem(key)) || {};
  } catch (_) { /* Storage may be unavailable in local previews. */ }
  const messages = Array.isArray(saved.msgs)
    ? saved.msgs.filter(m => m && (typeof m.u === 'string' || Object.hasOwn(window.FLOBI_ANSWERS, m.a))) : [];
  const pending = messages.at(-1)?.u;
  if (pending) messages.pop();
  const root = document.createElement('div');
  root.id = 'flobi-root';
  root.className = 'flobi-root';
  document.body.appendChild(root);
  const widget = window.flobi = new window.FlobiWidget(root, {
    live: true, open: saved.open === true, msgs: messages,
  });
  if (Number.isFinite(saved.pos?.x) && Number.isFinite(saved.pos?.y)) {
    widget.pos = saved.pos;
    widget.applyPos();
    widget.onResize();
  }
  widget.unread = saved.unread === true;
  widget.updateLauncher();
  if (pending) widget.ask(pending);
  window.addEventListener('pagehide', () => {
    try {
      sessionStorage.setItem(key, JSON.stringify({...widget.state(), unread: widget.unread}));
    } catch (_) { /* The widget remains usable without persistence. */ }
  });
  const routes = {
    approval: 'member-admin.html#users', signups: 'member-admin.html#users',
    content: 'kpi-admin.html', edits: 'content-admin-full.html#revisions',
    settle: 'settlement-admin.html#settlement', focus: 'dashboard-admin.html',
  };
  root.addEventListener('click', event => {
    const action = event.target.closest('[data-action]')?.dataset.action;
    if (Object.hasOwn(routes, action)) location.href = new URL(routes[action], adminBase).href;
  });
})();
