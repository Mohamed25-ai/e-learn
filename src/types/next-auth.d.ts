import NEXTAUTH from "next-auth"

declare module "next-auth" {


    interface User {
        id: string
        message: string
        fullName?: string
        userName: string
        email: string,
        profilePictureUrl?: string
        roles: string[] | string
        token: string
        expiresAt: string
        refreshToken: string
        refreshTokenExpiration: string
        error:boolean
        tokenErrorMessage: string
        currentTimeUserLogin?: number
        expiresInStatically?: number,
        isLoggedByGoogle?: boolean
    }
    interface Session {
        id?: string;
        userRole: string[] | string;
        tokenError?: boolean|string;
        tokenErrorMessage?: string | undefined;
        profilePictureUrl?: string
        fullName?: string,
        email?: string,
        image?: string
        isLoggedByGoogle?: boolean
    }


}
declare module "next-auth/jwt" {
    interface JWT {
        id: string
        message: string
        fullName?: string
        userName: string
        email: string,
        profilePictureUrl?: string
        roles: string[] | string
        token: string
        expiresAtFromBackend: string
        refreshToken: string
        refreshTokenExpirationFromBackend: string
        error:  boolean
        tokenErrorMessage?: string
        currentTimeUserLogin?: number
        expiresInStatically: number
        isLoggedByGoogle?: boolean
    }
}