import LoadingElement from "./LoadingElement";
import Box from "../containers/Box";
import styled from "styled-components";
import Card from "../containers/Card";

const LoadingProfilePicture = styled(LoadingElement)`
  border-radius: 10em;
`;

const LoadingUserItem = () => {
  return (
    <Card $horizontal $gap="1em">
      <LoadingProfilePicture $width="2em" $height="2em" />

      <Box $width="80%" $gap="0.5em" $center>
        <LoadingElement $height="1em" />
        <LoadingElement $height="1em" />
      </Box>
    </Card>
  );
};

export default LoadingUserItem;
