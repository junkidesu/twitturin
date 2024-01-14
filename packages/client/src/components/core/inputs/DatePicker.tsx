import styled from "styled-components";

const DatePicker = styled.input.attrs({ type: "date" })`
  width: 100%;
  background-color: white;
  appearance: none;
  outline: none;
  border: 2px solid ${({ theme }) => theme.colors.grey3};
  padding: 1em;
  border-radius: 1em;
  box-sizing: border-box;
  font-size: ${({ theme }) => theme.fontSizes.medium};
  font-family: sans-serif;
`;

export default DatePicker;
