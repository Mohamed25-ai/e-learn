import axios from "axios";
import { publicApi } from "../public-api";

export async function listAllCategories() {
    const api=await publicApi;
    try {
        const res=await api.get(`/Category/List`);
        console.log('AllCategories',res.data);
        return res.data;
    } catch (error) {
        if(axios.isAxiosError(error)){
            const data=error.response?.data;
            return data;
        }
    }
}