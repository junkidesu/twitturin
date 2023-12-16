import styled from "styled-components";
import { pictures } from "../../../assets";
import { useParams } from "react-router-dom";
import { useGetUserQuery } from "../../../services/usersService";
import LoadingUserProfile from "../../util/LoadingUserProfile";
import Box from "../../containers/Box";
import Label from "../../core/text/Label";
import Heading from "../../core/text/Heading";
import TweetList from "../../tweets/TweetList";
import RouterLink from "../../core/RouterLink";

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

const Username = styled(Label)`
  color: ${(props) => props.theme.colors.grey2};
`;

const UserPage = () => {
  const id = useParams().id;
  const { data: user, isLoading, isError } = useGetUserQuery(id!);

  if (isLoading) return <LoadingUserProfile />;

  if (isError) return <div>some error occured</div>;

  if (!user) return <div>user not found!</div>;

  return (
    <Box $gap="0.1em">
      <Box $bg="white" $width="500px" $gap="1.5em" $hide>
        <Banner>
          <ProfilePicture src={pictures.emptyProfilePicture} />
        </Banner>

        <Box $bg="white" $pad="l" $gap="1em">
          <Box>
            <Heading $level={3}>{user.fullName || "Twittur User"}</Heading>
            <Username>@{user.username}</Username>
          </Box>

          <Label>
            {user.bio || `This user does not appear to have any biography.`}
          </Label>
        </Box>
      </Box>

      <Box $pad="l" $gap="1.5em" $bg="white" $horizontal>
        <RouterLink to={`/users/${id}/followers`}>
          {user.followersCount} followers
        </RouterLink>

        <RouterLink to={`/users/${id}/following`}>
          {user.followingCount} following
        </RouterLink>
      </Box>

      <TweetList author={user.id} />
    </Box>
  );
};

export default UserPage;
