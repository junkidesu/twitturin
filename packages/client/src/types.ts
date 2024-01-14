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
  bio?: string;
  email?: string;
  country?: string;
  birthday?: string;
  age?: number;
  profilePicture?: string;
  followingCount: number;
  followersCount: number;
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

export interface ReleaseInformation {
  body?: string;
  name?: string;
  url: string;
  html_url: string;
  tag_name: string;
  assets: [
    {
      url: string;
      browser_download_url: string;
      id: string;
      name: string;
      label?: string;
      download_count: string;
      created_at: string;
    }
  ];
}

export type User = StudentUser | TeacherUser;

export type NewUser = UnionOmit<
  User,
  "age" | "id" | "followingCount" | "followersCount" | "profilePicture"
> & {
  password: string;
};

export interface EditUser {
  username?: string;
  email?: string;
  birthday?: string;
  bio?: string;
  country?: string;
  fullName?: string;
}

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

export interface SearchResults {
  tweets: Tweet[];
  users: User[];
  replies: Reply[];
}
