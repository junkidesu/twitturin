import styled from "styled-components";
import Box from "../../containers/Box";
import LoadingElement from "../LoadingElement";
import Card from "../../containers/Card";

const LoadingProfilePicture = styled(LoadingElement)`
  border-radius: 10em;
`;

const LoadingReplyItem = () => {
  return (
    <Card $horizontal $gap="1em">
      <LoadingProfilePicture $width="2em" $height="2em" />

      <Box $gap="1em" $width="90%">
        <LoadingElement $width="100%" />

        <LoadingElement $height="2em" />
      </Box>
    </Card>
  );
};

export default LoadingReplyItem;
