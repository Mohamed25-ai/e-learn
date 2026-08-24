export interface ParamsType {
    locale: string,
    id: string

}
export type SearchParamsType={
    pageSize:number,
    pageNumber:number,
    searchCourse:string
    filter:string
}
export interface CategorizedCourseProps {
    params: Promise<ParamsType>,
    searchParams:Promise<SearchParamsType>
} 
export type CategorizedCoursePaginationProps={
    categoryId?:string,
    totalPages:number,
    currentPage:number,
    totalCount:number,
    hasPreviousPage:boolean,
    hasNextPage:boolean,
    inMyLearningPage?:boolean
}