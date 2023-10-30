import Tweet from "../models/tweet";
import User from "../models/user";
import { NewTweet, NotFoundError } from "../types";

const getAllTweets = async () => {
  const tweets = await Tweet.find({});

  return tweets;
};

const addTweet = async ({ content, author }: NewTweet) => {
  const foundAuthor = await User.findById(author);

  if (!foundAuthor) throw new NotFoundError("user not found");

  const addedTweet = await new Tweet({
    content,
    author: foundAuthor._id,
  }).save();

  return addedTweet;
};

export default { getAllTweets, addTweet };
