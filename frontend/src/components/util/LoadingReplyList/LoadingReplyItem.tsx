import styled from "styled-components";
import BorderedBox from "../../containers/BorderedBox";
import Box from "../../containers/Box";
import LoadingElement from "../LoadingElement";

const LoadingField = styled(LoadingElement)`
  min-width: 100px;
`;

const LoadingProfilePicture = styled(LoadingElement)`
  border-radius: 10em;
`;

const LoadingReplyItem = () => {
  return (
    <BorderedBox $horizontal $bg="white" $pad="l" $gap="1em" $rounded>
      <LoadingProfilePicture $width="2em" $height="2em" />

      <Box $gap="1em">
        <Box $horizontal $center $gap="0.5em">
          <LoadingField />

          <LoadingField />
        </Box>

        <LoadingField />
      </Box>
    </BorderedBox>
  );
};

export default LoadingReplyItem;
