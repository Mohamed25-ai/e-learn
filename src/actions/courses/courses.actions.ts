'use server'
import { getUserToken } from "@/utils/getAuthenticatedUserToken/getAuthenticatedUserToken";
import { addCourseSection, addInstructorRule, createCourseBasicInformation, createCourseContent, editCourseContent, editCourseSection, getCourseContent, getCoursesByCategorieId, getCourseSection, getCreatedCourseByCourseId, getCreatedSectionByCourseId

} from "@/services/courses/courses.service";
import { CreateSectionType } from "@/services/courses/coursesapi.types";
import { SubmitContentFormType } from "@/app/[locale]/_Components/Cources/CreateCourses/CreateCourseContent/createcoursecontent.types";

export async function addInstrucorRuleAction() {
    const tok = await getUserToken()??"";
    return await addInstructorRule();
}
export async function getCoursesByCategorieIdAction(id:string,pageSize?:number,pageNumber?:number,orderBy?:string,search?:string) {
    return await getCoursesByCategorieId(id,pageSize,pageNumber,orderBy,search);
};
export async function createCourseBasicInformationAction(data:FormData) {
    return await createCourseBasicInformation(data);
}
export async function createCourseContentAction(data:FormData) {
    return await createCourseContent(data);
}
export async function editCourseContentAction(data:FormData) {
    return await editCourseContent(data);
}
export async function addCourseSectionAction(data:CreateSectionType) {
    return await addCourseSection(data);
}
export async function editCourseSectionAction(data:CreateSectionType) {
    return await editCourseSection(data);
}
export async function getCreatedSectionByCourseIdAction(courseId:string) {
    return await getCreatedSectionByCourseId(courseId);
}
export async function getCreatedCourseByCourseIdAction(courseId:string) {
    return await getCreatedCourseByCourseId(courseId);
}
export async function getCourseSectionAction(courseId:string) {
    return await getCourseSection(courseId);
}
export async function getCourseContentAction(sectionId:string) {
    return await getCourseContent(sectionId);
}