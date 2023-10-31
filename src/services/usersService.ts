import UserModel from "../models/user";
import bcrypt from "bcrypt";
import { EditUser, NewUser, NotFoundError, PopulatedTweets } from "../types";

const getAllUsers = async () => {
  const users = await UserModel.find({}).populate<PopulatedTweets>("tweets");

  return users;
};

const getUserById = async (id: string) => {
  const user = await UserModel.findById(id).populate<PopulatedTweets>("tweets");

  return user;
};

const addUser = async (newUser: NewUser) => {
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(newUser.password, saltRounds);

  const addedUser = await new UserModel({
    ...newUser,
    password: undefined,
    passwordHash,
  }).save();

  return addedUser;
};

const editUser = async (id: string, toEdit: EditUser) => {
  const user = await UserModel.findById(id);

  if (!user) throw new NotFoundError("user not found");

  const updatedUser = await UserModel.findByIdAndUpdate(id, toEdit, {
    new: true,
    runValidators: true,
    context: "query",
  }).populate<PopulatedTweets>("tweets");

  return updatedUser;
};

const removeUser = async (id: string) => {
  const user = await UserModel.findById(id);

  if (!user) throw new NotFoundError("user not found");

  await UserModel.findByIdAndRemove(id);
};

export default { getAllUsers, getUserById, addUser, editUser, removeUser };
