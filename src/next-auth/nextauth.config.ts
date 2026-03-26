import { refreshTokenAction } from "@/actions/auth/auth.actions";
import axios from "axios"
import {  NextAuthOptions } from "next-auth"
import Credentials from "next-auth/providers/credentials";

function transformDate(dateStr: string) {
    return new Date(dateStr).getTime();
}

export const nextAuthConfig: NextAuthOptions = {
    providers: [
        Credentials({
            name: "Login by email",
            credentials: {
                Email: { label: "Email", type: "text" },
                Password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                const formData = new FormData();
                formData.append("Email", credentials?.Email!);
                formData.append("Password", credentials?.Password!);
                try {
                    const res = await axios.post(`${process.env.BASE_URL}/Authentication/SignIn`, formData, {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                    });
                    return res.data;
                } catch (error) {
                    if (axios.isAxiosError(error)) {
                        const data = error.response?.data;
                        console.log('errordata', data);
                        return null
                    }
                }
            }
        }),
    ],
    pages: {
        signIn: '/login',
        signOut:'/login',
    },
    callbacks: {
        async jwt({ token, user }) {
            // 1) First login
            if (user) {
                token.email = user.data.email;
                token.id = user.data.id;
                token.message = user.message;
                token.isSucceeded = user.succeeded;
                token.userName = user.data.userName;
                token.role = user.data.roles;

                token.userToken = user.data.token; // access token
                token.userTokenExpiration = user.data.expiresAt; // access exp (ISO string)

                token.userRefreshToken = user.data.refreshToken;
                token.userRefreshExpirationDate = user.data.refreshTokenExpiration; // refresh exp (ISO string)
                token.error = false;
                token.tokenErrorMessage = undefined;
                console.log("First Login User",token);
                return token;
            }

            const timeNow = Date.now();

            if (
                token.userRefreshExpirationDate &&
                timeNow >= transformDate(token.userRefreshExpirationDate as string )
            ) {
                token.error = true;
                token.tokenErrorMessage = "RefreshTokenExpired";
                console.log("Refresh Token Expired ",token)
                return token;
            }

            const buffer = 60_000; // 1 minute early refresh

            if (
                token.userTokenExpiration &&
                timeNow < transformDate(token.userTokenExpiration as string) - buffer
            ) {
                // access token still valid
                console.log("Token still valid before 1 min",token)
                return token;
            }


            try {
                const refreshedToken = await refreshTokenAction(token.userRefreshToken as string);
                token.email = refreshedToken.data.email;
                token.id = refreshedToken.data.id;
                token.message = refreshedToken.message;
                token.isSucceeded = refreshedToken.succeeded;
                token.userName = refreshedToken.data.userName;
                token.role = refreshedToken.data.roles;

                token.userToken = refreshedToken.data.token;
                token.userTokenExpiration = refreshedToken.data.expiresAt;

                token.userRefreshToken = refreshedToken.data.refreshToken;
                token.userRefreshExpirationDate = refreshedToken.data.refreshTokenExpiration;

                token.error = false;
                console.log("Token Refreshed Successifuly",token)
                return token;
            } catch (error) {
                token.error = true;
                token.tokenErrorMessage = "RefreshAccessTokenError";
                console.log("Error in Refresh Token Calling ",error)
                return token;
            }

        },
        session({ session, token }) {
            if (token) {
                session.id = token.id;
                session.tokenError = token.error;
                session.userRole = token.role;
                session.tokenErrorMessage = token.tokenErrorMessage;
            }
            console.log("User Session",session)
            return session;
        },
    },

}
