export type EnrolledCourseData = {
    courseId?: string,
    enrolledAt?: string,
    instructorName: string,
    progressPercent?: number,
    thumbnail?: string,
    title?: string,
    totalHours?: number,
    userId?: string,

}
export type EnrolledCoursesDataType = {
    data: EnrolledCourseData[],
    currentPage: number,
    hasNextPage: boolean,
    hasPreviousPage: boolean,
    pageSize: number,
    succeeded: boolean,
    totalCount: number,
    totalPages: number,
    messages: string[]
}
export type EnrolledCoursesProps = {
    enrolledCoursesData: EnrolledCoursesDataType
}
export type EnrolledCoursesOverviewProps = {
    enrolledCourses: number,
    inProgress: number,
    completed: number,
    certificates: number,
}
export type EnrolledCoursesHeaderProps = {
    enrolledCoursesOverviewData: EnrolledCourseData[],
}
export type EnrolledCoursesFiltersProps = {
    enrolledCourses: number,
    inProgress: number,
    completed: number,
    certificates: number,
}
export type EnrolledCourseCardProps = {
    enrolledCourseData: EnrolledCourseData
}
export type AllEnrolledCoursesCardsProps = {
    allEnrolledCoursesWithData: EnrolledCoursesDataType,
}
export type EnrolledCoursesPaginationProps = {
    totalPages: number,
    currentPage: number,
    totalCount: number,
    hasPreviousPage: boolean,
    hasNextPage: boolean,
    inMyLearningPage?: boolean
}