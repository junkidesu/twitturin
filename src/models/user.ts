/* eslint-disable no-self-assign */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Schema, model } from "mongoose";
import { IUser } from "../types";
import uniqueValidator from "mongoose-unique-validator";

const userSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
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
      unique: true,
    },
    email: {
      type: String,
      required: true,
    },
    age: Number,
    country: String,
  },
  {
    toObject: { virtuals: true },
    toJSON: {
      virtuals: true,
      transform: (_document, returnedObject) => {
        delete returnedObject.passwordHash;
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
      },
    },
  }
);

userSchema.plugin(uniqueValidator, { message: '{PATH} must be unique'});

userSchema.virtual("tweets", {
  ref: "Tweet",
  localField: "_id",
  foreignField: "author",
});

const User = model<IUser>("User", userSchema);

export default User;
