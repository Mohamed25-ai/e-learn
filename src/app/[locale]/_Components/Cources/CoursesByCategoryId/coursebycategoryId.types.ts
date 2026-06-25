
export interface CourseData{
    averageRating?:number,
    createdAt?:string,
    description?:string,
    discountPercentage?:number,
    id?:string,
    noOfStudents?:number,
    price?:number,
    ratingCount?:number,
    status?:string,
    thumbnail?:string,
    title?:string,
    updatedAt?:string,
    instructorName:string,
    instructorProfilePictureUrl?:string,
}
export interface CourseByCategoryIdProps{
    categoryid:string,
    pageNum:number,
    handlePreviousPagination:()=>void
    handleNextPagination:()=>void
    courseData:CoursesType
    isLoading:boolean
};
export interface CoursesType{
    data:CourseData[],
    currentPage:number,
    hasNextPage:boolean,
    hasPreviousPage:boolean,
    pageSize:number,
    succeeded:boolean,
    totalCount:number,
    totalPages:number,
    message:string
}