import { removeMessage, setMessage } from "../reducers/alertReducer";
import { useAppDispatch } from "./store";

let id: number | undefined = undefined;

const useAlert = () => {
  const dispatch = useAppDispatch();

  const alertUser = (message: string) => {
    if (id) {
      clearTimeout(id);
    }

    dispatch(setMessage(message));

    id = window.setTimeout(() => {
      dispatch(removeMessage());
    }, 3000);
  };

  return alertUser;
};

export default useAlert;
