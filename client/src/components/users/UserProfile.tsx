import styled from "styled-components";
import VerticalContainer from "../containers/VerticalContainer";
import { User } from "../../types";
import emptyProfilePicture from "../../assets/images/empty-profile-picture.png";

const Wrapper = styled(VerticalContainer)`
  border-radius: 10px;
  box-sizing: border-box;
  overflow: hidden;
  background: white;
`;

const Banner = styled.div`
  position: relative;
  height: 200px;
  background: linear-gradient(45deg, purple, orange);
`;

const UserDetails = styled.div`
  padding: 1em;
`;

const ProfilePicture = styled.img`
  position: absolute;
  width: 5em;
  height: 5em;
  box-sizing: border-box;
  overflow: hidden;
  border-radius: 10em;
  bottom: -2.5em;
  left: 1em;
`;

const UserProfile = ({ user }: { user: User }) => {
  return (
    <Wrapper gap="2em">
      <Banner>
        <ProfilePicture src={emptyProfilePicture} />
      </Banner>

      <UserDetails>
        <h2>{user.fullName}</h2>

        <h3>@{user.username}</h3>
      </UserDetails>
    </Wrapper>
  );
};

export default UserProfile;
