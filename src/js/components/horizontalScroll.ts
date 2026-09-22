import { gsap, ScrollTrigger } from '../core/gsap';

/**
 * Pins [data-hscroll] and translates its [data-hscroll-track] horizontally
 * as the page scrolls vertically past it, scrubbed to scroll position —
 * mirrors the reference site's pinned horizontal-scroll sections.
 */
export function initHorizontalScrollSections(root: ParentNode = document) {
  const sections = root.querySelectorAll<HTMLElement>('[data-hscroll]');
  sections.forEach(setupHorizontalScroll);
}

function setupHorizontalScroll(section: HTMLElement) {
  const track = section.querySelector<HTMLElement>('[data-hscroll-track]');
  if (!track) return;

  const distance = () => track.scrollWidth - section.clientWidth;

  gsap.to(track, {
    x: () => -distance(),
    ease: 'none',
    scrollTrigger: {
      trigger: section,
      start: 'top top',
      end: () => `+=${distance()}`,
      scrub: 1,
      pin: true,
      invalidateOnRefresh: true,
    },
  });
}

export { ScrollTrigger };
