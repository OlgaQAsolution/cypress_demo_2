// cypress/support/commands.js
// Custom Cypress commands for reusable, high-level application interactions.
// These commands abstract common multi-step workflows so tests remain concise
// and focused on business logic rather than implementation details.

/**
 * Custom command: cy.login(username, password)
 *
 * Authenticates a user by navigating to the login page, entering credentials,
 * and waiting for the overview page to confirm a successful login.
 * This command is used in beforeEach hooks to establish an authenticated session
 * before running tests that require the user to be logged in.
 */
Cypress.Commands.add('login', (username, password) => {
  cy.visit('/parabank/index.htm');
  cy.get('#loginPanel input[name="username"]').should('be.visible').clear().type(username);
  cy.get('#loginPanel input[name="password"]').should('be.visible').clear().type(password, { log: false });
  cy.get('#loginPanel input[type="submit"]').click();
  cy.url().should('include', '/parabank/overview.htm');
});

/**
 * Custom command: cy.registerUser(userData)
 *
 * Fills and submits the registration form with the provided user data object.
 * It navigates to the registration page, populates every required field, and
 * clicks Register. This command supports both positive and negative test cases
 * by allowing partial or complete data objects.
 *
 * @param {Object} userData - Object containing registration form field values.
 */
Cypress.Commands.add('registerUser', (userData) => {
  cy.visit('/parabank/register.htm');
  const fields = {
    'customer.firstName': userData.firstName,
    'customer.lastName': userData.lastName,
    'customer.address.street': userData.address,
    'customer.address.city': userData.city,
    'customer.address.state': userData.state,
    'customer.address.zipCode': userData.zipCode,
    'customer.phoneNumber': userData.phone,
    'customer.ssn': userData.ssn,
    'customer.username': userData.username,
    'customer.password': userData.password,
    repeatedPassword: userData.confirmPassword,
  };
  Object.entries(fields).forEach(([name, value]) => {
    if (value !== undefined && value !== null) {
        const options = name === 'customer.password' || name === 'repeatedPassword'
          ? { log: false }
          : {};
        cy.get(`input[name="${name}"]`).clear().type(String(value), options);
      }
  });
  cy.get('input[value="Register"]').click();
});
