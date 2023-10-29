import User from "../models/user";
import bcrypt from "bcrypt";
import { NewUser } from "../types";

const getAllUsers = async () => {
  const users = await User.find({});
  return users;
};

const getUserById = async (id: string) => {
  const user = await User.findById(id);

  return user;
};

const addUser = async (newUser: NewUser) => {
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(newUser.password, saltRounds);

  const addedUser = new User({
    ...newUser,
    password: undefined,
    passwordHash,
  });

  await addedUser.save();

  return addedUser;
};

export default { getAllUsers, getUserById, addUser };
