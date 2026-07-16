import { createSlice } from "@reduxjs/toolkit";
import { UserProfileSliceType } from "./user.profile.slice.types";
const initialState: UserProfileSliceType = {
    profileDetailsView: "overview",
    isUserEditNow:false
}

const userProfileSlice = createSlice({
    name: "userProfileSlice",
    initialState,
    reducers: {
        setProfileDetailsView: (state, actions) => {
            if (state.profileDetailsView == "overview" && actions.payload != "overview") {
                state.profileDetailsView= actions.payload;
                return
            }
            if (state.profileDetailsView == "certificates" && actions.payload!= "certificates") {
                state.profileDetailsView= actions.payload;
                return
            }
            if (state.profileDetailsView == "mycourses" && actions.payload!= "mycourses") {
                state.profileDetailsView= actions.payload;
                return
            }
            
        },
        toggleEditUserProfile:(state)=>{
            state.isUserEditNow=!state.isUserEditNow
        },
        setEditUserProfileState:(state,actions)=>{
            state.isUserEditNow=actions.payload
        },
    }
})
export const userProfileSliceReducer = userProfileSlice.reducer;
export const { setProfileDetailsView,toggleEditUserProfile,setEditUserProfileState } = userProfileSlice.actions 