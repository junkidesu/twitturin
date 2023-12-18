import LoadingElement from "./LoadingElement";
import Box from "../containers/Box";
import styled from "styled-components";

const LoadingProfilePicture = styled(LoadingElement)`
  border-radius: 10em;
`;

const LoadingUserItem = () => {
  return (
    <Box $horizontal $center $pad="m" $gap="1em" $bg="white">
      <LoadingProfilePicture $width="2em" $height="2em" />

      <Box $width="80%" $gap="0.5em" $center>
        <LoadingElement $height="1em" />
        <LoadingElement $height="1em" />
      </Box>
    </Box>
  );
};

export default LoadingUserItem;
