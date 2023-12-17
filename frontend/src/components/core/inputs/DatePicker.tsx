import styled from "styled-components";

const DatePicker = styled.input.attrs({ type: "date" })`
  appearance: none;
  outline: none;
  border: 2px solid ${({ theme }) => theme.colors.grey3};
  padding: 0.7em;
  border-radius: 10px;
  font-size: ${({ theme }) => theme.fontSizes.medium};
  font-family: sans-serif;
`;

export default DatePicker;
