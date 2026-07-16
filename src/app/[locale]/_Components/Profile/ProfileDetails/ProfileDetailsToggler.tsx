"use client"

import { useAppDispatch, useAppSelector } from "@/hooks/hooks"
import { ProfileDetailsTogglerProps } from "./profile.details.types"
import { setProfileDetailsView } from "@/store/redux/userprofile/userprofile.slice";

export default function ProfileDetailsToggler() {
    const userProfileStore=useAppSelector((state)=>state.userProfileSlice);
    const dispatch=useAppDispatch();
    return (
        <div className="bg-white flex justify-between items-center border rounded-2xl px-4">
            <span onClick={() => dispatch(setProfileDetailsView("overview"))} className={`p-5 font-bold cursor-pointer 
            ${userProfileStore.profileDetailsView == "overview" ? "text-(--primary-color) border-b-2 border-(--primary-color) "
                    : "text-(--text-secondary)"} `}>
                Overview
            </span>
            <span onClick={() => dispatch(setProfileDetailsView("mycourses"))} className={`p-5 font-bold cursor-pointer 
            ${userProfileStore.profileDetailsView == "mycourses" ? "text-(--primary-color) border-b-2 border-(--primary-color) "
                    : "text-(--text-secondary)"} `}>
                My Courses
            </span>
            <span onClick={() => dispatch(setProfileDetailsView("certificates"))} className={`p-5 font-bold cursor-pointer 
            ${userProfileStore.profileDetailsView == "certificates" ? "text-(--primary-color) border-b-2 border-(--primary-color) "
                    : "text-(--text-secondary)"} `}>
                Certificates
            </span>
        </div>
    )
}
