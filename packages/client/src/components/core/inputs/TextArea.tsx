import styled from "styled-components";

const TextArea = styled.textarea`
  appearance: none;
  outline: none;
  padding: 0.5em;
  /* border: 2px solid ${(props) => props.theme.colors.grey4};
  border-radius: 10px; */
  border: none;
  box-sizing: border-box;
  font-family: sans-serif;
  color: ${(props) => props.theme.colors.grey1};
  font-size: ${(props) => props.theme.fontSizes.small};
  resize: none;
  transition: 0.2s;

  &:focus {
    border-color: ${(props) => props.theme.colors.primary};
    transition: 0.2s;
  }
`;

export default TextArea;
