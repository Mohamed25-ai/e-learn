import { AllEnrolledCoursesCardsProps } from "./enrolled.courses.types";
import EnrolledCourseCard from "./EnrolledCourseCard";

export default function AllEnrolledCoursesCards({ allEnrolledCoursesWithData }: AllEnrolledCoursesCardsProps) {
    return (
        <>
            {allEnrolledCoursesWithData?.data.length == 0 && <div
                className="text-foreground font-bold text-2xl flex items-center justify-center py-10">
                Not Exist Enrolled Courses
            </div>}
            <section className="px-5 mt-5">
                {allEnrolledCoursesWithData?.data.map((course) => {
                    return (
                        <EnrolledCourseCard key={course.courseId} enrolledCourseData={course} />
                    )
                })}
            </section>
        </>
    )
}
