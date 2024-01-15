describe("Home page", () => {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3001/api/testing/reset");
    cy.visit("http://localhost:5173");
  });

  it("can be opened", function () {
    cy.contains(/Twittur/);
  });

  it("user can navigate to sign up page", function () {
    cy.contains("Sign up").click();

    cy.contains(/Join Twittur/);
  });

  it("user can navigate to sign in page", function () {
    cy.contains("Sign in").click();

    cy.contains(/Login to Twittur/);
  });

  describe("signed in user", function () {
    beforeEach(function () {
      cy.login("initial1", "password");
      cy.visit("http://localhost:5173");
    });

    it("can go to their profile", function () {
      cy.contains("Profile").click();

      cy.contains("Tweets");
    });

    it("can post tweet", function () {
      cy.get("textarea").type("I can post new tweets!");

      cy.get("#tweet-button").click();

      cy.contains("I can post new tweets!");
    });

    it("can go to individual tweet page", function () {
      const id = "65a043445c8428d4f2022473";

      cy.get(`#${id}`).contains("this is my first tweet").click();

      cy.contains("Replies");
    });

    it("can like tweet", function () {
      const id = "65a043445c8428d4f2022473";

      cy.get(`#${id}`).contains("0").click();

      cy.get(`#${id}`).contains("1");
    });
  });
});
