
export interface CourseData {
    averageRating?: number,
    createdAt?: string,
    description?: string,
    discountPercentage?: number,
    id?: string,
    noOfStudents?: number,
    price?: number,
    ratingCount?: number,
    status?: string,
    thumbnailUrl?: string,
    title?: string,
    updatedAt?: string,
    instructorName: string,
    instructorId: string
    instructorProfilePictureUrl?: string,
    objectives: string[],
}
export interface CourseByCategoryIdProps {
    categoryid: string,
    pageNum: number,
    handlePreviousPagination: () => void
    handleNextPagination: () => void
    courseData: CoursesType
    isLoading: boolean
};
export interface CoursesType {
    data: CourseData[],
    currentPage: number,
    hasNextPage: boolean,
    hasPreviousPage: boolean,
    pageSize: number,
    succeeded: boolean,
    totalCount: number,
    totalPages: number,
    message: string
}
export interface SectionData {
    courseId: string,
    id: string,
    order: number,
    title: string

}
export interface SectionType {
    data: SectionData[]
    currentPage: number,
    hasNextPage: boolean,
    hasPreviousPage: boolean,
    pageSize: number,
    succeeded: boolean,
    totalCount: number,
    totalPages: number,
    message: string[]
}
export interface ContentData {
    duration: number
    id: string
    url?: string
    title: string
    sectionId: string
    publicId: string
}
export interface ContentType {
    data: ContentData[]
    currentPage: number,
    hasNextPage: boolean,
    hasPreviousPage: boolean,
    pageSize: number,
    succeeded: boolean,
    totalCount: number,
    totalPages: number,
    message: string[]
}
