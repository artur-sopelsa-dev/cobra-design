import { gsap } from '../core/gsap';
import SplitType from 'split-type';

/**
 * Pins [data-hero] for a scroll distance while the wordmark's individual
 * characters disperse outward (scrubbed both ways with scroll, so it stays
 * responsive to scrolling up too) revealing [data-hero-reveal] behind them —
 * mirroring the reference site's scroll-scrubbed helmet-to-face reveal,
 * rebuilt as a character-fragment reveal since we have no product photography.
 */
export function initHeroPin(root: ParentNode = document) {
  const hero = root.querySelector<HTMLElement>('[data-hero]');
  if (!hero) return;

  const wordmark = hero.querySelector<HTMLElement>('[data-hero-wordmark]');
  const sub = hero.querySelector<HTMLElement>('[data-hero-sub]');
  const reveal = hero.querySelector<HTMLElement>('[data-hero-reveal]');
  if (!wordmark) return;

  const split = new SplitType(wordmark, { types: 'chars' as any, tagName: 'span' });
  const chars = split.chars ?? [];
  if (!chars.length) return;

  gsap.set(chars, { display: 'inline-block' });

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: hero,
      start: 'top top',
      end: '+=125%',
      scrub: 1,
      pin: true,
    },
  });

  chars.forEach((char, i) => {
    const dir = i % 2 === 0 ? 1 : -1;
    tl.to(
      char,
      {
        xPercent: dir * gsap.utils.random(90, 220),
        yPercent: gsap.utils.random(-180, -280),
        rotate: dir * gsap.utils.random(20, 50),
        scale: 1.5,
        opacity: 0,
        ease: 'power2.in',
      },
      0
    );
  });

  if (reveal) tl.to(reveal, { opacity: 1, scale: 1.1, ease: 'power1.inOut' }, 0);
  if (sub) tl.to(sub, { opacity: 0, ease: 'power1.in' }, 0);
}
