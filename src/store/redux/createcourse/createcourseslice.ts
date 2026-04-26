import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CreateCourseSliceType, SectionType } from "./createcourseslice.types";
import { set } from "zod";

const initialState: CreateCourseSliceType = {
    step: 0,
    addedSectionOrder: [],
    title: "",
    courseId: "",
    section: {}
}
const createCourseSteps = createSlice({
    name: "createCourse",
    initialState,
    reducers: {
        setCreateStep: (state, action) => {
            if (action.payload >= 0 && action.payload < 4) {
                state.step = action.payload;
            };
        },
        setCourseID: (state, action) => {
            if (action.payload) {
                state.courseId = action.payload;
            }
        },
        setAddedSection: (state, action:PayloadAction<{sectionNum:number,id:string}>) => {
            const { sectionNum, id } = action.payload;
            state.section[sectionNum]=id;
        },
        setAddedOrder: (state, action) => {
            if (action.payload) {
                state.addedSectionOrder.push(action.payload);
            }
        }
    },

})
export const createCourseReducer = createCourseSteps.reducer;
export const { setCreateStep, setCourseID, setAddedOrder, setAddedSection } = createCourseSteps.actions;
