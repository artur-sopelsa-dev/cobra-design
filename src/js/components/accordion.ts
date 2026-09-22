import { gsap } from '../core/gsap';

/**
 * Expandable groups of [data-accordion="item"], each with a
 * [data-accordion="trigger"] and [data-accordion="content"] — mirrors the
 * reference site's per-season historical-results dropdown pattern.
 * Only one item per [data-accordion-group] is open at a time.
 */
export function initAccordions(root: ParentNode = document) {
  const groups = root.querySelectorAll<HTMLElement>('[data-accordion-group]');
  groups.forEach(setupAccordionGroup);
}

function setupAccordionGroup(group: HTMLElement) {
  const items = Array.from(group.querySelectorAll<HTMLElement>('[data-accordion="item"]'));

  items.forEach((item) => {
    const trigger = item.querySelector<HTMLElement>('[data-accordion="trigger"]');
    const content = item.querySelector<HTMLElement>('[data-accordion="content"]');
    if (!trigger || !content) return;

    gsap.set(content, { height: 0, overflow: 'hidden' });

    trigger.addEventListener('click', () => {
      const isOpen = item.getAttribute('data-accordion-open') === 'true';

      items.forEach((other) => {
        if (other === item) return;
        const otherContent = other.querySelector<HTMLElement>('[data-accordion="content"]');
        if (!otherContent) return;
        other.setAttribute('data-accordion-open', 'false');
        gsap.to(otherContent, { height: 0, duration: 0.5, ease: 'power2.inOut' });
      });

      item.setAttribute('data-accordion-open', String(!isOpen));
      gsap.to(content, {
        height: isOpen ? 0 : 'auto',
        duration: 0.5,
        ease: 'power2.inOut',
      });
    });
  });
}
