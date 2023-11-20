import styled from "styled-components";
import Icon from "./core/Icon";
import { icons } from "../assets";
import VStack from "./containers/VStack";

const Wrapper = styled(VStack)`
  width: 300px;
  height: 300px;
  background-color: #eeeeee;
  border-radius: 20px;
  justify-content: center;
  z-index: 9999;
`;

const RotatingIcon = styled(Icon)`
  width: 50px;
  height: 50px;
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
    <Wrapper $center $gap="2em">
      <RotatingIcon src={icons.loadingIcon} />

      <Label>{label}</Label>
    </Wrapper>
  );
};

export default LoadingSpinner;
