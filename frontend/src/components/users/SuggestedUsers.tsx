import Heading from "../core/text/Heading";
import Box from "../containers/Box";
import { useGetUsersQuery } from "../../services/usersService";
import UserItem from "./UserItem";
import LoadingUserItem from "../util/LoadingUserItem";

const SuggestedUsers = () => {
  const { data: users, isLoading, isError } = useGetUsersQuery();

  if (isError) return <div>Some error occurred!</div>;

  return (
    <Box $width="350px" $pad="l" $gap="1em" $bg="white" $bradius="1em">
      <Heading $level={3}>Twittur Users</Heading>

      <Box>
        {isLoading || !users
          ? [1, 2, 3].map(() => <LoadingUserItem />)
          : users.map((u) => <UserItem key={u.id} user={u} />)}
      </Box>
    </Box>
  );
};

export default SuggestedUsers;
