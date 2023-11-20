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
  tweets: Tweet[];
  replies: Reply[];
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

export type SignUpFormValues = UnionOmit<User, "id" | "tweets" | "replies"> & {
  password: string;
};

export interface Reply {
  id: string;
  content: string;
  tweet: string;
  author: UnionOmit<User, "replies" | "tweets">;
  createdAt: string;
  updatedAt: string;
}

export interface NewReply {
  content: string;
  tweet: string;
}

export interface Tweet {
  id: string;
  likes: number;
  replyCount: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  author: UnionOmit<User, "tweets" | "replies">;
  likedBy: UnionOmit<User, "tweets" | "replies">[];
  replies: Reply[];
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
