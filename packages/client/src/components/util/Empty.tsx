import styled from "styled-components";
import Heading from "../core/text/Heading";
import Label from "../core/text/Label";
import Card from "../containers/Card";

const Wrapper = styled(Card).attrs({ $gap: "1em" })`
  height: 200px;
  align-items: center;
  justify-content: center;
`;

const Empty = () => {
  return (
    <Wrapper>
      <Heading $level={3}>Wow, so empty!</Heading>

      <Label>There does not appear to be anything here.</Label>
    </Wrapper>
  );
};

export default Empty;
