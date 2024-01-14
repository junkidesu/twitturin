import { useDispatch } from "react-redux";
import { hide, show } from "../reducers/modalReducer";

const useModal = () => {
  const dispatch = useDispatch();

  const showModal = () => {
    dispatch(show());
  };

  const hideModal = () => {
    dispatch(hide());
  };

  return { showModal, hideModal };
};

export default useModal;
