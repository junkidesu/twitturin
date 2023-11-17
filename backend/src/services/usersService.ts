import UserModel from "../models/user";
import StudentModel from "../models/user/student";
import TeacherModel from "../models/user/teacher";
import bcrypt from "bcrypt";
import {
  User,
  EditUser,
  NewUser,
  NotFoundError,
  PopulatedUser,
} from "../types";
import { PopulateOptions } from "mongoose";

const options: PopulateOptions[] = [
  {
    path: "tweets",
    populate: [
      {
        path: "author",
      },
      {
        path: "likedBy",
      },
      {
        path: "replies",
        populate: {
          path: "author",
        },
      },
    ],
  },
  {
    path: "replies",
    populate: {
      path: "author",
    },
  },
];

const getAllUsers = async () => {
  const users = await UserModel.find<User[]>({}).populate<PopulatedUser>(
    options
  );

  return users;
};

const getUserById = async (id: string) => {
  const user = await UserModel.findById<User>(id).populate<PopulatedUser>(
    options
  );

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

    return addedUser.populate<PopulatedUser>(options);
  } else {
    const addedUser = await new TeacherModel({
      ...newUser,
      password: undefined,
      passwordHash,
    }).save();

    return addedUser.populate<PopulatedUser>(options);
  }
};

const editUser = async (id: string, toEdit: EditUser) => {
  const user = await UserModel.findById(id);

  if (!user) throw new NotFoundError("user not found");

  const updatedUser = await UserModel.findByIdAndUpdate(id, toEdit, {
    new: true,
    runValidators: true,
    context: "query",
  }).populate<PopulatedUser>(options);

  return updatedUser;
};

const removeUser = async (id: string) => {
  const user = await UserModel.findById(id);

  if (!user) throw new NotFoundError("user not found");

  await UserModel.findByIdAndRemove(id);
};

export default { getAllUsers, getUserById, addUser, editUser, removeUser };
