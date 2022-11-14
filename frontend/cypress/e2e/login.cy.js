/// <reference types="cypress" />

describe("LoginAsAdmin", () => {
  beforeEach(() => {
    cy.loginAsAdmin();
  });

  it("navigates to adminpage", () => {
    cy.visit("http://localhost:3000/homepage");
  });
});

describe("LoginAsUser", () => {
    beforeEach(() => {
      cy.loginAsUser();
    });
  
    it("navigates to userpage", () => {
      cy.visit("http://localhost:3000/homepage");
    });
  });