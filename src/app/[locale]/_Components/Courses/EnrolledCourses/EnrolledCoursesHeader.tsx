import React from 'react'
import { EnrolledCoursesHeaderProps } from './enrolled.courses.types'
import EnrolledCoursesOverview from './EnrolledCoursesOverview'

export default function EnrolledCoursesHeader({ enrolledCoursesOverviewData }: EnrolledCoursesHeaderProps) {
    return (
        <div className="flex flex-col gap-6 px-5  ">
            <header className="flex flex-col gap-1.5 mt-5 lg:mt-0">
                <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
                    My Learning
                </h2>
                <p className="text-sm text-(--text-secondary)">
                    Track your progress and continue where you left off
                </p>
            </header>
            <EnrolledCoursesOverview
                enrolledCourses={enrolledCoursesOverviewData?.length}
                inProgress={enrolledCoursesOverviewData?.length}
                completed={enrolledCoursesOverviewData?.length}
                certificates={enrolledCoursesOverviewData?.length}
            />
        </div>
    )
}
