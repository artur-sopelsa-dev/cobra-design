import { gsap } from '../core/gsap';

/**
 * Infinite horizontal marquee. Duplicates [data-marquee-track] content
 * until it overflows the viewport at least twice, then tweens it on a
 * seamless -50% loop — mirrors the reference site's footer partner-logo
 * marquee pattern.
 */
export function initMarquees(root: ParentNode = document) {
  const marquees = root.querySelectorAll<HTMLElement>('[data-marquee]');
  marquees.forEach(setupMarquee);
}

function setupMarquee(marquee: HTMLElement) {
  const track = marquee.querySelector<HTMLElement>('[data-marquee-track]');
  if (!track) return;

  const speed = Number(marquee.getAttribute('data-marquee-speed')) || 40;
  const direction = marquee.getAttribute('data-marquee-direction') === 'right' ? 1 : -1;

  const originalChildren = Array.from(track.children);
  if (!originalChildren.length) return;

  let guard = 0;
  while (track.scrollWidth < marquee.clientWidth * 2 && guard < 10) {
    originalChildren.forEach((child) => track.appendChild(child.cloneNode(true)));
    guard += 1;
  }

  const setWidth = track.scrollWidth / 2;
  const wrap = gsap.utils.wrap(direction === 1 ? 0 : -setWidth, direction === 1 ? setWidth : 0);

  gsap.set(track, { x: 0 });
  gsap.to(track, {
    x: direction * -setWidth,
    duration: setWidth / speed,
    ease: 'none',
    repeat: -1,
    modifiers: {
      x: (x) => `${wrap(parseFloat(x))}px`,
    },
  });
}
