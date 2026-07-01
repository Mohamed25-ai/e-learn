import React from 'react'
import { ParamsType } from '../coursedetails.types'
import { getCreatedCourseByCourseIdAction } from '@/actions/courses/courses.actions';
import CourseDetails from '@/app/[locale]/_Components/Cources/CourseDetails/CourseDetails';
type layoutProps = {
    children: React.ReactNode,
    params: Promise<{ id: string }>
}
export default async function Layout({ children, params }: layoutProps) {
    const { id } = await params;
    const courseDeatils = await getCreatedCourseByCourseIdAction(id);
    return (
        <>
            <section>
                <CourseDetails data={courseDeatils?.data} />
            </section>
            {children}
        </>
    )
}
