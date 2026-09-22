import { gsap } from '../core/gsap';

const isFinePointer = () => window.matchMedia('(hover: hover) and (pointer: fine)').matches;

/**
 * 3D tilt-on-hover for [data-tilt] cards: rotates toward the cursor
 * position within the card and lifts slightly, mirroring the reference
 * site's interactive hover treatment on its work/gallery cards.
 */
export function initCardTilt(root: ParentNode = document) {
  if (!isFinePointer()) return;

  const cards = root.querySelectorAll<HTMLElement>('[data-tilt]');

  cards.forEach((card) => {
    gsap.set(card, { transformPerspective: 700, transformStyle: 'preserve-3d' });

    const xTo = gsap.quickTo(card, 'rotationY', { duration: 0.5, ease: 'power3.out' });
    const yTo = gsap.quickTo(card, 'rotationX', { duration: 0.5, ease: 'power3.out' });
    const scaleTo = gsap.quickTo(card, 'scale', { duration: 0.5, ease: 'power3.out' });

    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / rect.width - 0.5;
      const ny = (e.clientY - rect.top) / rect.height - 0.5;
      xTo(nx * 12);
      yTo(ny * -12);
    });

    card.addEventListener('mouseenter', () => scaleTo(1.03));
    card.addEventListener('mouseleave', () => {
      xTo(0);
      yTo(0);
      scaleTo(1);
    });
  });
}
