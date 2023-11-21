import styled from "styled-components";
import LoadingElement from "./LoadingElement";
import { useAppSelector } from "../../hooks/store";

const Stripe = styled(LoadingElement)`
  position: fixed;
  top: 0;
  left: 0;
  height: 3px;
  border-radius: 0;
  background: linear-gradient(90deg, violet, blueviolet, violet, blueviolet);
  background-size: 300% 100%;
  z-index: 10000;
  animation-duration: 1s;
`;

const LoadingStripe = () => {
  const loading = useAppSelector(({ loading }) => loading);

  if (!loading) return null;

  return <Stripe />;
};

export default LoadingStripe;
