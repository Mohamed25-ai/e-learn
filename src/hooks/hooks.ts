import { useDispatch, useSelector, useStore } from "react-redux";
import type { RootState, AppDispatch } from "../store/redux/reduxstore";
import type { Store } from "@reduxjs/toolkit";

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppStore = useStore.withTypes<Store<RootState>>();