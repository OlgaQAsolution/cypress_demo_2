// cypress/support/e2e.js
// Global support file loaded before every spec file.
// Import custom commands and configure global behaviors here.

import './commands';

// Suppress known uncaught exceptions from third-party scripts on the demo site
// so that tests focus on application behavior rather than infrastructure noise.
// All suppressed errors are logged to the Cypress console for debugging visibility.
Cypress.on('uncaught:exception', (err) => {
  const knownPatterns = ['ResizeObserver', 'Script error', 'Non-Error exception'];
  const isKnownNoise = knownPatterns.some((pattern) => err.message.includes(pattern));
  if (isKnownNoise) {
    Cypress.log({ name: 'suppressed exception', message: err.message });
    return false;
  }
});
