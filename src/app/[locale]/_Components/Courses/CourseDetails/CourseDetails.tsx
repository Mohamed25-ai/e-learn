import { CourseDetailsProps } from './coursedetails.types'
import CourseDetailsHeader from './CourseDetailsHeader/CourseDetailsHeader'
import CourseDetailsContent from './CourseDetailsContent/CourseDetailsContent'
import CourseDetailsCard from './CourseDetailsCard/CourseDetailsCard'
import { checkIsUserEnrolledInCourseByCourseIdAction } from '@/actions/courses/courses.actions'
import { getServerSession } from 'next-auth'
import { nextAuthConfig } from '@/next-auth/nextauth.config'

export default async function CourseDetails({ data }: CourseDetailsProps) {
    const userSession = await getServerSession(nextAuthConfig);
    const isUserEnrolledThisCourse = userSession?await checkIsUserEnrolledInCourseByCourseIdAction(data.id!):false
    return (
        <>
            <div className='bg-(--primary-color) lg:flex justify-between md:p-5'>
                <CourseDetailsHeader data={data} />
                <CourseDetailsCard data={data}
                    isUserEnrolledCourse={userSession?isUserEnrolledThisCourse?.data:isUserEnrolledThisCourse}
                />
            </div>
            <div className='px-5 mt-5'>
                <CourseDetailsContent data={data} />
            </div>
        </>
    )
}
