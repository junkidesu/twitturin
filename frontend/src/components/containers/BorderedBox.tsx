import styled from "styled-components";
import Box from "./Box";

interface Props {
  $color?: string;
  $width?: string;
  $horizontal?: boolean;
}

const BorderedBox = styled(Box)<Props>`
  flex-direction: ${({ $horizontal }) => ($horizontal ? "row" : "column")};
  border: ${({ $color, $width, theme: { colors } }) =>
    `${$width || "2px"} solid ${$color || colors.grey4}`};
`;

export default BorderedBox;
