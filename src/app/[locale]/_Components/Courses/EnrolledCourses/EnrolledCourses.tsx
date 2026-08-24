import CategorizedCoursePagination from "@/app/[locale]/(pageswithoutsidebar)/categorized-course/CategorizedCoursePagination";
import AllEnrolledCoursesCards from "./AllEnrolledCoursesCards";
import { EnrolledCoursesProps } from "./enrolled.courses.types";
import EnrolledCoursesFilters from "./EnrolledCoursesFilters";
import EnrolledCoursesHeader from "./EnrolledCoursesHeader";
import EnrolledCoursesPagination from "./EnrolledCoursesPagination";



export default function EnrolledCourses({ enrolledCoursesData }: EnrolledCoursesProps) {
    return (
        <section className="px-5 mt-5">
            <EnrolledCoursesHeader enrolledCoursesOverviewData={enrolledCoursesData?.data} />
            <EnrolledCoursesFilters 
                enrolledCourses={enrolledCoursesData?.data.length}
                inProgress={enrolledCoursesData?.data.length}
                certificates={enrolledCoursesData?.data.length}
                completed={enrolledCoursesData?.data.length}
            />
            <AllEnrolledCoursesCards allEnrolledCoursesWithData={enrolledCoursesData} />
            <EnrolledCoursesPagination 
            currentPage={enrolledCoursesData?.currentPage}
            hasNextPage={enrolledCoursesData?.hasNextPage}
            hasPreviousPage={enrolledCoursesData?.hasPreviousPage}
            totalCount={enrolledCoursesData?.totalCount}
            totalPages={enrolledCoursesData?.totalPages}
            />
        </section>
    )
}
