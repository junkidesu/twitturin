export interface IUser {
  username: string;
  fullName?: string;
  passwordHash: string;
  email: string;
  age?: number;
  country?: string;
}
