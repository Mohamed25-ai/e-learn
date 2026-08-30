import { checkIsUserEnrolledInCourseByCourseIdAction, getCourseContentBySectionIdForViewOnlyAction, getPaidCourseContentBySectionIdAction } from "@/actions/courses/courses.actions";
import { CoursesAccordionWrapperProps } from "./Courses.accordionwrapper.types";
import { AccordionDemo } from "./AccordionDemo/AccordionDemo";

export default async function CoursesDetailsAccordionWrapper({ data }: CoursesAccordionWrapperProps) {
    const isUserEnrolledInCourse = await checkIsUserEnrolledInCourseByCourseIdAction(data.courseId)
    const paidContent = await getPaidCourseContentBySectionIdAction(data.id);
    const viewOnlyCourseContent = await getCourseContentBySectionIdForViewOnlyAction(data?.id);
    return (
        <>
            {isUserEnrolledInCourse.data&&<div>
                <AccordionDemo isUserEnrolledToCourse={isUserEnrolledInCourse?.data}
                    section={data} contentData={paidContent?.data} />
            </div>}
            {!isUserEnrolledInCourse.data&&<div>
                <AccordionDemo isUserEnrolledToCourse={isUserEnrolledInCourse?.data}
                    section={data} contentData={viewOnlyCourseContent?.data} />
            </div>}
        </>
    )
}
