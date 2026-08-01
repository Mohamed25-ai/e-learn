"use server"

import { applyToBecomeInstructor, changeProfileUserPassword, editProfileUserData, getProfileUserData } from "@/services/application-user/application.user.service"

export async function getProfileUserDataAction(userId:string) {
    return await getProfileUserData(userId);
}
export async function editProfileUserDataAction(userData:FormData) {
    return await editProfileUserData(userData);
}
export async function changeProfileUserPasswordAction(userData:FormData) {
    return await changeProfileUserPassword(userData);
}
export async function applyToBecomeInstructorAction() {
    return await applyToBecomeInstructor();
}