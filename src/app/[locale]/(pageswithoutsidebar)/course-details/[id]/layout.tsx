import React from 'react'
import { getCreatedCourseByCourseIdAction } from '@/actions/courses/courses.actions';
import CourseDetails from '@/app/[locale]/_Components/Courses/CourseDetails/CourseDetails';
import { getServerSession } from 'next-auth';
import { nextAuthConfig } from '@/next-auth/nextauth.config';
type layoutProps = {
    children: React.ReactNode,
    params: Promise<{ id: string }>
}
export default async function Layout({ children, params }: layoutProps) {
    const { id } = await params;
    const courseDeatils = await getCreatedCourseByCourseIdAction(id);
    const userSession = await getServerSession(nextAuthConfig);
    return (
        <>
            <section>
                <CourseDetails data={courseDeatils?.data} />
                </section>
            {children}
        </>
    )
}
