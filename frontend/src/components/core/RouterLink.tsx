import styled from "styled-components";
import { Link } from "react-router-dom";

const RouterLink = styled(Link)`
  display: block;
  color: ${props => props.theme.colors.grey1};
  font-size: ${(props) => props.theme.fontSizes.extraSmall};
  cursor: pointer;
  text-decoration: none;
  appearance: none;

  &:hover {
    color: ${(props) => props.theme.colors.primary};
  }
`;

export default RouterLink;
