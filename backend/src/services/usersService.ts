import UserModel from "../models/user";
import StudentModel from "../models/user/student";
import TeacherModel from "../models/user/teacher";
import bcrypt from "bcrypt";
import { User, EditUser, NewUser, NotFoundError, AuthError } from "../types";
import TweetModel from "../models/tweet";
import { Types } from "mongoose";

const getAllUsers = async () => {
  const users = await UserModel.find<User[]>({});

  return users;
};

const getUserById = async (id: string) => {
  const user = await UserModel.findById<User>(id);

  if (!user) throw new NotFoundError("user not found");

  return user;
};

const addUser = async (newUser: NewUser) => {
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(newUser.password, saltRounds);

  if (newUser.kind === "student") {
    const addedUser = await new StudentModel({
      ...newUser,
      password: undefined,
      passwordHash,
    }).save();

    return addedUser;
  } else {
    const addedUser = await new TeacherModel({
      ...newUser,
      password: undefined,
      passwordHash,
    }).save();

    return addedUser;
  }
};

const editUser = async (id: string, toEdit: EditUser) => {
  const user = await UserModel.findById(id);

  if (!user) throw new NotFoundError("user not found");

  const updatedUser = await UserModel.findByIdAndUpdate(id, toEdit, {
    new: true,
    runValidators: true,
    context: "query",
  });

  return updatedUser;
};

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

  currentUser!.following = currentUser!.following.filter(u => u.toString() !== toUnfollow);

  await currentUser!.save();
};

const removeUser = async (id: string) => {
  const user = await UserModel.findById(id);

  if (!user) throw new NotFoundError("user not found");

  await UserModel.findByIdAndRemove(id);

  await TweetModel.deleteMany({ author: user._id });
};

export default {
  getAllUsers,
  getUserById,
  addUser,
  editUser,
  removeUser,
  followUser,
  unfollowUser,
  getFollowing,
  getFollowers,
};
