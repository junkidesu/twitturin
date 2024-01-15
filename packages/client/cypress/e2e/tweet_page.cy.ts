describe("Tweet Page", function () {
  const tweet = {
    id: "65a043445c8428d4f2022473",
    content: "this is my first tweet",
  };

  const reply = {
    id: "6587c7b1591dc9f39f308060",
  };

  beforeEach(function () {
    cy.request("POST", "http://localhost:3001/api/testing/reset");
    cy.visit(`http://localhost:5173/tweets/${tweet.id}`);
  });

  it("can be opened", function () {
    cy.contains("Replies");
    cy.contains(tweet.content);
  });

  describe("authenticated users", function () {
    beforeEach(function () {
      cy.login("initial1", "password");
      cy.visit(`http://localhost:5173/tweets/${tweet.id}`);
    });

    it("can like tweet", function () {
      cy.contains("0").click();

      cy.contains("1");
    });

    it("can reply to tweet", function () {
      const newReply = {
        content: "This is a new reply!",
      };

      cy.get("#tweet-reply-form", { timeout: 10000 }).type(newReply.content);

      cy.contains("Submit").click();

      cy.contains(newReply.content);
    });

    it("can reply to reply", function () {
      const newReply = {
        content: "This is a new reply!",
      };

      cy.get(`#${reply.id} .reply-button:first`).click();

      cy.get(`#${reply.id} textarea`).type(newReply.content);

      cy.get(`#${reply.id}`).contains("Submit").click();
    });
  });
});
