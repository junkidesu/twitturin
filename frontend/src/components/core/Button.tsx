import styled from "styled-components";

const Button = styled.button<{
  $rounded?: boolean;
  $bg?: string;
  $fg?: string;
}>`
  background-color: ${(props) => props.$bg || props.theme.colors.background};
  color: ${(props) => props.$fg || props.theme.colors.primary};
  font-size: 1.2em;
  padding: 0.5em;
  border: 3px solid ${(props) => props.$fg || props.theme.colors.primary};
  border-radius: ${(props) => (props.$rounded ? "10em" : "5px")};
  transition: 0.1s;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => props.$fg || props.theme.colors.primary};
    color: ${(props) => props.$bg || props.theme.colors.background};
    transition: 0.1s;
  }
`;

export default Button;
