export enum Major {
  Se = "SE",
  Bm = "BM",
  It = "IT",
  Me = "ME",
  Cie = "CIE",
  Ad = "AD",
  Ae = "AE",
}

export interface User extends BaseUser {
  id: string;
  username: string;
  studentId: string;
  fullName?: string;
  major: Major;
  email: string;
  country?: string;
  tweets: Tweet[];
}

export interface BaseUser {
  id: string;
  username: string;
  studentId: string;
  fullName?: string;
  major: Major;
  email: string;
  country?: string;
  age?: number;
}

export interface BaseTweet {
  id: string;
  likes: number;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface Tweet extends BaseTweet {
  author: BaseUser;
  likedBy: BaseUser[];
}
