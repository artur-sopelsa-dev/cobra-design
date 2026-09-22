import '../css/main.css';
import { initLenis } from './core/lenis';
import { initSplitTextReveals } from './core/splitText';
import { initNav } from './components/nav';

function init() {
  initLenis();
  initNav();
  initSplitTextReveals();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
