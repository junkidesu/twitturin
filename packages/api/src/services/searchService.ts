import ReplyModel from "../models/reply";
import UserModel from "../models/user";
import { PopulatedReply, Reply, SearchResults, User } from "../types";

const search = async ({
  keyword,
}: {
  keyword: string;
}): Promise<SearchResults> => {
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
    users,
    replies,
  };
};

export default { search };
