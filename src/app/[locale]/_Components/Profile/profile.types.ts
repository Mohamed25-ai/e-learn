import { EnrolledCoursesDataType } from "../Courses/EnrolledCourses/enrolled.courses.types"

export type UserProfileData = {
    email: string,
    fullName: string,
    id: string,
    profilePictureUrl: string,
    userName: string
}
export type ProfileProps = {
    data: UserProfileData,
    enrolledCoursesWithMetaData:EnrolledCoursesDataType
}
export type ProfileDataCardProps = {
    data: UserProfileData,
    onSubmit: () => void,
}
