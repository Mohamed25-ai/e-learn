import axios from "axios";
import { publicApi } from "../public-api";


export async function listAllCategories(locale?:string,PageNumber?:number,PageSize?:number,Search?:string) {
    const api=await publicApi;
    try {
        const res=await api.get(`/Category/List`,{
            headers:{
                "Accept-Language":locale=="en"?" ":"ar-EG"
            },
            params:{
                PageNumber,
                PageSize,
                Search
            }
        });
        return {
            data:res.data,
            status:res.status
        }
    } catch (error) {
        if(axios.isAxiosError(error)){
            const data=error.response?.data;
            return data;
        }
        throw error;
    }
}