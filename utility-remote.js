(function () {
  const STORAGE_KEY = 'shortflow-utility-remote-position';
  const DEFAULT_TOP = 80;

  function clamp(value, min, max) {
    return Math.min(Math.max(value, min), Math.max(min, max));
  }

  function readPosition() {
    try {
      const value = JSON.parse(localStorage.getItem(STORAGE_KEY));
      if (Number.isFinite(value?.x) && Number.isFinite(value?.y)) return value;
    } catch (error) {
      // Ignore malformed design-review state.
    }
    return null;
  }

  function savePosition(x, y) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ x, y }));
  }

  function constrain(remote, x, y) {
    const rect = remote.getBoundingClientRect();
    return {
      x: clamp(x, 0, window.innerWidth - rect.width),
      y: clamp(y, 0, window.innerHeight - rect.height),
    };
  }

  function setPosition(remote, x, y) {
    const next = constrain(remote, x, y);
    remote.style.left = `${next.x}px`;
    remote.style.top = `${next.y}px`;
    remote.style.right = 'auto';
    return next;
  }

  function resetPosition(remote) {
    localStorage.removeItem(STORAGE_KEY);
    remote.style.left = 'auto';
    remote.style.top = `${DEFAULT_TOP}px`;
    remote.style.right = '0';
  }

  function init(remote) {
    if (!remote || remote.dataset.draggableRemote === 'true') return;

    const handle = remote.querySelector('.utility-remote-title');
    if (!handle) return;

    remote.dataset.draggableRemote = 'true';
    handle.setAttribute('title', '드래그해서 이동 · 더블클릭해서 위치 초기화');

    const saved = readPosition();
    if (saved) {
      setPosition(remote, saved.x, saved.y);
    }
    requestAnimationFrame(() => {
      remote.style.visibility = 'visible';
    });

    let drag = null;

    handle.addEventListener('pointerdown', (event) => {
      if (event.button !== 0) return;
      const rect = remote.getBoundingClientRect();
      drag = {
        pointerId: event.pointerId,
        offsetX: event.clientX - rect.left,
        offsetY: event.clientY - rect.top,
      };
      remote.classList.add('is-dragging');
      handle.setPointerCapture?.(event.pointerId);
      event.preventDefault();
    });

    handle.addEventListener('pointermove', (event) => {
      if (!drag || drag.pointerId !== event.pointerId) return;
      setPosition(remote, event.clientX - drag.offsetX, event.clientY - drag.offsetY);
    });

    const finishDrag = (event) => {
      if (!drag || drag.pointerId !== event.pointerId) return;
      const rect = remote.getBoundingClientRect();
      const next = setPosition(remote, rect.left, rect.top);
      savePosition(next.x, next.y);
      drag = null;
      remote.classList.remove('is-dragging');
      handle.releasePointerCapture?.(event.pointerId);
    };

    handle.addEventListener('pointerup', finishDrag);
    handle.addEventListener('pointercancel', finishDrag);
    handle.addEventListener('dblclick', () => resetPosition(remote));

    window.addEventListener('resize', () => {
      const position = readPosition();
      if (!position) return;
      const next = setPosition(remote, position.x, position.y);
      savePosition(next.x, next.y);
    });
  }

  function initAll() {
    document.querySelectorAll('.utility-remote').forEach(init);
  }

  window.ShortflowUtilityRemote = { init, initAll, resetPosition };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAll);
  } else {
    initAll();
  }
})();
