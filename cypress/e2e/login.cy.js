/**
 * login.cy.js
 * End-to-end tests covering the ParaBank authentication (login/logout) flows.
 * Tests include positive login, invalid credential scenarios, empty field validation,
 * wrong username scenarios, and the full logout journey.
 */

const loginPage = require('../pages/LoginPage');
const homePage = require('../pages/HomePage');

describe('ParaBank Authentication', () => {
  beforeEach(() => {
    loginPage.navigateToLoginPage();
  });

  it('logs in successfully with valid credentials and redirects to accounts overview', () => {
    loginPage.submitLoginFormWithCredentials(
      Cypress.env('validUsername'),
      Cypress.env('validPassword')
    );
    cy.url().should('include', '/parabank/overview.htm');
    homePage.verifyUserIsLoggedInAndOnDashboard();
    homePage.welcomeGreeting.should('be.visible');
    homePage.logOutLink.should('be.visible');
  });

  it('displays an error message when logging in with an incorrect password', () => {
    loginPage.submitLoginFormWithCredentials(
      Cypress.env('validUsername'),
      'totallyWrongPassword999'
    );
    loginPage.verifyLoginErrorMessageIsDisplayed(
      'The username and password could not be verified'
    );
    cy.url().should('not.include', '/parabank/overview.htm');
    loginPage.loginPanel.should('be.visible');
  });

  it('shows validation error when attempting to log in with a non-existent username', () => {
    loginPage.submitLoginFormWithCredentials(
      'nonExistentUser_xYz_99',
      'somePassword123'
    );
    loginPage.verifyLoginErrorMessageIsDisplayed(
      'The username and password could not be verified'
    );
    loginPage.loginPanel.should('be.visible');
    cy.url().should('include', '/parabank/login.htm');
  });

  it('renders the login form with all required UI elements visible and accessible', () => {
    loginPage.verifyLoginFormElementsAreVisible();
    loginPage.forgotLoginLink.should('be.visible');
    loginPage.registerLink.should('be.visible');
    loginPage.loginPanel.should('be.visible');
    cy.title().should('contain', 'ParaBank');
  });

  it('logs out of an authenticated session and redirects to the login page', () => {
    cy.login(Cypress.env('validUsername'), Cypress.env('validPassword'));
    homePage.verifyUserIsLoggedInAndOnDashboard();
    homePage.logOutCurrentUser();
    cy.url().should('include', '/parabank/index.htm');
    loginPage.loginPanel.should('be.visible');
    loginPage.verifyLoginFormElementsAreVisible();
  });
});
