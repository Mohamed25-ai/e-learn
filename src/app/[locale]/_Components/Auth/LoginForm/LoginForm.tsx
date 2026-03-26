'use client'
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { BUTTON_STYLE, INPUT_STYLE, LABEL_STYLE } from "@/utils/utils";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginFormType, loginSchema } from "./LoginFormSchema";
import toast from "react-hot-toast";
import { getUserToken } from "@/utils/getAuthenticatedUserToken/getAuthenticatedUserToken";
import { Link } from "@/i18n/navigation";
import { useLocale, useTranslations } from "next-intl";
import { ClipLoader } from "react-spinners";
export default function LoginForm() {
    const [isPasswordShown, setisPasswordShown] = useState(false);
    const t = useTranslations("Auth");
    const locale = useLocale();
    const loginForm = useForm({
        defaultValues: {
            Email: "",
            Password: "",
        },
        resolver: zodResolver(loginSchema(t)),
        mode: "onChange"
    });
    const { control, formState, handleSubmit } = loginForm;

    async function handleLoginForm(data: LoginFormType) {

        const res = await signIn("credentials", {
            Email: data?.Email.trim(),
            Password: data?.Password.trim(),
            redirect: false,
        })
        console.log('my login res', res);
        if (res?.ok) {
            window.location.href = `/${locale}/`;
            setTimeout(() => toast.success('Welcome'), 1000)
            return;
        }
    }


    return (
        <Form {...loginForm}>
            <form onSubmit={handleSubmit(handleLoginForm)} className="w-full mx-auto space-y-6">

                {/* Email */}
                <FormField
                    control={control}
                    name="Email"
                    render={({ field }) => (
                        <FormItem className="space-y-2">
                            <FormLabel className={LABEL_STYLE}>{t("fields.email")}</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder={t("placeholders.email")}
                                    className={INPUT_STYLE + " w-full"}
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage className="w-full text-xs" style={{ color: "var(--error)" }} />
                        </FormItem>
                    )}
                />

                {/* Password */}
                <FormField
                    control={control}
                    name="Password"
                    render={({ field }) => (
                        <FormItem className="space-y-2">
                            <FormLabel htmlFor="password" className={LABEL_STYLE}>
                                {t("fields.password")}
                            </FormLabel>
                            <FormControl>
                                <div className="relative w-full">
                                    <Input
                                        id="password"
                                        type={isPasswordShown ? "text" : "password"}
                                        placeholder={t("placeholders.password")}
                                        className={`${INPUT_STYLE} w-full pe-12 ${formState.errors.Password
                                                ? "border-(--error) focus-visible:border-(--error) focus-visible:ring-[color-mix(in_srgb,var(--error)_20%,transparent)]"
                                                : ""
                                            }`}
                                        {...field}
                                    />
                                    <Button
                                        type="button"
                                        onClick={() => setisPasswordShown((prev) => !prev)}
                                        className={`absolute top-1/2 end-4 -translate-y-1/2 transition-colors
                                        ${formState.errors.Password
                                                ? "text-(--error)"
                                                : "text-(--primary-color) hover:text-(--primary-hover)"
                                            }`}
                                    >
                                        <FontAwesomeIcon icon={isPasswordShown ? faEye : faEyeSlash} />
                                    </Button>
                                </div>
                            </FormControl>
                            <FormMessage className="w-full text-xs" style={{ color: "var(--error)" }} />
                        </FormItem>
                    )}
                />

                {/* Forgot password */}
                <div className="flex justify-end rtl:justify-start">
                    <Link
                        href="/forgot-password"
                        className="text-sm underline underline-offset-4 transition-colors text-(--text-secondary) hover:text-(--primary-color)"
                    >
                        {t("loginPage.forgotPassword")}
                    </Link>
                </div>

                {/* Submit */}
                <div className="flex justify-center pt-2">
                    <Button
                        type="submit"
                        disabled={!formState.isValid || formState.isSubmitting}
                        className={`${BUTTON_STYLE} w-full md:w-3/4 flex items-center justify-center gap-2
                        disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-(--primary-color)`}
                    >
                        {formState.isSubmitting
                            ? <Button><ClipLoader color="white" size={16} />{t("loginPage.submitButton")}</Button>
                            : t("loginPage.submitButton")
                        }
                    </Button>
                </div>

            </form>
        </Form>
    );
}
