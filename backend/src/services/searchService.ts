import ReplyModel from "../models/reply";
import TweetModel from "../models/tweet";
import UserModel from "../models/user";
import { Reply, SearchResults, Tweet, User } from "../types";

const search = async ({
  keyword,
}: {
  keyword: string;
}): Promise<SearchResults> => {
  console.log("searching with", keyword);

  const tweets = await TweetModel.find<Tweet>({
    content: { $regex: keyword, $options: "i" },
  });

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
  });

  return {
    tweets,
    users,
    replies,
  };
};

export default { search };
