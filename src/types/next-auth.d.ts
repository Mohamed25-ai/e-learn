import NEXTAUTH from "next-auth"

declare module "next-auth" {

    interface Data {
        id: string
        email: string,
        userName: string
        fullName: string
        roles: string[] | string
        token: string
        expiresAt: string
        refreshToken: string
        refreshTokenExpiration: string
        error: string | boolean
        tokenErrorMessage: string
        profilePictureUrl?: string
    }
    interface User {
        message: string
        id: string
        email: string,
        userName: string
        roles: string[] | string
        token: string
        expiresAt: string
        refreshToken: string
        refreshTokenExpiration: string
        error: string | boolean
        tokenErrorMessage: string
        profilePictureUrl?: string
        fullName?: string
        currentTime?: number
        expiresIn?: number
    }
    interface Session {
        id?: string;
        userRole?: string[] | string;
        tokenError?: boolean;
        tokenErrorMessage?: string | undefined;
        profilePictureUrl?: string
        fullName?: string,
        email?: string,
        image?: string
    }


}
declare module "next-auth/jwt" {
    interface JWT {
        id?: string;
        email?: string;
        message?: string;
        isSucceeded?: boolean;
        fullName?: string
        userName?: string;
        role?: string[] | string;

        userToken?: string;
        userTokenExpiration?: string;

        userRefreshToken?: string;
        userRefreshExpirationDate?: string;

        error?: boolean | boolean;
        tokenErrorMessage?: string;
        profilePictureUrl?: string
        currentTime?: number
        expiresIn?: number
    }
}