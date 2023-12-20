import { StudentUser } from "../../types";
import { Schema } from "mongoose";
import uniqueValidator from "mongoose-unique-validator";
import UserModel from ".";

const StudentSchema = new Schema<StudentUser>(
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
          return /^(u|se|ad|bm)?(0|1)(\d){4}$/.test(v);
        },
      },
    },
  },
  { discriminatorKey: "kind" }
);

StudentSchema.plugin(uniqueValidator, { message: "{PATH} must be unique" });

const StudentModel = UserModel.discriminator<StudentUser>(
  "student",
  StudentSchema
);

export default StudentModel;
