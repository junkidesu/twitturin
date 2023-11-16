import styled from "styled-components";
import VerticalContainer from "../containers/VerticalContainer";
import { User } from "../../types";
import Link from "../core/Link";
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

const FullName = styled(Link)`
  font-weight: bold;
`;

const Username = styled(Link)`
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
          <FullName>{user.fullName}</FullName>
          <Username>@{user.username}</Username>
        </VerticalContainer>

        <TweetList tweets={user.tweets} />
      </UserDetails>
    </Wrapper>
  );
};

export default UserProfile;
