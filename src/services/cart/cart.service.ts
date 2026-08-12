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
export async function removeCourseFromCart(courseId: string) {
    const api = await privateServerApi();
    try {
        const res = await api.delete(`/Basket/Delete/${courseId}`);
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
export async function removeAllItemsCart() {
    const api = await privateServerApi();
    try {
        const res = await api.delete(`/Basket/Clear`);
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
export async function payUserCart(basketId: string) {
    const api = await privateServerApi();
    try {
        const res = await api.post(`/Payment/CreatePaymentIntent/${basketId}`);
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
export async function getUserCart() {
    const api = await privateServerApi();
    try {
        const res = await api.get(`/Basket/List`);
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