"use client"
import { useState } from "react"
import ProfileDetailsToggler from "./ProfileDetailsToggler";
import PersonalInformation from "./PersonalInformation";
import ProfileUserCourses from "./ProfileUserCourses";
import { ProfileDetailsProps } from "./profile.details.types";
import { useAppSelector } from "@/hooks/hooks";

export default function ProfileDetails({ userData }: ProfileDetailsProps) {
    const userProfileStore = useAppSelector((state) => state.userProfileSlice);


    return (
        <div className="md:w-3/4">
            <ProfileDetailsToggler />
            {userProfileStore.profileDetailsView == "overview" && <PersonalInformation userData={userData} />}
            {userProfileStore.profileDetailsView == "mycourses" && <ProfileUserCourses />}
            {userProfileStore.profileDetailsView == "certificates"}
        </div>
    )
}
