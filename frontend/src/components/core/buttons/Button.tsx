import styled from "styled-components";

interface ButtonProps {
  $bg?: string;
  $fg?: string;
  $rounded?: boolean;
}

const Button = styled.button<ButtonProps>`
  background-color: ${(props) => props.$bg || "transparent"};
  color: ${(props) => props.$fg || props.theme.colors.primary};
  font-size: ${(props) => props.theme.fontSizes.small};
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
