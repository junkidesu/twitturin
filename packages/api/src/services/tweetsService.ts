import TweetModel from "../models/tweet";
import { Tweet, NewTweet, EditTweet, NotFoundError } from "../types";

const getAllTweets = async () => {
  const tweets = await TweetModel.find<Tweet[]>({}).sort({ createdAt: -1 });

  return tweets;
};

const getTweetById = async (id: string) => {
  const tweet = await TweetModel.findById<Tweet>(id);

  if (!tweet) throw new NotFoundError("tweet not found");

  return tweet;
};

const getTweetsByUser = async (userId: string) => {
  const tweets = await TweetModel.find<Tweet>({
    author: userId,
  }).sort({ createdAt: -1 });

  return tweets;
};

const addTweet = async (newTweet: NewTweet) => {
  const addedTweet = await new TweetModel(newTweet).save();

  return addedTweet;
};

const removeTweet = async (id: string) => {
  await TweetModel.findByIdAndRemove(id);
};

const editTweet = async (id: string, toEdit: EditTweet) => {
  const updatedTweet = await TweetModel.findByIdAndUpdate<Tweet>(id, toEdit, {
    new: true,
    context: "query",
    runValidators: true,
  });

  if (!updatedTweet) throw new NotFoundError("tweet not found");

  return updatedTweet;
};


const getLikedTweets = async (userId: string) => {
  const tweets = await TweetModel.find({ likedBy: userId }).sort({
    createdAt: -1,
  });

  return tweets;
};

export default {
  getAllTweets,
  addTweet,
  getTweetById,
  getTweetsByUser,
  getLikedTweets,
  removeTweet,
  editTweet,
};
