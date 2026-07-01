'use server'
import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";


export async function getUserToken(): Promise<string | undefined> {
    const cookie = await cookies();
    const nextAuthToken = await cookie.get('next-auth.session-token')?.value || cookie.get('__Secure-next-auth.session-token')?.value;
    // console.log('nextAuthToken', nextAuthToken)
    if (!nextAuthToken || !process.env.NEXTAUTH_SECRET) return undefined;
    
    const userJwt = await decode({
        token: nextAuthToken,
        secret: process.env.NEXTAUTH_SECRET,
    });
    if (!userJwt) return undefined;
    if (userJwt?.error) {
        return undefined; 
    }
    return userJwt?.userToken;
}