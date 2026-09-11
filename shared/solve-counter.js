(function () {
  const configuredId = document.currentScript?.dataset.breakoutId || '';
  const apiUrl = (window.SOLVE_COUNTER_API_URL || '').replace(/\/+$/, '');
  const idPattern = /^[a-z0-9-]{1,80}$/;
  let activeBreakoutId = configuredId;
  let counterElement = null;
  let currentCount = null;

  window.initializeSolveCounter = initializeSolveCounter;
  window.recordSuccessfulSolve = recordSuccessfulSolve;

  function initializeSolveCounter(breakoutId = configuredId) {
    if (!idPattern.test(breakoutId)) return;
    activeBreakoutId = breakoutId;
    counterElement = ensureCounterElement();

    if (!apiUrl) {
      counterElement.hidden = true;
      return;
    }

    setCounterText('Loading Breakout Solves...', true);
    loadCount();
  }

  async function recordSuccessfulSolve(breakoutId = activeBreakoutId) {
    if (!idPattern.test(breakoutId) || !apiUrl) return null;
    activeBreakoutId = breakoutId;
    counterElement = ensureCounterElement();

    const sessionKey = `breakoutSolved_${breakoutId}`;
    if (sessionStorage.getItem(sessionKey) === 'true') {
      if (currentCount === null) await loadCount();
      return currentCount;
    }

    try {
      const response = await fetch(`${apiUrl}/counts/${encodeURIComponent(breakoutId)}/increment`, {
        method: 'POST',
        credentials: 'omit',
        referrerPolicy: 'no-referrer'
      });

      if (!response.ok) throw new Error('Counter increment failed');

      const data = await response.json();
      currentCount = normalizeCount(data.count);
      sessionStorage.setItem(sessionKey, 'true');
      renderCount(currentCount);
      return currentCount;
    } catch (error) {
      setCounterText('Breakout Solves unavailable', true);
      return null;
    }
  }

  async function loadCount() {
    try {
      const response = await fetch(`${apiUrl}/counts/${encodeURIComponent(activeBreakoutId)}`, {
        method: 'GET',
        credentials: 'omit',
        referrerPolicy: 'no-referrer'
      });

      if (!response.ok) throw new Error('Counter load failed');

      const data = await response.json();
      currentCount = normalizeCount(data.count);
      renderCount(currentCount);
      return currentCount;
    } catch (error) {
      setCounterText('Breakout Solves unavailable', true);
      return null;
    }
  }

  function ensureCounterElement() {
    const existing = document.querySelector('[data-solve-counter]');
    if (existing) return existing;

    const element = document.createElement('div');
    element.className = 'solve-counter';
    element.dataset.solveCounter = '';
    element.setAttribute('role', 'status');
    element.setAttribute('aria-live', 'polite');
    document.body.append(element);
    return element;
  }

  function renderCount(count) {
    setCounterText(`🎉 ${count.toLocaleString()} Breakout Solves!`, false);
  }

  function setCounterText(text, muted) {
    if (!counterElement) return;
    counterElement.hidden = false;
    counterElement.textContent = text;
    counterElement.classList.toggle('is-muted', muted);
  }

  function normalizeCount(value) {
    const count = Number(value);
    return Number.isFinite(count) && count >= 0 ? Math.floor(count) : 0;
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => initializeSolveCounter(), { once: true });
  } else {
    initializeSolveCounter();
  }
})();
