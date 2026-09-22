import '../css/main.css';
import { initLenis } from './core/lenis';
import { initSplitTextReveals } from './core/splitText';
import { initNav } from './components/nav';
import { initMarquees } from './components/marquee';
import { initCountdowns } from './components/countdown';
import { initAccordions } from './components/accordion';
import { initHorizontalScrollSections } from './components/horizontalScroll';

function init() {
  initLenis();
  initNav();
  initSplitTextReveals();
  initMarquees();
  initCountdowns();
  initAccordions();
  initHorizontalScrollSections();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
