import { Types } from "mongoose";
import { NotFoundError, User } from "../types";
import TweetModel from "../models/tweet";

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
  await TweetModel.findByIdAndUpdate(id, { $pull: { likedBy: userId } });
};

export default { getTweetLikes, likeTweet, unlikeTweet };
