import { ContentData, SectionData } from "../../CoursesByCategoryId/coursebycategoryId.types"
import {
    IconDefinition
} from "@fortawesome/free-solid-svg-icons";
export type AccordionDemoProps = {
    section: SectionData
    contentData: ContentData[],
    isUserEnrolledToCourse?: boolean

}
export type AccordionDemoInPlayProps = {
    content: ContentData
    icon: IconDefinition
}