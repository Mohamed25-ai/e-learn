import { configureStore } from "@reduxjs/toolkit";
import { createCourseReducer } from "./createcourse/createcourseslice";


export const store = configureStore({
    reducer: {
        createCourse: createCourseReducer
    }
});
// Get the type of our store variable
export type AppStore = typeof store
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = AppStore['dispatch']


// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;