import { Schema, model } from "mongoose";
import { ITweet } from "../types";

const tweetSchema = new Schema<ITweet>(
  {
    content: {
      type: String,
      required: true,
      minlength: 1,
      maxLength: [250, "content cannot exceed 250 characters"],
    },
    author: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

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
