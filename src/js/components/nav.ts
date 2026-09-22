import { gsap } from '../core/gsap';

export function initNav() {
  const navWrap = document.querySelector<HTMLElement>('[data-nav-wrap]');
  const hamburger = document.querySelector<HTMLElement>('[data-nav-ham]');
  const menu = document.querySelector<HTMLElement>('[data-nav-m]');
  if (!navWrap || !hamburger || !menu) return;

  let isOpen = false;

  hamburger.addEventListener('click', () => {
    isOpen = !isOpen;
    menu.classList.toggle('is-open', isOpen);
    hamburger.setAttribute('aria-expanded', String(isOpen));
    document.body.classList.toggle('nav-open', isOpen);
  });

  initNavThemeSwitcher(navWrap);
}

/**
 * Watches [data-nav-theme-target] sections and flips the nav's
 * data-nav-theme attribute (light/dark) as they cross the viewport top,
 * mirroring the reference site's theme-aware nav behavior.
 */
function initNavThemeSwitcher(navWrap: HTMLElement) {
  const targets = document.querySelectorAll<HTMLElement>('[data-nav-theme-target]');
  if (!targets.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const theme = entry.target.getAttribute('data-nav-theme-target');
          if (theme) navWrap.setAttribute('data-nav-theme', theme);
        }
      });
    },
    { rootMargin: '-50% 0px -50% 0px' }
  );

  targets.forEach((target) => observer.observe(target));
}

export function animateHamburgerIcon(el: HTMLElement, open: boolean) {
  gsap.to(el, { rotate: open ? 90 : 0, duration: 0.4, ease: 'power2.out' });
}
