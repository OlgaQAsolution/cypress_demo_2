/**
 * HomePage.js
 * Page Object Model for the authenticated ParaBank home/dashboard page (/overview.htm).
 * Encapsulates the left-navigation panel interactions and post-login state verification.
 */
class HomePage {
  // ─── Locators ───────────────────────────────────────────────────────────────

  /** @returns {Cypress.Chainable} The left navigation panel container */
  get leftPanel() {
    return cy.get('#leftPanel');
  }

  /** @returns {Cypress.Chainable} The right main content panel */
  get rightPanel() {
    return cy.get('#rightPanel');
  }

  /** @returns {Cypress.Chainable} The "Accounts Overview" navigation link */
  get accountsOverviewLink() {
    return cy.contains('#leftPanel a', 'Accounts Overview');
  }

  /** @returns {Cypress.Chainable} The "Transfer Funds" navigation link */
  get transferFundsLink() {
    return cy.contains('#leftPanel a', 'Transfer Funds');
  }

  /** @returns {Cypress.Chainable} The "Bill Pay" navigation link */
  get billPayLink() {
    return cy.contains('#leftPanel a', 'Bill Pay');
  }

  /** @returns {Cypress.Chainable} The "Find Transactions" navigation link */
  get findTransactionsLink() {
    return cy.contains('#leftPanel a', 'Find Transactions');
  }

  /** @returns {Cypress.Chainable} The "Open New Account" navigation link */
  get openNewAccountLink() {
    return cy.contains('#leftPanel a', 'Open New Account');
  }

  /** @returns {Cypress.Chainable} The "Update Contact Info" navigation link */
  get updateContactInfoLink() {
    return cy.contains('#leftPanel a', 'Update Contact Info');
  }

  /** @returns {Cypress.Chainable} The "Request Loan" navigation link */
  get requestLoanLink() {
    return cy.contains('#leftPanel a', 'Request Loan');
  }

  /** @returns {Cypress.Chainable} The "Log Out" navigation link */
  get logOutLink() {
    return cy.contains('#leftPanel a', 'Log Out');
  }

  /** @returns {Cypress.Chainable} The welcome greeting text in the left panel */
  get welcomeGreeting() {
    return cy.get('#leftPanel .smallText');
  }

  // ─── Actions ────────────────────────────────────────────────────────────────

  /**
   * Confirms that the user is on the authenticated accounts overview page after login.
   * This validates the URL and the presence of the left-navigation panel elements
   * that are only visible to logged-in users.
   */
  verifyUserIsLoggedInAndOnDashboard() {
    cy.url().should('include', '/parabank/overview.htm');
    this.accountsOverviewLink.should('be.visible');
    this.logOutLink.should('be.visible');
    return this;
  }

  /**
   * Navigates to the Accounts Overview section using the left navigation panel.
   * This is the standard way for an authenticated user to review their financial data.
   * It waits for the URL to confirm successful navigation to the overview page.
   */
  navigateToAccountsOverviewSection() {
    this.accountsOverviewLink.should('be.visible').click();
    cy.url().should('include', '/parabank/overview.htm');
    return this;
  }

  /**
   * Navigates to the Transfer Funds section using the left navigation panel.
   * This starts the fund transfer workflow for authenticated users.
   * It confirms that the URL reflects the successful navigation to the transfer page.
   */
  navigateToTransferFundsSection() {
    this.transferFundsLink.should('be.visible').click();
    cy.url().should('include', '/parabank/transfer.htm');
    return this;
  }

  /**
   * Navigates to the Open New Account section using the left navigation panel.
   * This simulates a user starting the account creation workflow.
   * It waits for the URL to confirm navigation to the account opening page.
   */
  navigateToOpenNewAccountSection() {
    this.openNewAccountLink.should('be.visible').click();
    cy.url().should('include', '/parabank/openaccount.htm');
    return this;
  }

  /**
   * Logs the current user out of the application via the Log Out navigation link.
   * This is used to clean up session state after authenticated test scenarios.
   * It verifies the user is redirected back to the login page after logout.
   */
  logOutCurrentUser() {
    this.logOutLink.should('be.visible').click();
    cy.url().should('include', '/parabank/index.htm');
    return this;
  }

  /**
   * Verifies that all primary left-panel navigation links are visible and accessible.
   * This ensures the application has fully rendered the navigation menu after login.
   * It checks each key navigation item to confirm the dashboard layout is correct.
   */
  verifyAllPrimaryNavigationLinksAreVisible() {
    this.accountsOverviewLink.should('be.visible');
    this.transferFundsLink.should('be.visible');
    this.openNewAccountLink.should('be.visible');
    this.logOutLink.should('be.visible');
    return this;
  }
}

module.exports = new HomePage();
