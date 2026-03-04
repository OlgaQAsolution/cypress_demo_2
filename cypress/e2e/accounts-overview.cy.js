/**
 * accounts-overview.cy.js
 * End-to-end tests covering the ParaBank Accounts Overview and Account Details features.
 * Tests include page load verification, account drill-down, balance formatting,
 * transaction history display, and all-account balance data validation.
 */

const accountsPage = require('../pages/AccountsPage');
const homePage = require('../pages/HomePage');

describe('ParaBank Accounts Overview', () => {
  beforeEach(() => {
    cy.login(Cypress.env('validUsername'), Cypress.env('validPassword'));
    homePage.navigateToAccountsOverviewSection();
  });

  it('loads the accounts overview page with a populated accounts table after login', () => {
    accountsPage.verifyAccountsOverviewPageIsFullyLoaded();
    accountsPage.accountsTable.should('be.visible');
    accountsPage.accountTableRows.should('have.length.greaterThan', 0);
    accountsPage.totalBalanceCell.should('be.visible');
    accountsPage.pageHeading.should('contain.text', 'Accounts Overview');
  });

  it('opens the account details page by clicking on an account number link', () => {
    accountsPage.accountTableRows.should('have.length.greaterThan', 0);
    accountsPage.openAccountDetailsByIndex(0);
    accountsPage.verifyAccountDetailsPageDisplaysCorrectInformation();
    cy.url().should('include', '/parabank/activity.htm');
    accountsPage.accountDetailsTable.should('be.visible');
  });

  it('displays a correctly formatted total balance in the accounts table footer', () => {
    accountsPage.verifyAccountsOverviewPageIsFullyLoaded();
    accountsPage.verifyTotalBalanceFieldIsVisibleAndFormatted();
    accountsPage.totalBalanceCell.invoke('text').should('not.be.empty');
    accountsPage.accountsTable.should('contain.text', '$');
    cy.url().should('include', '/parabank/overview.htm');
  });

  it('shows the transaction history table with data rows for a selected account', () => {
    accountsPage.accountTableRows.should('have.length.greaterThan', 0);
    accountsPage.openAccountDetailsByIndex(0);
    accountsPage.verifyAccountDetailsPageDisplaysCorrectInformation();
    accountsPage.verifyTransactionHistoryTableIsLoadedWithData();
    accountsPage.transactionTableRows.first().should('be.visible');
  });

  it('confirms each account row in the overview table contains a dollar balance amount', () => {
    accountsPage.verifyAccountsOverviewPageIsFullyLoaded();
    accountsPage.verifyEachAccountRowContainsBalanceData();
    accountsPage.accountNumberLinks.should('have.length.greaterThan', 0);
    homePage.logOutLink.should('be.visible');
    cy.url().should('include', '/parabank/overview.htm');
  });
});
