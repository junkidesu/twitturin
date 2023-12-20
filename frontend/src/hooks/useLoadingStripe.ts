import { useAppDispatch } from "./store";
import { show, hide } from "../reducers/loadingStripeReducer";

const useLoadingStripe = () => {
  const dispatch = useAppDispatch();

  const showLoadingStripe = () => {
    dispatch(show());
  };

  const hideLoadingStripe = () => {
    dispatch(hide());
  };

  return { showLoadingStripe, hideLoadingStripe };
};

export default useLoadingStripe;
