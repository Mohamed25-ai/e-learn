"use client"

import EnrolledCourseCard from "../../Courses/EnrolledCourses/EnrolledCourseCard"
import EnrolledCoursesPagination from "../../Courses/EnrolledCourses/EnrolledCoursesPagination"
import { ProfileUserCoursesProps } from "./profile.details.types"
import { useTranslations } from "next-intl"


export default function ProfileUserCourses({ enrolledCoursesWithMetaData }: ProfileUserCoursesProps) {
    const t = useTranslations();
    return (
        <>
            {enrolledCoursesWithMetaData?.data.length == 0 && <div
                className="text-foreground text-2xl flex items-center justify-center py-10 font-bold">
                {t('EnrolledCourses.noEnrolledCourses')}
            </div>}
            <section className="px-5 mt-5">
                {enrolledCoursesWithMetaData?.data.map((course) => {
                    return (
                        <EnrolledCourseCard key={course.courseId} enrolledCourseData={course} />
                    )
                })}
                <EnrolledCoursesPagination
                    currentPage={enrolledCoursesWithMetaData.currentPage}
                    hasNextPage={enrolledCoursesWithMetaData.hasNextPage}
                    hasPreviousPage={enrolledCoursesWithMetaData.hasPreviousPage}
                    totalCount={enrolledCoursesWithMetaData.totalCount}
                    totalPages={enrolledCoursesWithMetaData.totalPages}
                />
            </section>
        </>
    )
}