import { refreshTokenAction } from "@/actions/auth/auth.actions";
import axios from "axios"
import { NextAuthOptions } from "next-auth"
import Credentials from "next-auth/providers/credentials";

function transformDate(dateStr: string) {
    return new Date(dateStr).getTime();
}

export const nextAuthConfig: NextAuthOptions = {
    session: {
        strategy: "jwt"
    },
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
                    if (!res.data) return null;
                    return res.data;
                } catch (error) {
                    if (axios.isAxiosError(error)) {
                        const data = error.response?.data;
                        console.log('errordata', data);
                        throw new Error(data?.error?.description ?? "Login failed");
                    }
                    return null;
                }
            }
        }),
    ],
    pages: {
        signIn: '/login',
        signOut: '/login',
    },
    callbacks: {
        async jwt({ token, user }) {
            // 1) First login
            console.log("user1", user)
            if (user) {
                token.id = user.id;
                token.email = user.email;
                token.message = user.message;
                token.userName = user.userName;
                token.role = user.roles;
                token.profilePictureUrl = user.profilePictureUrl;
                token.userToken = user.token; // access token
                token.userTokenExpiration = user.expiresAt; // access exp (ISO string)
                token.userRefreshToken = user.refreshToken;
                token.userRefreshExpirationDate = user.refreshTokenExpiration; // refresh exp (ISO string)
                token.error = false;
                token.tokenErrorMessage = undefined;
                console.log("First Login User", token);
                return token;
            }
            if (!token.userRefreshExpirationDate || !token.userTokenExpiration) {
                token.error = true;
                token.tokenErrorMessage = "MissingTokenData";
                return token;
            }
            const timeNow = Date.now();
            if (timeNow >= transformDate(token.userRefreshExpirationDate)) {
                token.error = true;
                token.tokenErrorMessage = "RefreshTokenExpired";
                return token;
            }
            const buffer = 60_000; // 1 minute early refresh

            if (timeNow < transformDate(token.userTokenExpiration) - buffer) {
                console.log("Token still valid before 1 min", token)
                return token; // still valid
            }


            try {
                const refreshedToken = await refreshTokenAction(token.userRefreshToken as string);
                token.email = refreshedToken.email;
                token.id = refreshedToken.id;
                token.message = refreshedToken.message;
                token.userName = refreshedToken.userName;
                // ✅ same corrected names
                token.role = refreshedToken.roles;
                token.profilePictureUrl = refreshedToken.profilePictureUrl;

                token.userToken = refreshedToken.token;
                token.userTokenExpiration = refreshedToken.expiresAt;

                token.userRefreshToken = refreshedToken.refreshToken;
                token.userRefreshExpirationDate =
                    refreshedToken.refreshTokenExpiration;
                token.error = false;
                token.tokenErrorMessage = undefined;
                console.log("Token refreshed successifuly")
                return token;
            } catch (error) {
                token.error = true;
                token.tokenErrorMessage = "RefreshAccessTokenError";
                return token;
            }
        },
        session({ session, token }) {
            if (token) {
                console.log("Token in Session", token)
                session.id = token.id;
                session.tokenError = token.error;
                session.userRole = token.role;
                session.tokenErrorMessage = token.tokenErrorMessage;
            }
            console.log("User Session", session)
            return session;
        },
    },

}
