import styled from "styled-components";
import IconButton from "./IconButton";

const FlatButton = styled(IconButton)`
  background-color: white;
  border-radius: 0;
  padding: 0.5em;
  font-size: ${({ theme }) => theme.fontSizes.small};
  min-width: fit-content;
  width: 100%;
`;

export default FlatButton;