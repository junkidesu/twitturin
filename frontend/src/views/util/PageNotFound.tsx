import styled from "styled-components";
import Box from "../../components/containers/Box";
import RouterLink from "../../components/core/RouterLink";
import Heading from "../../components/core/text/Heading";
import Label from "../../components/core/text/Label";

const HomePageLink = styled(RouterLink)`
  display: inline;
`;
const PageNotFound = () => {
  return (
    <Box $gap="0.5em" $width="500px" $pad="l" $bg="white" $rounded>
      <Heading>Page not found</Heading>

      <Label>
        But don't be worried. You'll certainly like our{" "}
        <HomePageLink to="/">home page</HomePageLink>.
      </Label>
    </Box>
  );
};

export default PageNotFound;
