import styled from "styled-components";
import Heading from "../../components/core/text/Heading";
import Label from "../../components/core/text/Label";
import Card from "../../components/containers/Card";

const Wrapper = styled(Card)`
  width: 500px;
  height: 200px;
  align-items: center;
  justify-content: center;
  
  @media (max-width: 500px) {
    width: 100%;
  }
`;

const ErrorPage = () => {
  return (
    <Wrapper $gap="1em">
      <Heading $level={3}>Error!</Heading>

      <Label>Please try refreshing the page.</Label>
    </Wrapper>
  );
};

export default ErrorPage;
