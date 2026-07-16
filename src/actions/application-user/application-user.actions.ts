"use server"

import { getProfileUserData } from "@/services/application-user/application.user.service"

export async function getProfileUserDataAction(userId:string) {
    return await getProfileUserData(userId);
}