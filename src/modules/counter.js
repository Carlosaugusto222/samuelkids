/**
 * @file Módulo para animação suave de contadores numéricos na tela.
 */
import { ANIMATION_CONFIG } from '../config/constants.js';
import { isReducedMotionPreferred, easeOutCubic } from '../utils/motion.js';

/**
 * Anima um elemento numérico individual de 0 até o valor final.
 * @param {HTMLElement} element - Elemento que contém data-counter.
 * @param {number} targetValue - Valor final do contador.
 * @returns {void}
 */
function animateCounter(element, targetValue) {
  const valueElement = element.querySelector('.counter-value') || element;
  const startTime = performance.now();
  const duration = ANIMATION_CONFIG.counterDurationMs;

  /**
   * @param {number} currentTime
   */
  const step = (currentTime) => {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easedProgress = easeOutCubic(progress);
    const current = Math.round(targetValue * easedProgress);

    valueElement.textContent = String(current);

    if (progress < 1) {
      requestAnimationFrame(step);
    } else {
      valueElement.textContent = String(targetValue);
    }
  };

  requestAnimationFrame(step);
}

/**
 * Inicializa a observação e animação de contadores numéricos com [data-counter].
 * @returns {void}
 */
export function initCounters() {
  /** @type {NodeListOf<HTMLElement>} */
  const counterElements = document.querySelectorAll('[data-counter]');

  if (counterElements.length === 0) {
    return;
  }

  // Sem animação caso o usuário prefira redução de movimento
  if (isReducedMotionPreferred() || !('IntersectionObserver' in window)) {
    counterElements.forEach(el => {
      const target = el.getAttribute('data-counter');
      const valueEl = el.querySelector('.counter-value') || el;
      if (target) {
        valueEl.textContent = target;
      }
    });
    return;
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = /** @type {HTMLElement} */ (entry.target);
          const rawTarget = el.getAttribute('data-counter');
          const targetValue = rawTarget ? parseInt(rawTarget, 10) : NaN;

          if (!isNaN(targetValue)) {
            animateCounter(el, targetValue);
          }

          obs.unobserve(el);
        }
      });
    },
    {
      threshold: ANIMATION_CONFIG.counterObserverThreshold,
    }
  );

  counterElements.forEach(el => observer.observe(el));
}
