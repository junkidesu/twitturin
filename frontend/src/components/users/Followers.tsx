import { useParams } from "react-router-dom";
import Box from "../containers/Box";
import RouterLink from "../core/RouterLink";
import Heading from "../core/text/Heading";
import {
  useGetFollowersQuery,
  useGetUserQuery,
} from "../../services/usersService";
import UserItem from "./UserItem";
import { User } from "../../types";
import LoadingUserItem from "../util/LoadingUserItem";

const FollowersList = ({ user }: { user: User }) => {
  const { data: followers, isLoading, isError } = useGetFollowersQuery(user.id);

  if (isLoading)
    return (
      <Box>
        <LoadingUserItem />
        <LoadingUserItem />
      </Box>
    );

  if (isError || !followers) return <div>Some error occurred!</div>;

  return (
    <Box>
      {followers.map((u) => (
        <UserItem user={u} />
      ))}
    </Box>
  );
};

const FollowersPage = () => {
  const id = useParams().id;
  const { data: user, isLoading, isError } = useGetUserQuery(id!);

  if (isLoading) return <div>User loading...</div>;

  if (!user || isError) return <div>Some error occurred!</div>;

  return (
    <Box $width="500px" $bg="white" $pad="l" $gap="0.5em">
      <Heading $level={3}>
        Followers of{" "}
        <RouterLink to={`/users/${id}`}>@{user.username}</RouterLink>
      </Heading>

      <FollowersList user={user} />
    </Box>
  );
};

export default FollowersPage;
