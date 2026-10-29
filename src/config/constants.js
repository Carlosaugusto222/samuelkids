/**
 * @file Constantes e configurações centrais da Samuel KIDS.
 */

/**
 * Informações de contato e atendimento da loja.
 * @readonly
 */
export const STORE_CONFIG = Object.freeze({
  name: 'SAMUEL KIDS',
  segment: 'Moda Infantil',
  phoneFormatted: '(81) 99848-6047',
  phoneRaw: '5581998486047',
  address: 'Rua Dona Fortunata, 142 — Rua do Banco do Brasil',
  addressMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Rua+Dona+Fortunata%2C+142+-+Rua+do+Banco+do+Brasil',
  defaultWhatsappMessage: 'Ol%C3%A1!%20Vim%20pelo%20Instagram%20da%20Samuel%20KIDS%20e%20quero%20conhecer%20as%20pe%C3%A7as%20dispon%C3%ADveis!',
  bioWhatsappMessage: 'Ol%C3%A1!%20Vim%20pelo%20link%20da%20bio%20e%20quero%20conhecer%20a%20cole%C3%A7%C3%A3o%20da%20Samuel%20KIDS!',
  helpWhatsappMessage: 'Ol%C3%A1!%20Vim%20pelo%20Instagram%20da%20Samuel%20KIDS%20e%20gostaria%20de%20atendimento!',
  infoWhatsappMessage: 'Ol%C3%A1!%20Gostaria%20de%20informa%C3%A7%C3%B5es%20sobre%20a%20Samuel%20KIDS',
});

/**
 * Configurações para animações e Intersection Observer.
 * @readonly
 */
export const ANIMATION_CONFIG = Object.freeze({
  observerThreshold: 0.1,
  observerRootMargin: '0px 0px -20px 0px',
  counterDurationMs: 450,
  counterObserverThreshold: 0.2,
});
