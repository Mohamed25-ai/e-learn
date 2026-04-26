export type SectionType = Record<number, string>;

export interface CreateCourseSliceType{
    step:number
    title:string
    addedSectionOrder:number[]
    courseId:string,
    section:SectionType
}