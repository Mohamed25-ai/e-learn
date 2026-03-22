
import axios from "axios"
import { publicApi } from "../public-api";
import { privateServerApi } from "../private-server-api";
const BASE_URL=process.env.BASE_URL;
export async function confirmEmail(email:string,code:string) {
    const api=await publicApi;
    console.log(code)
    try {
        const res=await api.get(`/Authentication/ConfirmEmail?Email=${email}&Code=${code}`);
        console.log('dataaaa',res.data)
        return res.data;
    } catch (error) {
        if(axios.isAxiosError(error)){
            const status = error.response?.status;
            const data = error.response?.data ;
            return {
                data,
                status
            };
        }
    }
};

export async function confirmResetPassword(email: string, code: string) {
    const api=await publicApi;

    try {
        const res = await api.get(`/Authentication/ConfirmResetPassword?Email=${email}&Code=${code}`);
        console.log('dataaaa', res.data)
        return res.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const status = error.response?.status;
            const data = error.response?.data;
            return {
                data,
                status
            };
        }
    }
};

export async function refreshToken(reftoken:string) {
    const api=await publicApi;
    const formData=new FormData();
    formData.append("Token",reftoken);
    try {
        const res=await api.post(`/Authentication/RefreshToken`,formData,{
            headers:{
                "Content-Type": "multipart/form-data",
            },
        });
        console.log("refresheddata",res.data)
        return res.data;
        
    } catch (error) {
        if(axios.isAxiosError(error)){
            const errorData=error.response?.data;
            console.log('refreshError',errorData)
            return errorData;
        }
    }
};

export async function register(formData: FormData) {
    const api=await publicApi;
    try {
        const res = await api.post(`/User/Create`, formData);
        return res.data;
    } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
            const status = err.response?.status;
            const data = err.response?.data ;
            console.log("registerError",err)
            return {
                data,
                status
            };
        }
        return { ok: false, message: "Unexpected error" };
    }
};

export async function resetPassword(formdata:FormData) {
    const api=await publicApi;
    try {
        const res = await api.post(`/Authentication/ResetPassword`, formdata);
        return res.data;
    } catch (err) {
        if (axios.isAxiosError(err)) {
            const status = err.response?.status;
            const data = err.response?.data ;
            return {
                data,
                status
            };
        }
        return { ok: false, message: "Unexpected error" };
    }
};

export async function sendResetPassword(email:string) {
    const api=await publicApi;
    try {
        const res=await api.post(`/Authentication/SendResetPassword?Email=${email}`);
        return res.data;
    } catch (error) {
        if(axios.isAxiosError(error)){
            const status = error.response?.status;
            const data = error.response?.data ;
            return {
                data,
                status
            };
        }
    }
};