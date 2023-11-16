import UserModel from "../models/user";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import env from "../utils/config";
import { Credentials, NotFoundError, AuthError, TokenData } from "../types";

const authenticate = async ({
  studentId,
  password,
}: Credentials): Promise<TokenData> => {
  const user = await UserModel.findOne({ studentId });

  if (!user) throw new NotFoundError("user not found");

  const passwordCorrect = await bcrypt.compare(password, user.passwordHash);

  if (!passwordCorrect) throw new AuthError("incorrect username or password");

  const userForToken = {
    id: user._id.toString(),
    studentId,
    username: user.username,
  };

  const token = jwt.sign(userForToken, env.SECRET);

  return {
    id: user._id,
    token,
    studentId,
    username: user.username,
  };
};

export default { authenticate };
