import { gsap, ScrollTrigger } from '../core/gsap';

/**
 * Sweeps [data-reveal-sweep] — a thin diagonal accent line — across its
 * section, mirroring the reference site's diagonal-line sweep over the
 * portrait card rather than a full color-panel flood.
 */
export function initRevealSweeps(root: ParentNode = document) {
  const sections = root.querySelectorAll<HTMLElement>('[data-reveal]');
  sections.forEach((section) => {
    const sweep = section.querySelector<HTMLElement>('[data-reveal-sweep]');
    if (!sweep) return;

    gsap.fromTo(
      sweep,
      { xPercent: -150 },
      {
        xPercent: 150,
        duration: 1.4,
        ease: 'power2.inOut',
        scrollTrigger: {
          trigger: section,
          start: 'top 65%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  });
}

export { ScrollTrigger };
