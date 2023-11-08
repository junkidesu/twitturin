import styled from "styled-components";
import HorizontalContainer from "./HorizontalContainer";
import Icon from "./Icon";

const ButtonWrapper = styled(HorizontalContainer)`
  width: fit-content;
  border-radius: 5px;
  box-sizing: border-box;
  padding: 0.3em;
  transition: 0.3s;

  &:hover {
    background-color: #cccccc;
    transition: 0.3s;
  }
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
      <span style={{ color: "#555555" }}>{label}</span>
    </ButtonWrapper>
  );
};

export default IconButton;
