/**
 * fund-transfer.cy.js
 * End-to-end tests covering the ParaBank Transfer Funds workflow.
 * Tests include page load, successful fund transfer, empty amount validation,
 * dropdown population verification, and post-transfer navigation back to overview.
 */

const transferPage = require('../pages/TransferFundsPage');
const homePage = require('../pages/HomePage');
const accountsPage = require('../pages/AccountsPage');

describe('ParaBank Fund Transfer', () => {
  beforeEach(() => {
    cy.login(Cypress.env('validUsername'), Cypress.env('validPassword'));
    homePage.navigateToTransferFundsSection();
  });

  it('loads the Transfer Funds page with visible form fields and populated account dropdowns', () => {
    transferPage.verifyTransferFundsPageIsReadyForInput();
    transferPage.amountInput.should('be.visible').and('be.empty');
    transferPage.transferButton.should('be.visible');
    transferPage.fromAccountSelect.should('be.visible');
    cy.url().should('include', '/parabank/transfer.htm');
  });

  it('completes a fund transfer successfully and displays the confirmation with the amount', () => {
    transferPage.verifyTransferFundsPageIsReadyForInput();
    transferPage.executeTransferWithAmountAndAccounts('50.00', 0, 0);
    transferPage.verifyTransferCompletionConfirmationIsShown('50.00');
    transferPage.transferResultPanel.should('be.visible');
    cy.url().should('include', '/parabank/transfer.htm');
  });

  it('shows an error when submitting the transfer form with no amount entered', () => {
    transferPage.verifyTransferFundsPageIsReadyForInput();
    transferPage.submitTransferFormWithoutAmountAndVerifyError();
    cy.url().should('include', '/parabank/transfer.htm');
    transferPage.pageHeading.should('be.visible');
    transferPage.amountInput.should('be.visible');
  });

  it('confirms both the From Account and To Account dropdowns are populated with options', () => {
    transferPage.verifyBothAccountDropdownsArePopulatedWithOptions();
    transferPage.fromAccountSelect.find('option').its('length').should('be.greaterThan', 0);
    transferPage.toAccountSelect.find('option').its('length').should('be.greaterThan', 0);
    transferPage.amountInput.should('be.visible');
    cy.url().should('include', '/parabank/transfer.htm');
  });

  it('navigates back to the accounts overview page after completing a fund transfer', () => {
    transferPage.verifyTransferFundsPageIsReadyForInput();
    transferPage.executeTransferWithAmountAndAccounts('10.00', 0, 0);
    transferPage.verifyTransferCompletionConfirmationIsShown('10.00');
    homePage.navigateToAccountsOverviewSection();
    accountsPage.verifyAccountsOverviewPageIsFullyLoaded();
    cy.url().should('include', '/parabank/overview.htm');
  });
});
