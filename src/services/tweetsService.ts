import TweetModel from "../models/tweet";
import {
  NewTweet,
  EditTweet,
  PopulatedAuthor,
  NotFoundError,
} from "../types";

const getAllTweets = async () => {
  const tweets = await TweetModel.find({}).populate<PopulatedAuthor>("author");

  return tweets;
};

const getTweetById = async (id: string) => {
  const tweet = await TweetModel.findById(id).populate<PopulatedAuthor>("author");

  return tweet;
};

const addTweet = async (newTweet: NewTweet) => {
  const addedTweet = await new TweetModel(newTweet).save();

  return addedTweet;
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
  }).populate<PopulatedAuthor>("author");

  return updatedTweet;
};

export default { getAllTweets, addTweet, getTweetById, removeTweet, editTweet };
