import styled from "styled-components";

const Placeholder = styled.span<{ $empty?: boolean }>`
  position: absolute;
  left: 0.5em;
  top: ${(props) => (props.$empty ? "" : "0.5em")};
  font-size: ${(props) => (props.$empty ? "1.5em" : "1em")};
  color: #555555;
  user-select: none;
  transition: 0.1s;
`;

const InputField = styled.input`
  appearance: none;
  outline: none;
  border: none;
  color: #252525;
  font-size: 1.3em;
  padding: 0.5em;
  margin-top: 1em;
  background: transparent;
  z-index: 1000;

  &:focus + ${Placeholder} {
    font-size: 1em;
    top: 0.5em;
    left: 0.5em;
    color: teal;
    transition: 0.1s;
  }
`;

const InputWrapper = styled.div`
  position: relative;
  background-color: white;
  border: 1px solid #555555;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  border-radius: 5px;
  box-sizing: border-box;
  overflow: hidden;
  min-width: 10em;

  ${InputField}:focus {
    border-color: teal;
  }
`;

interface InputProps {
  placeholder: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}

const Input = ({ placeholder, value, onChange, type }: InputProps) => {
  return (
    <InputWrapper>
      <InputField type={type} value={value} onChange={onChange} />

      <Placeholder $empty={value === ""}>{placeholder}</Placeholder>
    </InputWrapper>
  );
};

export default Input;
