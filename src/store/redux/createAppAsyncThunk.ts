import { createAsyncThunk } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "./reduxstore";


export const createAppAsyncThunk = createAsyncThunk.withTypes<{
    state: RootState;
    dispatch: AppDispatch;
}>();