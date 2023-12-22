/* eslint-disable no-self-assign */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Schema, model } from "mongoose";
import { UserCommon } from "../../types";
import uniqueValidator from "mongoose-unique-validator";
import mongooseAutoPopulate from "mongoose-autopopulate";

const UserSchema = new Schema<UserCommon>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      minLength: [3, "username must be at least 3 characters long"],
      maxLength: [30, "username must be at most 30 characters long"],
    },
    fullName: String,
    passwordHash: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      // required: true,
      validate: {
        validator: (v: string): boolean => {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
        },
      },
    },
    birthday: {
      type: String,
      // required: true,
    },
    bio: { type: String },
    profilePicture: String,
    following: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    followers: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
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
        delete returnedObject.email;
        delete returnedObject.following;
        delete returnedObject.followers;
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

UserSchema.virtual("followingCount").get(function () {
  return this.following.length;
});

UserSchema.virtual("followersCount").get(function () {
  return this.followers.length;
});

UserSchema.virtual("age").get(function () {
  if (!this.birthday) return undefined;

  const today = new Date();
  const birthday = new Date(this.birthday);

  const maxAge: number = today.getFullYear() - birthday.getFullYear();

  if (
    today.getMonth() < birthday.getMonth() ||
    (today.getMonth() === birthday.getMonth() &&
      today.getDate() < birthday.getDate())
  )
    return maxAge - 1;

  return maxAge;
});

UserSchema.plugin(mongooseAutoPopulate);

const UserModel = model<UserCommon>("User", UserSchema);

export default UserModel;
