import { Schema, model } from "mongoose";
import { Reply } from "../types";

const ReplySchema = new Schema<Reply>({
  content: {
    type: String,
    required: true,
  },
  tweet: {
    type: Schema.Types.ObjectId,
    ref: "Post",
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const ReplyModel = model<Reply>("Reply", ReplySchema);

export default ReplyModel;
