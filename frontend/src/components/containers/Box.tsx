import styled from "styled-components";

interface Props {
  $bg?: string;
  $gap?: string;
  $center?: boolean;
  $border?: boolean;
  $rounded?: boolean;
  $minWidth?: string;
  $maxWidth?: string;
  $width?: string;
  $pad?: "s" | "m" | "l";
  $horizontal?: boolean;
}

const toPadding = ($pad: "s" | "m" | "l" | undefined) => {
  if (!$pad) return undefined;

  if ($pad === "s") {
    return "0.3em";
  }

  if ($pad === "m") {
    return "0.5em";
  }

  return "1em";
};

const Box = styled.div<Props>`
  width: ${({ $width }) => $width || "initial"};
  min-width: ${({ $minWidth }) => $minWidth || "0"};
  display: flex;
  flex-direction: ${({ $horizontal }) => ($horizontal ? "row" : "column")};
  background: ${({ $bg }) => $bg || "transparent"};
  align-items: ${({ $center }) => ($center ? "center" : "none")};
  gap: ${({ $gap }) => $gap || "0"};
  padding: ${({ $pad }) => toPadding($pad) || "none"};
  border-radius: ${({ $rounded }) => ($rounded ? "10px" : "none")};
  box-sizing: border-box;
`;

export default Box;
