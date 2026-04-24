'use client'
import { forgotPasswordAction } from "@/actions/auth/auth.actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "@/i18n/navigation";
import { BUTTON_STYLE, INPUT_STYLE, LABEL_STYLE } from "@/utils/utils";
import axios from "axios";
import { useTranslations } from "next-intl";
import { useRef } from "react";
import toast from "react-hot-toast";




export default function ForgotPassword() {
    const t = useTranslations("Auth");
    const emailInput = useRef<null | HTMLInputElement>(null);
    const router = useRouter();

    async function handleSendEmail() {
        const emailValue = emailInput.current?.value.trim();
        if (emailValue) {
            const res = await forgotPasswordAction(emailValue);
            if (res?.status===200) {
                toast.success("Success Please,Confirm your Password");
                router.replace({
                    pathname: '/forgot-password',
                    query: { email: emailValue }
                });
                return;
            }
            toast.error(res?.data.error.description)
            return;
        }
        toast.error(t("errors.email.required"))
    }

    return (
        <div className="w-full md:w-3/4 mx-auto px-5 flex flex-col gap-6 md:my-5 animate-in fade-in slide-in-from-bottom-3 duration-300">

            {/* Header */}
            <header className="space-y-1.5">
                <h1 className="text-3xl font-bold text-foreground">
                    {t("forgotPasswordPage.title")}
                </h1>
                <p className="text-sm text-(--text-secondary) leading-relaxed">
                    {t("forgotPasswordPage.subtitle")}
                </p>
            </header>

            {/* Email field */}
            <div className="flex flex-col gap-2">
                <Label className={LABEL_STYLE}>
                    {t("forgotPasswordPage.emailLabel")}
                </Label>
                <Input
                    type="email"
                    ref={emailInput}
                    placeholder={t("forgotPasswordPage.emailPlaceholder")}
                    className={`${INPUT_STYLE} w-full`}
                    autoComplete="email"
                    autoFocus
                />
            </div>

            {/* Submit */}
            <Button
                onClick={handleSendEmail}
                className={`${BUTTON_STYLE} w-full`}
            >
                {t("forgotPasswordPage.submitButton")}
            </Button>

            {/* Divider */}
            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-(--border-color)" />
                </div>
            </div>

            {/* Back to login */}
            <div className="text-center">
                <button
                    type="button"
                    onClick={() => router.replace("/login")}
                    className="text-sm cursor-pointer text-(--text-secondary) hover:text-(--primary-color) transition-colors duration-150"
                >
                    {t("forgotPasswordPage.rememberPassword")}{" "}
                    <span className="font-semibold text-(--primary-color)">
                        {t("forgotPasswordPage.backToLogin")}
                    </span>
                </button>
            </div>

        </div>
    );
}
