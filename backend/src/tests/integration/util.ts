import supertest from "supertest";
import bcrypt from "bcrypt";
import app from "../../app";
import {
  Credentials,
  Major,
  NotFoundError,
  TokenData,
  User,
} from "../../types";
import UserModel from "../../models/user";
import TweetModel from "../../models/tweet";

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

export const initialTweets = [
  {
    _id: "65a043445c8428d4f2022473",
    content: "this is my first tweet",
    author: "657ebfc0a49f7f3984586061",
  },
  {
    _id: "65a0427c5c8428d4f202245e",
    content: "this is my second tweet",
    author: "657ebfc0a49f7f3984586061",
  },
  {
    _id: "65a041ec5c8428d4f202244e",
    content: "teaching CS is fun",
    author: "657ebfc0a49f7f3984586061",
  },
  {
    _id: "65a040bf5c8428d4f202243e",
    content: "air quality is bad",
    author: "657ebfc0a49f7f3984586061",
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

export const initializeTweets = async () => {
  await TweetModel.deleteMany({});

  const promises = initialTweets.map((t) => {
    const tweet = new TweetModel(t);

    return tweet.save();
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

export const tweetExists = async (content: string): Promise<boolean> => {
  const tweet = await TweetModel.exists({ content });

  if (!tweet) return false;

  return true;
};

export const getUser = async (username: string): Promise<User> => {
  const found = await UserModel.findOne({ username });

  if (!found) throw new NotFoundError("user not found");

  return found.toJSON();
};
