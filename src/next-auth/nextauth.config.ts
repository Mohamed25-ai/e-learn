import { refreshTokenAction } from "@/actions/auth/auth.actions";
import { signInWithGoogle } from "@/services/auth/auth.service";
import axios from "axios"
import { NextAuthOptions } from "next-auth"
import Credentials from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

function transformDate(dateStr: string) {
    return new Date(dateStr).getTime();
}

export const nextAuthConfig: NextAuthOptions = {
    session: {
        strategy: "jwt",
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
        async jwt({ token, user, account, trigger }) {
            if (user) {
                if (account?.provider === "google") {
                    try {
                        const data = await signInWithGoogle(account.id_token || "");
                        // console.log("Back google data", data)
                        // console.log("Back googgle user", user)
                        token.id = data.data.id;
                        token.email = data.data.email;
                        token.message = data.data.message;
                        token.fullName = data.data.fullName;
                        token.userName = data.data.userName;
                        token.roles = data.data.roles;
                        token.profilePictureUrl = data.data.profilePictureUrl;
                        token.token = data.data.token;
                        token.expiresAtFromBackend = data.data.expiresAt;
                        token.refreshToken = data.data.refreshToken;
                        token.refreshTokenExpirationFromBackend = data.data.refreshTokenExpiration;
                        token.currentTimeUserLogin = Date.now();
                        token.expiresInStatically = Date.now() + 15 * 60 * 1000;
                        token.error = false;
                        token.tokenErrorMessage = undefined;
                        token.isLoggedByGoogle = true;
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
                token.fullName = user.fullName;
                token.userName = user.userName;
                token.roles = user.roles;
                token.profilePictureUrl = user.profilePictureUrl;
                token.token = user.token;
                token.expiresAtFromBackend = user.expiresAt;
                token.refreshToken = user.refreshToken;
                token.refreshTokenExpirationFromBackend = user.refreshTokenExpiration;
                token.currentTimeUserLogin = Date.now();
                token.expiresInStatically = Date.now() + 15 * 60 * 1000;
                token.error = false;
                token.tokenErrorMessage = undefined;
                console.log("First Login User", token);
                return token;
            }
             if (trigger == "update") {
                try {
                    const refreshedToken = await refreshTokenAction(token.refreshToken as string);
                    console.log("Token Refreshed Successifuly Triggered", refreshedToken.data)
                    if (!refreshedToken.data) {
                        token.error = true;
                        token.tokenErrorMessage = "RefreshAccessTokenError";
                        return token;
                    }
                    token.id = refreshedToken.data.id;
                    token.email = refreshedToken.data.email;
                    token.message = refreshedToken.data.message;
                    token.fullName = refreshedToken.data.fullName;
                    token.userName = refreshedToken.data.userName;
                    token.roles = refreshedToken.data.roles;
                    token.profilePictureUrl = refreshedToken.data.profilePictureUrl;
                    token.token = refreshedToken.data.token;
                    token.expiresAtFromBackend = refreshedToken.data.expiresAt;
                    token.refreshToken = refreshedToken.data.refreshToken;
                    token.refreshTokenExpirationFromBackend = refreshedToken.data.refreshTokenExpiration;
                    token.currentTimeUserLogin = Date.now();
                    token.expiresInStatically = Date.now() + 15 * 60 * 1000;
                    token.error = false;
                    token.tokenErrorMessage = undefined;
                    if (token.isLoggedByGoogle) {
                        token.isLoggedByGoogle = true;
                    }
                    return token;
                } catch (error) {
                    token.error = true;
                    token.tokenErrorMessage = "RefreshAccessTokenError";
                    return token;
                }
            }
            if (!token.token) {
                token.error = true;
                token.tokenErrorMessage = "MissingTokenData";
                return token;
            }
            if (!token.expiresInStatically) {
                return token;
            }
            if (token.refreshTokenExpirationFromBackend) {
                if (Date.now() >= transformDate(token.refreshTokenExpirationFromBackend)) {
                    token.error = true;
                    token.tokenErrorMessage = "RefreshTokenExpired";
                    return token;
                }
            }
            const buffer = 60_000;
            if (token.currentTimeUserLogin) {
                if (Date.now() < token.expiresInStatically - buffer) {
                    console.log("Token still valid before 0 min", token)
                    return token;
                }
            }
           
            try {
                const refreshedToken = await refreshTokenAction(token.refreshToken as string);
                console.log("Token Refreshed Successifuly", refreshedToken)
                console.log("Token Refreshed Successifuly Data", refreshedToken.data)
                if (!refreshedToken.data) {
                    token.error = true;
                    token.tokenErrorMessage = "RefreshAccessTokenError";
                    return token;
                }
                token.id = refreshedToken.data.id;
                token.email = refreshedToken.data.email;
                token.message = refreshedToken.data.message;
                token.fullName = refreshedToken.data.fullName;
                token.userName = refreshedToken.data.userName;
                token.roles = refreshedToken.data.roles;
                token.profilePictureUrl = refreshedToken.data.profilePictureUrl;
                token.token = refreshedToken.data.token;
                token.expiresAtFromBackend = refreshedToken.data.expiresAt;
                token.refreshToken = refreshedToken.data.refreshToken;
                token.refreshTokenExpirationFromBackend = refreshedToken.data.refreshTokenExpiration;
                token.currentTimeUserLogin = Date.now();
                token.expiresInStatically = Date.now() + 15 * 60 * 1000;
                token.error = false;
                token.tokenErrorMessage = undefined;
                if (token.isLoggedByGoogle) {
                    token.isLoggedByGoogle = true;
                }
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
                session.user = {
                    name: (token.fullName as string),
                    email: (token.email as string),
                    image: (token.profilePictureUrl as string),
                };
                session.id = token.id;
                session.tokenError = token.error
                session.userRole = token.roles;
                session.tokenErrorMessage = token.tokenErrorMessage;
                session.fullName = token.fullName!;
                session.email = token.email;
                session.profilePictureUrl = token.profilePictureUrl
                if (token.isLoggedByGoogle) {
                    session.isLoggedByGoogle = true;
                }
            }
            console.log("User Session", session)
            return session;
        },
    },

}
