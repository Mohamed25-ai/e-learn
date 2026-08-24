"use client"
import { FormProvider, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { ProfileProps } from "./profile.types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookOpen } from "@fortawesome/free-solid-svg-icons";
import ProfileDataCard from "./ProfileDataCard";
import ProfileDetails from "./ProfileDetails/ProfileDetails";
import { Link, useRouter } from "@/i18n/navigation";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { editProfileUserDataAction } from "@/actions/application-user/application-user.actions";
import toast from "react-hot-toast";
import { setEditUserProfileState } from "@/store/redux/userprofile/userprofile.slice";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";

export default function Profile({ data, enrolledCoursesWithMetaData }: ProfileProps) {
    const t = useTranslations();
    const userProfileStore = useAppSelector((state) => state.userProfileSlice);
    const userSession = useSession();
    const dispatch = useAppDispatch();
    const router = useRouter();
    const methods = useForm({
        defaultValues: {
            FullName: data.fullName,
            UserName: data.userName,
            PhoneNumber: "01200000000",
        },
    });

    const onSubmit = methods.handleSubmit(async (fieldsData) => {
        const formData = new FormData();
        const defaultPhoneNum = methods.getValues("PhoneNumber")
        formData.append("Id", data.id);
        formData.append("FullName", fieldsData.FullName);
        formData.append("UserName", fieldsData.UserName);
        if (fieldsData.PhoneNumber != defaultPhoneNum) {
            formData.append("PhoneNumber", fieldsData.PhoneNumber);
        }
        if (userProfileStore.temporaryProfileImageForEdit) {
            formData.append("ProfilePicture", userProfileStore.temporaryProfileImageForEdit)
        };
        const res = await editProfileUserDataAction(formData);
        console.log("editProfileRes", res);
        if (res.status == 200) {
            console.log("editProfileRes", res);
            dispatch(setEditUserProfileState(false));
            // router.refresh();
            toast.success(t('Profile.updateSuccess'));
            await userSession.update();

        } else {
            toast.error(res.data?.title);
        }
    });

    return (
        <FormProvider {...methods}>
            <section>
                <header className="bg-white border-b px-5">
                    <div className="flex items-center justify-between py-6">
                        <div>
                            <h2 className="text-2xl text-foreground font-bold">{t('Profile.title')}</h2>
                            <p className="text-(--text-secondary)">{t('Profile.subtitle')}</p>
                        </div>
                        <Link href={'/'} className="bg-(--primary-color) px-2 md:px-5 py-3 text-nowrap 
                        font-bold rounded-2xl text-white hover:bg-(--primary-color) ">
                            <FontAwesomeIcon className="me-2" icon={faBookOpen} />
                            {t('Profile.backToCourses')}</Link>
                    </div>
                </header>
                <div className="px-5 mt-5 lg:flex gap-5">
                    <ProfileDataCard data={data} onSubmit={onSubmit} />
                    <ProfileDetails userData={data} enrolledCoursesWithMetaData={enrolledCoursesWithMetaData} />
                </div>
            </section>
        </FormProvider>
    );
}