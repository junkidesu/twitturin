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

export const parseNumber = (num: unknown, what: string): number => {
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
  if (!isString(date) || !isDate(date)) throw new ParseError("invalid date");

  return date;
};

export const parseString = (text: unknown, what?: string): string => {
  if (!text || !isString(text))
    throw new ParseError(`Invalid value for ${what || "string"}: ${text}`);

  return text.trim();
};

const isMajor = (major: string): major is Major => {
  return Object.values(Major)
    .map((m) => m.toString())
    .includes(major.trim().toUpperCase());
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
  if (!("password" in object)) throw new ParseError("user password missing");
  if (!("kind" in object)) throw new ParseError("kind missing");

  const common = {
    username: parseString(object.username, "username").trim(),
    birthday:
      "birthday" in object && object.birthday
        ? parseDate(object.birthday).trim()
        : undefined,
    password: parseString(object.password, "password").trim(),
    email:
      "email" in object && object.email
        ? parseString(object.email, "email").trim()
        : undefined,
    fullName:
      "fullName" in object && object.fullName
        ? parseString(object.fullName, "fullName").trim()
        : undefined,
    country:
      "country" in object && object.country
        ? parseString(object.country, "country").trim()
        : undefined,
    bio:
      "bio" in object && object.bio
        ? parseString(object.bio, "bio").trim()
        : undefined,
  };

  if (object.kind === "student") {
    if (!("major" in object)) throw new ParseError("major missing");
    if (!("studentId" in object)) throw new ParseError("student ID missing");

    return {
      ...common,
      kind: object.kind,
      major: parseMajor(object.major),
      studentId: parseString(object.studentId, "student ID")
        .toLowerCase()
        .trim(),
    };
  }

  if (object.kind === "teacher") {
    if (!("subject" in object)) throw new ParseError("subject missing");
    return {
      ...common,
      kind: object.kind,
      subject: parseString(object.subject, "subject"),
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
        ? parseString(object.username, "username").trim()
        : undefined,
    email:
      "email" in object && object.email
        ? parseString(object.email, "email").trim()
        : undefined,
    birthday:
      "birthday" in object && object.birthday
        ? parseDate(object.birthday).trim()
        : undefined,
    country:
      "country" in object && object.country
        ? parseString(object.country, "country").trim()
        : undefined,
    fullName:
      "fullName" in object && object.fullName
        ? parseString(object.fullName, "fullName").trim()
        : undefined,
    bio:
      "bio" in object && object.bio
        ? parseString(object.bio, "bio").trim()
        : undefined,
  };
};

export const toCredentials = (object: unknown): Credentials => {
  if (!object || typeof object !== "object")
    throw new ParseError("Data missing or invalid");

  if (!("username" in object)) throw new ParseError("username missing");
  if (!("password" in object)) throw new ParseError("password missing");

  const credentials: Credentials = {
    username: parseString(object.username, "username").trim(),
    password: parseString(object.password, "password").trim(),
  };

  return credentials;
};

export const toNewTweet = (object: unknown): NewTweet => {
  if (!object || typeof object !== "object")
    throw new ParseError("Data missing or invalid");

  if (!("content" in object)) throw new ParseError("content missing");
  if (!("author" in object)) throw new ParseError("author missing");

  return {
    content: parseString(object.content, "content").trim(),
    author: parseString(object.author, "author").trim(),
  };
};

export const toEditTweet = (object: unknown): EditTweet => {
  if (!object || typeof object !== "object")
    throw new ParseError("Data missing or invalid");

  if (!("content" in object)) return { content: undefined };

  return { content: parseString(object.content, "content").trim() };
};

export const toNewReply = (object: unknown): NewReply => {
  if (!object || typeof object !== "object")
    throw new ParseError("Reply missing or invalid");

  if (!("content" in object)) throw new ParseError("reply content missing");

  return {
    content: parseString(object.content, "content").trim(),
  };
};
