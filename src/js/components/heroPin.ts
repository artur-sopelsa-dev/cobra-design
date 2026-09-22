import { gsap } from '../core/gsap';

/**
 * Pins [data-hero] for a scroll distance while its wordmark scales up and
 * fades, mirroring the reference site's sticky helmet-zoom intro before
 * releasing into the next section.
 */
export function initHeroPin(root: ParentNode = document) {
  const hero = root.querySelector<HTMLElement>('[data-hero]');
  if (!hero) return;

  const wordmark = hero.querySelector<HTMLElement>('[data-hero-wordmark]');
  const sub = hero.querySelector<HTMLElement>('[data-hero-sub]');
  if (!wordmark) return;

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: hero,
      start: 'top top',
      end: '+=100%',
      scrub: 1,
      pin: true,
    },
  });

  tl.to(wordmark, { scale: 2.4, yPercent: -20, opacity: 0, ease: 'power1.in' }, 0);
  if (sub) tl.to(sub, { opacity: 0, ease: 'power1.in' }, 0);
}
