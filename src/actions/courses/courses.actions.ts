'use server'
import {
    addCourseSection, changeProgressStatusByContentId, checkIsUserEnrolledInCourseByCourseId, createCourseBasicInformation, createCourseContent,
    editCourseContent, editCourseSection, getCourseContentById,
    getCourseContentBySectionIdForViewOnly,
    getCourseProgressByCourseId,
    getCoursesByCategorieId, getCourseSection, 
    getCreatedCourseByCourseId, 
    getCreatedSectionByCourseId,
    getPaidCourseContentBySectionId,
    } from "@/services/courses/courses.service";
import { CreateSectionType } from "@/services/courses/coursesapi.types";
import { CreateCourseContentInputsData } from "@/app/[locale]/_Components/Courses/CreateCourses/CreateCourseContent/createcoursecontent.types";

export async function getCoursesByCategorieIdAction(id: string, pageSize?: number, pageNumber?: number, orderBy?: string, search?: string) {
    return await getCoursesByCategorieId(id, pageSize, pageNumber, orderBy, search);
};
export async function createCourseBasicInformationAction(data: FormData) {
    return await createCourseBasicInformation(data);
}
export async function createCourseContentAction(data: FormData) {
    return await createCourseContent(data);
}
export async function editCourseContentAction(data: FormData) {
    return await editCourseContent(data);
}
export async function addCourseSectionAction(data: CreateSectionType) {
    return await addCourseSection(data);
}
export async function editCourseSectionAction(data: CreateSectionType) {
    return await editCourseSection(data);
}
export async function getCreatedSectionByCourseIdAction(courseId: string) {
    return await getCreatedSectionByCourseId(courseId);
}

export async function getCourseSectionAction(courseId: string) {
    return await getCourseSection(courseId);
}
export async function getPaidCourseContentBySectionIdAction(sectionId: string) {
    return await getPaidCourseContentBySectionId(sectionId);
}
export async function getCourseContentBySectionIdForViewOnlyAction(sectionId: string) {
    return await getCourseContentBySectionIdForViewOnly(sectionId);
}
export async function getCourseContentByIdAction(contentId: string) {
    return await getCourseContentById(contentId);
}
export async function getCreatedCourseByCourseIdAction(courseId: string) {
    return await getCreatedCourseByCourseId(courseId);
}
export async function checkIsUserEnrolledInCourseByCourseIdAction(courseId: string) {
    return await checkIsUserEnrolledInCourseByCourseId(courseId);
}
export async function getCourseProgressByCourseIdAction(courseId: string) {
    return await getCourseProgressByCourseId(courseId);
}
export async function changeProgressStatusByContentIdAction(contentId: string, status: boolean)  {
    return await changeProgressStatusByContentId(contentId,status);
}