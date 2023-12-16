import styled from "styled-components";
import Box from "../containers/Box";
import Heading from "../core/text/Heading";
import Label from "../core/text/Label";

const Wrapper = styled(Box)`
    height: 200px;
    width: 500px;
    align-items: center;
    justify-content: center;
`;

const Empty = () => {
  return (
    <Wrapper $bg="white" $pad="l" $gap="1em">
      <Heading $level={3}>Wow, so empty!</Heading>

      <Label>There does not appear to be anything here.</Label>
    </Wrapper>
  );
};

export default Empty;
