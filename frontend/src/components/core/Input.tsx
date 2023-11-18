import styled from "styled-components";

const Placeholder = styled.span<{ $empty?: boolean }>`
  position: absolute;
  left: 0.5em;
  top: ${(props) => (props.$empty ? "" : "0.5em")};
  font-size: ${(props) =>
    props.$empty
      ? props.theme.fontSizes.medium
      : props.theme.fontSizes.extraSmall};
  color: ${(props) => props.theme.colors.grey2};
  user-select: none;
  transition: 0.1s;
`;

const InputField = styled.input`
  appearance: none;
  outline: none;
  border: none;
  color: inherit;
  font-size: ${(props) => props.theme.fontSizes.medium};
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
  placeholder?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  required?: boolean;
  className?: string;
}

const Input = (props: InputProps) => {
  return (
    <InputWrapper className={props.className}>
      <InputField {...props} placeholder={undefined} />

      <Placeholder $empty={props.value === ""}>{props.placeholder}</Placeholder>
    </InputWrapper>
  );
};

export default Input;
