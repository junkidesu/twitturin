describe("Home page", () => {
  beforeEach(function () {
    cy.visit("http://localhost:5173");
  });

  it("can be opened", function () {
    cy.contains(/Twittur/);
  });

  it("user can navigate to sign up page", function () {
    cy.contains("Sign up").click();

    cy.contains(/Join Twittur/);
  });
});
