import styled, { keyframes } from "styled-components";
import VStack from "../containers/VStack";
import HStack from "../containers/HStack";
import RouterLink from "../core/RouterLink";

const animateBg = keyframes`
  0% {
    background-position: 0 0;
  }

  100% {
    background-position: 100% 0;
  }
`;

const Wrapper = styled(HStack)`
  background-color: white;
  border: 2px solid ${(props) => props.theme.colors.grey4};
  border-radius: 5px;
  padding: 1em;
  min-width: 500px;
`;

const LoadingElement = styled.div`
  background: linear-gradient(90deg, #888888, #bbbbbb, #888888, #bbbbbb);
  background-size: 300% 100%;
  border-radius: 5px;
  animation: ${animateBg} 2s linear infinite;
`;

const LoadingField = styled(LoadingElement)`
  height: ${(props) => props.theme.fontSizes.small};
  min-width: 100px;
`;

const LoadingButton = styled(LoadingElement)`
  width: 40px;
  height: 30px;
`;

const LoadingProfilePicture = styled(LoadingElement)`
  width: 2em;
  height: 2em;
  border-radius: 10em;
`;

const Body = styled(VStack)`
  padding-left: 1em;
  gap: 1em;
`;

const LoadingTweetItem = () => {
  return (
    <Wrapper>
      <RouterLink to={`/`}>
        <LoadingProfilePicture />
      </RouterLink>

      <Body>
        <HStack $center $gap="0.5em">
          <LoadingField />

          <LoadingField />
        </HStack>

        <LoadingField />

        <HStack $gap="0.5em">
          <LoadingButton />

          <LoadingButton />

          <LoadingButton />
        </HStack>
      </Body>
    </Wrapper>
  );
};

export default LoadingTweetItem;
