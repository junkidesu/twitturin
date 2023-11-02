import { Schema, model } from "mongoose";
import { Tweet } from "../types";

const TweetSchema = new Schema<Tweet>(
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
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
        default: [],
      },
    ],
  },
  {
    timestamps: true,
  }
);

TweetSchema.set("toJSON", {
  transform: (_document, returnedObject) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const TweetModel = model<Tweet>("Tweet", TweetSchema);

export default TweetModel;
