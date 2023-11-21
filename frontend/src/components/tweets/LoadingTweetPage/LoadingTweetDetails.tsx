import styled, { keyframes } from "styled-components";
import VBox from "../../containers/VBox";
import HBox from "../../containers/HBox";

const animateBg = keyframes`
  0% {
    background-position: 0 0;
  }

  100% {
    background-position: 100% 0;
  }
`;

const Wrapper = styled(HBox)`
  background-color: white;
  border: 2px solid ${(props) => props.theme.colors.grey4};
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  padding: 1em;
  min-width: 600px;
`;

const LoadingElement = styled.div`
  background: linear-gradient(90deg, #888888, #bbbbbb, #888888, #bbbbbb);
  background-size: 300% 100%;
  border-radius: 5px;
  animation: ${animateBg} 2s linear infinite;
`;

const LoadingButton = styled(LoadingElement)`
  width: 80px;
  height: 30px;
`;

const LoadingFullName = styled(LoadingElement)`
  height: ${(props) => props.theme.fontSizes.medium};
  width: 100%;
`;

const LoadingUsername = styled(LoadingElement)`
  height: ${(props) => props.theme.fontSizes.medium};
  width: 100%;
`;

const LoadingContent = styled(LoadingElement)`
  height: ${(props) => props.theme.fontSizes.small};
`;

const LoadingProfilePicture = styled(LoadingElement)`
  width: 3em;
  height: 3em;
  box-sizing: border-box;
  border-radius: 10em;
`;

const Body = styled(VBox)`
  padding-left: 1em;
  gap: 1em;
`;

const LoadingTweetDetails = () => {
  return (
    <Wrapper>
      <LoadingProfilePicture />

      <Body>
        <HBox $center $gap="0.5em">
          <LoadingFullName />

          <LoadingUsername />
        </HBox>

        <LoadingContent />

        <HBox $gap="0.5em">
          <LoadingButton />
          <LoadingButton />
          <LoadingButton />
        </HBox>
      </Body>
    </Wrapper>
  );
};

export default LoadingTweetDetails;
