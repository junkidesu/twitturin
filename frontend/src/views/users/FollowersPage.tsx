import { useParams } from "react-router-dom";
import Box from "../../components/containers/Box";
import { useGetUserQuery } from "../../services/usersService";
import { useGetFollowersQuery } from "../../services/followService";
import UserItem from "../../components/users/UserItem";
import { User } from "../../types";
import LoadingUserItem from "../../components/util/LoadingUserItem";
import Empty from "../../components/util/Empty";
import ErrorPage from "../util/ErrorPage";
import PageHeading from "../../components/util/PageHeading";

const FollowersList = ({ user }: { user: User }) => {
  const { data: followers, isLoading, isError } = useGetFollowersQuery(user.id);

  if (isLoading)
    return (
      <Box $bg="white" $gap="1em" $pad="l">
        <LoadingUserItem />
        <LoadingUserItem />
      </Box>
    );

  if (isError || !followers) return <ErrorPage />;

  if (followers.length === 0) return <Empty />;

  return (
    <Box>
      {followers.map((u) => (
        <UserItem key={u.id} user={u} />
      ))}
    </Box>
  );
};

const FollowersPage = () => {
  const id = useParams().id;
  const { data: user, isLoading, isError } = useGetUserQuery(id!);

  if (isError) return <ErrorPage />;

  return (
    <Box $gap="0.1em" $width="500px">
      <PageHeading
        level={3}
        label={isLoading ? "Loading user..." : `Followers of ${user?.username}`}
      />

      {!isLoading && <FollowersList user={user!} />}
    </Box>
  );
};

export default FollowersPage;
