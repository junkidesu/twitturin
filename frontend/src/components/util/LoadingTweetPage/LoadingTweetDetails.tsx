import styled from "styled-components";
import Box from "../../containers/Box";
import BorderedBox from "../../containers/BorderedBox";
import LoadingElement from "../LoadingElement";

const DetailsBox = styled(BorderedBox)`
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
`;

const LoadingButton = styled(LoadingElement)`
  width: 80px;
`;

const LoadingProfilePicture = styled(LoadingElement)`
  border-radius: 10em;
`;

const LoadingTweetDetails = () => {
  return (
    <DetailsBox $bg="white" $horizontal $pad="l" $gap="1.5em" $minWidth="600px">
      <LoadingProfilePicture $height="3em" $width="3em" />

      <Box $gap="1em">
        <Box $horizontal $center $gap="0.5em">
          <LoadingElement $height="1.3em" />

          <LoadingElement $height="1.3em" />
        </Box>

        <LoadingElement />

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
