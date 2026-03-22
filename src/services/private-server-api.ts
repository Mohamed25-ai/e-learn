import axios from "axios";
import { getUserToken } from "@/utils/getAuthenticatedUserToken/getAuthenticatedUserToken";

export async function privateServerApi() {
    const token = await getUserToken();
    const headers: Record<string, string> = {};
    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }
    return axios.create({
        baseURL: process.env.BASE_URL,
        headers,
    });
}