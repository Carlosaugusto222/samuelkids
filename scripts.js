/**
 * @file Ponto de entrada JavaScript da Samuel KIDS.
 * Inicializa os módulos de scroll reveal e contadores numéricos.
 */
import { initScrollReveal } from './src/modules/scrollReveal.js';
import { initCounters } from './src/modules/counter.js';

document.addEventListener('DOMContentLoaded', () => {
  initScrollReveal();
  initCounters();
});
