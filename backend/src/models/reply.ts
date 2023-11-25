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
      // required: true,
      ref: "Tweet",
    },
    to: {
      type: Schema.Types.ObjectId,
      ref: "Reply",
    },
    author: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    toObject: {
      virtuals: true,
    },
    toJSON: {
      transform: (_document, returnedObject) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        returnedObject.id = returnedObject.id || returnedObject._id;

        delete returnedObject._id;
        delete returnedObject.__v;
      },
      virtuals: true,
    },
    timestamps: true,
  }
);

const ReplyModel = model<Reply>("Reply", ReplySchema);

export default ReplyModel;
