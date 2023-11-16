import { PopulateOptions, Types } from "mongoose";
import TweetModel from "../models/tweet";
import {
  NewTweet,
  EditTweet,
  PopulatedTweet,
  NotFoundError,
  NewReply,
  PopulatedReply,
} from "../types";
import ReplyModel from "../models/reply";

const options: PopulateOptions[] = [
  {
    path: "author",
  },
  {
    path: "likedBy",
  },
  {
    path: "replies",
    populate: {
      path: "author",
    },
  },
];

const getAllTweets = async () => {
  const tweets = await TweetModel.find({}).populate<PopulatedTweet>(options);

  return tweets;
};

const getTweetById = async (id: string) => {
  const tweet = await TweetModel.findById(id).populate<PopulatedTweet>(options);

  if (!tweet) throw new NotFoundError("tweet not found");

  return tweet;
};

const addTweet = async (newTweet: NewTweet) => {
  const addedTweet = await new TweetModel(newTweet).save();

  return addedTweet.populate<PopulatedTweet>(options);
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
  }).populate<PopulatedTweet>(options);

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

const replyToTweet = async (
  id: string,
  { content }: NewReply,
  author: string
) => {
  const reply = new ReplyModel({
    tweet: id,
    content,
    author,
  });

  const savedReply = await reply.save();
  return savedReply.populate<PopulatedReply>("author");
};

export default {
  getAllTweets,
  addTweet,
  getTweetById,
  removeTweet,
  editTweet,
  likeTweet,
  removeLike,
  replyToTweet,
};
