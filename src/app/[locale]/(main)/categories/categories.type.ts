export interface CategoriesDataType {
    id: string,
    name: string,
};
export interface CategoriesType {
    data?: CategoriesDataType[],
    succeeded?: boolean,
    message?: string,
};
