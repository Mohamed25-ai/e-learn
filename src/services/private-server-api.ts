import axios from "axios";
import { getUserToken } from "@/utils/getAuthenticatedUserToken/getAuthenticatedUserToken";

export async function privateServerApi() {
    const token = await getUserToken();
    // console.log("Accessioi",token)
    if(!token){
        throw new Error("SESSION_EXPIRED");
    }
    return axios.create({
        baseURL: process.env.BASE_URL,
        
        headers: {
            "Authorization": `Bearer ${token}`,
        }
    });

}