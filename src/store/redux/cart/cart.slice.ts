import { createSlice } from "@reduxjs/toolkit";
import { UserSliceCartType } from "./cart.slice.types";


const initialState: UserSliceCartType = {
    numberOfCartItems:0,
    addedCourses:[],
}
const userCartSlice = createSlice({
    name: "userCartSlice",
    initialState,
    reducers: {
        setNumberOfCartItems:(state,actions)=>{
            state.numberOfCartItems=actions.payload;
        },
        resetNumberOfCartItems:(state)=>{
            state.numberOfCartItems=0;
        },
        setAddedCourseToCart:(state,actions)=>{
            state.addedCourses.push(actions.payload);
        },
        resetUserCart:()=>{
            return structuredClone(initialState);
        }
    }
})

export const userCartSliceReducer = userCartSlice.reducer;
export const {setNumberOfCartItems,resetUserCart,resetNumberOfCartItems,setAddedCourseToCart} = userCartSlice.actions;