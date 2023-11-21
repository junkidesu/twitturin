import styled from "styled-components";
import Button from "../core/buttons/Button";

const HeaderButton = styled(Button)`
  &:hover {
    color: ${({ theme }) => theme.colors.grey2};
  }
`;

export default HeaderButton;
