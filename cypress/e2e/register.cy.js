/**
 * register.cy.js
 * End-to-end tests covering the ParaBank customer registration workflows.
 * Tests include successful registration, mismatched passwords, empty form submission,
 * duplicate username handling, and form structure verification.
 */

const registerPage = require('../pages/RegisterPage');

describe('ParaBank Customer Registration', () => {
  beforeEach(() => {
    registerPage.navigateToRegistrationPage();
  });

  it('registers a new customer successfully with all valid data fields filled in', () => {
    const uniqueUsername = `testUser_${Date.now()}`;
    registerPage.fillRegistrationFormWithUserData({
      firstName: 'Test',
      lastName: 'Automation',
      address: '123 QA Avenue',
      city: 'Testville',
      state: 'CA',
      zipCode: '90210',
      phone: '5551234567',
      ssn: '987654321',
      username: uniqueUsername,
      password: 'SecurePass1!',
      confirmPassword: 'SecurePass1!',
    });
    registerPage.submitRegistrationForm();
    registerPage.verifyRegistrationSuccessMessageIsDisplayed(uniqueUsername);
    cy.url().should('include', '/parabank/register.htm');
    registerPage.rightPanel.should('contain.text', 'Welcome');
  });

  it('displays a password mismatch error when the confirmation password does not match', () => {
    registerPage.fillRegistrationFormWithUserData({
      firstName: 'Jane',
      lastName: 'Tester',
      address: '456 Bug Street',
      city: 'Errortown',
      state: 'NY',
      zipCode: '10001',
      phone: '5559876543',
      ssn: '111223333',
      username: `mismatch_${Date.now()}`,
      password: 'CorrectPass1!',
      confirmPassword: 'WrongPass999!',
    });
    registerPage.submitRegistrationForm();
    registerPage.verifyValidationErrorMessagesAreDisplayed();
    registerPage.verifySpecificValidationMessageIsDisplayed('Passwords did not match');
    registerPage.rightPanel.should('be.visible');
  });

  it('shows multiple required-field validation errors when the form is submitted empty', () => {
    registerPage.submitRegistrationForm();
    registerPage.verifyValidationErrorMessagesAreDisplayed();
    registerPage.validationErrors.should('have.length.greaterThan', 3);
    registerPage.verifySpecificValidationMessageIsDisplayed('First name is required');
    registerPage.rightPanel.should('be.visible');
  });

  it('shows a duplicate username error when an already-registered username is submitted', () => {
    registerPage.fillRegistrationFormWithUserData({
      firstName: 'Duplicate',
      lastName: 'User',
      address: '789 Clone Road',
      city: 'Duptown',
      state: 'TX',
      zipCode: '75001',
      phone: '5550001111',
      ssn: '444556666',
      username: Cypress.env('validUsername'),
      password: 'TestPass1!',
      confirmPassword: 'TestPass1!',
    });
    registerPage.submitRegistrationForm();
    registerPage.rightPanel.should('be.visible');
    registerPage.verifySpecificValidationMessageIsDisplayed('This username already exists');
    cy.url().should('include', '/parabank/register.htm');
  });

  it('renders all required registration form input fields and the submit button correctly', () => {
    registerPage.verifyAllRegistrationFieldsAreRendered();
    registerPage.addressInput.should('be.visible');
    registerPage.ssnInput.should('be.visible');
    registerPage.confirmPasswordInput.should('be.visible');
    cy.title().should('contain', 'ParaBank');
  });
});
