import { gsap, ScrollTrigger } from '../core/gsap';

/**
 * Animates [data-reveal-sweep] across its section on a diagonal clip-path,
 * mirroring the reference site's diagonal-line reveal transition.
 */
export function initRevealSweeps(root: ParentNode = document) {
  const sections = root.querySelectorAll<HTMLElement>('[data-reveal]');
  sections.forEach((section) => {
    const sweep = section.querySelector<HTMLElement>('[data-reveal-sweep]');
    if (!sweep) return;

    gsap.fromTo(
      sweep,
      { clipPath: 'polygon(0 0, 0 0, 0 100%, 0 100%)' },
      {
        clipPath: 'polygon(0 0, 100% 0, 85% 100%, 0 100%)',
        duration: 1.1,
        ease: 'power3.inOut',
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
