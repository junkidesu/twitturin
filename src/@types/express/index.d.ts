import { Document, Types } from "mongoose";
import { IUser } from "../../types";

declare global {
  namespace Express {
    export interface Request {
      user?: Document<unknown, object, IUser> & IUser & { _id: Types.ObjectId };
    }
  }
}
