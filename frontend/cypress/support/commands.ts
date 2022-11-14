/// <reference types="cypress" />

import loginData from "../fixtures/users.json";

Cypress.Commands.add("loginAsAdmin", () => {
  cy.visit("http://localhost:3000/login");
  cy.get("[id=email]").type(loginData.admin.name);
  cy.get("[id=password]").type(loginData.admin.password);
  cy.get("button[type=submit]").click();
  cy.wait(500);
});

Cypress.Commands.add("loginAsUser", () => {
  cy.visit("http://localhost:3000/login");
  cy.get("[id=email]").type(loginData.user.name);
  cy.get("[id=password]").type(loginData.user.password);
  cy.get("button[type=submit]").click();
  cy.wait(500);
});

declare global {
  namespace Cypress {
    interface Chainable {
      loginAsAdmin(email: string, password: string): Chainable<void>;
      loginAsUser(email: string, password: string): Chainable<void>;
    }
  }
}