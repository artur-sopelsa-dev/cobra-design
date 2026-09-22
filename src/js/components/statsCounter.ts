import { gsap, ScrollTrigger } from '../core/gsap';

/**
 * Counts [data-stat-value] up from 0 to its target number when scrolled
 * into view, mirroring the reference site's animated figure blocks.
 */
export function initStatsCounters(root: ParentNode = document) {
  const values = root.querySelectorAll<HTMLElement>('[data-stat-value]');
  values.forEach((el) => {
    const target = Number(el.getAttribute('data-stat-value'));
    if (Number.isNaN(target)) return;

    const suffix = el.getAttribute('data-stat-suffix') ?? '';
    const counter = { value: 0 };

    gsap.to(counter, {
      value: target,
      duration: 1.4,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
      onUpdate: () => {
        el.textContent = `${Math.round(counter.value)}${suffix}`;
      },
    });
  });
}

export { ScrollTrigger };
