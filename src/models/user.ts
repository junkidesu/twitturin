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
  major: {
    type: String,
    enum: ["SE", "BM", "IT", "ME", "CIE", "AD", "AE"],
    required: true,
  },
  studentId: {
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

userSchema.set("toJSON", {
  transform: (_document, returnedObject) => {
    delete returnedObject.passwordHash;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const User = model<IUser>("User", userSchema);

export default User;
