// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add('clearTable', (collection) => {
  cy.exec(`cd .. && make test-clear-collection collection=${collection}`);
});

Cypress.Commands.add('addUser', (name, email, password) => {
  cy.get('#add-user').click({ force: true });
  cy.get('#name-new').type(name);
  cy.get('#password-new').type(password);
  cy.get('#email-new').type(email);
  cy.get('#create-user').click({ force: true });
});

Cypress.Commands.add('login', (name, email, password) => {
  cy.get('#add-user').click({ force: true });
  cy.get('#name-new').type(name);
  cy.get('#password-new').type(password);
  cy.get('#email-new').type(email);
  cy.get('#create-user').click({ force: true });
  cy.get('#email').type(email);
  cy.get('#password').type(password);
  cy.get('#sign').click({ force: true });
});
