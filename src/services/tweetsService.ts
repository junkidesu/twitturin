import Tweet from "../models/tweet";
import { NewTweet, PopulatedAuthor, AuthError, NotFoundError } from "../types";

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

const removeTweet = async (id: string, userId: string) => {
  const tweet = await Tweet.findById(id);

  if (!tweet) throw new NotFoundError("tweet not found");

  if (tweet.author.toString() !== userId)
    throw new AuthError("tweet can only be removed by author");

  await Tweet.findByIdAndRemove(id);
};

export default { getAllTweets, addTweet, getTweetById, removeTweet };
