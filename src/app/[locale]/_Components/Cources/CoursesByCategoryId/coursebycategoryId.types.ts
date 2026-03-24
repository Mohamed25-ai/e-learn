export interface CourseByCategoryIdProps{
    categoryid:string,
};
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
    instructorImage?:string,
}
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