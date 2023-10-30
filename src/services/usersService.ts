import User from "../models/user";
import bcrypt from "bcrypt";
import { NewUser, PopulatedTweets } from "../types";

const getAllUsers = async () => {
  const users = await User.find({}).populate<PopulatedTweets>("tweets");

  return users;
};

const getUserById = async (id: string) => {
  const user = await User.findById(id).populate<PopulatedTweets>("tweets");

  return user;
};

const addUser = async (newUser: NewUser) => {
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(newUser.password, saltRounds);

  const addedUser = await new User({
    ...newUser,
    password: undefined,
    passwordHash,
  }).save();

  return addedUser;
};

export default { getAllUsers, getUserById, addUser };
