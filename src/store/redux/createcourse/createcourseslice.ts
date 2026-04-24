import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CreateCourseSliceType } from "./createcourseslice.types";

const initialState:CreateCourseSliceType={
    step:0,
    title:"",
}
const createCourseSteps=createSlice({
    name:"createcours",
    initialState,
    reducers:{
        setCreateStep:(state,action:PayloadAction<number>)=>{
            if(action.payload >= 0 && action.payload < 4){
                state.step=action.payload;
            };
        },
    },
    
})
export const createCourseReducer=createCourseSteps.reducer;
export const {setCreateStep}=createCourseSteps.actions;
