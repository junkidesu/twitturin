import styled from "styled-components";

interface ButtonProps {
  $size?: "extraSmall" | "small" | "medium" | "large" | "extraLarge";
  $bg?: string;
  $fg?: string;
  $rounded?: boolean;
  $width?: string;
}

const Button = styled.button<ButtonProps>`
  background-color: ${(props) => props.$bg || "transparent"};
  color: ${({ $fg, theme }) => $fg || theme.colors.primary};
  font-size: ${({ theme, $size }) =>
    $size ? theme.fontSizes[$size] : theme.fontSizes.small};
  padding: 0.5em;
  border: 3px solid ${(props) => props.$fg || props.theme.colors.primary};
  border-radius: ${(props) => (props.$rounded ? "10em" : "1em")};
  transition: 0.1s;
  cursor: pointer;
  width: ${({ $width }) => $width || "fit-content"};

  &:hover {
    background-color: ${({ $fg, theme }) => $fg || theme.colors.primary};
    color: ${({ $bg, theme }) => (!$bg ? theme.colors.background : $bg)};
    transition: 0.1s;
  }

  &:disabled {
    color: ${({ theme }) => theme.colors.grey2};
    border-color: ${({ theme }) => theme.colors.grey2};
    background-color: white;
  }

  &:disabled &:hover {
    color: ${({ theme }) => theme.colors.grey2};
    border-color: ${({ theme }) => theme.colors.grey2};
    background-color: white;
  }
`;

export default Button;
