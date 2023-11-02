import { Types } from "mongoose";
import TweetModel from "../models/tweet";
import { NewTweet, EditTweet, PopulatedTweet, NotFoundError } from "../types";

const getAllTweets = async () => {
  const tweets = await TweetModel.find({}).populate<PopulatedTweet>("author");

  return tweets;
};

const getTweetById = async (id: string) => {
  const tweet = await TweetModel.findById(id).populate<PopulatedTweet>([
    "author",
    "likes",
  ]);

  return tweet;
};

const addTweet = async (newTweet: NewTweet) => {
  const addedTweet = await new TweetModel(newTweet).save();

  return addedTweet.populate<PopulatedTweet>(["author", "likes"]);
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
  }).populate<PopulatedTweet>(["author", "likes"]);

  return updatedTweet;
};

const likeTweet = async (id: string, userId: Types.ObjectId) => {
  const tweet = await TweetModel.findById(id);

  if (!tweet) throw new NotFoundError("tweet not found");

  const likesStrings = tweet.likes.map((u) => u.toString());

  if (!likesStrings.includes(userId.toString()))
    tweet.likes = tweet.likes.concat(userId);

  const likedTweet = await tweet.save();

  return likedTweet.populate<PopulatedTweet>(["author", "likes"]);
};

export default {
  getAllTweets,
  addTweet,
  getTweetById,
  removeTweet,
  editTweet,
  likeTweet,
};
