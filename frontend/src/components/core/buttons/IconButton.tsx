import styled from "styled-components";
import Box from "../../containers/Box";
import Label from "../text/Label";

const ButtonBox = styled(Box)`
  width: fit-content;
  transition: 0.3s;
  color: ${({ theme }) => theme.colors.grey2};
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.grey4};
    color: ${({ theme }) => theme.colors.primary};
    transition: 0.3s;
  }
`;

const IconBox = styled(Box)`
  width: 1.2em;
  height: 1.2em;
`;

interface Props {
  label?: string | number;
  icon: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

const IconButton = ({ icon, label, onClick, className }: Props) => {
  return (
    <ButtonBox
      $gap="0.3em"
      $center
      $horizontal
      $pad="s"
      $rounded
      onClick={onClick}
      className={className}
    >
      <IconBox $center>{icon}</IconBox>

      {label && <Label $size="extraSmall">{label}</Label>}
    </ButtonBox>
  );
};

export default IconButton;
