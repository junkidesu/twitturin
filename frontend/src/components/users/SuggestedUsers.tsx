import Heading from "../core/text/Heading";
import Box from "../containers/Box";
import { useGetUsersQuery } from "../../services/usersService";
import UserItem from "./UserItem";

const SuggestedUsers = () => {
  const { data: users, isLoading, isError } = useGetUsersQuery();

  if (isLoading) return <div>loading...</div>;

  if (isError || !users) return <div>Some error occurred!</div>;

  return (
    <Box $width="350px" $pad="l" $gap="1em" $bg="white" $bradius="1em">
      <Heading $level={3}>Twittur Users</Heading>

      <Box>
        {users.slice(0, 3).map((u) => (
          <UserItem key={u.id} user={u} />
        ))}
      </Box>
    </Box>
  );
};

export default SuggestedUsers;
