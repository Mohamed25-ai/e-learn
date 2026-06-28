import React, { Suspense } from 'react'
import { CategorizedCourseProps } from '../categorizedcourse.types'
import { getCoursesByCategorieId } from '@/services/courses/courses.service';
import CourseCard from '@/app/[locale]/_Components/Cources/CourseCard/CourseCard';
import { CourseData } from '@/app/[locale]/_Components/Cources/CoursesByCategoryId/coursebycategoryId.types';
import CategorizedCourse from '@/app/[locale]/_Components/Cources/CategorizedCourse/CategorizedCourse';
import { SearchAndFilterCourse } from '@/app/[locale]/_Components/Cources/SearchAndFilterCourse/SearchAndFilterCourse';
import CategorizedCoursePagination from '../CategorizedCoursePagination';
import FadeUp from '@/app/[locale]/_Components/Animation/FadeUp';
import AnimatedGrid from '@/app/[locale]/_Components/Animation/AnimatedGrid';

export default async function page({ params, searchParams }: CategorizedCourseProps) {
    const param = await params;
    const { pageSize, pageNumber, searchCourse,filter } = await searchParams
    console.log("searchParams", (await searchParams))
    const pgSize = pageSize || 4;
    const pgNumber = pageNumber || 1
    const searchData=searchCourse||undefined
    const FilterData=filter||undefined
    const courses = await getCoursesByCategorieId(param.id, Number(pgSize), Number(pgNumber),FilterData,searchData);
    return (
        <section className=''>
            <FadeUp>
                <CategorizedCourse
                    meta={courses?.data?.meta}
                    totalCount={courses?.data?.totalCount}
                />
            </FadeUp>
            <FadeUp delay={0.1}>
                <SearchAndFilterCourse  currentPage={courses?.data?.currentPage} />
            </FadeUp>
                {courses?.data?.data.length==0&&(
                    <h1 className='flex text-foreground font-bold items-center justify-center'>Not Found Courses</h1>
                )}
            <div className="px-5 mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                {courses?.data?.data.map((course: CourseData, index:number) => (
                    <FadeUp
                        key={course.id}
                        delay={index * 0.08}
                    >
                        <CourseCard course={course} />
                    </FadeUp>
                ))}
            </div>
            {/* <AnimatedGrid page={Number(pgNumber)}>
    {courses?.data?.data.map((course:CourseData) => (
        <CourseCard
            key={course.id}
            course={course}
        />
    ))}
</AnimatedGrid> */}
            <div className='my-4'>
                <Suspense>
                    <CategorizedCoursePagination categoryId={param?.id} currentPage={courses?.data?.currentPage} hasNextPage={courses?.data?.hasNextPage}
                        hasPreviousPage={courses?.data?.hasPreviousPage} totalCount={courses?.data?.totalCount} totalPages={courses?.data?.totalPages}
                    />
                </Suspense>
            </div>
        </section>
    )
}
