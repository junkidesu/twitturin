import styled from "styled-components";

const Link = styled.a`
  font-size: ${(props) => props.theme.fontSizes.small};
  cursor: pointer;

  &:hover {
    text-decoration: underline;
    color: ${(props) => props.theme.colors.primary};
  }

  &:visited {
    color: ${(props) => props.theme.colors.secondary};
  }
`;

export default Link;
