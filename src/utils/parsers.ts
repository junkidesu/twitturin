import { Credentials, NewUser } from "../types";

const parseNumber = (num: unknown, what: string): number => {
  if (isNaN(Number(num))) throw new Error(`invalid value for ${what}: ${num}`);

  return Number(num);
};

const isString = (text: unknown): text is string => {
  return typeof text == "string" || text instanceof String;
};

const parseString = (text: unknown, what: string): string => {
  if (!text || !isString(text))
    throw new Error(`Invalid value for ${what}: ${text}`);

  return text;
};

export const toNewUser = (object: unknown): NewUser => {
  if (!object || typeof object !== "object")
    throw new Error("Data missing or invalid");

  if (!("username" in object)) throw new Error("user username missing");
  if (!("password" in object)) throw new Error("user password missing");
  if (!("email" in object)) throw new Error("user email missing");

  const newUser: NewUser = {
    username: parseString(object.username, "username"),
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

export const toCredentials = (object: unknown): Credentials => {
  if (!object || typeof object !== "object")
    throw new Error("Data missing or invalid");

  if (!("username" in object)) throw new Error("username missing");
  if (!("password" in object)) throw new Error("password missing");

  const credentials: Credentials = {
    username: parseString(object.username, "username"),
    password: parseString(object.password, "password"),
  };

  return credentials;
};
