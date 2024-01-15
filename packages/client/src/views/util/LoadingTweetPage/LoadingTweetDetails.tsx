import styled from "styled-components";
import Box from "../../../components/containers/Box";
import LoadingElement from "../../../components/util/LoadingElement";
import Card from "../../../components/containers/Card";

const LoadingProfilePicture = styled(LoadingElement)`
  border-radius: 100em;
`;

const LoadingTweetDetails = () => {
  return (
    <Card $horizontal $gap="1.5em">
      <LoadingProfilePicture $width="3em" $height="3em" />

      <Box $gap="1em" $width="80%">
        <LoadingElement $height="2em" $width="100%" />

        <LoadingElement $height="5em" />
      </Box>
    </Card>
  );
};

export default LoadingTweetDetails;
