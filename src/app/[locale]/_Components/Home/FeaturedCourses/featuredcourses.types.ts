import { CategoriesDataType, CategoriesResponseType, CategoriesType } from "@/app/[locale]/(main)/(Categories)/categories/categories.type"
import { CourseData, CoursesType } from "../../Courses/CoursesByCategoryId/coursebycategoryId.types"

export type FeaturedCoursesProps = {
    categories: CategoriesResponseType
}
export type FeaturedCoursesSwiperProps = {
    // courses: CoursesType,
    coursesDetails:CourseData[],
    isCoursesLoading: boolean,
    categoryId: string,
    getNextCoursePage:()=>void,
    courseHasNextPage:boolean,
    isFetchingNextCoursesPage:boolean
}
export type FeaturedCategoryCoursesProps = {
    categorie: CategoriesDataType;
}
export type getCoursesByCategorieIdQueryType = {
    data: CoursesType,
    // pageParam:number
}