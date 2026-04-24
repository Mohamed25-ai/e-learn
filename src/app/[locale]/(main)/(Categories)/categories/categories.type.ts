export interface CategoriesDataType {
    id: string,
    name: string,
    thumbnailUrl?:string
};
export interface CategoriesType {
    data?: CategoriesDataType[],
    succeeded?: boolean,
    message?: string,
};
