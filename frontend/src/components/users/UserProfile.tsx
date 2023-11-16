import styled from "styled-components";
import VerticalContainer from "../containers/VerticalContainer";
import { User } from "../../types";
import RouterLink from "../core/RouterLink";
import emptyProfilePicture from "../../assets/images/empty-profile-picture.png";
import TweetList from "../tweets/TweetList";

const Wrapper = styled(VerticalContainer)`
  border-radius: 10px;
  box-sizing: border-box;
  overflow: hidden;
  background: white;
`;

const Banner = styled.div`
  position: relative;
  height: 200px;
  background: linear-gradient(45deg, teal, violet);
`;

const UserDetails = styled(VerticalContainer)`
  padding: 1em;
`;

const ProfilePicture = styled.img`
  position: absolute;
  width: 5em;
  height: 5em;
  box-sizing: border-box;
  overflow: hidden;
  border: 0.5em solid white;
  border-radius: 100em;
  bottom: -2.5em;
  left: 1em;
`;

const FullName = styled(RouterLink)`
  font-weight: bold;
`;

const Username = styled(RouterLink)`
  color: ${(props) => props.theme.colors.grey2};
`;

const UserProfile = ({ user }: { user?: User }) => {
  if (!user) return <div>loading...</div>;

  return (
    <Wrapper gap="2em">
      <Banner>
        <ProfilePicture src={emptyProfilePicture} />
      </Banner>

      <UserDetails gap="1em">
        <VerticalContainer>
          <FullName to={`/users/${user.id}`}>{user.fullName}</FullName>
          <Username to={`/users/${user.id}`}>@{user.username}</Username>
        </VerticalContainer>

        <div>Tweets posted by {user.username}</div>

        <TweetList tweets={user.tweets} />
      </UserDetails>
    </Wrapper>
  );
};

export default UserProfile;