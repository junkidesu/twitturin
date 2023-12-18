import styled from "styled-components";
import Box from "../../components/containers/Box";
import Heading from "../../components/core/text/Heading";
import Label from "../../components/core/text/Label";

const Wrapper = styled(Box)`
  height: 200px;
  align-items: center;
  justify-content: center;
  
  @media (max-width: 500px) {
    width: 100%;
  }
`;

const ErrorPage = () => {
  return (
    <Wrapper $width="500px" $bg="white" $gap="1em" $pad="l">
      <Heading $level={3}>Error!</Heading>

      <Label>Please try refreshing the page.</Label>
    </Wrapper>
  );
};

export default ErrorPage;
