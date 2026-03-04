const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://parabank.parasoft.com',
    specPattern: 'cypress/e2e/**/*.cy.js',
    supportFile: 'cypress/support/e2e.js',
    viewportWidth: 1280,
    viewportHeight: 720,
    defaultCommandTimeout: 10000,
    requestTimeout: 15000,
    responseTimeout: 30000,
    pageLoadTimeout: 30000,
    retries: {
      runMode: 2,
      openMode: 0,
    },
    video: false,
    screenshotOnRunFailure: true,
    env: {
      // Default credentials for the public ParaBank demo site (john/demo).
      // Override these via CYPRESS_validUsername and CYPRESS_validPassword
      // environment variables or GitHub Actions secrets for CI runs.
      validUsername: 'john',
      validPassword: 'demo',
    },
  },
});
