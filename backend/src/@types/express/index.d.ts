import { Document, Types } from "mongoose";
import { User } from "../../types";

declare global {
  namespace Express {
    export interface Request {
      user?: Document<unknown, object, User> & User & { _id: Types.ObjectId };
    }
  }
}
