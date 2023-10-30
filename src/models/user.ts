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
      minLength: [3, "username must be at least 3 characters long"],
      maxLength: [15, "username must be at most 15 characters long"],
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
      validate: {
        validator: (v: string): boolean => {
          return /^(u|se|ad|bm)(0|1)(\d){4}$/.test(v);
        },
      },
    },
    email: {
      type: String,
      required: true,
      validate: {
        validator: (v: string): boolean => {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
        },
      },
    },
    age: { type: Number, min: 1 },
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

userSchema.plugin(uniqueValidator, { message: "{PATH} must be unique" });

userSchema.virtual("tweets", {
  ref: "Tweet",
  localField: "_id",
  foreignField: "author",
});

const User = model<IUser>("User", userSchema);

export default User;
