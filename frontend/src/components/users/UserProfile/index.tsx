import styled from "styled-components";
import RouterLink from "../../core/RouterLink";
import { pictures } from "../../../assets";
import UserTabs from "./UserTabs";
import { useParams } from "react-router-dom";
import { useGetUsersQuery } from "../../../services/usersService";
import LoadingUserProfile from "../LoadingUserProfile";
import Box from "../../containers/Box";

const Banner = styled.div`
  position: relative;
  height: 170px;
  background: linear-gradient(45deg, #555555, #333333);
`;

const ProfilePicture = styled.img`
  position: absolute;
  width: 5em;
  height: 5em;
  box-sizing: border-box;
  overflow: hidden;
  border: 0.3em solid white;
  border-radius: 100em;
  bottom: -2.5em;
  left: 1em;
`;

const UsernameLink = styled(RouterLink)`
  color: ${(props) => props.theme.colors.grey2};
`;

const UserProfile = () => {
  const id: string | undefined = useParams().id;
  const { data: users, isLoading, isError } = useGetUsersQuery();

  if (isLoading) return <LoadingUserProfile />;

  if (!users || isError) return <div>some error occured</div>;

  const user = users.find((u) => u.id === id);

  if (!user) return <div>user not found!</div>;

  return (
    <Box $bg="white" $width="600px" $rounded $gap="1.5em">
      <Banner>
        <ProfilePicture src={pictures.emptyProfilePicture} />
      </Banner>

      <Box $pad="l" $gap="1em">
        <Box>
          <RouterLink $bold $size="large" to={`/users/${user.id}`}>
            {user.fullName || "Twittur User"}
          </RouterLink>
          <UsernameLink to={`/users/${user.id}`}>@{user.username}</UsernameLink>
        </Box>
      </Box>

      <UserTabs tweets={user.tweets} replies={user.replies} />
    </Box>
  );
};

export default UserProfile;
