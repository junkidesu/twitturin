import { Types } from "mongoose";
import { NotFoundError, User } from "../types";
import TweetModel from "../models/tweet";
import ReplyModel from "../models/reply";

const getTweetLikes = async (id: string) => {
  const foundTweet = await TweetModel.findById(id).populate<{
    likedBy: User[];
  }>("likedBy");

  if (!foundTweet) throw new NotFoundError("tweet not found");

  return foundTweet.likedBy;
};

const likeTweet = async (id: string, userId: Types.ObjectId) => {
  const likedTweet = await TweetModel.findByIdAndUpdate(
    id,
    { $addToSet: { likedBy: userId } },
    { context: "query", new: true, timestamps: false }
  );

  if (!likedTweet) throw new NotFoundError("tweet not found");

  return likedTweet;
};

const unlikeTweet = async (id: string, userId: Types.ObjectId) => {
  await TweetModel.findByIdAndUpdate(
    id,
    { $pull: { likedBy: userId } },
    { timestamps: false }
  );
};

const getReplyLikes = async (id: string) => {
  const foundReply = await ReplyModel.findById(id).populate<{
    likedBy: User[];
  }>("likedBy");

  if (!foundReply) throw new NotFoundError("reply not found");

  return foundReply.likedBy;
};

const likeReply = async (id: string, userId: Types.ObjectId) => {
  const likedReply = await ReplyModel.findByIdAndUpdate(
    id,
    { $addToSet: { likedBy: userId } },
    { context: "query", new: true, timestamps: false }
  );

  if (!likedReply) throw new NotFoundError("reply not found");

  return likedReply;
};

const unlikeReply = async (id: string, userId: Types.ObjectId) => {
  await ReplyModel.findByIdAndUpdate(
    id,
    { $pull: { likedBy: userId } },
    { timestamps: false }
  );
};

export default {
  getTweetLikes,
  likeTweet,
  unlikeTweet,
  getReplyLikes,
  likeReply,
  unlikeReply,
};
