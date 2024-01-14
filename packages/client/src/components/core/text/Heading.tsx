import styled from "styled-components";
import Label from "./Label";

interface HeadingProps {
  $mn?: boolean;
  $level?: 1 | 2 | 3 | 4;
}

const toFontSize = ($level?: 1 | 2 | 3 | 4): string | undefined => {
  if ($level === 1) return "2em";
  if ($level === 2) return "1.7em";
  if ($level === 3) return "1.6em";
  if ($level === 4) return "1.5em";

  return undefined;
};

const Heading = styled(Label)<HeadingProps>`
  margin-bottom: ${({ $mn }) => ($mn ? "0.5em" : "0")};
  font-size: ${({ $level }) => toFontSize($level) || "3em"};
  font-weight: 600;
`;

export default Heading;
