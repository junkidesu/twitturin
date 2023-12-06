import styled from "styled-components";
import Heading from "./core/text/Heading";
import Box from "./containers/Box";
import { useGetUsersQuery } from "../services/usersService";
import UserItem from "./users/UserItem";

const SideBarWrapper = styled(Box)`
  margin-left: 1.5em;
  border-radius: 1em;
  justify-content: space-between;
  position: sticky;
  top: 4.8em;
  overflow-y: auto;
`;

const SuggestionsSideBar = () => {
  const { data: users, isLoading, isError } = useGetUsersQuery();

  if (isLoading) return <div>loading...</div>;

  if (isError || !users) return <div>Some error occurred!</div>;

  return (
    <SideBarWrapper $width="350px" $pad="l" $gap="1em" $bg="white">
      <Heading $level={3}>Twittur Users</Heading>

      <Box>
        {users.slice(0, 3).map((u) => (
          <UserItem key={u.id} user={u} />
        ))}
      </Box>
    </SideBarWrapper>
  );
};

export default SuggestionsSideBar;
