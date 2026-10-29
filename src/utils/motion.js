/**
 * @file Utilitários de detecção e cálculo de movimento/animação.
 */

/**
 * Verifica se o usuário prefere movimento reduzido (prefers-reduced-motion).
 * @returns {boolean} True se a preferência de movimento reduzido estiver ativa.
 */
export function isReducedMotionPreferred() {
  if (typeof window === 'undefined' || !window.matchMedia) {
    return false;
  }
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Função de desaceleração cúbica (ease-out cubic).
 * @param {number} t - Progresso normalizado de 0 a 1.
 * @returns {number} Valor transformado pela curva de atenuação.
 */
export function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3);
}
