export enum Major {
  Se = "SE",
  Bm = "BM",
  It = "IT",
  Me = "ME",
  Cie = "CIE",
  Ad = "AD",
  Ae = "AE",
}

interface BasicUser {
  username: string;
  fullName?: string;
  studentId: string;
  major: Major;
  email: string;
  age?: number;
  country?: string;
}

export interface IUser extends BasicUser {
  passwordHash: string;
}

export interface NewUser extends BasicUser {
  password: string;
}

export interface Credentials {
  username: string;
  password: string;
}
