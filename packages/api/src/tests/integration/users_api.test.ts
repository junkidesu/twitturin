import { connectDb, disconnectDb } from "../../utils/mongo";
import { Major, NewUser, TokenData } from "../../types";
import {
  beforeAll,
  beforeEach,
  describe,
  test,
  afterAll,
  expect,
} from "vitest";
import {
  api,
  initialUsers,
  userExists,
  authenticate,
  getUser,
  resetDb,
} from "../../utils/testHelper";

beforeAll(async () => {
  await connectDb();
});

beforeEach(async () => {
  await resetDb();
}, 10000);

describe("all users can", () => {
  test("view the list of users", async () => {
    const response = await api
      .get("/api/users")
      .expect(200)
      .expect("Content-Type", /application\/json/);

    expect(response.body).toHaveLength(2);
  });

  test("view individual user info (except their password)", async () => {
    const user = initialUsers[0];

    const response = await api
      .get(`/api/users/${user._id}`)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    expect(response.body).toBeDefined();
    expect(response.body).toHaveProperty("username");
    expect(response.body.username).toBe(user.username);
    expect(response.body).not.toHaveProperty("password");
  });
});

describe("signing up", () => {
  test("works for teachers", async () => {
    const newUser: NewUser = {
      kind: "teacher",
      username: "teacher1",
      password: "password",
      subject: "Math",
    };

    await api.post("/api/users").send(newUser).expect(201);

    expect(await userExists(newUser.username)).toBeTruthy();
  });

  test("works for students", async () => {
    const newUser: NewUser = {
      kind: "student",
      username: "student1",
      password: "password",
      studentId: "Se13217",
      major: "SE" as Major,
    };

    await api.post("/api/users").send(newUser).expect(201);

    expect(await userExists(newUser.username)).toBeTruthy();
  });

  test("fails with invalid or missing data", async () => {
    const invalidData = {
      kind: "student",
      username: "student1",
      password: "password",
      studentId: "INVALID",
      major: "INVALID",
    };

    await api.post("/api/users").send(invalidData).expect(400);

    expect(await userExists(invalidData.username)).toBeFalsy();
  });

  test("fails if username already exists", async () => {
    const existingUser = {
      kind: "teacher",
      username: "initial2",
      password: "password",
      subject: "CS",
    };

    await api.post("/api/users").send(existingUser).expect(400);
  });
});

describe("editing profile", () => {
  test("fails if not authenticated", async () => {
    const { _id, username } = initialUsers[0];

    await api
      .put(`/api/users/${_id}`)
      .send({ username: "new-username" })
      .expect(401);

    const user = await getUser(username);

    expect(user.username).toBe(username);
  });

  test("fails if not done by same user", async () => {
    const { username, password } = initialUsers[0];

    const { token }: TokenData = await authenticate({
      username,
      password,
    });

    await api
      .put(`/api/users/${initialUsers[1]._id}`)
      .send({ username: "new-username" })
      .auth(token, { type: "bearer" })
      .expect(401);
  });

  test("succeeds if done by same user", async () => {
    const { username, password } = initialUsers[0];

    const { token }: TokenData = await authenticate({
      username,
      password,
    });

    await api
      .put(`/api/users/${initialUsers[0]._id}`)
      .send({ username: "new-username" })
      .auth(token, { type: "bearer" })
      .expect(200);
  });
});

describe("deleting profile", () => {
  test("fails if not authenticated", async () => {
    await api.delete(`/api/users/${initialUsers[0]._id}`).expect(401);

    expect(await userExists(initialUsers[0].username)).toBeTruthy();
  });

  test("fails if not done by the same user", async () => {
    const { token }: TokenData = await authenticate({
      username: initialUsers[0].username,
      password: "password",
    });

    await api
      .delete(`/api/users/${initialUsers[1]._id}`)
      .auth(token, { type: "bearer" })
      .expect(401);

    expect(await userExists(initialUsers[0].username)).toBeTruthy();
  });

  test("succeeds if done by the same user", async () => {
    const { token }: TokenData = await authenticate({
      username: initialUsers[0].username,
      password: "password",
    });

    await api
      .delete(`/api/users/${initialUsers[0]._id}`)
      .auth(token, { type: "bearer" })
      .expect(204);

    expect(await userExists(initialUsers[0].username)).toBeFalsy();
  });
});

afterAll(async () => {
  await disconnectDb();
});
