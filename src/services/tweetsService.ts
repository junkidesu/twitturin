import Tweet from "../models/tweet";
import { NewTweet, PopulatedAuthor } from "../types";

const getAllTweets = async () => {
  const tweets = await Tweet.find({}).populate<PopulatedAuthor>("author");

  return tweets;
};

const addTweet = async (newTweet: NewTweet) => {
  const addedTweet = await new Tweet(newTweet).save();

  return addedTweet;
};

export default { getAllTweets, addTweet };
