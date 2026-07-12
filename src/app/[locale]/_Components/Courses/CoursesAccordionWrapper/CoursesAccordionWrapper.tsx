import { getCourseContentAction } from "@/actions/courses/courses.actions";
import { AccordionDemo } from "../AccordionDemo/AccordionDemo";
import { CoursesAccordionWrapperProps } from "./Courses.accordionwrapper.types";


export default async function CoursesAccordionWrapper({ data,inPlayPage }: CoursesAccordionWrapperProps) {
    const contents = await getCourseContentAction(data.id);
    console.log("Content",contents)
    if (contents?.error?.id == "NotEnrolledInCourse") {
        return (
            <div>
                <AccordionDemo section={data} contentData={[]} inPlay={inPlayPage} />
            </div>
        )
    }
    return (
        <div>
            <AccordionDemo section={data} contentData={contents?.data} inPlay={inPlayPage} />
        </div>
    )
}
