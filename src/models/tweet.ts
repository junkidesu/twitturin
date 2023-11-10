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
    likedBy: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
        default: [],
      },
    ],
  },
  {
    timestamps: true,
    toJSON: {
      transform: (_document, returnedObject) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        returnedObject.id = returnedObject._id;
        delete returnedObject._id;
        delete returnedObject.__v;
      },
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  }
);

TweetSchema.virtual("likes").get(function (): number {
  return this.likedBy.length;
});

const TweetModel = model<Tweet>("Tweet", TweetSchema);

export default TweetModel;
