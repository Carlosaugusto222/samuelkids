/**
 * SAMUEL KIDS — Interações & Micro-animações Elegantes
 */

document.addEventListener('DOMContentLoaded', () => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // 1) Intersection Observer para revelação suave ao rolar
  const revealElements = document.querySelectorAll('.reveal-on-scroll');

  if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    // Para prefers-reduced-motion ou navegadores antigos, exibe tudo imediatamente
    revealElements.forEach(el => el.classList.add('is-visible'));
  } else {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.1,
      rootMargin: '0px 0px -20px 0px'
    });

    revealElements.forEach(el => {
      // Elementos já no campo de visão inicial são exibidos imediatamente sem atraso
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight) {
        el.classList.add('is-visible');
      } else {
        observer.observe(el);
      }
    });
  }

  // 2) Animação suave de contadores numéricos (quando entram na tela)
  const counterElements = document.querySelectorAll('[data-counter]');

  if (counterElements.length > 0) {
    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      counterElements.forEach(el => {
        const target = el.getAttribute('data-counter');
        const valueEl = el.querySelector('.counter-value') || el;
        valueEl.textContent = target;
      });
    } else {
      const counterObserver = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const el = entry.target;
            const target = parseInt(el.getAttribute('data-counter'), 10);
            const valueEl = el.querySelector('.counter-value') || el;

            if (!isNaN(target)) {
              let start = 0;
              const duration = 450;
              const startTime = performance.now();

              const updateCounter = (currentTime) => {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                // Curva de desaceleração suave (ease-out cubic)
                const easeOut = 1 - Math.pow(1 - progress, 3);
                const currentVal = Math.round(start + (target - start) * easeOut);
                valueEl.textContent = currentVal;

                if (progress < 1) {
                  requestAnimationFrame(updateCounter);
                } else {
                  valueEl.textContent = target;
                }
              };

              requestAnimationFrame(updateCounter);
            }

            obs.unobserve(el);
          }
        });
      }, {
        threshold: 0.2
      });

      counterElements.forEach(el => counterObserver.observe(el));
    }
  }
});
