import styled from "styled-components";
import HorizontalContainer from "../containers/HorizontalContainer";
import Icon from "./Icon";

const ButtonWrapper = styled(HorizontalContainer)`
  width: fit-content;
  border-radius: 5px;
  box-sizing: border-box;
  padding: 0.3em;
  transition: 0.3s;
  color: ${(props) => props.theme.colors.grey2};

  &:hover {
    background-color: ${(props) => props.theme.colors.grey4};
    transition: 0.3s;
  }
`;

const Label = styled.span`
  font-size: ${(props) => props.theme.fontSizes.extraSmall};
`;

const IconButton = ({
  label,
  icon,
  onClick,
  className,
}: {
  label?: string | number;
  icon: string;
  onClick?: () => void;
  className?: string;
}) => {
  if (label === undefined) {
    return (
      <ButtonWrapper $center onClick={onClick} className={className}>
        <Icon src={icon} />
      </ButtonWrapper>
    );
  }

  return (
    <ButtonWrapper gap="0.3em" $center onClick={onClick} className={className}>
      <Icon src={icon} />
      <Label>{label}</Label>
    </ButtonWrapper>
  );
};

export default IconButton;
