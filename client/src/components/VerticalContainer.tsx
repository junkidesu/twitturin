import styled from "styled-components";

interface ContainerProps {
  orientation?: "vertical" | "horizontal";
  gap?: string | number;
  center?: boolean;
}
const ListContainer = styled.div<ContainerProps>`
  display: flex;
  align-items: ${(props) => (props.center ? "center" : "none")};
  gap: ${(props) => props.gap || "0.5em"};
`;

const VerticalContainer = styled(ListContainer)`
  flex-direction: column;
`;

export default VerticalContainer;
