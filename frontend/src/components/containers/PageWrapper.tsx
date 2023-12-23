import styled from "styled-components";
import Box from "./Box";

const PageWrapper = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: start;
  height: 100%;
  flex-direction: row;

  @media (max-width: 649px) {
    margin-bottom: calc(50px + 0.1em);
  }
`;

export default PageWrapper;
