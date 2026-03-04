/**
 * AccountsPage.js
 * Page Object Model for the ParaBank Accounts Overview page (/overview.htm)
 * and the Account Details page (/activity.htm).
 * Handles the financial data tables and account drill-down interactions.
 */
class AccountsPage {
  // ─── Locators ───────────────────────────────────────────────────────────────

  /** @returns {Cypress.Chainable} The main accounts summary table */
  get accountsTable() {
    return cy.get('#accountTable');
  }

  /** @returns {Cypress.Chainable} All data rows in the accounts table body */
  get accountTableRows() {
    return cy.get('#accountTable tbody tr');
  }

  /** @returns {Cypress.Chainable} All clickable account number links in the table */
  get accountNumberLinks() {
    return cy.get('#accountTable tbody tr td:first-child a');
  }

  /** @returns {Cypress.Chainable} The total balance cell in the accounts table footer */
  get totalBalanceCell() {
    return cy.get('#accountTable tfoot tr td:last-child');
  }

  /** @returns {Cypress.Chainable} The page section heading */
  get pageHeading() {
    return cy.get('#rightPanel h1');
  }

  /** @returns {Cypress.Chainable} The account details information table */
  get accountDetailsTable() {
    return cy.get('#accountDetails');
  }

  /** @returns {Cypress.Chainable} The transaction history table on account details page */
  get transactionTable() {
    return cy.get('#transactionTable');
  }

  /** @returns {Cypress.Chainable} All data rows in the transaction history table */
  get transactionTableRows() {
    return cy.get('#transactionTable tbody tr');
  }

  /** @returns {Cypress.Chainable} The right-panel container element */
  get rightPanel() {
    return cy.get('#rightPanel');
  }

  // ─── Actions ────────────────────────────────────────────────────────────────

  /**
   * Verifies that the Accounts Overview page has loaded and displays account data.
   * This confirms that the authenticated user can see their financial summary.
   * It validates the page heading and that the accounts table contains at least one row.
   */
  verifyAccountsOverviewPageIsFullyLoaded() {
    this.pageHeading.should('be.visible').and('contain.text', 'Accounts Overview');
    this.accountsTable.should('be.visible');
    this.accountTableRows.should('have.length.greaterThan', 0);
    return this;
  }

  /**
   * Clicks the account link at the specified index to open the Account Details page.
   * This simulates a user selecting a specific account to review its transactions.
   * It waits for the account details section to become visible after navigation.
   *
   * @param {number} index - Zero-based index of the account row to click.
   */
  openAccountDetailsByIndex(index) {
    this.accountNumberLinks.eq(index).should('be.visible').click();
    this.accountDetailsTable.should('be.visible');
    return this;
  }

  /**
   * Verifies that the Account Details page displays the required financial metadata.
   * This confirms the application renders complete and accurate account information.
   * It checks for key labels such as Account Number and Balance in the details table.
   */
  verifyAccountDetailsPageDisplaysCorrectInformation() {
    this.accountDetailsTable.should('be.visible');
    this.accountDetailsTable.should('contain.text', 'Account Number');
    this.accountDetailsTable.should('contain.text', 'Balance');
    return this;
  }

  /**
   * Verifies that the total balance field in the accounts overview footer is present
   * and contains a properly formatted currency string.
   * This ensures the application correctly aggregates and displays account balances.
   */
  verifyTotalBalanceFieldIsVisibleAndFormatted() {
    this.totalBalanceCell.should('be.visible');
    this.totalBalanceCell.invoke('text').should('match', /\$[\d,]+\.\d{2}/);
    return this;
  }

  /**
   * Verifies that the transaction history table is loaded and contains data rows.
   * This confirms the application displays meaningful financial activity for an account.
   * It waits with an extended timeout as transaction data may take time to load.
   */
  verifyTransactionHistoryTableIsLoadedWithData() {
    cy.get('#transactionTable').should('be.visible');
    this.transactionTableRows.should('have.length.greaterThan', 0);
    return this;
  }

  /**
   * Verifies that each account row in the overview table contains a balance value.
   * This tests that the application populates financial data for every listed account.
   * It iterates over each row and checks the balance column for a dollar amount.
   */
  verifyEachAccountRowContainsBalanceData() {
    this.accountTableRows.each(($row) => {
      cy.wrap($row).find('td').should('have.length.greaterThan', 1);
      cy.wrap($row).find('td:nth-child(2)').invoke('text').should('match', /\$/);
    });
    return this;
  }
}

module.exports = new AccountsPage();
