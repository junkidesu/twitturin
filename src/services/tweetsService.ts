import Tweet from "../models/tweet";

const getAllTweets = async () => {
  const tweets = await Tweet.find({});

  return tweets;
};

export default { getAllTweets };
