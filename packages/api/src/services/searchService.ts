import UserModel from "../models/user";
import { SearchResults, User } from "../types";

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

  return {
    users,
  };
};

export default { search };
