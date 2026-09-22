import '../css/main.css';
import { initLenis } from './core/lenis';
import { initSplitTextReveals } from './core/splitText';
import { initNav } from './components/nav';
import { initMarquees } from './components/marquee';
import { initCountdowns } from './components/countdown';
import { initAccordions } from './components/accordion';
import { initHorizontalScrollSections } from './components/horizontalScroll';
import { initHeroPin } from './components/heroPin';
import { initRevealSweeps } from './components/revealSweep';
import { initStatsCounters } from './components/statsCounter';
import { initScrollReveals } from './components/scrollReveal';
import { initCustomCursor } from './components/cursor';
import { initHeroParallax } from './components/heroParallax';
import { initCardTilt } from './components/cardTilt';

function init() {
  initLenis();
  initNav();
  initCustomCursor();
  initHeroPin();
  initHeroParallax();
  initSplitTextReveals();
  initRevealSweeps();
  initScrollReveals();
  initMarquees();
  initCountdowns();
  initAccordions();
  initHorizontalScrollSections();
  initStatsCounters();
  initCardTilt();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
