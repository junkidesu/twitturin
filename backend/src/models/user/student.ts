import { StudentUser } from "../../types";
import { Schema } from "mongoose";
import UserModel from ".";

const StudentModel = UserModel.discriminator<StudentUser>(
  "student",
  new Schema<StudentUser>(
    {
      major: {
        type: String,
        enum: ["SE", "BM", "IT", "ME", "CIE", "AD", "AE"],
        required: true,
      },
      studentId: {
        type: String,
        required: true,
        unique: true,
        validate: {
          validator: (v: string): boolean => {
            return /^(u|se|ad|bm)(0|1)(\d){4}$/.test(v);
          },
        },
      },
    },
    { discriminatorKey: "kind" }
  )
);

export default StudentModel;
