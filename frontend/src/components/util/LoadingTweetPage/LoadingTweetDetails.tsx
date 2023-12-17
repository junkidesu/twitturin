import styled from "styled-components";
import Box from "../../containers/Box";
import LoadingElement from "../LoadingElement";

const LoadingProfilePicture = styled(LoadingElement)`
  border-radius: 100em;
`;

const LoadingTweetDetails = () => {
  return (
    <Box $bg="white" $horizontal $pad="l" $gap="1.5em" $width="100%">
      <LoadingProfilePicture $width="3em" $height="3em" />

      <Box $gap="1em" $width="80%">
        <LoadingElement $height="2em" $width="100%" />

        <LoadingElement $height="5em" />
      </Box>
    </Box>
  );
};

export default LoadingTweetDetails;
