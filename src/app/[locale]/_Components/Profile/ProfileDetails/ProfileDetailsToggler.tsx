"use client"

import { useAppDispatch, useAppSelector } from "@/hooks/hooks"
import { setProfileDetailsView } from "@/store/redux/userprofile/userprofile.slice";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";

export default function ProfileDetailsToggler() {
    const t = useTranslations();
    const userProfileStore = useAppSelector((state) => state.userProfileSlice);
    const userSession = useSession();
    const dispatch = useAppDispatch();
    return (
        <div className="bg-white flex justify-between items-center border rounded-2xl md:px-4">
            <span onClick={() => dispatch(setProfileDetailsView("overview"))} className={`px-2 py-5 md:p-5 font-bold cursor-pointer text-nowrap
            ${userProfileStore.profileDetailsView == "overview" ? "text-(--primary-color) border-b-2 border-(--primary-color) "
                    : "text-(--text-secondary)"} `}>
                {t('Profile.tabs.overview')}
            </span>
            <span onClick={() => dispatch(setProfileDetailsView("mycourses"))} className={`px-2 py-5 md:p-5 font-bold cursor-pointer text-nowrap
            ${userProfileStore.profileDetailsView == "mycourses" ? "text-(--primary-color) border-b-2 border-(--primary-color) "
                    : "text-(--text-secondary)"} `}>
                {t('Profile.tabs.myCourses')}
            </span>
            <span onClick={() => dispatch(setProfileDetailsView("certificates"))} className={`px-2 py-5 md:p-5 font-bold cursor-pointer text-nowrap
            ${userProfileStore.profileDetailsView == "certificates" ? "text-(--primary-color) border-b-2 border-(--primary-color) "
                    : "text-(--text-secondary)"} `}>
                {t('Profile.tabs.certificates')}
            </span>
            {!userSession.data?.isLoggedByGoogle && <span onClick={() => dispatch(setProfileDetailsView("security"))} className={`px-2 py-5 md:p-5 font-bold cursor-pointer text-nowrap
            ${userProfileStore.profileDetailsView == "security" ? "text-(--primarynpm -color) border-b-2 border-(--primary-color) "
                    : "text-(--text-secondary)"} `}>
                {t('Profile.tabs.security')}
            </span>}
        </div>
    )
}