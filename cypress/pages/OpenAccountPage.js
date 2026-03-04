/**
 * OpenAccountPage.js
 * Page Object Model for the ParaBank Open New Account page (/openaccount.htm).
 * Handles the new account creation form and confirmation interactions.
 */
class OpenAccountPage {
  // ─── Locators ───────────────────────────────────────────────────────────────

  /** @returns {Cypress.Chainable} The account type dropdown (CHECKING or SAVINGS) */
  get accountTypeSelect() {
    return cy.get('#type');
  }

  /** @returns {Cypress.Chainable} The funding source account dropdown */
  get fromAccountSelect() {
    return cy.get('#fromAccountId');
  }

  /** @returns {Cypress.Chainable} The Open New Account submit button */
  get openAccountButton() {
    return cy.get('input[value="Open New Account"]');
  }

  /** @returns {Cypress.Chainable} The success heading shown after account creation */
  get accountCreatedHeading() {
    return cy.get('#rightPanel h1');
  }

  /** @returns {Cypress.Chainable} The newly created account number link in the result */
  get newAccountNumberLink() {
    return cy.get('#newAccountId');
  }

  /** @returns {Cypress.Chainable} The page section heading */
  get pageHeading() {
    return cy.get('#rightPanel h1');
  }

  /** @returns {Cypress.Chainable} The right panel content area */
  get rightPanel() {
    return cy.get('#rightPanel');
  }

  // ─── Actions ────────────────────────────────────────────────────────────────

  /**
   * Verifies that the Open New Account page has loaded with the required form elements.
   * This confirms the account type dropdown and funding source dropdown are rendered.
   * It ensures the form is in a ready state before any account creation interaction.
   */
  verifyOpenAccountPageIsLoaded() {
    this.accountTypeSelect.should('be.visible');
    this.fromAccountSelect.should('be.visible');
    this.openAccountButton.should('be.visible');
    return this;
  }

  /**
   * Opens a new account of the specified type funded from the given source account index.
   * This encapsulates the full new account creation action for end-to-end testing.
   * It selects the account type, chooses the funding account, and submits the form.
   *
   * @param {string} accountType - The account type to create ('CHECKING' or 'SAVINGS').
   * @param {number} fromIndex - Zero-based index of the funding source account option.
   */
  openNewAccountWithTypeAndFundingSource(accountType, fromIndex) {
    this.accountTypeSelect.should('be.visible').select(accountType);
    this.fromAccountSelect.select(fromIndex);
    this.openAccountButton.click();
    return this;
  }

  /**
   * Verifies that a new account was successfully created and the confirmation is shown.
   * This confirms the application completed the account creation workflow.
   * It checks the success heading and that a new account number link is displayed.
   */
  verifyNewAccountCreationConfirmationIsDisplayed() {
    this.accountCreatedHeading.should('be.visible').and('contain.text', 'Account Opened');
    this.newAccountNumberLink.should('be.visible');
    return this;
  }

  /**
   * Verifies that both CHECKING and SAVINGS options are available in the account type dropdown.
   * This ensures the application offers all supported account types to the user.
   * It checks that the dropdown options list contains the expected account type values.
   */
  verifyAccountTypeOptionsIncludeCheckingAndSavings() {
    this.accountTypeSelect.find('option').should('have.length.greaterThan', 0);
    this.accountTypeSelect.find('option[value="CHECKING"]').should('exist');
    this.accountTypeSelect.find('option[value="SAVINGS"]').should('exist');
    return this;
  }

  /**
   * Retrieves the new account number from the confirmation page and returns its text.
   * This is used to capture the created account number for subsequent test assertions.
   * It extracts the text content of the account number link element.
   */
  getNewAccountNumberFromConfirmation() {
    return this.newAccountNumberLink.invoke('text');
  }
}

module.exports = new OpenAccountPage();
