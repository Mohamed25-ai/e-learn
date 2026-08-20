import React from 'react'
import { getPaidCreatedCourseByCourseIdAction } from '@/actions/courses/courses.actions';
import CourseDetails from '@/app/[locale]/_Components/Courses/CourseDetails/CourseDetails';
type layoutProps = {
    children: React.ReactNode,
    params: Promise<{ id: string }>
}
export default async function Layout({ children, params }: layoutProps) {
    const { id } = await params;
    const courseDeatils = await getPaidCreatedCourseByCourseIdAction(id);
    return (
        <>
            <section>
                <CourseDetails data={courseDeatils?.data} />
            </section>
            {children}
        </>
    )
}
