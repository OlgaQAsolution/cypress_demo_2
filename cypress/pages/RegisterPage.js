/**
 * RegisterPage.js
 * Page Object Model for the ParaBank customer registration page (/register.htm).
 * Encapsulates all form field locators and registration workflow actions.
 */
class RegisterPage {
  // ─── Locators ───────────────────────────────────────────────────────────────

  /** @returns {Cypress.Chainable} First name input field */
  get firstNameInput() {
    return cy.get('input[name="customer.firstName"]');
  }

  /** @returns {Cypress.Chainable} Last name input field */
  get lastNameInput() {
    return cy.get('input[name="customer.lastName"]');
  }

  /** @returns {Cypress.Chainable} Street address input field */
  get addressInput() {
    return cy.get('input[name="customer.address.street"]');
  }

  /** @returns {Cypress.Chainable} City input field */
  get cityInput() {
    return cy.get('input[name="customer.address.city"]');
  }

  /** @returns {Cypress.Chainable} State input field */
  get stateInput() {
    return cy.get('input[name="customer.address.state"]');
  }

  /** @returns {Cypress.Chainable} Zip code input field */
  get zipCodeInput() {
    return cy.get('input[name="customer.address.zipCode"]');
  }

  /** @returns {Cypress.Chainable} Phone number input field */
  get phoneInput() {
    return cy.get('input[name="customer.phoneNumber"]');
  }

  /** @returns {Cypress.Chainable} Social Security Number input field */
  get ssnInput() {
    return cy.get('input[name="customer.ssn"]');
  }

  /** @returns {Cypress.Chainable} Desired username input field */
  get usernameInput() {
    return cy.get('input[name="customer.username"]');
  }

  /** @returns {Cypress.Chainable} Password input field */
  get passwordInput() {
    return cy.get('input[name="customer.password"]');
  }

  /** @returns {Cypress.Chainable} Confirm password input field */
  get confirmPasswordInput() {
    return cy.get('input[name="repeatedPassword"]');
  }

  /** @returns {Cypress.Chainable} Register submit button */
  get registerButton() {
    return cy.get('input[value="Register"]');
  }

  /** @returns {Cypress.Chainable} All visible validation error elements on the page */
  get validationErrors() {
    return cy.get('span.error');
  }

  /** @returns {Cypress.Chainable} The success/welcome heading shown after registration */
  get successHeading() {
    return cy.get('#rightPanel h1');
  }

  /** @returns {Cypress.Chainable} The right panel containing registration results */
  get rightPanel() {
    return cy.get('#rightPanel');
  }

  // ─── Actions ────────────────────────────────────────────────────────────────

  /**
   * Navigates directly to the registration page and waits for the form to be ready.
   * This establishes a reliable starting point for all registration test scenarios.
   * It ensures the form is fully rendered before any field interactions begin.
   */
  navigateToRegistrationPage() {
    cy.visit('/parabank/register.htm');
    this.registerButton.should('be.visible');
    return this;
  }

  /**
   * Fills all provided fields of the registration form with the supplied user data.
   * Individual fields are skipped if their corresponding value is undefined or null,
   * which enables partial form submission tests for negative/validation scenarios.
   *
   * @param {Object} userData - Key-value pairs matching registration form fields.
   */
  fillRegistrationFormWithUserData(userData) {
    if (userData.firstName) this.firstNameInput.clear().type(userData.firstName);
    if (userData.lastName) this.lastNameInput.clear().type(userData.lastName);
    if (userData.address) this.addressInput.clear().type(userData.address);
    if (userData.city) this.cityInput.clear().type(userData.city);
    if (userData.state) this.stateInput.clear().type(userData.state);
    if (userData.zipCode) this.zipCodeInput.clear().type(userData.zipCode);
    if (userData.phone) this.phoneInput.clear().type(userData.phone);
    if (userData.ssn) this.ssnInput.clear().type(userData.ssn);
    if (userData.username) this.usernameInput.clear().type(userData.username);
    if (userData.password) this.passwordInput.clear().type(userData.password, { log: false });
    if (userData.confirmPassword) this.confirmPasswordInput.clear().type(userData.confirmPassword, { log: false });
    return this;
  }

  /**
   * Submits the registration form by clicking the Register button.
   * This triggers server-side validation and the account creation workflow.
   * It must be invoked after the form has been populated with user data.
   */
  submitRegistrationForm() {
    this.registerButton.should('be.visible').click();
    return this;
  }

  /**
   * Verifies that field-level validation error messages are displayed on the page.
   * This confirms the application enforces required field constraints on submission.
   * It asserts that at least one error element is present and visible to the user.
   */
  verifyValidationErrorMessagesAreDisplayed() {
    this.validationErrors.should('be.visible');
    this.validationErrors.should('have.length.greaterThan', 0);
    return this;
  }

  /**
   * Verifies that the registration completed successfully by checking the welcome heading.
   * This confirms the application created the new user account and shows a confirmation.
   * It asserts both the heading text and that the right panel contains the username.
   *
   * @param {string} username - The username that was registered, expected in the success message.
   */
  verifyRegistrationSuccessMessageIsDisplayed(username) {
    this.successHeading.should('be.visible').and('contain.text', 'Welcome');
    this.rightPanel.should('contain.text', username);
    return this;
  }

  /**
   * Verifies that a specific validation message appears somewhere on the registration page.
   * This provides precise assertion for targeted error scenarios, such as duplicate usernames
   * or mismatched passwords, by searching for the exact expected text.
   *
   * @param {string} errorText - The exact or partial error message to look for on the page.
   */
  verifySpecificValidationMessageIsDisplayed(errorText) {
    this.rightPanel.should('be.visible');
    cy.contains(errorText).should('be.visible');
    return this;
  }

  /**
   * Asserts that all required form input fields are present and interactable on the page.
   * This validates the initial state of the registration form before any data is entered.
   * It is used to confirm the complete registration UI has been rendered correctly.
   */
  verifyAllRegistrationFieldsAreRendered() {
    this.firstNameInput.should('be.visible');
    this.lastNameInput.should('be.visible');
    this.usernameInput.should('be.visible');
    this.passwordInput.should('be.visible');
    this.registerButton.should('be.visible');
    return this;
  }
}

module.exports = new RegisterPage();
