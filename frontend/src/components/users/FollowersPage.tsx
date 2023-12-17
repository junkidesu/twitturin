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
import Empty from "../util/Empty";
import ErrorPage from "../util/ErrorPage";

const FollowersList = ({ user }: { user: User }) => {
  const { data: followers, isLoading, isError } = useGetFollowersQuery(user.id);

  if (isLoading)
    return (
      <Box $bg="white" $gap="1em" $pad="l">
        <LoadingUserItem />
        <LoadingUserItem />
      </Box>
    );

  if (isError || !followers) return <div>Some error occurred!</div>;

  if (followers.length === 0) return <Empty />;

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

  if (isError) return <ErrorPage />;

  return (
    <Box $gap="0.1em" $width="500px">
      <Box $bg="white" $pad="l" $gap="0.5em">
        <Heading $level={3}>
          {isLoading ? (
            "Loading user..."
          ) : (
            <>
              Followers of{" "}
              <RouterLink to={`/users/${id}`}>@{user!.username}</RouterLink>
            </>
          )}
        </Heading>
      </Box>

      {!isLoading && <FollowersList user={user!} />}
    </Box>
  );
};

export default FollowersPage;
