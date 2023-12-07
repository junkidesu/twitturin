import styled from "styled-components";
import Box from "./Box";

const SideBar = styled(Box)`
  justify-content: space-between;
  position: sticky;
  top: 4.8em;
  height: calc(100vh - 4.8em);
  overflow-y: auto;
`;

export default SideBar;
