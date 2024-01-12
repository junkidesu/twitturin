import supertest from "supertest";
import bcrypt from "bcrypt";
import app from "../src/app";
import {
  Credentials,
  Major,
  NotFoundError,
  TokenData,
  User,
} from "../src/types";
import UserModel from "../src/models/user";

const password = "password";
const passwordHash = bcrypt.hashSync(password, 10);

export const api = supertest(app);

export const initialUsers = [
  {
    _id: "657ebfc0a49f7f3984586061",
    username: "initial1",
    studentId: "se12345",
    major: "SE" as Major,
    passwordHash,
    password,
  },
  {
    _id: "65829311f7ce0044179273f5",
    username: "initial2",
    passwordHash,
    password,
    subject: "CS",
  },
];

export const initializeUsers = async () => {
  await UserModel.deleteMany({});

  const promises = initialUsers.map((u) => {
    const user = new UserModel(u);

    return user.save();
  });

  await Promise.all(promises);
};

export const authenticate = async (
  credentials: Credentials
): Promise<TokenData> => {
  const response = await api.post("/api/auth").send(credentials);

  return response.body as TokenData;
};

export const userExists = async (username: string): Promise<boolean> => {
  const user = await UserModel.exists({ username });

  if (!user) return false;

  return true;
};

export const getUser = async (username: string): Promise<User> => {
  const found = await UserModel.findOne({ username });

  if (!found) throw new NotFoundError("user not found");

  return found.toJSON();
};
