import User from "../models/user";

const getAllUsers = async () => {
  const users = await User.find({});
  return users;
};

export default { getAllUsers };
