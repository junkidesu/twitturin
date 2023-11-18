import styled from "styled-components";
import VerticalContainer from "../containers/VerticalContainer";
import RouterLink from "../core/RouterLink";
import emptyProfilePicture from "../../assets/images/empty-profile-picture.png";
import Tabs from "./Tabs";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../hooks/store";
import { User } from "../../types";

const Wrapper = styled(VerticalContainer)`
  border-radius: 10px;
  box-sizing: border-box;
  overflow: hidden;
  background: white;
  width: 600px;
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
  border: 0.3em solid white;
  border-radius: 100em;
  bottom: -2.5em;
  left: 1em;
`;

const FullName = styled(RouterLink)`
  font-weight: bold;
  font-size: ${(props) => props.theme.fontSizes.large};
`;

const Username = styled(RouterLink)`
  color: ${(props) => props.theme.colors.grey2};
`;

const UserProfile = () => {
  const id: string | undefined = useParams().id;
  const users: User[] = useAppSelector(({ users }) => users);

  const user: User | undefined = users.find((u) => u.id === id);

  if (!user) return <div>loading...</div>;

  return (
    <Wrapper gap="1.5em">
      <Banner>
        <ProfilePicture src={emptyProfilePicture} />
      </Banner>

      <UserDetails gap="1em">
        <VerticalContainer>
          <FullName to={`/users/${user.id}`}>{user.fullName}</FullName>
          <Username to={`/users/${user.id}`}>@{user.username}</Username>
        </VerticalContainer>
      </UserDetails>

      <Tabs tweets={user.tweets} replies={user.replies} />
    </Wrapper>
  );
};

export default UserProfile;
