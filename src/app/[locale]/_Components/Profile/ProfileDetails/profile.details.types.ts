import { EnrolledCoursesDataType } from "../../Courses/EnrolledCourses/enrolled.courses.types"
import { UserProfileData } from "../profile.types"

export type ProfileUserCoursesProps = {
    enrolledCoursesWithMetaData:EnrolledCoursesDataType

}
export type ProfileDetailsProps = {
    userData: UserProfileData,
    enrolledCoursesWithMetaData:EnrolledCoursesDataType
}
export type PersonalInformationProps = {
    userData: UserProfileData

}
export type PersonalInformationFormProps = {
    userData: UserProfileData
}
export type ProfileSecurityProps = {
    userData: UserProfileData

}
export type ChangePasswordFormValues = {
    Email: string,
    CurrentPassword: string,
    NewPassword: string,
    ConfirmNewPassword: string
}