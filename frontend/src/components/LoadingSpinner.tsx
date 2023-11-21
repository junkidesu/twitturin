import styled from "styled-components";
import Box from "./containers/Box";

const LoadingBox = styled(Box)`
  width: 300px;
  height: 300px;
  justify-content: center;
  z-index: 9999;
`;

const Label = styled.p`
  margin: 0;
  font-size: ${(props) => props.theme.fontSizes.medium};
`;

interface Props {
  label: string;
}

const LoadingSpinner = ({ label }: Props) => {
  return (
    <LoadingBox $bg="#eeeeee" $rounded $center $gap="2em">
      <Label>{label}</Label>
    </LoadingBox>
  );
};

export default LoadingSpinner;
