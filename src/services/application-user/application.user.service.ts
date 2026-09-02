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
export async function editProfileUserData(userData: FormData) {
    const api = await privateServerApi();
   
    try {
        const res = await api.put(`/User/Edit`, userData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
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
export async function changeProfileUserPassword(userData: FormData) {
    const api = await privateServerApi();
   
    try {
        const res = await api.put(`/User/ChangePassword`, userData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
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
export async function applyToBecomeInstructor() {
    const api = await privateServerApi();
   
    try {
        const res = await api.post(`/User/Add-Instructor-Role`)
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

export async function getEnrolledCourses(pageNumber?: number, pageSize?: number, orderBy?: string, search?: string) {
    const api = await privateServerApi();
   
    try {
        const res = await api.get(`/Enrollment/Paginated`, {
            params: {
                PageNumber: pageNumber,
                PageSize: pageSize,
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
            return error?.response?.data;
        }
        throw error;
    }
}