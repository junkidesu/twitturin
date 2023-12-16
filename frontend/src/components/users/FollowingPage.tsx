import { useParams } from "react-router-dom";
import Box from "../containers/Box";
import RouterLink from "../core/RouterLink";
import Heading from "../core/text/Heading";
import {
  useGetFollowingQuery,
  useGetUserQuery,
} from "../../services/usersService";
import UserItem from "./UserItem";
import { User } from "../../types";
import LoadingUserItem from "../util/LoadingUserItem";
import Empty from "../util/Empty";

const FollowingList = ({ user }: { user: User }) => {
  const { data: following, isLoading, isError } = useGetFollowingQuery(user.id);

  if (isLoading)
    return (
      <Box $bg="white" $gap="1em" $pad="l">
        <LoadingUserItem />
        <LoadingUserItem />
      </Box>
    );

  if (isError || !following) return <div>Some error occurred!</div>;

  if (following.length === 0) return <Empty />;

  return (
    <Box>
      {following.map((u) => (
        <UserItem user={u} />
      ))}
    </Box>
  );
};

const FollowingPage = () => {
  const id = useParams().id;
  const { data: user, isLoading, isError } = useGetUserQuery(id!);

  if (isLoading) return <div>User loading...</div>;

  if (!user || isError) return <div>Some error occurred!</div>;

  return (
    <Box $gap="0.1em" $width="500px">
      <Box $bg="white" $pad="l" $gap="0.5em">
        <Heading $level={3}>
          Followers of{" "}
          <RouterLink to={`/users/${id}`}>@{user.username}</RouterLink>
        </Heading>
      </Box>

      <FollowingList user={user} />
    </Box>
  );
};

export default FollowingPage;
