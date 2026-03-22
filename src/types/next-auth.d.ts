import NEXTAUTH from "next-auth"

declare module "next-auth" {

    interface Data {
        email: string,
        id: string
        userName: string
        roles: string[]
        token: string
        expiresAt: string
        refreshToken: string
        refreshTokenExpiration: string
        error: string
        tokenErrorMessage: string

    }
    interface User {
        succeeded: boolean
        message: string
        data: Data
    }
    interface Session {
        id: User.Data.id
        tokenError: User.Data.error
        tokenErrorMessage: User.Data.tokenErrorMessage
        userRole: User.Data.roles
    }

}
declare module "next-auth/jwt" {
    interface JWT {
        email?: string;
        id?: string;
        message?: string;
        isSucceeded?: boolean;
        userName?: string;
        role?: string[];

        userToken?: string;                 
        userTokenExpiration?: string;       

        userRefreshToken?: string;
        userRefreshExpirationDate?: string;  

        error?: boolean;
        tokenErrorMessage?: string;
    }
}