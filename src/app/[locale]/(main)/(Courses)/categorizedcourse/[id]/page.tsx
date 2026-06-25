import React from 'react'
import { CategorizedCourseProps } from './categorizedcourse.types'
import { getCoursesByCategorieId } from '@/services/courses/courses.service';
import CourseCard from '@/app/[locale]/_Components/Cources/CourseCard/CourseCard';
import { CourseData } from '@/app/[locale]/_Components/Cources/CoursesByCategoryId/coursebycategoryId.types';
import CategorizedCourse from '@/app/[locale]/_Components/Cources/CategorizedCourse/CategorizedCourse';

export default async function page({params}:CategorizedCourseProps) {
    const param=await params;
    const courses=await getCoursesByCategorieId(param.id)
    console.log("Course",courses)
    return (
        <section className='px-5 py-5'>
            <CategorizedCourse />
            <div className='grid grid-cols-3 gap-3'>
            {courses?.data?.data?.map((course:CourseData)=>(
                <CourseCard course={course} />
            ))}
            </div>
        </section>
    )
}
