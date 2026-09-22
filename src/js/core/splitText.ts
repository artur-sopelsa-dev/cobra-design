import SplitType from 'split-type';
import { gsap, ScrollTrigger } from './gsap';

type SplitMode = 'lines' | 'chars' | 'lines,chars';

interface RevealOptions {
  stagger?: number;
  duration?: number;
  delay?: number;
  y?: string;
}

function getSplitTypes(el: HTMLElement): ('lines' | 'chars')[] {
  const attr = el.getAttribute('split-text') as SplitMode | null;
  if (!attr) return ['lines'];
  return attr.split(',').map((s) => s.trim()) as ('lines' | 'chars')[];
}

export function splitElement(el: HTMLElement): SplitType {
  const types = getSplitTypes(el);
  const splitTypeArg = types.includes('chars') ? 'lines,words,chars' : 'lines,words';
  return new SplitType(el, { types: splitTypeArg as any, tagName: 'span' });
}

export function revealOnScroll(el: HTMLElement, opts: RevealOptions = {}) {
  const split = splitElement(el);
  const targets = split.chars?.length ? split.chars : split.lines;
  if (!targets || !targets.length) return;

  gsap.set(targets, { yPercent: 110 });

  gsap.to(targets, {
    yPercent: 0,
    duration: opts.duration ?? 0.9,
    ease: 'power4.out',
    stagger: opts.stagger ?? 0.02,
    delay: opts.delay ?? 0,
    scrollTrigger: {
      trigger: el,
      start: 'top 85%',
    },
  });
}

export function initSplitTextReveals(root: ParentNode = document) {
  const elements = root.querySelectorAll<HTMLElement>('[split-text]');
  elements.forEach((el) => revealOnScroll(el));
}

export { ScrollTrigger };
