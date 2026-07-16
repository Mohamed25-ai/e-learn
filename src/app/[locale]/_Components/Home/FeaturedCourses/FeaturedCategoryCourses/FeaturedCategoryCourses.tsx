"use client"
import { getCoursesByCategorieIdAction } from '@/actions/courses/courses.actions'
import { FeaturedCategoryCoursesProps, getCoursesByCategorieIdQueryType } from '../featuredcourses.types'
import FeaturedCoursesSwiper from '../FeaturedCoursesSwiper';
import { InfiniteData, useInfiniteQuery, useQuery } from '@tanstack/react-query';
import CardsLoader from '../../../Loaders/CardsLoader/CardsLoader';
import { CoursesType } from '../../../Courses/CoursesByCategoryId/coursebycategoryId.types';

export default function FeaturedCategoryCourses({ categorie }: FeaturedCategoryCoursesProps) {

    const { data,
        fetchNextPage,
        isLoading,
        hasNextPage,
        isFetchingNextPage, } = useInfiniteQuery<
            getCoursesByCategorieIdQueryType,
            Error,
            InfiniteData<getCoursesByCategorieIdQueryType>,
            [string, string],
            number
        >({
            initialPageParam: 0,
            queryKey: ["getCoursesByCategorieId", categorie.id],
            queryFn: ({ pageParam = 1 }) => getCoursesByCategorieIdAction(categorie?.id, 5, pageParam),
            getNextPageParam: (lastPage) => {
                if (lastPage.data.hasNextPage) {
                    return lastPage.data.currentPage
                        ? lastPage.data.currentPage + 1
                        : undefined;
                }
            },
        })
    const coursesLength = 4;
    const allCourses = data?.pages.flatMap((page) => page.data.data) ?? [];
    return (
        <>
            {isLoading && <CardsLoader length={coursesLength} />}
            {!isLoading &&
                <FeaturedCoursesSwiper
                    // key={}
                    categoryId={categorie.id}
                    coursesDetails={allCourses}
                    isCoursesLoading={isLoading}
                    getNextCoursePage={fetchNextPage}
                    courseHasNextPage={hasNextPage}
                    isFetchingNextCoursesPage={isFetchingNextPage}
                />
            }
        </>
    )
}
