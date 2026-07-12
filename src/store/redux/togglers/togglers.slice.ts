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
            state.isOpen=!state.isOpen
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








// export const useCourseLearningSidebarToggler=create<SidebarStoreType>((set)=>({
//     isOpen:true,
//     setOpen:(value:boolean)=>set({isOpen:value}),
//     toggle: () => set((s) => ({ isOpen: !s.isOpen })),
// }))

export const navbarTogglersStoreReducer = navbarTogglersStore.reducer;
export const sidebarTogglersStoreReducer = sidebarTogglersStore.reducer;
export const courseLearningSidebarTogglerStoreReducer = courseLearningSidebarTogglerStore.reducer;
export const { setCourseLearningSidebar, toggleCourseLearningSidebar } = courseLearningSidebarTogglerStore.actions;
export const { setNavbarState, toggleNavbar } = navbarTogglersStore.actions;
export const { setSidebarState, toggleSidebar } = sidebarTogglersStore.actions;
