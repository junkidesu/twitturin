import styled from "styled-components";

const SelectWrapper = styled.select`
  background-color: white;
  color: #252525;
  font-size: 1.3em;
  padding: 0.5em;
  width: 100%;
  appearance: none;
  border: 1px solid #555555;
  border-radius: 5px;
`;

const Select = ({
  options,
  value,
  onChange,
  placeholder,
  required,
}: {
  options: string[];
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLSelectElement>;
  placeholder?: string;
  required?: boolean;
}) => {
  return (
    <SelectWrapper
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
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
