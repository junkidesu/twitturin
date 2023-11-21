import styled from "styled-components";

interface LabelProps {
  $size?: "extraSmall" | "small" | "medium" | "large" | "extraLarge";
  $color?: string;
  $bold?: boolean;
  $bg?: string;
}

const Label = styled.p<LabelProps>`
  margin: 0;
  font-size: ${({ theme, $size }) =>
    $size ? theme.fontSizes[$size] : theme.fontSizes.small};
  background-color: ${({ $bg }) => $bg || "trsnsparent"};
  color: ${({ $color }) => $color || "inherit"};
  font-weight: ${({ $bold }) => ($bold ? 700 : "normal")};
`;

export default Label;
