import styled, { keyframes } from "styled-components";

const animateBg = keyframes`
  0% {
    background-position: 100% 0;
  }

  100% {
    background-position: 0 0;
  }
`;

interface Props {
  $width?: string;
  $height?: string;
}

const LoadingElement = styled.div<Props>`
  height: ${({ $height, theme }) => $height || theme.fontSizes.small};
  width: ${({ $width }) => $width || "100%"};
  background: linear-gradient(90deg, #888888, #bbbbbb, #888888, #bbbbbb);
  background-size: 300% 100%;
  border-radius: 5px;
  box-sizing: border-box;
  animation: ${animateBg} 2s linear infinite;
`;

export default LoadingElement;
