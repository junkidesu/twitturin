import styled from "styled-components";

interface Props {
  orientation?: "vertical" | "horizontal";
  $gap?: string | number;
  $center?: boolean;
}

const List = styled.div<Props>`
  display: flex;
  align-items: ${(props) => (props.$center ? "center" : "none")};
  gap: ${(props) => props.$gap || "0"};
`;

export default List;
