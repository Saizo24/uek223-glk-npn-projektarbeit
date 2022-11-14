/// <reference types="cypress" />

import admin from "../fixtures/users.json"

describe("Admin", () => {

    it("Admin can delete foreign post", () => {
        cy.loginAsUser();
        cy.wait(2000);
        cy.get('button').eq(2).click();
        cy.loginAsAdmin();
        cy.wait(2000);
        cy.get('button').eq(8).click();
        cy.get('button').eq(2).click();
    })
  });