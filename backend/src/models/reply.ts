import { Schema, model } from "mongoose";
import mongooseAutoPopulate from "mongoose-autopopulate";
import { Reply } from "../types";

const ReplySchema = new Schema<Reply>(
  {
    content: {
      type: String,
      required: true,
    },
    likedBy: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
        default: [],
      },
    ],
    tweet: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Tweet",
    },
    parentTweet: {
      type: Schema.Types.ObjectId,
      ref: "Tweet",
    },
    parentReply: {
      type: Schema.Types.ObjectId,
      ref: "Reply",
    },
    author: {
      type: Schema.Types.ObjectId,
      required: true,
      autopopulate: true,
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

ReplySchema.virtual("likes").get(function () {
  return this.likedBy.length;
});

ReplySchema.virtual("replies", {
  ref: "Reply",
  localField: "_id",
  foreignField: "parentReply",
  autopopulate: true,
});

ReplySchema.plugin(mongooseAutoPopulate);

const ReplyModel = model<Reply>("Reply", ReplySchema);

export default ReplyModel;
