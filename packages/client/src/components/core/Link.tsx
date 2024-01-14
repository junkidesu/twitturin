import styled from "styled-components";

interface LinkProps {
  $size?: "extraSmall" | "small" | "medium" | "large" | "extraLarge";
  $color?: string;
  $bold?: boolean;
}

const Link = styled.a<LinkProps>`
  display: inline-block;
  color: ${({ theme, $color }) => $color || theme.colors.grey1};
  font-size: ${({ theme, $size }) =>
    $size ? theme.fontSizes[$size] : theme.fontSizes.extraSmall};
  font-weight: ${({ $bold }) => ($bold ? "bold" : "normal")};
  cursor: pointer;
  text-decoration: none;
  appearance: none;

  &:hover {
    color: ${(props) => props.theme.colors.primary};
  }
`;

export default Link;
