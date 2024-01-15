describe("Sign In Page", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3001/api/testing/reset");
    cy.visit("http://localhost:5173/login");
  });

  it("can be opened", function () {
    cy.contains(/Login to Twittur/);
  });

  it("user can login", function () {
    cy.get("#username").type("initial1");
    cy.get("#password").type("password");

    cy.get("#login-button").click();

    cy.contains("@initial1");

    cy.contains(/Profile/, { timeout: 20000 });
  });

  it("failed login shows an error", function () {
    cy.get("#username").type("initial1");
    cy.get("#password").type("wrongpassword");

    cy.get("#login-button").click();

    cy.contains(/Error/, { timeout: 20000 });
  });
});
