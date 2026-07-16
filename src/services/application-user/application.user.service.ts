import axios from "axios";
import { privateServerApi } from "../private-server-api";

export async function getProfileUserData(userId: string) {
    const api = await privateServerApi();
    try {
        const res = await api.get(`/User/GetById/${userId}`)
        return {
            data: res.data,
            status: res.status
        };
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const status = error.response?.status;
            const data = error.response?.data;
            return {
                data,
                status
            };
        }
        throw error;
    }
}