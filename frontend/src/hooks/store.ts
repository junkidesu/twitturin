import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../store";
import { TypedUseSelectorHook } from "react-redux";
import { RootState } from "../store";

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
