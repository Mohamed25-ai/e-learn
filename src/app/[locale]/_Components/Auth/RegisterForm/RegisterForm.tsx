'use client'
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { RegisterFormValues, registerSchema } from "./RegisterFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { BUTTON_STYLE, INPUT_STYLE, LABEL_STYLE } from "@/utils/utils";
import toast from "react-hot-toast";
import { Label } from "@/components/ui/label";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faEye, faEyeSlash, faImage } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { Link, useRouter } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { registerAction } from "@/actions/auth/auth.actions";
import { ClipLoader } from "react-spinners";



export default function RegisterForm() {
    const t = useTranslations("Auth");
    const router = useRouter()
    const [isPasswordShown, setisPasswordShown] = useState(false);
    const [isConfirmPasswordShown, setisConfirmPasswordShown] = useState(false);
    const registerForm = useForm<RegisterFormValues>({
        resolver: zodResolver(registerSchema(t)),
        defaultValues: {
            FullName: "",
            UserName: "",
            Email: "",
            Password: "",
            ConfirmPassword: "",
            ProfilePicture: null,
        },
        mode: 'onChange'
    })
    const { control, handleSubmit, formState } = registerForm;
    async function registerFormSubmit(data: RegisterFormValues) {
        const formData = new FormData();
        formData.append("FullName", data.FullName.trim());
        formData.append("UserName", data.UserName.trim());
        formData.append("Email", data.Email.trim());
        formData.append("Password", data.Password.trim());
        formData.append("ConfirmPassword", data.ConfirmPassword.trim());
        if (data.ProfilePicture) {
            formData.append("ProfilePicture", data.ProfilePicture);
        }
        const res =await registerAction(formData);
        if (res?.status===200) {
            toast.success("Success,Please Confirm Your account");
            router.replace(`/confirmemail/${encodeURIComponent(data.Email)}`)
            console.log('resres', res)
        }
        else {
            toast.error(res.data.error);
        }
    }

    return (
        <Form {...registerForm}>
            <form onSubmit={handleSubmit(registerFormSubmit)} className="w-full mx-auto space-y-5">

                {/* Full Name */}
                <FormField
                    control={control}
                    name="FullName"
                    render={({ field }) => (
                        <FormItem className="space-y-2">
                            <FormLabel className={LABEL_STYLE}>{t("fields.fullName")}</FormLabel>
                            <FormControl>
                                <Input
                                    className={`${INPUT_STYLE} w-full`}
                                    placeholder={t("placeholders.fullName")}
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage className="w-full text-xs" style={{ color: "var(--error)" }} />
                        </FormItem>
                    )}
                />

                {/* Username */}
                <FormField
                    control={control}
                    name="UserName"
                    render={({ field }) => (
                        <FormItem className="space-y-2">
                            <FormLabel className={LABEL_STYLE}>{t("fields.userName")}</FormLabel>
                            <FormControl>
                                <Input
                                    className={`${INPUT_STYLE} w-full`}
                                    placeholder={t("placeholders.userName")}
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage className="w-full text-xs" style={{ color: "var(--error)" }} />
                        </FormItem>
                    )}
                />

                {/* Email */}
                <FormField
                    control={control}
                    name="Email"
                    render={({ field }) => (
                        <FormItem className="space-y-2">
                            <FormLabel className={LABEL_STYLE}>{t("fields.email")}</FormLabel>
                            <FormControl>
                                <Input
                                    type="email"
                                    className={`${INPUT_STYLE} w-full`}
                                    placeholder={t("placeholders.email")}
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
                            <FormLabel htmlFor="password" className={LABEL_STYLE}>{t("fields.password")}</FormLabel>
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
                                    <button
                                        type="button"
                                        onClick={() => setisPasswordShown((p) => !p)}
                                        className={`absolute top-1/2 end-4 -translate-y-1/2 transition-colors
                                        ${formState.errors.Password ? "text-(--error)" : "text-(--primary-color) hover:text-(--primary-hover)"}`}
                                    >
                                        <FontAwesomeIcon icon={isPasswordShown ? faEye : faEyeSlash} />
                                    </button>
                                </div>
                            </FormControl>
                            <FormMessage className="w-full text-xs" style={{ color: "var(--error)" }} />
                        </FormItem>
                    )}
                />

                {/* Confirm Password */}
                <FormField
                    control={control}
                    name="ConfirmPassword"
                    render={({ field }) => (
                        <FormItem className="space-y-2">
                            <FormLabel htmlFor="confirmPassword" className={LABEL_STYLE}>{t("fields.confirmPassword")}</FormLabel>
                            <FormControl>
                                <div className="relative w-full">
                                    <Input
                                        id="confirmPassword"
                                        type={isConfirmPasswordShown ? "text" : "password"}
                                        placeholder={t("placeholders.confirmPassword")}
                                        className={`${INPUT_STYLE} w-full pe-12 ${formState.errors.ConfirmPassword
                                                ? "border-(--error) focus-visible:border-(--error) focus-visible:ring-[color-mix(in_srgb,var(--error)_20%,transparent)]"
                                                : ""
                                            }`}
                                        {...field}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setisConfirmPasswordShown((p) => !p)}
                                        className={`absolute top-1/2 end-4 -translate-y-1/2 transition-colors
                                        ${formState.errors.ConfirmPassword ? "text-(--error)" : "text-(--primary-color) hover:text-(--primary-hover)"}`}
                                    >
                                        <FontAwesomeIcon icon={isConfirmPasswordShown ? faEye : faEyeSlash} />
                                    </button>
                                </div>
                            </FormControl>
                            <FormMessage className="w-full text-xs" style={{ color: "var(--error)" }} />
                        </FormItem>
                    )}
                />

                {/* Profile Picture */}
                <FormField
                    control={control}
                    name="ProfilePicture"
                    render={({ field }) => (
                        <FormItem className="space-y-2">
                            <FormLabel className={LABEL_STYLE}>{t("fields.profilePicture")}</FormLabel>
                            <FormControl>
                                <label
                                    className={`flex items-center gap-3 w-full rounded-xl border-2 border-dashed px-4 py-3 cursor-pointer transition-all duration-200
                                    ${field.value
                                            ? "border-(--primary-color) bg-(--primary-light)"
                                            : "border-(--primary-light) bg-(--input-background) hover:border-(--primary-color)"
                                        }`}
                                >
                                    {/* Icon */}
                                    <span
                                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
                                        style={{ background: "color-mix(in srgb, var(--primary-color) 12%, transparent)" }}
                                    >
                                        <FontAwesomeIcon
                                            icon={field.value ? faCheck : faImage}
                                            className="text-sm"
                                            style={{ color: "var(--primary-color)" }}
                                        />
                                    </span>

                                    {/* Text */}
                                    <div className="flex flex-col min-w-0">
                                        <span className="text-sm font-medium truncate text-foreground">
                                            {field.value
                                                ? (field.value as File).name
                                                : t("placeholders.profilePicture")
                                            }
                                        </span>
                                        {!field.value && (
                                            <span className="text-xs text-(--text-muted)">PNG, JPG up to 5MB</span>
                                        )}
                                    </div>

                                    <Input
                                        type="file"
                                        className="hidden"
                                        accept="image/*"
                                        onChange={(e) => field.onChange(e.target.files?.[0] ?? null)}
                                    />
                                </label>
                            </FormControl>
                            <FormMessage className="w-full text-xs" style={{ color: "var(--error)" }} />
                        </FormItem>
                    )}
                />

                {/* Submit */}
                <div className="flex justify-center pt-2">
                    <Button
                        type="submit"
                        disabled={!formState.isValid || formState.isSubmitting}
                        className={`${BUTTON_STYLE} w-full md:w-3/4 flex items-center justify-center gap-2
                        disabled:opacity-50 disabled:cursor-not-allowed`}
                    >
                        {formState.isSubmitting
                            ? <><ClipLoader color="white" size={16} /> {t("registerPage.submitButton")}</>
                            : t("registerPage.submitButton")
                        }
                    </Button>
                </div>

            </form>
        </Form>
    );
}
