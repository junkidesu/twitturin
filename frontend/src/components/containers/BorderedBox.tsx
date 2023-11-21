import styled from "styled-components";
import Box from "./Box";

interface BorderProps {
  $bc?: string;
  $bw?: string;
}

const BorderedBox = styled(Box)<BorderProps>`
  border: ${({ $bc, $bw, theme: { colors } }) =>
    `${$bw || "2px"} solid ${$bc || colors.grey4}`};
`;

export default BorderedBox;
