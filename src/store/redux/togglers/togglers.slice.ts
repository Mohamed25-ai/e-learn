import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const navbarTogglersStore = createSlice({
    name: "navbarTogglersSlice",
    initialState: {
        isOpen: false
    },
    reducers: {
        toggleNavbar: (state) => {
            state.isOpen = !state.isOpen
        },
        setNavbarState: (state, action: PayloadAction<{ val: boolean }>) => {
            state.isOpen = action.payload.val;
        }
    }
})
const sidebarTogglersStore = createSlice({
    name: "sidebarTogglersSlice",
    initialState: {
        isOpen: false
    },
    reducers: {
        toggleSidebar: (state) => {
            state.isOpen = !state.isOpen
        },
        setSidebarState: (state, action: PayloadAction<{ val: boolean }>) => {
            state.isOpen = action.payload.val;
        }
    }
})
const courseLearningSidebarTogglerStore = createSlice({
    name: "courseLearningSidebarTogglerSlice",
    initialState: {
        isOpen: false
    },
    reducers: {
        toggleCourseLearningSidebar: (state) => {
            state.isOpen = !state.isOpen
        },
        setCourseLearningSidebar: (state, action: PayloadAction<{ val: boolean }>) => {
            state.isOpen = action.payload.val;
        }
    }
})
const changeUserProfilePasswordIconsTogglers = createSlice({
    name: "changeUserProfilePasswordIconsTogglersSlice",
    initialState: {
        isUserChangeCurrentPasswordShown:false,
        isUserChangePasswordShown: false,
        isUserChangeConfirmPasswordShown: false,
    },
    reducers: {
        setUserChangeCurrentPasswordState: (state, action) => {
            state.isUserChangeCurrentPasswordShown = action.payload;
        },
        setUserChangePasswordState: (state, action) => {
            state.isUserChangePasswordShown = action.payload;
        },
        setUserChangeConfirmPasswordState: (state, action) => {
            state.isUserChangeConfirmPasswordShown = action.payload;
        },
        toggleUserCurrentPassword: (state) => {
            state.isUserChangeCurrentPasswordShown = !state.isUserChangeCurrentPasswordShown;
        },
        toggleUserChangePassword: (state) => {
            state.isUserChangePasswordShown = !state.isUserChangePasswordShown;
        },
        toggleUserChangeConfirmPassword: (state) => {
            state.isUserChangeConfirmPasswordShown = !state.isUserChangeConfirmPasswordShown;
        },
        resetUserChangePasswordVisibility: (state) => {
            state.isUserChangePasswordShown = false;
            state.isUserChangeConfirmPasswordShown = false;
        }
    }
})









export const navbarTogglersStoreReducer = navbarTogglersStore.reducer;
export const sidebarTogglersStoreReducer = sidebarTogglersStore.reducer;
export const courseLearningSidebarTogglerStoreReducer = courseLearningSidebarTogglerStore.reducer;
export const changeUserProfilePasswordIconsTogglersReducer = changeUserProfilePasswordIconsTogglers.reducer;
export const { setCourseLearningSidebar, toggleCourseLearningSidebar } = courseLearningSidebarTogglerStore.actions;
export const { setNavbarState, toggleNavbar } = navbarTogglersStore.actions;
export const { setSidebarState, toggleSidebar } = sidebarTogglersStore.actions;
export const { resetUserChangePasswordVisibility,
    setUserChangeConfirmPasswordState, setUserChangePasswordState, toggleUserChangeConfirmPassword,
    toggleUserChangePassword,setUserChangeCurrentPasswordState,toggleUserCurrentPassword } = changeUserProfilePasswordIconsTogglers.actions;
