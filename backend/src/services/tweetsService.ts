import { Types } from "mongoose";
import TweetModel from "../models/tweet";
import { NewTweet, EditTweet, PopulatedTweet, NotFoundError } from "../types";

const getAllTweets = async () => {
  const tweets = await TweetModel.find({}).populate<PopulatedTweet>([
    "author",
    "likedBy",
  ]);

  return tweets;
};

const getTweetById = async (id: string) => {
  const tweet = await TweetModel.findById(id).populate<PopulatedTweet>([
    "author",
    "likedBy",
  ]);

  if (!tweet) throw new NotFoundError("tweet not found");

  return tweet;
};

const addTweet = async (newTweet: NewTweet) => {
  const addedTweet = await new TweetModel(newTweet).save();

  return addedTweet.populate<PopulatedTweet>(["author", "likedBy"]);
};

const removeTweet = async (id: string) => {
  const tweet = await TweetModel.findById(id);

  if (!tweet) throw new NotFoundError("tweet not found");

  await TweetModel.findByIdAndRemove(id);
};

const editTweet = async (id: string, toEdit: EditTweet) => {
  const tweet = await TweetModel.findById(id);

  if (!tweet) throw new NotFoundError("tweet not found");

  const updatedTweet = await TweetModel.findByIdAndUpdate(id, toEdit, {
    new: true,
    context: "query",
    runValidators: true,
  }).populate<PopulatedTweet>(["author", "likedBy"]);

  return updatedTweet;
};

const likeTweet = async (id: string, userId: Types.ObjectId) => {
  const tweet = await TweetModel.findById(id);

  if (!tweet) throw new NotFoundError("tweet not found");

  const likesStrings = tweet.likedBy.map((u) => u.toString());

  if (!likesStrings.includes(userId.toString()))
    tweet.likedBy = tweet.likedBy.concat(userId);

  const likedTweet = await tweet.save({ timestamps: { updatedAt: false } });

  return likedTweet.populate<PopulatedTweet>(["author", "likedBy"]);
};

const removeLike = async (id: string, userId: Types.ObjectId) => {
  const tweet = await TweetModel.findById(id);

  if (!tweet) throw new NotFoundError("tweet not found");

  tweet.likedBy = tweet.likedBy.filter(
    (u) => u.toString() !== userId.toString()
  );

  await tweet.save({ timestamps: { updatedAt: false } });
};

export default {
  getAllTweets,
  addTweet,
  getTweetById,
  removeTweet,
  editTweet,
  likeTweet,
  removeLike,
};