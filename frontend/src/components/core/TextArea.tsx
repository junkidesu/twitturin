import styled from "styled-components";

const TextArea = styled.textarea`
  appearance: none;
  outline: none;
  padding: 0.5em;
  border: 2px solid ${(props) => props.theme.colors.grey4};
  border-radius: 10px;
  font-family: sans-serif;
  color: ${(props) => props.theme.colors.grey1};
  font-size: ${(props) => props.theme.fontSizes.medium};
  resize: none;
`;

export default TextArea;
