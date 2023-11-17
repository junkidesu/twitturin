/* eslint-disable no-self-assign */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Schema, model } from "mongoose";
import { UserCommon } from "../../types";
import uniqueValidator from "mongoose-unique-validator";

const UserSchema = new Schema<UserCommon>(
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
    discriminatorKey: "kind",
    toObject: { virtuals: true },
    toJSON: {
      virtuals: true,
      transform: (_document, returnedObject) => {
        delete returnedObject.passwordHash;
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
        returnedObject.id = returnedObject._id?.toString() || returnedObject.id;
        delete returnedObject._id;
        delete returnedObject.__v;
        delete returnedObject.__t;
      },
    },
  }
);

UserSchema.plugin(uniqueValidator, { message: "{PATH} must be unique" });

UserSchema.virtual("tweets", {
  ref: "Tweet",
  localField: "_id",
  foreignField: "author",
});

UserSchema.virtual("replies", {
  ref: "Reply",
  localField: "_id",
  foreignField: "author",
});

const UserModel = model<UserCommon>("User", UserSchema);

export default UserModel;
