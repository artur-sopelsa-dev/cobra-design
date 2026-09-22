import { gsap } from '../core/gsap';

/**
 * Animates a gradient-shaded SVG snake continuously looping around the
 * hero wordmark — a literal "cobra" orbiting COBRA. The head and the
 * visible body segment are both driven from the same arc-length value
 * (via getPointAtLength), so they stay perfectly attached; parameterizing
 * the head separately via easing/motion-path progress drifts out of sync
 * with the dash-based body around tight curves, since bezier "t" isn't
 * proportional to distance travelled.
 */
export function initHeroSnake(root: ParentNode = document) {
  const spine = root.querySelector<SVGPathElement>('[data-hero-snake-spine]');
  const highlight = root.querySelector<SVGPathElement>('[data-hero-snake-highlight]');
  const head = root.querySelector<SVGGElement>('[data-hero-snake-head]');
  if (!spine || !head) return;

  const length = spine.getTotalLength();
  const segment = length * 0.32;
  const dashArray = `${segment} ${length - segment}`;

  spine.style.strokeDasharray = dashArray;
  if (highlight) highlight.style.strokeDasharray = dashArray;

  const state = { dist: 0 };

  function render() {
    const offset = -state.dist;
    spine!.style.strokeDashoffset = String(offset);
    if (highlight) highlight!.style.strokeDashoffset = String(offset);

    const headDist = (state.dist + segment) % length;
    const p = spine!.getPointAtLength(headDist);
    const ahead = spine!.getPointAtLength((headDist + 1) % length);
    const angle = Math.atan2(ahead.y - p.y, ahead.x - p.x) * (180 / Math.PI);
    gsap.set(head, { x: p.x, y: p.y, rotation: angle });
  }

  render();

  gsap.to(state, {
    dist: length,
    duration: 9,
    ease: 'none',
    repeat: -1,
    onUpdate: render,
  });
}
