export type ParamsType={
    id:string
}
export type SearchParamsType={

}
export type CourseDetailsProps={
    params:Promise<ParamsType>
    searchparams:Promise<SearchParamsType>
}