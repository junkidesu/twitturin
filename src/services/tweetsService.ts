import Tweet from "../models/tweet";
import { NewTweet, PopulatedAuthor } from "../types";

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

export default { getAllTweets, addTweet, getTweetById };
