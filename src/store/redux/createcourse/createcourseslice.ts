import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CreateCourseSliceType, SectionType } from "./createcourseslice.types";
import { set } from "zod";
import { createDecipheriv } from "crypto";
import { createAppAsyncThunk } from "../createAppAsyncThunk";
import { getCreatedSectionByCourseIdAction } from "@/actions/courses/courses.actions";


const initialState: CreateCourseSliceType = {
    createdCourseId: "",
    step: 0,
    sectionOrder: 1,
    sectionCreatedSuccessifuly: [],
    createdContentuccessifuly: [],
    section: {},
    isCourseCompletlyCreated: false,
    isLoading: false,
    categoryForCreatedCourse: "",
    createdContentId: {},

    sectionByCourseIdData: {
        currentPage: 0,
        totalCount: 0,
        totalPages: 0,
        pageSize: 0,
        hasPreviousPage: false,
        hasNextPage: false,
        succeeded: false,
        data: [],
    },
}
// export const getCreatedSectionsByCourseId = createAppAsyncThunk(
//     'createCourse/getCreatedSectionsByCourseId',
//     async (_, thunkApi) => {
//         const state = thunkApi.getState();
//         const createdCourseId = state.createCourse.createdCourseId;
//         const res = await getCreatedSectionByCourseIdAction(createdCourseId);
//         return res.data;
//     }
// )
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
                state.createdCourseId = action.payload;
            }
        },
        setAddedSection: (state, action: PayloadAction<{ sectionNum: number, id: string }>) => {
            const { sectionNum, id } = action.payload;
            state.section[sectionNum] = id;
        },
        setSectionOrder: (state, action) => {
            state.sectionOrder = action.payload
        },
        setAddedOrder: (state, action) => {
            state.sectionCreatedSuccessifuly.push(action.payload);
        },
        setAddedContent: (state, action) => {
            state.createdContentuccessifuly.push(action.payload);
        },

        setCourseCompletlyCreated: (state, action) => {
            state.isCourseCompletlyCreated = action.payload;
        },
        setCreatedContentId(state, action: PayloadAction<{ key: number, value: string }>) {
            state.createdContentId[action.payload.key] = action.payload.value;
        },
        resetCreateCourseState: () => {
            return structuredClone(initialState);
        }
    }
    // extraReducers: (builder) => {
    //     builder
    //         .addCase(getCreatedSectionsByCourseId.pending, (state) => {
    //             state.isLoading = true;
    //         })
    //         .addCase(getCreatedSectionsByCourseId.fulfilled, (state, action) => {
    //             state.sectionByCourseIdData = action.payload;
    //         })
    //         .addCase(getCreatedSectionsByCourseId.rejected, (state, action) => {
    //             state.isLoading = false;
    //             console.log("Error", action.error.message);
    //         });
    // }
})

export const createCourseReducer = createCourseSteps.reducer;
export const { setCreateStep, setCourseID, setAddedOrder, resetCreateCourseState,
    setAddedSection, setAddedContent, setCreatedContentId, setSectionOrder } = createCourseSteps.actions;
