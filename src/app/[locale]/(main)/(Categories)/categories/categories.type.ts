export interface CategoriesDataType {
    id: string,
    name: string,
    thumbnailUrl?:string
};
export interface CategoriesType {
    data: CategoriesDataType[],
    currentPage:number,
    totalPages:number
    totalCount:number
    meta?:string
    pageSize:number
    hasPreviousPage:boolean
    hasNextPage:boolean
    messages?:[]
    succeeded:boolean
};
export interface CategoriesResponseType{
    data:CategoriesType
} 
