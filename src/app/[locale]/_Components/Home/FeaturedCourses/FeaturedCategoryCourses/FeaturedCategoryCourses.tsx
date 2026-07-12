
import { getCoursesByCategorieIdAction } from '@/actions/courses/courses.actions'
import { FeaturedCategoryCoursesProps } from '../featuredcourses.types'
import FeaturedCoursesSwiper from '../FeaturedCoursesSwiper';

export default async function FeaturedCategoryCourses({ categorie }: FeaturedCategoryCoursesProps) {
    const categorieCourses=await getCoursesByCategorieIdAction(categorie?.id);
    return (
        <>
            <FeaturedCoursesSwiper courses={categorieCourses?.data} />
        </>
    )
}
