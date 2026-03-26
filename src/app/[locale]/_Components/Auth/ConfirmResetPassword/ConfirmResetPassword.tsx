// 'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useRouter } from '@/i18n/navigation'
import { BUTTON_STYLE, INPUT_STYLE, LABEL_STYLE } from '@/utils/utils'
import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast';
import { Progress } from "@/components/ui/progress"
import { useTranslations } from 'next-intl'
import { confirmResetPasswordAction, forgotPasswordAction } from '@/actions/auth/auth.actions'
import { OtpInputGroup } from '../Otpinputgroup/Otpinputgroup'
const LENGTH = 6;
const RESEND_SECONDS = 30;

export default function ConfirmResetPassword({ email }: { email: string }) {
    const t = useTranslations("Auth");
    const [otp, setOtp] = useState<string[]>(Array(LENGTH).fill(''));
    const router = useRouter();
    const realLeangth = otp.filter((code) => code).length;

    async function handleResendCode() {
        if (email) {
            const res = await forgotPasswordAction(email);
            console.log("email", res.data);
            if (res.succeeded) {
                toast.success(res.message);
                setOtp(Array(LENGTH).fill(''));
                return;
            }
            toast.error(res.data.message);
            return;
        }
        toast.error(t("errors.email.required"))
    }

    async function handleConfirmResetPassword() {
        const copyCode = [...otp];
        const payload = copyCode.toString().split(",").join('').trim();
        const res = await confirmResetPasswordAction(email, payload);
        if (res.succeeded) {
            toast.success(res.message);
            router.replace({
                pathname: '/forgot-password',
                query: { email: email, reset: true },
            });
            return;
        }
        toast.error(res.data.message)
    }

    return (
        <div className="animate-in fade-in slide-in-from-bottom-3 duration-300">

            {/* Header */}
            <header className="md:w-3/4 px-5 mx-auto mb-6 space-y-1.5">
                <h1 className="text-3xl font-bold text-foreground">
                    {t("verifyCodePage.title")}
                </h1>
                <p className="text-sm text-(--text-secondary) leading-relaxed">
                    {t("verifyCodePage.subtitle")}
                    <br />
                    <span className="font-semibold text-foreground">{email}</span>
                </p>
            </header>

            <div className="px-5 flex flex-col md:w-3/4 mx-auto gap-6">

                {/* OTP input */}
                <OtpInputGroup
                    value={otp}
                    onChange={setOtp}
                    label={t("verifyCodePage.codeLabel")}
                />

                {/* Submit */}
                <Button
                    onClick={handleConfirmResetPassword}
                    disabled={otp.join("").length < LENGTH}
                    className={`${BUTTON_STYLE} w-full disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                    {t("verifyCodePage.submitButton")}
                </Button>

                {/* Resend */}
                <div className="text-center">
                    <p className="text-sm text-(--text-secondary)">
                        {t("verifyCodePage.didNotReceiveCode")}{" "}
                        <button
                            type="button"
                            onClick={handleResendCode}
                            className="font-semibold text-(--primary-color) hover:opacity-80 transition-opacity duration-150 cursor-pointer"
                        >
                            {t("verifyCodePage.resendCode")}
                        </button>
                    </p>
                </div>

            </div>
        </div>
    );
}


