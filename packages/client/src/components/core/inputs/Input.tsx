import styled from "styled-components";
import BorderedBox from "../../containers/BorderedBox";
import { useState } from "react";
import Label from "../text/Label";

const Placeholder = styled(Label)<{ $empty?: boolean }>`
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
  z-index: 100;

  &:focus + ${Placeholder} {
    font-size: 1em;
    top: 0.5em;
    left: 0.5em;
    color: ${(props) => props.theme.colors.primary};
    transition: 0.1s;
  }
`;

const InputWrapper = styled(BorderedBox)<{ $focus: boolean }>`
  position: relative;
  justify-content: space-around;
  border-color: ${({ $focus, theme: { colors } }) =>
    $focus ? colors.primary : colors.grey3};
`;

interface InputProps {
  placeholder?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  required?: boolean;
  className?: string;
  id?: string;
}

const Input = (props: InputProps) => {
  const [focus, setFocus] = useState(false);

  return (
    <InputWrapper
      $bg="white"
      $minWidth="10em"
      className={props.className}
      $focus={focus}
      $rounded
      id={props.id}
    >
      <InputField
        {...props}
        placeholder={undefined}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
      />

      <Placeholder $empty={props.value === ""}>{props.placeholder}</Placeholder>
    </InputWrapper>
  );
};

export default Input;
