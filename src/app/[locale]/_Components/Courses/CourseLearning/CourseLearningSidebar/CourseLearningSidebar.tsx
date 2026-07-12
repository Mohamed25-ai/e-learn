import React from 'react'
import { CourseLearningSidebarProps } from '../course.learning.types'
import CourseDetailsCurriculum from '../../CourseDetailsCurriculum/CourseDetailsCurriculum'

export default function CourseLearningSidebar({ courseId }: CourseLearningSidebarProps) {
    return (
        <aside className='fixed rtl:left-0 ltr:right-0 top-26 w-3/4 md:w-1/4 bg-(--primary-light) h-screen '>
            <CourseDetailsCurriculum courdeId={courseId} inPlay={true} />
        </aside>
    )
}
