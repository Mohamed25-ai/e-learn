
"use client";

import { useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { BUTTON_STYLE, INPUT_STYLE, LABEL_STYLE } from "@/utils/utils";
import { PasswordToggle } from "../Passwordtoggle/Passwordtoggle";
import toast from "react-hot-toast";
import { useRouter } from "@/i18n/navigation";
import { resetPasswordAction } from "@/actions/auth/auth.actions";
import { FieldState, ResetPasswordProps } from "./resetpassword.types";




const EMPTY_FIELD: FieldState = { error: false, message: "" };
const PASSWORD_REGEX =
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{8,64}$/;
export function ResetPassword({ email }: ResetPasswordProps) {
    const router = useRouter();
    const t = useTranslations("Auth");

    const passwordRef = useRef<HTMLInputElement>(null);
    const confirmPasswordRef = useRef<HTMLInputElement>(null);

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [passwordField, setPasswordField] = useState<FieldState>(EMPTY_FIELD);
    const [confirmField, setConfirmField] = useState<FieldState>(EMPTY_FIELD);

    // ── Validation ────────────────────────────────────────────────────────────

    const validatePassword = (value: string): FieldState => {
        if (!value) return { error: true, message: t("errors.password.required") };
        if (!PASSWORD_REGEX.test(value)) return { error: true, message: t("errors.password.minLength", { min: 8 }) };
        if (value.length < 8) return { error: true, message: t("errors.password.minLength", { min: 8 }) };
        return EMPTY_FIELD;
    };

    const validateConfirm = (password: string, confirm: string): FieldState => {
        if (!confirm) return { error: true, message: t("errors.confirmPassword.required") };
        if (password !== confirm) return { error: true, message: t("errors.confirmPassword.mismatch") };
        return EMPTY_FIELD;
    };

    const handlePasswordChange = () => {
        const value = passwordRef.current?.value ?? "";
        setPasswordField(validatePassword(value));
    };

    const handleConfirmChange = () => {
        const password = passwordRef.current?.value ?? "";
        const confirm = confirmPasswordRef.current?.value ?? "";
        setConfirmField(validateConfirm(password, confirm));
    };

    // ── Submit ────────────────────────────────────────────────────────────────

    const handleResetPassword = async () => {
        const formdata = new FormData();
        const password = passwordRef.current?.value.trim() ?? "";
        const confirm = confirmPasswordRef.current?.value.trim() ?? "";

        const pState = validatePassword(password);
        const cState = validateConfirm(password, confirm);

        setPasswordField(pState);
        setConfirmField(cState);

        if (pState.error || cState.error) return;

        formdata.append("Email", email.trim());
        formdata.append("Password", password.trim());
        formdata.append("ConfirmPassword", confirm.trim());
        const res = await resetPasswordAction(formdata);
        console.log(res)
        if (res.succeeded) {
            toast.success(res.message);
            router.replace('/login');
            return;
        }
        toast.error(res.data.message);

    };

    // ── Helpers ───────────────────────────────────────────────────────────────

    const inputClass = (hasError: boolean) =>
        `${INPUT_STYLE} w-full pe-10 text-foreground
        ${hasError
            ? "border-red-500 focus-visible:border-red-500 focus-visible:ring-red-500/20"
            : ""
        }`;

    // ── Render ────────────────────────────────────────────────────────────────

    return (
        <div className="animate-in fade-in slide-in-from-bottom-3 duration-300">

            {/* Header */}
            <header className="md:w-3/4 px-5 mx-auto mb-6 space-y-1.5">
                <h1 className="text-3xl font-bold text-foreground">
                    {t("resetPasswordPage.title")}
                </h1>
                <p className="text-sm text-(--text-secondary) leading-relaxed">
                    {t("resetPasswordPage.subtitle")}
                </p>
            </header>

            <div className="px-5 md:w-3/4 mx-auto flex flex-col gap-5">

                {/* New Password */}
                <div className="flex flex-col gap-2">
                    <Label
                        className={`${LABEL_STYLE} ${passwordField.error ? "text-red-500" : ""}`}
                    >
                        {t("resetPasswordPage.newPasswordLabel")}
                    </Label>
                    <div className="relative">
                        <Input
                            ref={passwordRef}
                            onChange={handlePasswordChange}
                            type={showPassword ? "text" : "password"}
                            placeholder={t("resetPasswordPage.newPasswordPlaceholder")}
                            autoComplete="new-password"
                            className={inputClass(passwordField.error)}
                        />
                        <PasswordToggle
                            shown={showPassword}
                            onToggle={() => setShowPassword((p) => !p)}
                            hasError={passwordField.error}
                        />
                    </div>
                    {passwordField.error && (
                        <p className="text-xs text-red-500 mt-0.5">{passwordField.message}</p>
                    )}
                </div>

                {/* Confirm Password */}
                <div className="flex flex-col gap-2">
                    <Label
                        className={`${LABEL_STYLE} ${confirmField.error ? "text-red-500" : ""}`}
                    >
                        {t("resetPasswordPage.confirmNewPasswordLabel")}
                    </Label>
                    <div className="relative">
                        <Input
                            ref={confirmPasswordRef}
                            onChange={handleConfirmChange}
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder={t("resetPasswordPage.confirmNewPasswordPlaceholder")}
                            autoComplete="new-password"
                            className={inputClass(confirmField.error)}
                        />
                        <PasswordToggle
                            shown={showConfirmPassword}
                            onToggle={() => setShowConfirmPassword((p) => !p)}
                            hasError={confirmField.error}
                        />
                    </div>
                    {confirmField.error && (
                        <p className="text-xs text-red-500 mt-0.5">{confirmField.message}</p>
                    )}
                </div>

                {/* Submit */}
                <Button
                    onClick={handleResetPassword}
                    className={`${BUTTON_STYLE} w-full mt-1`}
                >
                    {t("resetPasswordPage.submitButton")}
                </Button>

            </div>
        </div>
    );
}


// 'use client'

// import { resetPasswordAction } from "@/actions/auth/auth.actions";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { usePathname, useRouter } from "@/i18n/navigation";
// import { BUTTON_STYLE, INPUT_STYLE, LABEL_STYLE } from "@/utils/utils";
// import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { useTranslations } from "next-intl";
// import { useSearchParams } from "next/navigation"
// import { useRef, useState } from "react";
// import toast from "react-hot-toast";

// export default function ResetPassword({ email }: { email: string }) {
//     const t=useTranslations("Auth");
//     const [passwordError, setpasswordError] = useState(false);
//     const [passwordErrorMessage, setpasswordErrorMessage] = useState<boolean | string>(false);
//     const [confirmPasswordError, setconfirmPasswordError] = useState(false);
//     const [confirmPasswordMessage, setconfirmPasswordMessage] = useState<boolean | string>(false);
//     const [isPasswordShown, setisPasswordShown] = useState(false);
//     const [isConfirmPasswordShown, setisConfirmPasswordShown] = useState(false);
//     const passwordInput = useRef<HTMLInputElement | null>(null);
//     const confirmPasswordInput = useRef<HTMLInputElement | null>(null);
//     const router = useRouter();

//     function handlePassword() {
//         const passwordValue = passwordInput.current?.value;
//         if (!passwordValue) {
//             setpasswordError(true);
//             setpasswordErrorMessage("Password is required");
//             return;
//         }
//         if (!PASSWORD_REGEX.test(passwordValue)) {
//             setpasswordError(true);
//             setpasswordErrorMessage("Password must be 8-64 characters and include uppercase, lowercase and number")
//             return;
//         }
//         setpasswordError(false);
//         setpasswordErrorMessage(false);
//         return true;
//     }
//     function handleConfirmPassword() {
//         const passwordValue = passwordInput.current?.value;
//         const confirmPasswordValue = confirmPasswordInput.current?.value;
//         if (!confirmPasswordValue) {
//             setconfirmPasswordError(true);
//             setconfirmPasswordMessage("Confirm password is required");
//             return;
//         }

//         if (passwordValue !== confirmPasswordValue) {
//             setconfirmPasswordError(true);
//             setconfirmPasswordMessage("Passwords do not match");
//             return;
//         }
//         setconfirmPasswordError(false);
//         setconfirmPasswordMessage(false);
//         return true;
//     }
//     async function handleResetPassword() {
//         const formdata = new FormData();
//         const passwordValue = passwordInput.current?.value;
//         const confirmPasswordValue = confirmPasswordInput.current?.value;
//         if (!passwordValue && !confirmPasswordValue) {
//             setpasswordError(true);
//             setconfirmPasswordError(true);
//             setpasswordErrorMessage("Password is required");
//             setconfirmPasswordMessage("Confirm password is required");
//             return;
//         }
//         setpasswordError(false);
//         setconfirmPasswordError(false);
//         const checkConfirm = handlePassword() === handleConfirmPassword();
//         if (checkConfirm) {
//             formdata.append("Email", email);
//             formdata.append("Password", passwordValue!);
//             formdata.append("ConfirmPassword", confirmPasswordValue!);
//             const res = await resetPasswordAction(formdata);
//             console.log(res)
//             if (res.succeeded) {
//                 toast.success(res.message);
//                 router.replace('/login');
//                 return;
//             }
//             toast.error(res.data.message);
//         }
//     }
//     return (
//         <>
//             <header className="md:w-3/4 px-5 mx-auto">
//                 <h1 className="text-3xl font-bold text-[#252641] mb-2">{t("resetPasswordPage.title")}</h1>
//                 <p className="text-[#696984] mb-8">
//                     {t("resetPasswordPage.subtitle")}
//                 </p>
//             </header>
//             <div className="px-5 md:w-3/4 mx-auto flex flex-col  items-center">
//                 <Label className={` ${LABEL_STYLE} flex w-full flex-col items-start mb-6 gap-5 ${passwordError && " text-red-500 "} `}>{t("resetPasswordPage.newPasswordLabel")}
//                     <div className="w-full relative">
//                         <Input ref={passwordInput} onChange={handlePassword} className={passwordError ? `${INPUT_STYLE} focus-visible:border-[#e7000b] focus-visible:ring-[#D2473833] border-red-500  w-full text-black! ` : `${INPUT_STYLE}   w-full text-black!`} type={isPasswordShown ? "text" : "password"} placeholder={t("resetPasswordPage.newPasswordPlaceholder")} />
//                         {!isPasswordShown && <span onClick={() => { setisPasswordShown(true) }} className={`${passwordError && "text-red-500 "} text-(--primary-color) cursor-pointer absolute top-1/2 end-2  -translate-y-1/2  select-none w-fit px-2  `}><FontAwesomeIcon icon={faEyeSlash} /></span>}
//                         {isPasswordShown && <span onClick={() => { setisPasswordShown(false) }} className={`${passwordError && "text-red-500 "} text-(--primary-color) cursor-pointer absolute top-1/2 end-2  -translate-y-1/2  select-none w-fit px-2  `}><FontAwesomeIcon icon={faEye} /></span>}
//                     </div>
//                     {passwordError && <p className="w-full text-[16px] text-red-500 "> {passwordErrorMessage}</p>}
//                 </Label>
//                 <Label className={` ${LABEL_STYLE} flex w-full flex-col items-start mb-6 gap-5 ${confirmPasswordError && "text-red-500"} `}>{t("resetPasswordPage.confirmNewPasswordLabel")}
//                     <div className="w-full relative">
//                         <Input ref={confirmPasswordInput} onChange={handleConfirmPassword} className={confirmPasswordError ? `${INPUT_STYLE} focus-visible:border-[#e7000b] focus-visible:ring-[#D2473833] border-red-500  w-full text-black! ` : `${INPUT_STYLE} text-black!  w-full`} type={isConfirmPasswordShown ? "text" : "password"} placeholder={t("resetPasswordPage.confirmNewPasswordPlaceholder")} />
//                         {!isConfirmPasswordShown && <span onClick={() => { setisConfirmPasswordShown(true) }} className={`${confirmPasswordError && "text-red-500 "} text-(--primary-color) cursor-pointer absolute top-1/2 end-2  -translate-y-1/2  select-none w-fit px-2  `}><FontAwesomeIcon icon={faEyeSlash} /></span>}
//                         {isConfirmPasswordShown && <span onClick={() => { setisConfirmPasswordShown(false) }} className={`${confirmPasswordError && "text-red-500 "} text-(--primary-color) cursor-pointer absolute top-1/2 end-2  -translate-y-1/2  select-none w-fit px-2  `}><FontAwesomeIcon icon={faEye} /></span>}
//                     </div>
//                     {confirmPasswordError && <p className="w-full text-[16px] text-red-500 "> {confirmPasswordMessage}</p>}
//                 </Label>
//                 <Button onClick={handleResetPassword} className={BUTTON_STYLE + " w-full "}>{t("resetPasswordPage.submitButton")}</Button>
//             </div>
//         </>
//     )
// }
