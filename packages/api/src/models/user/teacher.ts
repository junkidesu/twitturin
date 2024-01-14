import UserModel from ".";
import { TeacherUser } from "../../types";
import { Schema } from "mongoose";

const TeacherModel = UserModel.discriminator(
  "teacher",
  new Schema<TeacherUser>(
    {
      subject: String,
    },
    { discriminatorKey: "kind" }
  )
);

export default TeacherModel;
