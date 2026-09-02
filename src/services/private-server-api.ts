import axios from "axios";
import { getUserToken } from "@/utils/getAuthenticatedUserToken/getAuthenticatedUserToken";

export async function privateServerApi() {
    const token = await getUserToken();
    if(!token){
        throw new Error("Token Not Exist");
        // return undefined
    }
    return axios.create({
        baseURL: process.env.BASE_URL,
        headers: {
            "Authorization": `Bearer ${token}`,
        }
    });
}