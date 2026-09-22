import { gsap } from '../core/gsap';

const isFinePointer = () => window.matchMedia('(hover: hover) and (pointer: fine)').matches;

/**
 * Mouse-reactive hero: a soft spotlight glow follows the cursor and the
 * wordmark tilts slightly toward it, giving the pinned hero a live,
 * interactive feel instead of a static scroll-only scale.
 */
export function initHeroParallax(root: ParentNode = document) {
  const hero = root.querySelector<HTMLElement>('[data-hero]');
  if (!hero || !isFinePointer()) return;

  const wordmark = hero.querySelector<HTMLElement>('[data-hero-wordmark]');
  const spotlight = hero.querySelector<HTMLElement>('[data-hero-spotlight]');

  const xToSpot = spotlight ? gsap.quickTo(spotlight, 'x', { duration: 0.6, ease: 'power3.out' }) : null;
  const yToSpot = spotlight ? gsap.quickTo(spotlight, 'y', { duration: 0.6, ease: 'power3.out' }) : null;
  const xToTilt = wordmark ? gsap.quickTo(wordmark, 'rotationY', { duration: 0.8, ease: 'power3.out' }) : null;
  const yToTilt = wordmark ? gsap.quickTo(wordmark, 'rotationX', { duration: 0.8, ease: 'power3.out' }) : null;

  if (wordmark) gsap.set(wordmark, { transformPerspective: 800 });

  hero.addEventListener('mouseenter', () => {
    if (spotlight) gsap.to(spotlight, { opacity: 1, duration: 0.4 });
  });

  hero.addEventListener('mousemove', (e) => {
    const rect = hero.getBoundingClientRect();
    const relX = e.clientX - rect.left;
    const relY = e.clientY - rect.top;

    xToSpot?.(relX);
    yToSpot?.(relY);

    const nx = relX / rect.width - 0.5;
    const ny = relY / rect.height - 0.5;
    xToTilt?.(nx * 14);
    yToTilt?.(ny * -14);
  });

  hero.addEventListener('mouseleave', () => {
    xToTilt?.(0);
    yToTilt?.(0);
    if (spotlight) gsap.to(spotlight, { opacity: 0, duration: 0.4 });
  });
}
