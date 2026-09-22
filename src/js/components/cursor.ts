import { gsap } from '../core/gsap';

const isFinePointer = () => window.matchMedia('(hover: hover) and (pointer: fine)').matches;

/**
 * Custom follower cursor: a small dot that trails the mouse and scales up
 * over [data-cursor-hover] targets (links, buttons, cards) — the kind of
 * interactive cursor treatment the reference site uses.
 */
export function initCustomCursor(root: ParentNode = document) {
  if (!isFinePointer()) return;

  const cursor = document.createElement('div');
  cursor.className = 'cursor-dot';
  cursor.innerHTML = '<div class="cursor-dot-inner"></div>';
  document.body.appendChild(cursor);
  document.documentElement.classList.add('has-custom-cursor');

  const xTo = gsap.quickTo(cursor, 'x', { duration: 0.5, ease: 'power3.out' });
  const yTo = gsap.quickTo(cursor, 'y', { duration: 0.5, ease: 'power3.out' });

  window.addEventListener('mousemove', (e) => {
    xTo(e.clientX);
    yTo(e.clientY);
  });

  window.addEventListener('mousedown', () => cursor.classList.add('is-down'));
  window.addEventListener('mouseup', () => cursor.classList.remove('is-down'));

  const hoverTargets = root.querySelectorAll<HTMLElement>(
    'a, button, [data-cursor-hover]'
  );
  hoverTargets.forEach((el) => {
    el.addEventListener('mouseenter', () => cursor.classList.add('is-hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('is-hover'));
  });
}
