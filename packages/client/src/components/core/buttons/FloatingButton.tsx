import styled from "styled-components";
import IconButton from "./IconButton";

const FloatingButton = styled(IconButton)`
  display: none;

  @media (max-width: 650px) {
    display: block;
    padding: 1em;
    position: fixed;
    bottom: calc(50px + 10px);
    right: 1em;
    border-radius: 10em;
    color: white;
    background-color: ${({ theme }) => theme.colors.secondary};
  }
`;

export default FloatingButton;
