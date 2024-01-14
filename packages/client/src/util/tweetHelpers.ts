import { Tweet } from "../types";

export const updateTweetInList =
  (id: string, update: (tweet: Tweet) => Tweet) =>
  (tweets: Tweet[]): Tweet[] => {
    const tweet = tweets.find((t) => t.id === id);

    if (!tweet) return tweets;

    const updatedTweet = update(tweet);

    return tweets.map((t) => (t.id !== id ? t : updatedTweet));
  };

export const like =
  (userId: string) =>
  (tweet: Tweet): Tweet => ({
    ...tweet,
    likes: tweet.likes + 1,
    likedBy: tweet.likedBy.concat(userId),
  });

export const unlike =
  (userId: string) =>
  (tweet: Tweet): Tweet => ({
    ...tweet,
    likes: tweet.likes - 1,
    likedBy: tweet.likedBy.filter((u) => u !== userId),
  });
