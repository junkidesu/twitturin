import User from "../models/user";
import bcrypt from "bcrypt";
import { NewUser } from "../types";

const getAllUsers = async () => {
  const users = await User.find({});
  return users;
};

const addUser = async (newUser: NewUser) => {
  const { username, password, fullName, email, country, age } = newUser;

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const addedUser = new User({
    username,
    fullName,
    email,
    country,
    age,
    passwordHash,
  });

  await addedUser.save();

  return addedUser;
};

export default { getAllUsers, addUser };
