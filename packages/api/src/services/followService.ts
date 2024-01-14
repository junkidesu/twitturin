import { Types } from "mongoose";
import UserModel from "../models/user";
import { User, NotFoundError, AuthError } from "../types";

const getFollowing = async (id: string) => {
  const foundUser = await UserModel.findById(id).populate<{
    user: (User & { _id: Types.ObjectId })[];
  }>("following");

  if (!foundUser) throw new NotFoundError("user not found");

  return foundUser.following;
};

const getFollowers = async (id: string) => {
  const foundUser = await UserModel.findById(id).populate<{
    followers: (User & { _id: Types.ObjectId })[];
  }>("followers");

  if (!foundUser) throw new NotFoundError("user not found");

  return foundUser.followers;
};

const followUser = async (me: Types.ObjectId, toFollow: string) => {
  if (me.toString() === toFollow) throw new AuthError("can't follow yourself");

  const followedUser = await UserModel.findByIdAndUpdate(
    toFollow,
    { $addToSet: { followers: me } },
    { context: "query", new: true }
  );

  if (!followedUser) throw new NotFoundError("user not found");

  await UserModel.updateOne(
    { _id: me },
    { $addToSet: { following: toFollow } }
  );

  return followedUser;
};

const unfollowUser = async (me: Types.ObjectId, toUnfollow: string) => {
  await UserModel.updateOne({ _id: me }, { $pull: { following: toUnfollow } });
  await UserModel.updateOne({ _id: toUnfollow }, { $pull: { followers: me } });
};

export default {
  getFollowers,
  getFollowing,
  followUser,
  unfollowUser,
};
