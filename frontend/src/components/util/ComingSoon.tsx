import styled from "styled-components";
import Box from "../containers/Box";
import Heading from "../core/text/Heading";
import Label from "../core/text/Label";

const Wrapper = styled(Box)`
  height: 200px;
  justify-content: center;
`;

const ComingSoon = () => {
  return (
    <Wrapper $pad="l" $width="500px" $gap="0.5em" $bg="white">
      <Heading>Coming Soon</Heading>

      <Label>We're actively working on implementing this feature.</Label>
    </Wrapper>
  );
};

export default ComingSoon;
