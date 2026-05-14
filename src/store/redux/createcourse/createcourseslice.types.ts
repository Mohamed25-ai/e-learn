export type SectionType = Record<number, string>;

export interface SectionByCourseData {
    id: string,
    title: string,
    order: number,
    courseId: string,
}
export interface SectionByCourseIdType {
    currentPage: number,
    totalCount: number,
    totalPages: number,
    pageSize: number,
    hasPreviousPage: boolean,
    hasNextPage: boolean,
    succeeded: boolean,
    data:SectionByCourseData[]
}
export interface CreateCourseSliceType {
    step: number
    sectionCreatedSuccessifuly: number[]
    createdContentuccessifuly: number[]
    createdCourseId: string,
    section: SectionType,
    sectionOrder: number,
    isLoading:boolean
    isCourseCompletlyCreated: boolean,
    categoryForCreatedCourse: string
    sectionByCourseIdData:SectionByCourseIdType
}