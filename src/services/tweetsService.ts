import Tweet from "../models/tweet";
import {
  NewTweet,
  EditTweet,
  PopulatedAuthor,
  NotFoundError,
} from "../types";

const getAllTweets = async () => {
  const tweets = await Tweet.find({}).populate<PopulatedAuthor>("author");

  return tweets;
};

const getTweetById = async (id: string) => {
  const tweet = await Tweet.findById(id).populate<PopulatedAuthor>("author");

  return tweet;
};

const addTweet = async (newTweet: NewTweet) => {
  const addedTweet = await new Tweet(newTweet).save();

  return addedTweet;
};

const removeTweet = async (id: string) => {
  const tweet = await Tweet.findById(id);

  if (!tweet) throw new NotFoundError("tweet not found");

  await Tweet.findByIdAndRemove(id);
};

const editTweet = async (id: string, toEdit: EditTweet) => {
  const tweet = await Tweet.findById(id);

  if (!tweet) throw new NotFoundError("tweet not found");

  const updatedTweet = await Tweet.findByIdAndUpdate(id, toEdit, {
    new: true,
    context: "query",
    runValidators: true,
  }).populate<PopulatedAuthor>("author");

  return updatedTweet;
};

export default { getAllTweets, addTweet, getTweetById, removeTweet, editTweet };
