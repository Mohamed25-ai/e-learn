
import { CourseByCategoryIdProps, CourseData, CoursesType } from "./coursebycategoryId.types"
import { getCoursesByCategorieIdAction } from "@/actions/courses/courses.actions";
import CourseCard from "../CourseCard/CourseCard";
import { getCoursesByCategorieId } from "@/services/courses/courses.service";

export default async function CoursesByCategoryId({ categoryid }: CourseByCategoryIdProps) {
    const courses = await getCoursesByCategorieId(categoryid);
    console.log("courses", courses);
    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
            {courses?.data?.data.map((course: CourseData) => (
                <CourseCard key={course.id} course={course} />
            ))}
        </div>
    );
}
