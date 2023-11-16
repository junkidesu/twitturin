import { Schema, model } from "mongoose";
import { Reply } from "../types";

const ReplySchema = new Schema<Reply>(
  {
    content: {
      type: String,
      required: true,
    },
    tweet: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Tweet",
    },
    author: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    toJSON: {
      transform: (_document, returnedObject) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        returnedObject.id = returnedObject.id || returnedObject._id;

        delete returnedObject._id;
        delete returnedObject.__v;
      },
    },
  }
);

const ReplyModel = model<Reply>("Reply", ReplySchema);

export default ReplyModel;
