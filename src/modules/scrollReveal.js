/**
 * @file Módulo responsável por revelar elementos ao rolar (Scroll Reveal).
 */
import { ANIMATION_CONFIG } from '../config/constants.js';
import { isReducedMotionPreferred } from '../utils/motion.js';

/**
 * Inicializa o Intersection Observer para elementos com a classe .reveal-on-scroll.
 * @returns {void}
 */
export function initScrollReveal() {
  /** @type {NodeListOf<HTMLElement>} */
  const revealElements = document.querySelectorAll('.reveal-on-scroll');

  if (revealElements.length === 0) {
    return;
  }

  // Se preferir movimento reduzido ou navegador não suportar IntersectionObserver, exibe imediatamente
  if (isReducedMotionPreferred() || !('IntersectionObserver' in window)) {
    revealElements.forEach(el => el.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    },
    {
      root: null,
      threshold: ANIMATION_CONFIG.observerThreshold,
      rootMargin: ANIMATION_CONFIG.observerRootMargin,
    }
  );

  revealElements.forEach(el => {
    // Elementos já no campo de visão inicial (above-the-fold) aparecem de imediato
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight) {
      el.classList.add('is-visible');
    } else {
      observer.observe(el);
    }
  });
}
