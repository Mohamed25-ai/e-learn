import storage from "redux-persist/lib/storage";
import {persistReducer,persistStore,FLUSH,REHYDRATE,PAUSE,PERSIST,PURGE,REGISTER,
} from "redux-persist";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { createCourseReducer } from "./createcourse/createcourseslice";


const rootReducer = combineReducers({
    createCourse: createCourseReducer,
});

const persistConfig = {
    key: "root",
    storage,
    whitelist: ["createCourse"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        })// 
});

export const persistor = persistStore(store);

// Get the type of our store variable
export type AppStore = typeof store
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = AppStore['dispatch']

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;