import styled from "styled-components";

const DatePicker = styled.input.attrs({ type: "date" })`
  appearance: none;
  outline: none;
  border: 1px solid ${({ theme }) => theme.colors.grey2};
  padding: 1em;
  border-radius: 10px;
  font-size: ${({ theme }) => theme.fontSizes.medium};
`;

export default DatePicker;
