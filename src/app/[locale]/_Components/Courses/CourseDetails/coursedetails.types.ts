import { CourseData } from "../CoursesByCategoryId/coursebycategoryId.types"

export type CourseDetailsProps={
    data:CourseData,
    inPlayPage?:boolean,
    isUserEnrolledCourse?:boolean
}