import styled, { keyframes } from "styled-components";
import VStack from "../../containers/VStack";
import LoadingUserTabs from "./LoadingUserTabs";

const animateBg = keyframes`
  0% {
    background-position: 0 0;
  }

  100% {
    background-position: 100% 0;
  }
`;

const Wrapper = styled(VStack)`
  border-radius: 10px;
  box-sizing: border-box;
  overflow: hidden;
  background: white;
  width: 600px;
`;

const LoadingElement = styled.div`
  background: linear-gradient(90deg, #888888, #bbbbbb, #888888, #bbbbbb);
  background-size: 300% 100%;
  border-radius: 5px;
  animation: ${animateBg} 2s linear infinite;
`;

const LoadingFullName = styled(LoadingElement)`
  height: ${(props) => props.theme.fontSizes.large};
  min-width: 100px;
`;

const Banner = styled.div`
  position: relative;
  height: 170px;
  background: linear-gradient(45deg, #555555, #333333);
`;

const UserDetails = styled(VStack)`
  padding: 1em;
`;

const LoadingProfilePicture = styled(LoadingElement)`
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
const LoadingUsername = styled(LoadingElement)`
  width: 100px;
  height: ${(props) => props.theme.fontSizes.small};
`;

const LoadingUserProfile = () => {
  return (
    <Wrapper $gap="1.5em">
      <Banner>
        <LoadingProfilePicture />
      </Banner>

      <UserDetails $gap="1em">
        <VStack $gap="0.5em">
          <LoadingFullName />
          <LoadingUsername />
        </VStack>
      </UserDetails>

      <LoadingUserTabs />
    </Wrapper>
  );
};

export default LoadingUserProfile;
