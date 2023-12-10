import {
  Credentials,
  NewTweet,
  EditTweet,
  Major,
  NewUser,
  ParseError,
  EditUser,
  NewReply,
} from "../types";

const parseNumber = (num: unknown, what: string): number => {
  if (isNaN(Number(num)))
    throw new ParseError(`invalid value for ${what}: ${num}`);

  return Number(num);
};

const isString = (text: unknown): text is string => {
  return typeof text == "string" || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
  if (!isString(date) || isDate(date)) throw new ParseError("invalid date");

  return date;
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
  if (!("birthday" in object)) throw new ParseError("birthday missing");
  if (!("password" in object)) throw new ParseError("user password missing");
  if (!("email" in object)) throw new ParseError("user email missing");
  if (!("kind" in object)) throw new ParseError("kind missing");

  const common = {
    username: parseString(object.username, "username"),
    birthday: parseDate(object.birthday),
    password: parseString(object.password, "password"),
    email: parseString(object.email, "email"),
    fullName:
      "fullName" in object
        ? parseString(object.fullName, "fullName")
        : undefined,
    country:
      "country" in object ? parseString(object.country, "country") : undefined,
    bio: "bio" in object ? parseString(object.bio, "bio") : undefined,
    age: "age" in object ? parseNumber(object.age, "age") : undefined,
  };

  if (object.kind === "student") {
    if (!("major" in object)) throw new ParseError("major missing");
    if (!("studentId" in object)) throw new ParseError("student ID missing");

    return {
      ...common,
      kind: object.kind,
      major: parseMajor(object.major),
      studentId: parseString(object.studentId, "student ID"),
    };
  }

  if (object.kind === "teacher") {
    return {
      ...common,
      kind: object.kind,
      subject:
        "subject" in object
          ? parseString(object.subject, "subject")
          : undefined,
    };
  }

  throw new ParseError("invalid kind");
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
    fullName:
      "fullName" in object
        ? parseString(object.fullName, "fullName")
        : undefined,
    bio: "bio" in object ? parseString(object.bio, "bio") : undefined,
  };
};

export const toCredentials = (object: unknown): Credentials => {
  if (!object || typeof object !== "object")
    throw new ParseError("Data missing or invalid");

  if (!("username" in object)) throw new ParseError("username missing");
  if (!("password" in object)) throw new ParseError("password missing");

  const credentials: Credentials = {
    username: parseString(object.username, "username"),
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

export const toNewReply = (object: unknown): NewReply => {
  if (!object || typeof object !== "object")
    throw new ParseError("Reply missing or invalid");

  if (!("content" in object)) throw new ParseError("reply content missing");

  return {
    content: parseString(object.content, "content"),
  };
};
