import {
  api,
  initialUsers,
  initialTweets,
  authenticate,
  tweetExists,
  resetDb,
} from "../../utils/testHelper";
import {
  beforeAll,
  beforeEach,
  describe,
  test,
  afterAll,
  expect,
} from "vitest";
import { connectDb, disconnectDb } from "../../utils/mongo";

beforeAll(async () => {
  await connectDb();
});

beforeEach(async () => {
  await resetDb();
}, 10000);

describe("all users can", () => {
  test("view all tweets", async () => {
    const response = await api
      .get("/api/tweets")
      .expect(200)
      .expect("Content-Type", /application\/json/);

    expect(response.body).toHaveLength(4);
  });

  test("view single tweet", async () => {
    const { _id, content } = initialTweets[0];

    const response = await api
      .get(`/api/tweets/${_id}`)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    expect(response.body).toBeDefined();
    expect(response.body).toHaveProperty("author");
    expect(response.body.author).toBeDefined();
    expect(response.body.content).toBe(content);
  });
});

describe("posting a tweet", () => {
  test("fails if not authenticated", async () => {
    const newTweet = { content: "this is a new tweet" };

    await api.post("/api/tweets").send(newTweet).expect(401);

    expect(await tweetExists(newTweet.content)).toBeFalsy();
  });

  test("succeeds if authenticated", async () => {
    const { username, password } = initialUsers[0];

    const { token } = await authenticate({ username, password });

    const newTweet = { content: "this is a new tweet" };

    await api
      .post("/api/tweets")
      .send(newTweet)
      .auth(token, { type: "bearer" })
      .expect(201);

    expect(await tweetExists(newTweet.content)).toBeTruthy();
  });
});

describe("deleting a tweet", () => {
  test("fails if not authenticated", async () => {
    const { content, _id } = initialTweets[0];

    await api.delete(`/api/tweets/${_id}`).expect(401);

    expect(await tweetExists(content)).toBeTruthy();
  });

  test("fails if not done by author", async () => {
    const { content, _id } = initialTweets[0];

    const { username, password } = initialUsers[1];

    const { token } = await authenticate({ username, password });

    await api
      .delete(`/api/tweets/${_id}`)
      .auth(token, { type: "bearer" })
      .expect(401);

    expect(await tweetExists(content)).toBeTruthy();
  });

  test("succeeds if authenticated as tweet author", async () => {
    const { content, _id } = initialTweets[0];

    const { username, password } = initialUsers[0];

    const { token } = await authenticate({ username, password });

    await api
      .delete(`/api/tweets/${_id}`)
      .auth(token, { type: "bearer" })
      .expect(204);

    expect(await tweetExists(content)).toBeFalsy();
  });
});

describe("editing a tweet", () => {
  test("fails if not authenticated", async () => {
    const { content, _id } = initialTweets[0];

    const editTweet = { content: "edited content" };

    await api.put(`/api/tweets/${_id}`).send(editTweet).expect(401);

    expect(await tweetExists(content)).toBeTruthy();
    expect(await tweetExists(editTweet.content)).toBeFalsy();
  });

  test("fails if not done by author", async () => {
    const { content, _id } = initialTweets[0];

    const { username, password } = initialUsers[1];

    const { token } = await authenticate({ username, password });

    const editTweet = { content: "edited content" };

    await api
      .put(`/api/tweets/${_id}`)
      .send(editTweet)
      .auth(token, { type: "bearer" })
      .expect(401);

    expect(await tweetExists(content)).toBeTruthy();
    expect(await tweetExists(editTweet.content)).toBeFalsy();
  });

  test("succeeds if authenticated as author", async () => {
    const { content, _id } = initialTweets[0];

    const { username, password } = initialUsers[0];

    const { token } = await authenticate({ username, password });

    const editTweet = { content: "edited content" };

    await api
      .put(`/api/tweets/${_id}`)
      .send(editTweet)
      .auth(token, { type: "bearer" })
      .expect(200);

    expect(await tweetExists(content)).toBeFalsy();
    expect(await tweetExists(editTweet.content)).toBeTruthy();
  });
});

afterAll(async () => {
  await disconnectDb();
});
