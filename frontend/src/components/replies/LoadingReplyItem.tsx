import styled, { keyframes } from "styled-components";
import VStack from "../containers/VStack";
import HStack from "../containers/HStack";

const animateBg = keyframes`
  0% {
    background-position: 0 0;
  }

  100% {
    background-position: 100% 0;
  }
`;

const Wrapper = styled(HStack)`
  display: flex;
  background-color: white;
  border: 2px solid ${(props) => props.theme.colors.grey4};
  border-radius: 5px;
  padding: 1em;
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

const LoadingProfilePicture = styled(LoadingElement)`
  width: 2em;
  height: 2em;
  border-radius: 10em;
`;

const Body = styled(VStack)`
  padding-left: 1em;
  gap: 1em;
`;

const LoadingReplyItem = () => {
  return (
    <Wrapper>
      <LoadingProfilePicture />

      <Body>
        <HStack $center $gap="0.5em">
          <LoadingField />

          <LoadingField />
        </HStack>

        <LoadingField />
      </Body>
    </Wrapper>
  );
};

export default LoadingReplyItem;
