'use server'
import { addInstructorRule, getCoursesByCategorieId } from "@/services/courses/courses.service";
import { getUserToken } from "@/utils/getAuthenticatedUserToken/getAuthenticatedUserToken";

export async function addInstrucorRuleAction() {
    const tok = await getUserToken()??"";
    return await addInstructorRule(tok);
}
export async function getCoursesByCategorieIdAction(id:string,pageSize?:number,pageNumber?:number,orderBy?:string,search?:string) {
    return await getCoursesByCategorieId(id,pageSize,pageNumber,orderBy,search);
}