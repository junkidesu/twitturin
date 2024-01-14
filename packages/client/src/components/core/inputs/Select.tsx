import styled from "styled-components";

const SelectWrapper = styled.select`
  background-color: white;
  color: ${(props) => props.theme.colors.grey1};
  font-size: 1.3em;
  padding: 1em;
  width: 100%;
  appearance: none;
  border: 2px solid ${({ theme }) => theme.colors.grey3};
  border-radius: 1em;
`;

const Select = ({
  options,
  value,
  onChange,
  placeholder,
  required,
  id,
}: {
  options: string[];
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLSelectElement>;
  placeholder?: string;
  required?: boolean;
  id?: string;
}) => {
  return (
    <SelectWrapper
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
      id={id}
    >
      {options.map((m) => (
        <option key={m} value={m}>
          {m}
        </option>
      ))}
    </SelectWrapper>
  );
};

export default Select;
