import {
  api,
  initialUsers,
  initialTweets,
  authenticate,
  replyExists,
  initialReplies,
  resetDb,
} from "../../utils/testHelper";
import { connectDb, disconnectDb } from "../../utils/mongo";
import {
  beforeAll,
  beforeEach,
  describe,
  test,
  afterAll,
  expect,
} from "vitest";

beforeAll(async () => {
  await connectDb();
});

beforeEach(async () => {
  await resetDb();
}, 10000);

describe("replying to tweet", () => {
  test("fails if not authenticated", async () => {
    const tweet = initialTweets[0];

    const newReply = { content: "this is a new reply" };

    await api
      .post(`/api/tweets/${tweet._id}/replies`)
      .send(newReply)
      .expect(401);

    expect(await replyExists(newReply.content)).toBeFalsy();
  });

  test("succeeds if authenticated", async () => {
    const { username, password } = initialUsers[0];

    const { token } = await authenticate({ username, password });

    const tweet = initialTweets[0];

    const newReply = { content: "this is a new reply" };

    await api
      .post(`/api/tweets/${tweet._id}/replies`)
      .send(newReply)
      .auth(token, { type: "bearer" })
      .expect(201);

    expect(await replyExists(newReply.content)).toBeTruthy();
  });
});

describe("replying to reply", () => {
  test("fails if not authenticated", async () => {
    const reply = initialReplies[0];

    const newReply = { content: "this is a new reply" };

    await api.post(`/api/replies/${reply._id}`).send(newReply).expect(401);

    expect(await replyExists(newReply.content)).toBeFalsy();
  });

  test("succeeds if authenticated", async () => {
    const { username, password } = initialUsers[0];

    const { token } = await authenticate({ username, password });

    const reply = initialReplies[0];

    const newReply = { content: "this is a new reply" };

    await api
      .post(`/api/replies/${reply._id}`)
      .send(newReply)
      .auth(token, { type: "bearer" })
      .expect(201);

    expect(await replyExists(newReply.content)).toBeTruthy();
  });
});

describe("deleting a reply", () => {
  test("fails if not authenticated", async () => {
    const { content, _id } = initialReplies[0];

    await api.delete(`/api/replies/${_id}`).expect(401);

    expect(await replyExists(content)).toBeTruthy();
  });

  test("fails if not done by author", async () => {
    const { content, _id } = initialReplies[0];

    const { username, password } = initialUsers[1];

    const { token } = await authenticate({ username, password });

    await api
      .delete(`/api/replies/${_id}`)
      .auth(token, { type: "bearer" })
      .expect(401);

    expect(await replyExists(content)).toBeTruthy();
  });

  test("succeeds if authenticated as reply author", async () => {
    const { content, _id } = initialReplies[0];

    const { username, password } = initialUsers[0];

    const { token } = await authenticate({ username, password });

    await api
      .delete(`/api/replies/${_id}`)
      .auth(token, { type: "bearer" })
      .expect(204);

    expect(await replyExists(content)).toBeFalsy();
  });
});

describe("editing a reply", () => {
  test("fails if not authenticated", async () => {
    const { content, _id } = initialReplies[0];

    const editReply = { content: "edited content" };

    await api.put(`/api/replies/${_id}`).send(editReply).expect(401);

    expect(await replyExists(content)).toBeTruthy();
    expect(await replyExists(editReply.content)).toBeFalsy();
  });

  test("fails if not done by author", async () => {
    const { content, _id } = initialReplies[0];

    const { username, password } = initialUsers[1];

    const { token } = await authenticate({ username, password });

    const editReply = { content: "edited content" };

    await api
      .put(`/api/replies/${_id}`)
      .send(editReply)
      .auth(token, { type: "bearer" })
      .expect(401);

    expect(await replyExists(content)).toBeTruthy();
    expect(await replyExists(editReply.content)).toBeFalsy();
  });

  test("succeeds if authenticated as author", async () => {
    const { content, _id } = initialReplies[0];

    const { username, password } = initialUsers[0];

    const { token } = await authenticate({ username, password });

    const editReply = { content: "edited content" };

    await api
      .put(`/api/replies/${_id}`)
      .send(editReply)
      .auth(token, { type: "bearer" })
      .expect(200);

    expect(await replyExists(content)).toBeFalsy();
    expect(await replyExists(editReply.content)).toBeTruthy();
  });
});

afterAll(async () => {
  await disconnectDb();
});
