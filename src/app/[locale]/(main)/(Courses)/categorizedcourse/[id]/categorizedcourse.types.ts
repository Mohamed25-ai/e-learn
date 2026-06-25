export interface ParamsType {
    locale: string,
    id: string
}
export interface CategorizedCourseProps {
    params: Promise<ParamsType>
} 