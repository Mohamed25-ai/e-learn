'use server'

import { confirmEmail, confirmResetPassword, refreshToken, register, resetPassword, sendResetPassword, signInWithGoogle } from "@/services/auth/auth.service"

export async function loginAction() {

};

export async function registerAction(formData: FormData) {
    return await register(formData);
};

export async function forgotPasswordAction(email: string) {
    return await sendResetPassword(email);
};

export async function resetPasswordAction(formdata: FormData) {
    return await resetPassword(formdata);
};

export async function confirmResetPasswordAction(email: string, code: string) {
    return await confirmResetPassword(email, code);
};

export async function confirmEmailAction(email: string, code: string) {
    return await confirmEmail(email, code);
};

export async function refreshTokenAction(refToken: string) {
    return await refreshToken(refToken);
};
export async function signInWithGoogleAction(idToken: string) {
    return await signInWithGoogle(idToken);
};
