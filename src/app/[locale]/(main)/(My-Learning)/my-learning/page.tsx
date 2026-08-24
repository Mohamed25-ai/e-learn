import { getEnrolledCoursesAction } from "@/actions/application-user/application-user.actions"
import EnrolledCourses from "@/app/[locale]/_Components/Courses/EnrolledCourses/EnrolledCourses";
import { MyLearningProps } from "./my.learning.types";

export default async function page({searchParams}:MyLearningProps) {
    const {pageNumber}=await searchParams ||1;
    const enrolledCourses=await getEnrolledCoursesAction(pageNumber,2);
    return (
        <>
            <EnrolledCourses enrolledCoursesData={enrolledCourses?.data} />
        </>
    )
}
