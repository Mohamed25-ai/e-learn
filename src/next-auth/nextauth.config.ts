import { refreshTokenAction } from "@/actions/auth/auth.actions";
import { signInWithGoogle } from "@/services/auth/auth.service";
import axios from "axios"
import { NextAuthOptions } from "next-auth"
import Credentials from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

function transformDate(dateStr: string) {
    return new Date(dateStr).getTime();
}

console.log("object", transformDate("2026-08-06T13:48:04.921Z"), Date.now())
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
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
        })
    ],
    pages: {
        signIn: '/login',
        signOut: '/login',
    },
    callbacks: {
        async jwt({ token, user, account }) {
            // 1) First login
            // console.log("user1", user)
            // // if(token.){
            // console.log("================================");
            // console.log("JWT CALLBACK");
            // console.log("USER:", user);
            // console.log("TOKEN:", token);
            // console.log("ACCOUNT:", account);
            // // }
            if (user) {
                if (account?.provider === "google") {
                    try {
                        const data = await signInWithGoogle(account.id_token || "");
                        console.log("Back google data", data)
                        console.log("Back googgle user", user)
                        token.id = data.data.id;
                        token.email = data.data.email;
                        token.message = data.data.message;
                        token.fullName = data.data.fullName;
                        token.userName = data.data.userName;
                        token.role = data.data.roles;
                        token.profilePictureUrl = data.data.profilePictureUrl;
                        token.userToken = data.data.token;
                        token.userTokenExpiration = data.data.expiresAt;
                        token.userRefreshToken = data.data.refreshToken;
                        token.userRefreshExpirationDate = data.data.refreshTokenExpiration;
                        token.currentTime = Date.now();
                        token.expiresIn = Date.now() + 15 * 60 * 1000;
                        token.error = false;
                        token.tokenErrorMessage = undefined;
                        return token; // ← early return, skip the user.* mapping below
                    } catch {
                        token.error = true;
                        token.tokenErrorMessage = "GoogleSignInError";
                        return token;
                    }
                }
                token.id = user.id;
                token.email = user.email;
                token.message = user.message;
                token.userName = user.userName;
                token.fullName = user.fullName;
                token.role = user.roles;
                token.profilePictureUrl = user.profilePictureUrl;
                token.userToken = user.token; // access token
                token.userTokenExpiration = user.expiresAt; // access exp (ISO string)
                token.userRefreshToken = user.refreshToken;
                token.userRefreshExpirationDate = user.refreshTokenExpiration; // refresh exp (ISO string)
                token.currentTime = Date.now();
                token.expiresIn = Date.now() + 15 * 60 * 1000;
                token.error = false;
                token.tokenErrorMessage = undefined;
                console.log("First Login User", token);
                return token;
            }

            // if (!token.userToken || !token.userTokenExpiration) {
            //     token.error = true;
            //     token.tokenErrorMessage = "MissingTokenData";
            //     return token;
            // }
            // const timeNow = Date.now();
            // if (token.userRefreshExpirationDate) {
            //     if (timeNow >= transformDate(token.userRefreshExpirationDate)) {
            //         token.error = true;
            //         token.tokenErrorMessage = "RefreshTokenExpired";
            //         return token;
            //     }
            // }
            // // ✅ If expiration is missing, treat token as still valid (don't fall into refresh)
            // if (!token.userTokenExpiration) {
            //     return token;
            // }
            // const buffer = 60_000; // 1 minute early refresh
            // if (token.userTokenExpiration) {
            //     if (timeNow < transformDate(token.userTokenExpiration) - buffer) {
            //         console.log("Token still valid before 1 min", token)
            //         return token; // still valid
            //     }
            // }

            if (!token.userToken || !token.userTokenExpiration) {
                token.error = true;
                token.tokenErrorMessage = "MissingTokenData";
                return token;
            }
            if (!token.expiresIn) {
                return token;
            }
            if (token.userRefreshExpirationDate) {
                if (Date.now() >= transformDate(token.userRefreshExpirationDate)) {
                    token.error = true;
                    token.tokenErrorMessage = "RefreshTokenExpired";
                    return token;
                }
            }
            const buffer = 60_000;
            if (token.currentTime) {
                if (Date.now() < token.expiresIn - buffer) {
                    console.log("Token still valid before 0 min", token)
                    return token
                }
            }
            try {
                const refreshedToken = await refreshTokenAction(token.userRefreshToken as string);
                token.email = refreshedToken.email;
                token.id = refreshedToken.id;
                token.message = refreshedToken.message;
                token.userName = refreshedToken.userName;
                token.fullName = refreshedToken.name;
                // ✅ same corrected names
                token.role = refreshedToken.roles;
                token.profilePictureUrl = refreshedToken.profilePictureUrl;

                token.userToken = refreshedToken.token;
                token.userTokenExpiration = refreshedToken.expiresAt;
                token.currentTime = Date.now();
                token.expiresIn = Date.now() + 15 * 60 * 1000;
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
        session({ session, token, user }) {
            if (token) {
                console.log("Token in Session", token)
                session.id = token.id;
                session.tokenError = token.error;
                session.userRole = token.role;
                session.tokenErrorMessage = token.tokenErrorMessage;
                session.user = {
                    name: (token.fullName as string),
                    email: (token.email as string),
                    image: (token.profilePictureUrl as string),
                };
                session.fullName = token.fullName!;
                session.email = token.email;
                session.profilePictureUrl = token.profilePictureUrl
            
            }
            console.log("User Session", session)
            return session;
        },
    },

}
