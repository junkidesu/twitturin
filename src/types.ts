interface BasicUser {
  username: string;
  fullName?: string;
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
