/**
 * TransferFundsPage.js
 * Page Object Model for the ParaBank Transfer Funds page (/transfer.htm).
 * Encapsulates the fund transfer form interactions and result verification.
 */
class TransferFundsPage {
  // ─── Locators ───────────────────────────────────────────────────────────────

  /** @returns {Cypress.Chainable} The transfer amount text input field */
  get amountInput() {
    return cy.get('#amount');
  }

  /** @returns {Cypress.Chainable} The source account dropdown (From Account) */
  get fromAccountSelect() {
    return cy.get('#fromAccountId');
  }

  /** @returns {Cypress.Chainable} The destination account dropdown (To Account) */
  get toAccountSelect() {
    return cy.get('#toAccountId');
  }

  /** @returns {Cypress.Chainable} The Transfer submit button */
  get transferButton() {
    return cy.get('input[value="Transfer"]');
  }

  /** @returns {Cypress.Chainable} The success confirmation heading after a transfer */
  get transferSuccessHeading() {
    return cy.get('#showResult h1');
  }

  /** @returns {Cypress.Chainable} The amount displayed in the success result section */
  get transferSuccessAmount() {
    return cy.get('#showResult #amount');
  }

  /** @returns {Cypress.Chainable} The page section heading */
  get pageHeading() {
    return cy.get('#rightPanel h1');
  }

  /** @returns {Cypress.Chainable} The transfer result container panel */
  get transferResultPanel() {
    return cy.get('#showResult');
  }

  /** @returns {Cypress.Chainable} The right panel content area */
  get rightPanel() {
    return cy.get('#rightPanel');
  }

  // ─── Actions ────────────────────────────────────────────────────────────────

  /**
   * Verifies that the Transfer Funds page has fully loaded and is ready for input.
   * This ensures the page heading is correct and the form fields are populated
   * with the user's accounts before any transfer interactions begin.
   */
  verifyTransferFundsPageIsReadyForInput() {
    this.pageHeading.should('be.visible').and('contain.text', 'Transfer Funds');
    this.amountInput.should('be.visible');
    this.fromAccountSelect.find('option').should('have.length.greaterThan', 0);
    return this;
  }

  /**
   * Completes and submits the fund transfer form with the specified amount and accounts.
   * This encapsulates the full end-to-end transfer action in a single reusable method.
   * It enters the amount, selects source and destination accounts, then submits.
   *
   * @param {string} amount - The monetary amount to transfer (e.g., "50.00").
   * @param {number} fromIndex - Zero-based index of the source account option.
   * @param {number} toIndex - Zero-based index of the destination account option.
   */
  executeTransferWithAmountAndAccounts(amount, fromIndex, toIndex) {
    this.amountInput.clear().type(amount);
    this.fromAccountSelect.select(fromIndex);
    this.toAccountSelect.select(toIndex);
    this.transferButton.click();
    return this;
  }

  /**
   * Verifies that the transfer confirmation panel is displayed with the correct amount.
   * This confirms the application processed the transaction and shows a success message.
   * It checks both the heading text and the amount value in the result section.
   *
   * @param {string} expectedAmount - The expected amount string to find in the result.
   */
  verifyTransferCompletionConfirmationIsShown(expectedAmount) {
    this.transferSuccessHeading.should('be.visible').and('contain.text', 'Transfer Complete');
    this.transferSuccessAmount.should('be.visible').and('contain.text', expectedAmount);
    return this;
  }

  /**
   * Verifies that both the From and To account dropdown menus are populated with options.
   * This confirms the application correctly loads the user's accounts into the form.
   * Empty dropdowns would prevent any transfer from being performed, making this critical.
   */
  verifyBothAccountDropdownsArePopulatedWithOptions() {
    this.fromAccountSelect.should('be.visible');
    this.fromAccountSelect.find('option').should('have.length.greaterThan', 0);
    this.toAccountSelect.find('option').should('have.length.greaterThan', 0);
    return this;
  }

  /**
   * Attempts to submit the transfer form without entering an amount and verifies the error.
   * This tests the form's client-side or server-side validation for missing required fields.
   * It clears any existing amount value and submits to trigger the validation response.
   */
  submitTransferFormWithoutAmountAndVerifyError() {
    this.amountInput.clear();
    this.transferButton.click();
    this.rightPanel.should('contain.text', 'amount');
    return this;
  }
}

module.exports = new TransferFundsPage();
