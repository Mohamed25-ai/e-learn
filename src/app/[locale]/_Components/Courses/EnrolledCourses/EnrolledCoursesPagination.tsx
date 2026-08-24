import React from 'react'
import { EnrolledCoursesPaginationProps } from './enrolled.courses.types'
import CategorizedCoursePagination from '@/app/[locale]/(pageswithoutsidebar)/categorized-course/CategorizedCoursePagination'

export default function EnrolledCoursesPagination({ currentPage, hasNextPage, hasPreviousPage,
    totalCount, totalPages, inMyLearningPage
}: EnrolledCoursesPaginationProps) {
    return (
        <div className='mt-5'>
            <CategorizedCoursePagination
                currentPage={currentPage}
                hasNextPage={hasNextPage}
                hasPreviousPage={hasPreviousPage}
                totalCount={totalCount}
                totalPages={totalPages}
            />
        </div>
    )
}
