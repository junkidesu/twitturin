describe("Sign Up Page", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3001/api/testing/reset");
    cy.visit("http://localhost:5173/sign-up");
  });

  it("can be opened", function () {
    cy.contains(/Join Twittur/);
  });

  it("student can sign up", function () {
    cy.contains("Student").click();

    cy.get("#username").type("new-username");
    cy.get("#password").type("password");
    cy.get("#select-major").select("SE");
    cy.get("#student-id").type("se13456");

    cy.contains("Sign Up").click();

    cy.contains("Profile"); // ensures that the user is authenticated
  });

  it("teacher can sign up", function () {
    cy.contains("Teacher").click();

    cy.get("#username").type("new-username");
    cy.get("#password").type("password");
    cy.get("#subject").type("CS");

    cy.contains("Sign Up").click();

    cy.contains("@new-username");
    cy.contains("Profile");
  });

  it("error message displayed on failing sign up", function () {
    cy.contains("Teacher").click();

    cy.get("#username").type("initial1"); // existing user, username must be unique
    cy.get("#password").type("password");
    cy.get("#subject").type("CS");

    cy.contains("Sign Up").click();

    cy.contains(/Error/, { timeout: 20000 });
  });
});
