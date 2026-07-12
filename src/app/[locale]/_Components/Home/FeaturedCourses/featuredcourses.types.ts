import { CategoriesDataType, CategoriesResponseType, CategoriesType } from "@/app/[locale]/(main)/(Categories)/categories/categories.type"
import { CoursesType } from "../../Courses/CoursesByCategoryId/coursebycategoryId.types"

export type FeaturedCoursesProps={
    categories:CategoriesResponseType
}
export type FeaturedCoursesSwiperProps={
    courses:CoursesType
}
export type FeaturedCategoryCoursesProps={
    categorie:CategoriesDataType;
}