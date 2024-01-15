describe("Profile Page", function () {
  const currentUser = {
    id: "657ebfc0a49f7f3984586061",
    username: "initial1",
    password: "password",
    tweets: [
      {
        id: "65a043445c8428d4f2022473",
        content: "this is my first tweet",
      },
    ],
    replies: [
      {
        content: "I agree!",
        id: "6587c7b1591dc9f39f308060",
      },
    ],
  };

  beforeEach(function () {
    cy.request("POST", "http://localhost:3001/api/testing/reset");
    cy.login(currentUser.username, currentUser.password);
  });

  it("can be visited", function () {
    cy.visit(`http://localhost:5173/users/${currentUser.id}`);
    cy.contains("Tweets");
    cy.contains("Replies");
    cy.contains("Likes");
  });

  it("can view user tweets", function () {
    cy.visit(`http://localhost:5173/users/${currentUser.id}`);

    cy.contains("Tweets").click();

    cy.contains(currentUser.tweets[0].content);
  });

  it("can view user replies", function () {
    cy.visit(`http://localhost:5173/users/${currentUser.id}`);

    cy.contains("Replies").click();

    cy.contains(currentUser.replies[0].content);
  });
});
