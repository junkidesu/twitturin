import styled from "styled-components";
import Button from "../core/Button";

const AuthButton = styled(Button)`
  &:hover {
    background-color: ${(props) => props.$fg};
    color: slategray;
  }
`;

export default AuthButton;