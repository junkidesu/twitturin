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

  const errorAlert = (error: unknown) => {
    if (error && typeof error === "object") {
      if ("data" in error) {
        if (
          error.data &&
          typeof error.data === "object" &&
          "error" in error.data
        ) {
          const errorMessage: string =
            "error" in error.data
              ? (error.data.error as string)
              : "Some error has occured! (Check the logs)";

          alertUser(errorMessage);
        }
      }
    }
  };

  return { alertUser, errorAlert };
};

export default useAlert;
