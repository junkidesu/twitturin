import styled from "styled-components";
import Box from "../../containers/Box";
import LoadingElement from "../LoadingElement";

const LoadingProfilePicture = styled(LoadingElement)`
  border-radius: 10em;
`;

const LoadingTweetDetails = () => {
  return (
    <Box $bg="white" $horizontal $pad="l" $gap="1.5em" $width="500px">
      <LoadingProfilePicture $height="3em" $width="3em" />

      <Box $gap="1em">
        <Box $horizontal $center $gap="0.5em">
          <LoadingElement $height="1.3em" />

          <LoadingElement $height="1.3em" />
        </Box>

        <LoadingElement />
      </Box>
    </Box>
  );
};

export default LoadingTweetDetails;
