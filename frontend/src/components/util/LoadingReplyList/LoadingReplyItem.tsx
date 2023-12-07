import styled from "styled-components";
import Box from "../../containers/Box";
import LoadingElement from "../LoadingElement";

const LoadingProfilePicture = styled(LoadingElement)`
  border-radius: 10em;
`;

const LoadingReplyItem = () => {
  return (
    <Box $horizontal $bg="white" $pad="l" $gap="1em" $width="100%">
      <LoadingProfilePicture $width="2em" $height="2em" />

      <Box $gap="1em" $width="90%">
        <LoadingElement $width="100%" />

        <LoadingElement $height="2em" />
      </Box>
    </Box>
  );
};

export default LoadingReplyItem;
