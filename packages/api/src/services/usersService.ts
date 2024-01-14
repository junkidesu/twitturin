import UserModel from "../models/user";
import StudentModel from "../models/user/student";
import TeacherModel from "../models/user/teacher";
import bcrypt from "bcrypt";
import { User, EditUser, NewUser, NotFoundError } from "../types";
import TweetModel from "../models/tweet";
import ReplyModel from "../models/reply";

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
  const updatedUser = await UserModel.findByIdAndUpdate(id, toEdit, {
    new: true,
    runValidators: true,
    context: "query",
  });

  if (!updatedUser) throw new NotFoundError("user not found");

  return updatedUser;
};

const updateProfilePicture = async (id: string, profilePicture: string) => {
  const updatedUser = await UserModel.findByIdAndUpdate(
    id,
    { profilePicture },
    { new: true, context: "query" }
  );

  if (!updatedUser) throw new NotFoundError("user not found");

  return updatedUser;
};

const removeProfilePicture = async (id: string) => {
  const updatedUser = await UserModel.findByIdAndUpdate(
    id,
    { profilePicture: null },
    { new: true, context: "query" }
  );

  if (!updatedUser) throw new NotFoundError("user not found");

  return updatedUser;
};

const removeUser = async (id: string) => {
  const user = await UserModel.findById(id);

  if (!user) throw new NotFoundError("user not found");

  await UserModel.findByIdAndRemove(id);

  await TweetModel.deleteMany({ author: user._id });
  await ReplyModel.deleteMany({ author: user._id });

  await UserModel.updateMany({ $pull: { followers: id, following: id } });

  await TweetModel.updateMany({ $pull: { likedBy: id } });
  await ReplyModel.updateMany({ $pull: { likedBy: id } });
};

export default {
  getAllUsers,
  getUserById,
  addUser,
  editUser,
  updateProfilePicture,
  removeProfilePicture,
  removeUser,
};
