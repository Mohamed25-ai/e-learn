import { AllEnrolledCoursesCardsProps } from "./enrolled.courses.types";
import EnrolledCourseCard from "./EnrolledCourseCard";
import { getTranslations } from "next-intl/server";

export default async function AllEnrolledCoursesCards({ allEnrolledCoursesWithData }: AllEnrolledCoursesCardsProps) {
    const t = await getTranslations();
    return (
        <>
            {allEnrolledCoursesWithData?.data.length == 0 && <div
                className="text-foreground font-bold text-2xl flex items-center justify-center py-10">
                {t('EnrolledCourses.noEnrolledCourses')}
            </div>}
            <section className="px-5 mt-5">
                {allEnrolledCoursesWithData?.data.map((course) => {
                    return (
                        <EnrolledCourseCard key={course.courseId}
                            enrolledCourseData={course} />
                    )
                })}
            </section>
        </>
    )
}