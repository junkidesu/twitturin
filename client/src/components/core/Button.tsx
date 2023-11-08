import styled from "styled-components";

const Button = styled.button<{ $rounded?: boolean; $bg: string; $fg: string }>`
  background-color: ${(props) => props.$bg};
  color: ${(props) => props.$fg};
  font-size: 1.3em;
  padding: 0.5em;
  border: 3px solid ${(props) => props.$fg};
  border-radius: ${(props) => (props.$rounded ? "10em" : "5px")};
  transition: 0.1s;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => props.$fg};
    color: ${(props) => props.$bg};
    transition: 0.1s;
  }
`;

export default Button;
