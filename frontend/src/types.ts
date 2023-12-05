type UnionOmit<T, K extends string | number | symbol> = T extends unknown
  ? Omit<T, K>
  : never;

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
  id: string;
  username: string;
  fullName?: string;
  email: string;
  country?: string;
  age?: number;
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

export type NewUser = UnionOmit<User, "id"> & {
  password: string;
};

export interface Reply {
  id: string;
  content: string;
  tweet: string;
  likedBy: string[];
  likes: number;
  author: User;
  replies: Reply[];
  createdAt: string;
  updatedAt: string;
}

export interface NewReply {
  content: string;
  parentId: string;
  parent: "tweet" | "reply";
}

export interface Tweet {
  id: string;
  likes: number;
  replyCount: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  author: User;
  likedBy: string[];
}

export interface Credentials {
  username: string;
  password: string;
}

export interface TokenData {
  id: string;
  token: string;
  username: string;
}

export interface NewTweet {
  content: string;
}
