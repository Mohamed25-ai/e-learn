import axios from "axios";
import { publicApi } from "../public-api";
import { privateServerApi } from "../private-server-api";

const BASE_URL = process.env.BASE_URL;
export async function addInstructorRule() {
    const api = await privateServerApi();
    try {
        const res = await api.post(`/User/Add-Instructor-Role`, {
        })
        console.log("000000000", res.data)
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.log("Rule error", error?.response?.data)
        }
    }
};
export async function getCoursesByCategorieId(categoryid: string, pageSize?: number, pageNumber?: number, orderBy?: string, search?: string) {
    const api = await publicApi;
    try {
        const res = await api.get(`${process.env.NEXT_PUBLIC_API_URL}/Course/By-Category-Id-Paginated`, {
            params: {
                CategoryId: categoryid,
                pageSize: pageSize,
                pageNumber: pageNumber,
                OrderBy: orderBy,
                Search: search
            }
        });
        return res.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.log("Rule error", error?.response?.data)
            return error.request.data;
        };
    }
}
export async function createCourseBasicInformation(data: FormData) {
    const api = await privateServerApi();

    try {
        const res = await api.post(`/Course/Create`, data, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        });
        return res.data;
    } catch (error) {
        if (error instanceof Error && error.message === "SESSION_EXPIRED") {
            return { Succeeded: false, SessionExpired: true }
        }
        if (axios.isAxiosError(error)) {
            console.log("Rule error", error?.response?.data)
            return error?.response?.data;
        }
    }
}
