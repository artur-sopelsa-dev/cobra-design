import { gsap, ScrollTrigger } from '../core/gsap';

/**
 * Fades + slides up each direct child of [data-reveal-group] with a
 * stagger as the group scrolls into view — used for the mosaic grid,
 * work cards, and stat blocks, which otherwise just appear statically.
 */
export function initScrollReveals(root: ParentNode = document) {
  const groups = root.querySelectorAll<HTMLElement>('[data-reveal-group]');

  groups.forEach((group) => {
    const items = Array.from(group.children) as HTMLElement[];
    if (!items.length) return;

    gsap.set(items, { y: 48, opacity: 0 });

    gsap.to(items, {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: 'power3.out',
      stagger: 0.08,
      scrollTrigger: {
        trigger: group,
        start: 'top 80%',
      },
    });
  });
}

export { ScrollTrigger };
