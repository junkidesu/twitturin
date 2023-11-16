import { Schema, model } from "mongoose";
import { Reply } from "../types";

const ReplySchema = new Schema<Reply>({
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
});

const ReplyModel = model<Reply>("Reply", ReplySchema);

export default ReplyModel;
