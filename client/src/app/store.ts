import { configureStore } from "@reduxjs/toolkit";
import { useSelector, useDispatch, TypedUseSelectorHook } from "react-redux";
import UserReducer from "../feature/state";

export const store = configureStore({
  reducer: {
    users: UserReducer,
  },
});

export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<
  ReturnType<typeof store.getState>
> = useSelector;
