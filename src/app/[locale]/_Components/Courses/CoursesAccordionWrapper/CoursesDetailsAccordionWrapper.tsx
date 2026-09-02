import { checkIsUserEnrolledInCourseByCourseIdAction, getCourseContentBySectionIdForViewOnlyAction, getPaidCourseContentBySectionIdAction } from "@/actions/courses/courses.actions";
import { CoursesAccordionWrapperProps } from "./Courses.accordionwrapper.types";
import { AccordionDemo } from "./AccordionDemo/AccordionDemo";
import { getServerSession } from "next-auth";
import { nextAuthConfig } from "@/next-auth/nextauth.config";

export default async function CoursesDetailsAccordionWrapper({ data }: CoursesAccordionWrapperProps) {
    const userSession = await getServerSession(nextAuthConfig)
    const isUserEnrolledInCourse = userSession?await checkIsUserEnrolledInCourseByCourseIdAction(data?.courseId):false;
    const viewOnlyCourseContent = await getCourseContentBySectionIdForViewOnlyAction(data?.id);
    const paidContent = userSession&&await getPaidCourseContentBySectionIdAction(data?.id);
    
    return (
        <>
            {isUserEnrolledInCourse?.data && <div>
                <AccordionDemo isUserEnrolledToCourse={userSession?isUserEnrolledInCourse?.data:false}
                    section={data} contentData={paidContent?.data} />
            </div>}
            {!isUserEnrolledInCourse?.data && <div>
                <AccordionDemo isUserEnrolledToCourse={userSession?isUserEnrolledInCourse?.data:false}
                    section={data} contentData={viewOnlyCourseContent?.data} />
            </div>}
        </>
    )
}
