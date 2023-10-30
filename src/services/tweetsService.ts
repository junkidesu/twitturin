import Tweet from "../models/tweet";
import { NewTweet } from "../types";

const getAllTweets = async () => {
  const tweets = await Tweet.find({});

  return tweets;
};

const addTweet = async (newTweet: NewTweet) => {
  const addedTweet = await new Tweet(newTweet).save();

  return addedTweet;
};

export default { getAllTweets, addTweet };
