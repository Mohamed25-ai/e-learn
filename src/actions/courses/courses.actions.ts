'use server'
import { getUserToken } from "@/utils/getAuthenticatedUserToken/getAuthenticatedUserToken";
import { addCourseSection, addInstructorRule, createCourseBasicInformation, editCourseSection, getCoursesByCategorieId, getCreatedSectionByCourseId

} from "@/services/courses/courses.service";
import { CreateSectionType } from "@/services/courses/coursesapi.types";

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

export async function addCourseSectionAction(data:CreateSectionType) {
    return await addCourseSection(data);
}
export async function editCourseSectionAction(data:CreateSectionType) {
    return await editCourseSection(data);
}
export async function getCreatedSectionByCourseIdAction(courseId:string) {
    return await getCreatedSectionByCourseId(courseId);
}