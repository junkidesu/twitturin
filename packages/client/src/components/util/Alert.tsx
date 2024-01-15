import styled from "styled-components";
import Box from "../containers/Box";
import Label from "../core/text/Label";
import { icons } from "../../assets";
import { useAppSelector } from "../../hooks/store";

const ContentWrapper = styled(Box)`
  position: fixed;
  width: 100%;
  padding: 1em;
  z-index: 10000;
`;

const AlertWrapper = styled(Box)`
  padding: 1em;
  color: #ff416a;
  /* border: 5px solid #ff416a; */
  background-color: #ffc6d2;
  border-radius: 1em;
`;

const Alert = () => {
  const message = useAppSelector(({ alert }) => alert.message);

  if (!message) return null;

  return (
    <ContentWrapper>
      <AlertWrapper>
        <Box $horizontal $gap="1em">
          <icons.AlertIcon />
          <Label $bold>Error</Label>
        </Box>

        <Label>{message}</Label>
      </AlertWrapper>
    </ContentWrapper>
  );
};

export default Alert;
