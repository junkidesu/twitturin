import styled from "styled-components";

interface Props {
  $bg?: string;
  $gap?: string;
  $center?: boolean;
  $border?: boolean;
  $bradius?: string | number;
  $rounded?: boolean;
  $minWidth?: string;
  $maxWidth?: string;
  $width?: string;
  $height?: string;
  $pad?: "s" | "m" | "l";
  $horizontal?: boolean;
  $hide?: boolean;
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
  align-items: ${({ $center, $horizontal }) =>
    $center && !$horizontal ? "center" : "none"};
  /* justify-content: ${({ $center }) =>
    $center ? "space-around" : "none"}; */
  gap: ${({ $gap }) => $gap || "0"};
  padding: ${({ $pad }) => toPadding($pad) || "none"};
  border-radius: ${({ $rounded, $bradius }) =>
    $rounded ? "1em" : $bradius || "0"};
  box-sizing: border-box;
  overflow: ${({ $hide }) => ($hide ? "hidden" : "visible")};
`;

export default Box;
