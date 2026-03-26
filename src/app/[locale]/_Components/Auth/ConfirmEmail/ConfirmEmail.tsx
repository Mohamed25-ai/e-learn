'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useRouter } from '@/i18n/navigation'
import { Progress } from "@/components/ui/progress"
import { confirmEmailAction, forgotPasswordAction } from '@/actions/auth/auth.actions'
import { BUTTON_STYLE, INPUT_STYLE, LABEL_STYLE } from '@/utils/utils'
import { ChangeEvent, useRef, useState } from 'react'
import toast from 'react-hot-toast';
import { useTranslations } from 'next-intl'
import { OtpInputGroup } from '../Otpinputgroup/Otpinputgroup'
const LENGTH = 6;
export default function ConfirmEmail({ email }: { email: string }) {
    const t = useTranslations("Auth");
    const [otp, setOtp] = useState<string[]>(Array(LENGTH).fill(''));
    const router = useRouter();
    const realLeangth = otp.filter((code) => code).length;

    async function handleResendCode() {
        if (email) {
            const res = await forgotPasswordAction(email.trim());
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

    async function handleConfirmation() {
        const copyCode = [...otp];
        const payload = copyCode.toString().split(",").join('').trim();
        if (payload) {
            const res = await confirmEmailAction(email, payload);
            if (res.succeeded) {
                toast.success(res.message);
                router.replace('/login');
                return;
            }
            toast.error(res.data.message)
        } else {
            toast.error(t("confirmEmailPage.codeLabel"))
        }
    }

    return (
        <div className="animate-in fade-in slide-in-from-bottom-3 duration-300">

            {/* Header */}
            <header className="md:w-1/2 px-5 mx-auto mb-6 space-y-1.5">
                <h1 className="text-3xl font-bold text-foreground">
                    {t("confirmEmailPage.title")}
                </h1>
                <p className="text-sm text-(--text-secondary) leading-relaxed">
                    {t("verifyCodePage.subtitle")}
                    <br />
                    <span className="font-semibold text-foreground">{email}</span>
                </p>
            </header>

            <div className="px-5 flex flex-col md:w-1/2 mx-auto gap-6">

                {/* OTP input */}
                <OtpInputGroup
                    value={otp}
                    onChange={setOtp}
                    label={t("verifyCodePage.codeLabel")}
                />

                {/* Submit */}
                <Button
                    onClick={handleConfirmation}
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
