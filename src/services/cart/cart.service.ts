import axios from "axios";
import { privateServerApi } from "../private-server-api";

export async function addCourseToCart(courseId: string) {
    const api = await privateServerApi();
    try {
        const res = await api.post(`/Basket/Add/${courseId}`);
        return {
            status: res.status,
            data: res.data
        }
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return {
                status: error.response?.status,
                data: error.response?.data,
            };
        };
        throw error;
    }
}