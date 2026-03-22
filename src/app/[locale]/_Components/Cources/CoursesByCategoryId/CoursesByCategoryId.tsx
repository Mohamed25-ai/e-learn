
import { CourseByCategoryIdProps, CourseData, CoursesType } from "./coursebycategoryId.type"
import { getCoursesByCategorieIdAction } from "@/actions/courses/courses.actions";
import CourseCard from "../CourseCard/CourseCard";

export default async function CoursesByCategoryId({ categoryid }: CourseByCategoryIdProps) {
    const courses = await getCoursesByCategorieIdAction(categoryid);
    console.log("courses", courses);
    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
            {courses?.data?.data.map((course: CourseData) => (
                <CourseCard key={course.id} course={course} />
            ))}
        </div>
    );
}
