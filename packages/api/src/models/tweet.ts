import { Schema, model } from "mongoose";
import { Tweet } from "../types";
import mongooseAutoPopulate from "mongoose-autopopulate";

const TweetSchema = new Schema<Tweet>(
  {
    content: {
      type: String,
      required: true,
      minlength: 1,
    },
    author: {
      type: Schema.Types.ObjectId,
      required: true,
      autopopulate: true,
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

TweetSchema.virtual("replies", {
  ref: "Reply",
  localField: "_id",
  foreignField: "parentTweet",
});

TweetSchema.virtual("replyCount", {
  ref: "Reply",
  localField: "_id",
  autopopulate: true,
  foreignField: "tweet",
  count: true,
});

TweetSchema.plugin(mongooseAutoPopulate);

const TweetModel = model<Tweet>("Tweet", TweetSchema);

export default TweetModel;
