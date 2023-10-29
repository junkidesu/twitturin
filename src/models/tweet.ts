import { Schema, model } from "mongoose";
import { ITweet } from "../types";

const tweetSchema = new Schema<ITweet>({
  content: {
    type: String,
    required: true,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

tweetSchema.set("toJSON", {
  transform: (_document, returnedObject) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Tweet = model<ITweet>("Tweet", tweetSchema);

export default Tweet;
