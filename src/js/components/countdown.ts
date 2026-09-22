const UNIT_ATTR = 'data-countdown-unit';

/**
 * Ticks [data-countdown-target] (an ISO datetime) down into child
 * elements tagged data-countdown-unit="days|hours|minutes|seconds" —
 * mirrors the reference site's next-race countdown block.
 */
export function initCountdowns(root: ParentNode = document) {
  const wraps = root.querySelectorAll<HTMLElement>('[data-countdown-target]');
  wraps.forEach(setupCountdown);
}

function setupCountdown(wrap: HTMLElement) {
  const targetAttr = wrap.getAttribute('data-countdown-target');
  if (!targetAttr) return;

  const target = new Date(targetAttr).getTime();
  if (Number.isNaN(target)) return;

  const fields: Partial<Record<'days' | 'hours' | 'minutes' | 'seconds', HTMLElement>> = {};
  wrap.querySelectorAll<HTMLElement>(`[${UNIT_ATTR}]`).forEach((el) => {
    const unit = el.getAttribute(UNIT_ATTR) as 'days' | 'hours' | 'minutes' | 'seconds' | null;
    if (unit) fields[unit] = el;
  });

  function tick() {
    const diff = Math.max(0, target - Date.now());
    const days = Math.floor(diff / 86_400_000);
    const hours = Math.floor((diff % 86_400_000) / 3_600_000);
    const minutes = Math.floor((diff % 3_600_000) / 60_000);
    const seconds = Math.floor((diff % 60_000) / 1000);

    if (fields.days) fields.days.textContent = String(days).padStart(2, '0');
    if (fields.hours) fields.hours.textContent = String(hours).padStart(2, '0');
    if (fields.minutes) fields.minutes.textContent = String(minutes).padStart(2, '0');
    if (fields.seconds) fields.seconds.textContent = String(seconds).padStart(2, '0');

    if (diff <= 0) window.clearInterval(interval);
  }

  tick();
  const interval = window.setInterval(tick, 1000);
}
