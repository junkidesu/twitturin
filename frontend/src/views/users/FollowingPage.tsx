import { useParams } from "react-router-dom";
import Box from "../../components/containers/Box";
import { useGetUserQuery } from "../../services/usersService";
import { useGetFollowingQuery } from "../../services/followService";
import UserItem from "../../components/users/UserItem";
import { User } from "../../types";
import LoadingUserItem from "../../components/util/LoadingUserItem";
import Empty from "../../components/util/Empty";
import ErrorPage from "../util/ErrorPage";
import PageHeading from "../../components/util/PageHeading";

const FollowingList = ({ user }: { user: User }) => {
  const { data: following, isLoading, isError } = useGetFollowingQuery(user.id);

  if (isLoading)
    return (
      <Box $bg="white" $gap="1em" $pad="l">
        <LoadingUserItem />
        <LoadingUserItem />
      </Box>
    );

  if (isError || !following) return <ErrorPage />;

  if (following.length === 0) return <Empty />;

  return (
    <Box>
      {following.map((u) => (
        <UserItem key={u.id} user={u} />
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
      <PageHeading
        level={3}
        label={
          isLoading ? "Loading user..." : `Users followed by ${user?.username}`
        }
      />

      <FollowingList user={user} />
    </Box>
  );
};

export default FollowingPage;
