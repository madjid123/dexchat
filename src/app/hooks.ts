import {
  useDispatch,
  useSelector,
  createSelectorHook,
  TypedUseSelectorHook,
} from "react-redux";
import type { RootState, AppDispatch } from "./store";
// Use throughout your app instead of plain `useAppDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
