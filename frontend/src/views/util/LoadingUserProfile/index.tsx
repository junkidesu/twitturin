import styled from "styled-components";
import Box from "../../../components/containers/Box";
import LoadingElement from "../../../components/util/LoadingElement";

const Banner = styled.div`
  position: relative;
  height: 170px;
  background: linear-gradient(45deg, #555555, #333333);
`;

const LoadingProfilePicture = styled(LoadingElement)`
  position: absolute;
  border: 0.3em solid white;
  border-radius: 100em;
  bottom: -2.5em;
  left: 1em;
`;

const LoadingUserProfile = () => {
  return (
    <Box $bg="white" $width="500px" $gap="1.5em">
      <Banner>
        <LoadingProfilePicture $width="5em" $height="5em" />
      </Banner>

      <Box $pad="l" $gap="1em">
        <Box $gap="0.5em">
          <LoadingElement $width="150px" $height="2em" />
          <LoadingElement $width="100px" />
        </Box>
      </Box>
    </Box>
  );
};

export default LoadingUserProfile;
