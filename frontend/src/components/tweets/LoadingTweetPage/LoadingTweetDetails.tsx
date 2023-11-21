import styled, { keyframes } from "styled-components";
import Box from "../../containers/Box";
import BorderedBox from "../../containers/BorderedBox";

const animateBg = keyframes`
  0% {
    background-position: 0 0;
  }

  100% {
    background-position: 100% 0;
  }
`;

const DetailsBox = styled(BorderedBox)`
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
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

const LoadingTweetDetails = () => {
  return (
    <DetailsBox $bg="white" $horizontal $pad="l" $gap="1.5em" $minWidth="600px">
      <LoadingProfilePicture />

      <Box $gap="1em">
        <Box $horizontal $center $gap="0.5em">
          <LoadingFullName />

          <LoadingUsername />
        </Box>

        <LoadingContent />

        <Box $horizontal $gap="0.5em">
          <LoadingButton />
          <LoadingButton />
          <LoadingButton />
        </Box>
      </Box>
    </DetailsBox>
  );
};

export default LoadingTweetDetails;
