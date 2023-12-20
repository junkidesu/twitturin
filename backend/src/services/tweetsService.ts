import { PopulateOptions, Types } from "mongoose";
import TweetModel from "../models/tweet";
import {
  Tweet,
  NewTweet,
  EditTweet,
  PopulatedTweet,
  NotFoundError,
  User,
} from "../types";

const options: PopulateOptions[] = [
  {
    path: "author",
  },
  {
    path: "replyCount",
  },
];

const getAllTweets = async () => {
  const tweets = await TweetModel.find<Tweet[]>({})
    .sort({ createdAt: -1 })
    .populate<PopulatedTweet>(options);

  return tweets;
};

const getTweetById = async (id: string) => {
  const tweet = await TweetModel.findById<Tweet>(id).populate<PopulatedTweet>(
    options
  );

  if (!tweet) throw new NotFoundError("tweet not found");

  return tweet;
};

const getTweetsByUser = async (userId: string) => {
  const tweets = await TweetModel.find<Tweet>({
    author: userId,
  })
    .sort({ createdAt: -1 })
    .populate<PopulatedTweet>(options);

  return tweets;
};

const addTweet = async (newTweet: NewTweet) => {
  const addedTweet = await new TweetModel(newTweet).save();

  return addedTweet.populate<PopulatedTweet>(options);
};

const removeTweet = async (id: string) => {
  await TweetModel.findByIdAndRemove(id);
};

const editTweet = async (id: string, toEdit: EditTweet) => {
  const updatedTweet = await TweetModel.findByIdAndUpdate<Tweet>(id, toEdit, {
    new: true,
    context: "query",
    runValidators: true,
  }).populate<PopulatedTweet>(options);

  return updatedTweet;
};

const likeTweet = async (id: string, user: User & { _id: Types.ObjectId }) => {
  const tweet = await TweetModel.findById(id);

  if (!tweet) throw new NotFoundError("tweet not found");

  const likesStrings = tweet.likedBy.map((u) => u.toString());
  const likedByMe = likesStrings.includes(user._id.toString());

  if (!likedByMe) tweet.likedBy = tweet.likedBy.concat(user._id);

  await tweet.save({ timestamps: { updatedAt: false } });

  return user;
};

const getLikes = async (id: string) => {
  const foundTweet = await TweetModel.findById(id).populate<{
    likedBy: User[];
  }>("likedBy");

  if (!foundTweet) throw new NotFoundError("tweet not found");

  return foundTweet.likedBy;
};

const getLikedTweets = async (userId: string) => {
  const tweets = await TweetModel.find({ likedBy: userId })
    .sort({ createdAt: -1 })
    .populate("author");

  return tweets;
};

const removeLike = async (id: string, userId: Types.ObjectId) => {
  const tweet = await TweetModel.findById(id);

  tweet!.likedBy = tweet!.likedBy.filter(
    (u) => u.toString() !== userId.toString()
  );

  await tweet!.save({ timestamps: { updatedAt: false } });
};

export default {
  getAllTweets,
  addTweet,
  getTweetById,
  getTweetsByUser,
  getLikedTweets,
  removeTweet,
  editTweet,
  likeTweet,
  getLikes,
  removeLike,
};
