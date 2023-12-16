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

  const foundUser = await UserModel.findById(toFollow);

  if (!foundUser) throw new NotFoundError("user not found");

  const currentUser = await UserModel.findById(me);

  const followingStrings = currentUser!.following.map((u) => u.toString());

  if (!followingStrings.includes(foundUser._id.toString())) {
    currentUser!.following = currentUser!.following.concat(foundUser._id);
  }

  await currentUser!.save();

  return foundUser;
};

const unfollowUser = async (me: Types.ObjectId, toUnfollow: string) => {
  const foundUser = await UserModel.findById(toUnfollow);

  if (!foundUser) throw new NotFoundError("user not found");

  const currentUser = await UserModel.findById(me);

  currentUser!.following = currentUser!.following.filter(
    (u) => u.toString() !== toUnfollow
  );

  await currentUser!.save();
};

export default {
  getFollowers,
  getFollowing,
  followUser,
  unfollowUser,
};
