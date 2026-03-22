'use server'
import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export async function getUserToken():Promise<string|undefined> {
    const cookie=await cookies();
    const nextAuthToken=cookie.get('next-auth.session-token')?.value||cookie.get('__Secure-next-auth.session-token')?.value;
    console.log('nextAuthToken',nextAuthToken)
    if(process.env.NEXTAUTH_SECRET){
        const userJwt=await decode({token:nextAuthToken ,secret:process.env.NEXTAUTH_SECRET});
        return userJwt?.userToken;
    }
    return undefined;
}