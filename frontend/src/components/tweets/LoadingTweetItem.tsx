import styled, { keyframes } from "styled-components";
import Box from "../containers/Box";
import BorderedBox from "../containers/BorderedBox";
import RouterLink from "../core/RouterLink";

const animateBg = keyframes`
  0% {
    background-position: 0 0;
  }

  100% {
    background-position: 100% 0;
  }
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

const LoadingTweetItem = () => {
  return (
    <BorderedBox
      $gap="1em"
      $pad="l"
      $bg="white"
      $rounded
      $horizontal
      $minWidth="500px"
    >
      <RouterLink to={`/`}>
        <LoadingProfilePicture />
      </RouterLink>

      <Box $gap="1em">
        <Box $horizontal $center $gap="0.5em">
          <LoadingField />

          <LoadingField />
        </Box>

        <LoadingField />

        <Box $horizontal $gap="0.5em">
          <LoadingButton />

          <LoadingButton />

          <LoadingButton />
        </Box>
      </Box>
    </BorderedBox>
  );
};

export default LoadingTweetItem;
