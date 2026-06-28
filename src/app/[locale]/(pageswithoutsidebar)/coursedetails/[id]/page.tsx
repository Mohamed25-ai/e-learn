import React from 'react'
import { CourseDetailsProps } from '../coursedetails.types'
import { getCreatedCourseByCourseIdAction } from '@/actions/courses/courses.actions'
import CourseDetails from '@/app/[locale]/_Components/Cources/CourseDetails/CourseDetails';

export default async function page({params,searchparams}:CourseDetailsProps) {
    const {id}=await params;    
    const courseDeatils=await getCreatedCourseByCourseIdAction(id);
    return (
        <section>
            <CourseDetails data={courseDeatils?.data} />
        </section>
    )
}
