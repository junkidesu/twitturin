import { Schema, model } from "mongoose";
import { IUser } from "../types";

const userSchema = new Schema<IUser>({
  username: {
    type: String,
    required: true,
  },
  fullName: String,
  passwordHash: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  age: Number,
  country: String,
});

const User = model<IUser>("User", userSchema);

export default User;
