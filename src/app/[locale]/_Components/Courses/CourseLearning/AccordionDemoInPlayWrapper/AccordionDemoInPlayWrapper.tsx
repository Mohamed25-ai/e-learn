import React from 'react'
import { CoursesAccordionWrapperProps } from '../../CoursesAccordionWrapper/Courses.accordionwrapper.types';
import { getPaidCourseContentBySectionIdAction } from '@/actions/courses/courses.actions';
import { AccordionDemoInPlayWrapperProps } from './accordionDemoInPlayWrapper.types';
import AccordionDemoInPlay from './AccordionDemoInPlay';

export default async function AccordionDemoInPlayWrapper({ data }: AccordionDemoInPlayWrapperProps) {
    const paidContent = await getPaidCourseContentBySectionIdAction(data.id);
    return (
        <>
            <AccordionDemoInPlay 
                section={data}  key={data.id} contentData={paidContent?.data} />
        </>
    )
}
