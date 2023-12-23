import { Types } from "mongoose";

export enum Major {
  Se = "SE",
  Bm = "BM",
  It = "IT",
  Me = "ME",
  Cie = "CIE",
  Ad = "AD",
  Ae = "AE",
}

export interface UserCommon {
  username: string;
  fullName?: string;
  email?: string;
  birthday?: string;
  country?: string;
  bio?: string;
  following: Types.ObjectId[];
  followers: Types.ObjectId[];
  profilePicture?: string;
  passwordHash: string;
}

export interface StudentUser extends UserCommon {
  studentId: string;
  major: Major;
  kind: "student";
}

export interface TeacherUser extends UserCommon {
  subject: string;
  kind: "teacher";
}

export type User = StudentUser | TeacherUser;

type UnionOmit<T, K extends string | number | symbol> = T extends unknown
  ? Omit<T, K>
  : never;

export type NewUser = UnionOmit<
  User,
  "passwordHash" | "following" | "followers"
> & { password: string };

export interface EditUser {
  username?: string;
  email?: string;
  birthday?: string;
  bio?: string;
  country?: string;
  fullName?: string;
}

export interface Credentials {
  username: string;
  password: string;
}

export interface Tweet {
  content: string;
  author: Types.ObjectId;
  likedBy: Types.ObjectId[];
}

export interface NewTweet {
  content: string;
  author: string;
}

export interface EditTweet {
  content?: string;
}

export interface Reply {
  author: Types.ObjectId;
  likedBy: Types.ObjectId[];
  tweet: Types.ObjectId;
  parentTweet?: Types.ObjectId;
  parentReply?: Types.ObjectId;
  content: string;
}

export interface NewReply {
  content: string;
}

export interface PopulatedUser {
  tweets: PopulatedTweet[];
  replies: PopulatedReply[];
}

export interface PopulatedTweet {
  author: User;
}

export interface PopulatedReply {
  content: string;
  author: User;
  replies: PopulatedReply[];
}

export interface TokenData {
  token: string;
  id: Types.ObjectId;
  username: string;
}

export interface SearchResults {
  tweets: PopulatedTweet[];
  users: User[];
  replies: Omit<PopulatedReply, "replies">[];
}

export class ParseError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ParseError";
  }
}

export class AuthError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "AuthError";
  }
}

export class NotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "NotFoundError";
  }
}
