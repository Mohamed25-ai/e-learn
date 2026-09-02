import { CourseData, CourseProgressData } from "../CoursesByCategoryId/coursebycategoryId.types"

export type CourseLearningSidebarProps={
    courseId:string
}
export type CourseLearningSidebarTogglerProps={
    courseId:string,
    courseProgress:CourseProgressData,
    courseDetailsData:CourseData
}

export type UpdateCourseProgressProps={
    contentId:string,
    isContentCompleted:boolean
}