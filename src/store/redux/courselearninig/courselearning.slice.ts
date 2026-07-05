import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CourseLearningSliceType } from "./course.learning.types";

const initialState: CourseLearningSliceType = {
    selectedLesson: {},
    selectedLessionUrl: {},
    lessonSection: "",
    lessionId: ""
}

export const courseLearningSlice = createSlice({
    name: "courseLearningSlice",
    initialState,
    reducers: {
        setSelectedLesson: (state, action: PayloadAction<{ sectionId: string, lessionId: string }>) => {
            state.selectedLesson[action.payload.sectionId] = action.payload.lessionId;
        },
        setSelectedLessonSection: (state, action) => {
            state.lessonSection = action.payload
        },
        setSelectedLessonUrl: (state, action: PayloadAction<{ lessionId: string, lessionUrl: string }>) => {
            state.selectedLessionUrl[action.payload.lessionId] = action.payload.lessionUrl;
        },
        setLessonId: (state, action) => {
            state.lessionId = action.payload
        },
        steInitialState: () => {
            return structuredClone(initialState);
        }
    }
})
export const courseLearningSliceReducer = courseLearningSlice.reducer;
export const { setSelectedLesson, steInitialState, setSelectedLessonUrl,
    setSelectedLessonSection,setLessonId
} = courseLearningSlice.actions;