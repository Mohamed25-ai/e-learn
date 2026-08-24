import { getCourseContentBySectionIdForViewOnlyAction, getPaidCourseContentBySectionIdAction } from "@/actions/courses/courses.actions";
import { AccordionDemo } from "../AccordionDemo/AccordionDemo";
import { CoursesAccordionWrapperProps } from "./Courses.accordionwrapper.types";



export default async function CoursesAccordionWrapper({ data,inPlayPage }: CoursesAccordionWrapperProps) {
    const paidContent = await getPaidCourseContentBySectionIdAction(data.id);
    // const viewOnlyCourseContent=await getCourseContentBySectionIdForViewOnlyAction(data?.id);


    return (
        <div>
            <AccordionDemo section={data} contentData={paidContent?.data} inPlay={inPlayPage} />
        </div>
    )
}
