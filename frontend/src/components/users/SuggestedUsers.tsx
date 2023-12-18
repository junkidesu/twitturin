import Heading from "../core/text/Heading";
import Box from "../containers/Box";
import { useGetUsersQuery } from "../../services/usersService";
import UserItem from "./UserItem";
import LoadingUserItem from "../util/LoadingUserItem";
import Card from "../containers/Card";
import styled from "styled-components";

const Wrapper = styled(Card)`
  width: 350px;
`;

const SuggestedUsers = () => {
  const { data: users, isLoading, isError } = useGetUsersQuery();

  if (isError) return <div>Some error occurred!</div>;

  return (
    <Wrapper $gap="1em" $rounded>
      <Heading $level={3}>Twittur Users</Heading>

      <Box>
        {isLoading || !users ? (
          <>
            <LoadingUserItem />
            <LoadingUserItem />
            <LoadingUserItem />
          </>
        ) : (
          users.map((u) => <UserItem key={u.id} user={u} />)
        )}
      </Box>
    </Wrapper>
  );
};

export default SuggestedUsers;
