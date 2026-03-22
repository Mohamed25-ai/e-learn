'use client'
import { forgotPasswordAction } from "@/actions/auth/auth.actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "@/i18n/navigation";
import { BUTTON_STYLE, INPUT_STYLE, LABEL_STYLE } from "@/utils/utils";
import axios from "axios";
import { useTranslations } from "next-intl";
import { HtmlHTMLAttributes, useRef } from "react";
import toast from "react-hot-toast";




export default function ForgotPassword() {
    const emailInput = useRef<null | HTMLInputElement>(null);
    const t=useTranslations("Auth");
    const router = useRouter();
    async function handleSendEmail() {
        const emailValue = emailInput.current?.value;
        if (emailValue) {
            const res = await forgotPasswordAction(emailValue);
            console.log("emailValue", res.data);
            if (res.succeeded) {
                toast.success(res.message);
                router.replace({
                    pathname: '/forgot-password',
                    query: { email: emailValue }
                })
                return;
            }
            toast.error(res.data.message)
            return;
        }
        toast.error("Please,Enter your Email")
    }
    return (
        <>
            <header className="px-5 mx-auto md:w-3/4 my-5">
                <h1 className="text-3xl font-bold text-foreground mb-2">{t("forgotPasswordPage.title")}</h1>
                <p className="text-(--text-secondry) mb-8">
                    {t("forgotPasswordPage.subtitle")}
                </p>
            </header>
            <div className="px-5 flex flex-col  items-center">

                <Label className={LABEL_STYLE + " flex w-full md:w-3/4 flex-col items-start  gap-5"}>{t("forgotPasswordPage.emailLabel")}
                    <Input type="email" ref={emailInput} placeholder={t("forgotPasswordPage.emailPlaceholder")} className={INPUT_STYLE + " "} />
                </Label>
                <Button onClick={handleSendEmail} className={BUTTON_STYLE + " w-full md:w-3/4 "}>{t("forgotPasswordPage.submitButton")}</Button>
                <div className="text-center">
                    <button
                        type="button"
                        onClick={() => { router.replace('/login') }}
                        className="text-sm text-(--text-secondry) cursor-pointer hover:text-(--text-hover) transition-colors"
                    >
                        {t("forgotPasswordPage.rememberPassword")} <span className="font-semibold">{t("forgotPasswordPage.backToLogin")}</span>
                    </button>
                </div>
            </div>
        </>
    )
}
