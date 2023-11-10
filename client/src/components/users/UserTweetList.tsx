import { BaseTweet, User } from "../../types";
import UserTweet from "./UserTweet";
import VerticalContainer from "../containers/VerticalContainer";

const UserTweetList = ({
  tweets,
  user,
}: {
  tweets: BaseTweet[];
  user: User;
}) => {
  return (
    <VerticalContainer>
      {tweets.map((t) => (
        <UserTweet key={t.id} tweet={t} user={user} />
      ))}
    </VerticalContainer>
  );
};

export default UserTweetList;
