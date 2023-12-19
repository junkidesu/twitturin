import ReplyModel from "../models/reply";
import TweetModel from "../models/tweet";
import UserModel from "../models/user";
import { PopulatedReply, Reply, SearchResults, Tweet, User } from "../types";

const search = async ({
  keyword,
}: {
  keyword: string;
}): Promise<SearchResults> => {
  const tweets = await TweetModel.find<Tweet>({
    content: { $regex: keyword, $options: "i" },
  }).populate<{ author: User }>("author");

  const users = await UserModel.find<User>({
    $or: [
      {
        username: { $regex: keyword, $options: "i" },
      },
      {
        fullName: { $regex: keyword, $options: "i" },
      },
    ],
  });

  const replies = await ReplyModel.find<Reply>({
    content: { $regex: keyword, $options: "i" },
  }).populate<PopulatedReply>("author");

  return {
    tweets,
    users,
    replies,
  };
};

export default { search };
