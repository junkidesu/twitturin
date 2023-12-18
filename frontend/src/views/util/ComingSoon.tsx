import styled from "styled-components";
import Heading from "../../components/core/text/Heading";
import Label from "../../components/core/text/Label";
import Card from "../../components/containers/Card";

const Wrapper = styled(Card)`
  width: 500px;
  height: 200px;
  justify-content: center;
`;

const ComingSoon = () => {
  return (
    <Wrapper $gap="1em">
      <Heading>Coming Soon</Heading>

      <Label>We're actively working on implementing this feature.</Label>
    </Wrapper>
  );
};

export default ComingSoon;
