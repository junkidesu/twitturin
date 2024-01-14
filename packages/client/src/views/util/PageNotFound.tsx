import styled from "styled-components";
import RouterLink from "../../components/core/RouterLink";
import Heading from "../../components/core/text/Heading";
import Label from "../../components/core/text/Label";
import Card from "../../components/containers/Card";

const HomePageLink = styled(RouterLink)`
  display: inline;
`;

const Wrapper = styled(Card)`
  height: 200px;
  width: 500px;
`;

const PageNotFound = () => {
  return (
    <Wrapper $gap="1em">
      <Heading>Page not found</Heading>

      <Label>
        But don't be worried. You'll certainly like our{" "}
        <HomePageLink to="/">home page</HomePageLink>.
      </Label>
    </Wrapper>
  );
};

export default PageNotFound;
