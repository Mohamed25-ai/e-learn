import axios from "axios";
import { publicApi } from "../public-api";
import { privateServerApi } from "../private-server-api";

const BASE_URL = process.env.BASE_URL;
export async function addInstructorRule(tok: string) {
    const api=await privateServerApi();
    try {
        const res = await api.post(`/User/Add-Instructor-Role`,  {
        })
        console.log("000000000", res.data)
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.log("Rule error", error?.response?.data)
        }
    }
};
export async function getCoursesByCategorieId(categoryid: string,pageSize?:number,pageNumber?:number,orderBy?:string,search?:string) {
    const api =await publicApi;
    try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/Course/By-Category-Id-Paginated`,{
                params:{
                    CategoryId:categoryid,
                    pageSize:pageSize,
                    pageNumber:pageNumber,
                    OrderBy:orderBy,
                    Search:search
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