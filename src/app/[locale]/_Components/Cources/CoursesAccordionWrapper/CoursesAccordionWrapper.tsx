import { getCourseContentAction } from "@/actions/courses/courses.actions";
import { AccordionDemo } from "../AccordionDemo/AccordionDemo";
import { CoursesAccordionWrapperProps } from "./Courses.accordionwrapper.types";


export default async function CoursesAccordionWrapper({data}:CoursesAccordionWrapperProps){
    const contents=await getCourseContentAction(data.id)
    return (
        <div>
            <AccordionDemo section={data} contentData={contents?.data} /> 
        </div>
    )
}
