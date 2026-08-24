import axios from "axios";
import { publicApi } from "../public-api";
import { privateServerApi } from "../private-server-api";
import { CreateSectionType } from "./coursesapi.types";
import { CreateCourseContentInputsData } from "@/app/[locale]/_Components/Courses/CreateCourses/CreateCourseContent/createcoursecontent.types";
const BASE_URL = process.env.BASE_URL;

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
        return {
            status: res.status,
            data: res.data
        }
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.log("Rule error", error?.response?.data)
            return error.request.data;
        };
        throw error;
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
        return {
            status: res.status,
            data: res.data
        }
    } catch (error) {
        if (error instanceof Error && error.message === "SESSION_EXPIRED") {
            return { Succeeded: false, SessionExpired: true }
        }
        if (axios.isAxiosError(error)) {
            console.log("Rule error", error?.response?.data)
            return error?.response?.data;
        }
        throw error;
    }
}
export async function addCourseSection(data: CreateSectionType) {
    const api = await privateServerApi();
    try {
        const res = await api.post(`/Section/Create`, data,
            {
                headers: {
                    "Content-Type": "application/json",
                },
            })
        console.log("sectionResult", res.data)
        return {
            status: res.status,
            data: res.data
        }
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.log("sectionerror", error?.response?.data)
            return error?.response?.data;
        }
        throw error;
    }
};
export async function editCourseSection(data: CreateSectionType) {
    const api = await privateServerApi();
    try {
        const res = await api.put(`/Section/Edit`, data,
            {
                headers: {
                    "Content-Type": "application/json",
                },
            })
        console.log("editSectionResult", res.data)
        return {
            status: res.status,
            data: res.data
        }
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.log("editSectionerror", error?.response?.data)
            return error?.response?.data;
        }
        throw error;
    }
};
export async function getCreatedSectionByCourseId(courseId: string) {
    const api = await privateServerApi();
    try {
        const res = await api.get(`/Section/Paginated?CourseId=${courseId}`);
        return {
            status: res.status,
            data: res.data
        }
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return error?.response?.data;
        }
        throw error;
    }
}
export async function createCourseContent(data: FormData) {
    const api = await privateServerApi();
    try {
        const res = await api.post(`/Content/Create`, data, {
            headers: { "Content-Type": "multipart/form-data" },
        });
        return {
            status: res.status,
            data: res.data
        }
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.log("Errorerer", error.response)
            return error?.response?.data;
        }
        throw error;
    }
}
export async function editCourseContent(data: FormData) {
    const api = await privateServerApi();
    try {
        const res = await api.put(`/Content/Edit`, data, {
            headers: { "Content-Type": "multipart/form-data" },
        });
        return {
            status: res.status,
            data: res.data
        }
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.log("Errossssssssssssrerer", error.response)
            return error?.response?.data;
        }
        throw error;
    }
}

export async function getCourseSection(courseId: string) {
    const api = await publicApi;
    try {
        const res = await api.get(`/Section/Paginated?CourseId=${courseId}`);
        return {
            status: res.status,
            data: res.data
        }
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return error?.response?.data;
        }
        throw error;
    }
}
export async function getCourseContentById(contentId: string) {
    const api = await privateServerApi();
    try {
        const res = await api.get(`/Content/GetById/${contentId}`);
        return {
            status: res.status,
            data: res.data
        }
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return error?.response?.data;
        }
        throw error;
    }
}
export async function getCreatedCourseByCourseId(courseId: string) {
    const api = await publicApi;
    try {
        const res = await api.get(`/Course/GetById/${courseId}`);
        return {
            status: res.status,
            data: res.data
        }
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return error?.response?.data;
        }
        throw error;
    }
}
export async function getPaidCourseContentBySectionId(sectionId: string) {
    const api = await privateServerApi();
    try {
        const res = await api.get(`/Content/List?SectionId=${sectionId}`);
        return {
            status: res.status,
            data: res.data
        }
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return error?.response?.data;
        }
        throw error;
    }
}
export async function getCourseContentBySectionIdForViewOnly(sectionId: string) {
    const api = await privateServerApi();
    try {
        const res = await api.get(`/Content/PreviewList?SectionId=${sectionId}`);
        return {
            status: res.status,
            data: res.data
        }
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return error?.response?.data;
        }
        throw error;
    }
}