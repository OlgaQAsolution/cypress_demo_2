/**
 * LoginPage.js
 * Page Object Model for the ParaBank login page (/).
 * Encapsulates all locators and user-facing interactions related to authentication.
 */
class LoginPage {
  // ─── Locators ───────────────────────────────────────────────────────────────

  /** @returns {Cypress.Chainable} The username text input inside the login panel */
  get usernameInput() {
    return cy.get('#loginPanel input[name="username"]');
  }

  /** @returns {Cypress.Chainable} The password text input inside the login panel */
  get passwordInput() {
    return cy.get('#loginPanel input[name="password"]');
  }

  /** @returns {Cypress.Chainable} The Log In submit button inside the login panel */
  get loginButton() {
    return cy.get('#loginPanel input[type="submit"]');
  }

  /** @returns {Cypress.Chainable} The error message element shown on failed login */
  get errorMessage() {
    return cy.get('#rightPanel .error');
  }

  /** @returns {Cypress.Chainable} The "Register" anchor link on the login page */
  get registerLink() {
    return cy.contains('a', 'Register');
  }

  /** @returns {Cypress.Chainable} The "Forgot login info?" anchor link */
  get forgotLoginLink() {
    return cy.contains('a', 'Forgot login info?');
  }

  /** @returns {Cypress.Chainable} The top-level login panel container */
  get loginPanel() {
    return cy.get('#loginPanel');
  }

  // ─── Actions ────────────────────────────────────────────────────────────────

  /**
   * Navigates to the ParaBank login page and waits for the form to be visible.
   * This ensures a clean starting state for all authentication-related tests.
   * It is the standard entry point before performing any login interactions.
   */
  navigateToLoginPage() {
    cy.visit('/parabank/index.htm');
    this.loginPanel.should('be.visible');
    return this;
  }

  /**
   * Enters the supplied credentials into the login form and submits it.
   * This method simulates a real user authentication flow by typing username
   * and password sequentially before clicking the submit button.
   *
   * @param {string} username - The account username to authenticate with.
   * @param {string} password - The account password to authenticate with.
   */
  submitLoginFormWithCredentials(username, password) {
    this.usernameInput.clear().type(username);
    this.passwordInput.clear().type(password, { log: false });
    this.loginButton.click();
    return this;
  }

  /**
   * Verifies that the login error message is visible and contains the expected text.
   * This is used after a failed login attempt to assert the application communicates
   * the failure to the user clearly and accurately.
   *
   * @param {string} expectedText - Partial or full text expected in the error element.
   */
  verifyLoginErrorMessageIsDisplayed(expectedText) {
    this.errorMessage.should('be.visible');
    this.errorMessage.should('contain.text', expectedText);
    return this;
  }

  /**
   * Asserts that all required elements of the login form are rendered on the page.
   * This validates the initial page state before any user interaction takes place.
   * It is used to confirm the login UI has loaded correctly after navigation.
   */
  verifyLoginFormElementsAreVisible() {
    this.usernameInput.should('be.visible');
    this.passwordInput.should('be.visible');
    this.loginButton.should('be.visible');
    return this;
  }

  /**
   * Navigates to the customer registration page by clicking the Register link.
   * This simulates the journey of a new user who wants to sign up for an account.
   * It confirms the destination URL after the click to ensure correct navigation.
   */
  navigateToRegistrationPageViaLink() {
    this.registerLink.should('be.visible').click();
    cy.url().should('include', '/parabank/register.htm');
    return this;
  }

  /**
   * Clicks the "Forgot login info?" link and verifies the lookup page is loaded.
   * This covers the password recovery user journey from the login screen.
   * It confirms navigation to the customer lookup form URL after clicking.
   */
  navigateToForgotLoginPage() {
    this.forgotLoginLink.should('be.visible').click();
    cy.url().should('include', '/parabank/lookup.htm');
    return this;
  }
}

module.exports = new LoginPage();
