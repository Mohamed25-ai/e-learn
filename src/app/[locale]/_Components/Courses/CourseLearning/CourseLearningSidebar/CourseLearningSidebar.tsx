import React from 'react'
import { CourseLearningSidebarProps } from '../course.learning.types'
import CourseDetailsCurriculum from '../../CourseDetailsContent/CourseDetailsCurriculum/CourseDetailsCurriculum'
import { getCourseSectionAction } from '@/actions/courses/courses.actions';
import AccordionDemoInPlay from '../AccordionDemoInPlayWrapper/AccordionDemoInPlay';
import { SectionData } from '../../CoursesByCategoryId/coursebycategoryId.types';
import AccordionDemoInPlayWrapper from '../AccordionDemoInPlayWrapper/AccordionDemoInPlayWrapper';

export default async function CourseLearningSidebar({ courseId }: CourseLearningSidebarProps) {
    const sections = await getCourseSectionAction(courseId);

    return (
        <aside className='fixed rtl:left-0 ltr:right-0 
                top-26 w-1/2 lg:w-1/4 bg-(--primary-light) rtl:border-r-2 ltr:border-l-2 border-(--primary-color)  h-screen '>
            {sections?.data?.data.map((section: SectionData) => (<AccordionDemoInPlayWrapper 
                data={section} 
            />))}

        </aside>
    )
}
