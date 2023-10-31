import {
  Credentials,
  NewTweet,
  EditTweet,
  Major,
  NewUser,
  ParseError,
  EditUser,
} from "../types";

const parseNumber = (num: unknown, what: string): number => {
  if (isNaN(Number(num)))
    throw new ParseError(`invalid value for ${what}: ${num}`);

  return Number(num);
};

const isString = (text: unknown): text is string => {
  return typeof text == "string" || text instanceof String;
};

const parseString = (text: unknown, what: string): string => {
  if (!text || !isString(text))
    throw new ParseError(`Invalid value for ${what}: ${text}`);

  return text;
};

const isMajor = (major: string): major is Major => {
  return Object.values(Major)
    .map((m) => m.toString())
    .includes(major);
};

const parseMajor = (major: unknown): Major => {
  if (!major || !isString(major) || !isMajor(major))
    throw new ParseError(`invalid value for major: ${major}`);

  return major;
};

export const toNewUser = (object: unknown): NewUser => {
  if (!object || typeof object !== "object")
    throw new ParseError("Data missing or invalid");

  if (!("username" in object)) throw new ParseError("user username missing");
  if (!("studentId" in object)) throw new ParseError("user studentId missing");
  if (!("password" in object)) throw new ParseError("user password missing");
  if (!("major" in object)) throw new ParseError("user major missing");
  if (!("email" in object)) throw new ParseError("user email missing");

  const newUser: NewUser = {
    username: parseString(object.username, "username"),
    studentId: parseString(object.studentId, "studentId"),
    major: parseMajor(object.major),
    password: parseString(object.password, "password"),
    email: parseString(object.email, "email"),
  };

  if ("fullName" in object) {
    newUser.fullName = parseString(object.fullName, "fullName");
  }

  if ("country" in object) {
    newUser.country = parseString(object.country, "country");
  }

  if ("age" in object) {
    newUser.age = parseNumber(object.age, "age");
  }

  return newUser;
};

export const toEditUser = (object: unknown): EditUser => {
  if (!object || typeof object !== "object")
    throw new ParseError("data missing or invalid");

  return {
    username:
      "username" in object
        ? parseString(object.username, "username")
        : undefined,
    email: "email" in object ? parseString(object.email, "email") : undefined,
    country:
      "country" in object ? parseString(object.country, "country") : undefined,
  };
};

export const toCredentials = (object: unknown): Credentials => {
  if (!object || typeof object !== "object")
    throw new ParseError("Data missing or invalid");

  if (!("studentId" in object)) throw new ParseError("studentId missing");
  if (!("password" in object)) throw new ParseError("password missing");

  const credentials: Credentials = {
    studentId: parseString(object.studentId, "studentId"),
    password: parseString(object.password, "password"),
  };

  return credentials;
};

export const toNewTweet = (object: unknown): NewTweet => {
  if (!object || typeof object !== "object")
    throw new ParseError("Data missing or invalid");

  if (!("content" in object)) throw new ParseError("content missing");
  if (!("author" in object)) throw new ParseError("author missing");

  return {
    content: parseString(object.content, "content"),
    author: parseString(object.author, "author"),
  };
};

export const toEditTweet = (object: unknown): EditTweet => {
  if (!object || typeof object !== "object")
    throw new ParseError("Data missing or invalid");

  if (!("content" in object)) return { content: undefined };

  return { content: parseString(object.content, "content") };
};
