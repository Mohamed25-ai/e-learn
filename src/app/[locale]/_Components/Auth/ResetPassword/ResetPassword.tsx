'use client'

import { resetPasswordAction } from "@/actions/auth/auth.actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { usePathname, useRouter } from "@/i18n/navigation";
import { BUTTON_STYLE, INPUT_STYLE, LABEL_STYLE } from "@/utils/utils";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation"
import { useRef, useState } from "react";
import toast from "react-hot-toast";
const PASSWORD_REGEX =
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{8,64}$/;
export default function ResetPassword({ email }: { email: string }) {
    const t=useTranslations("Auth");
    const [passwordError, setpasswordError] = useState(false);
    const [passwordErrorMessage, setpasswordErrorMessage] = useState<boolean | string>(false);
    const [confirmPasswordError, setconfirmPasswordError] = useState(false);
    const [confirmPasswordMessage, setconfirmPasswordMessage] = useState<boolean | string>(false);
    const [isPasswordShown, setisPasswordShown] = useState(false);
    const [isConfirmPasswordShown, setisConfirmPasswordShown] = useState(false);
    const passwordInput = useRef<HTMLInputElement | null>(null);
    const confirmPasswordInput = useRef<HTMLInputElement | null>(null);
    const router = useRouter();

    function handlePassword() {
        const passwordValue = passwordInput.current?.value;
        if (!passwordValue) {
            setpasswordError(true);
            setpasswordErrorMessage("Password is required");
            return;
        }
        if (!PASSWORD_REGEX.test(passwordValue)) {
            setpasswordError(true);
            setpasswordErrorMessage("Password must be 8-64 characters and include uppercase, lowercase and number")
            return;
        }
        setpasswordError(false);
        setpasswordErrorMessage(false);
        return true;
    }
    function handleConfirmPassword() {
        const passwordValue = passwordInput.current?.value;
        const confirmPasswordValue = confirmPasswordInput.current?.value;
        if (!confirmPasswordValue) {
            setconfirmPasswordError(true);
            setconfirmPasswordMessage("Confirm password is required");
            return;
        }

        if (passwordValue !== confirmPasswordValue) {
            setconfirmPasswordError(true);
            setconfirmPasswordMessage("Passwords do not match");
            return;
        }
        setconfirmPasswordError(false);
        setconfirmPasswordMessage(false);
        return true;
    }
    async function handleResetPassword() {
        const formdata = new FormData();
        const passwordValue = passwordInput.current?.value;
        const confirmPasswordValue = confirmPasswordInput.current?.value;
        if (!passwordValue && !confirmPasswordValue) {
            setpasswordError(true);
            setconfirmPasswordError(true);
            setpasswordErrorMessage("Password is required");
            setconfirmPasswordMessage("Confirm password is required");
            return;
        }
        setpasswordError(false);
        setconfirmPasswordError(false);
        const checkConfirm = handlePassword() === handleConfirmPassword();
        if (checkConfirm) {
            formdata.append("Email", email);
            formdata.append("Password", passwordValue!);
            formdata.append("ConfirmPassword", confirmPasswordValue!);
            const res = await resetPasswordAction(formdata);
            console.log(res)
            if (res.succeeded) {
                toast.success(res.message);
                router.replace('/login');
                return;
            }
            toast.error(res.data.message);
        }
    }
    return (
        <>
            <header className="md:w-3/4 px-5 mx-auto">
                <h1 className="text-3xl font-bold text-[#252641] mb-2">{t("resetPasswordPage.title")}</h1>
                <p className="text-[#696984] mb-8">
                    {t("resetPasswordPage.subtitle")}
                </p>
            </header>
            <div className="px-5 md:w-3/4 mx-auto flex flex-col  items-center">
                <Label className={` ${LABEL_STYLE} flex w-full flex-col items-start mb-6 gap-5 ${passwordError && " text-red-500 "} `}>{t("resetPasswordPage.newPasswordLabel")}
                    <div className="w-full relative">
                        <Input ref={passwordInput} onChange={handlePassword} className={passwordError ? `${INPUT_STYLE} focus-visible:border-[#e7000b] focus-visible:ring-[#D2473833] border-red-500  w-full text-black! ` : `${INPUT_STYLE}   w-full text-black!`} type={isPasswordShown ? "text" : "password"} placeholder={t("resetPasswordPage.newPasswordPlaceholder")} />
                        {!isPasswordShown && <span onClick={() => { setisPasswordShown(true) }} className={`${passwordError && "text-red-500 "} text-(--primary-color) cursor-pointer absolute top-1/2 end-2  -translate-y-1/2  select-none w-fit px-2  `}><FontAwesomeIcon icon={faEyeSlash} /></span>}
                        {isPasswordShown && <span onClick={() => { setisPasswordShown(false) }} className={`${passwordError && "text-red-500 "} text-(--primary-color) cursor-pointer absolute top-1/2 end-2  -translate-y-1/2  select-none w-fit px-2  `}><FontAwesomeIcon icon={faEye} /></span>}
                    </div>
                    {passwordError && <p className="w-full text-[16px] text-red-500 "> {passwordErrorMessage}</p>}
                </Label>
                <Label className={` ${LABEL_STYLE} flex w-full flex-col items-start mb-6 gap-5 ${confirmPasswordError && "text-red-500"} `}>{t("resetPasswordPage.confirmNewPasswordLabel")}
                    <div className="w-full relative">
                        <Input ref={confirmPasswordInput} onChange={handleConfirmPassword} className={confirmPasswordError ? `${INPUT_STYLE} focus-visible:border-[#e7000b] focus-visible:ring-[#D2473833] border-red-500  w-full text-black! ` : `${INPUT_STYLE} text-black!  w-full`} type={isConfirmPasswordShown ? "text" : "password"} placeholder={t("resetPasswordPage.confirmNewPasswordPlaceholder")} />
                        {!isConfirmPasswordShown && <span onClick={() => { setisConfirmPasswordShown(true) }} className={`${confirmPasswordError && "text-red-500 "} text-(--primary-color) cursor-pointer absolute top-1/2 end-2  -translate-y-1/2  select-none w-fit px-2  `}><FontAwesomeIcon icon={faEyeSlash} /></span>}
                        {isConfirmPasswordShown && <span onClick={() => { setisConfirmPasswordShown(false) }} className={`${confirmPasswordError && "text-red-500 "} text-(--primary-color) cursor-pointer absolute top-1/2 end-2  -translate-y-1/2  select-none w-fit px-2  `}><FontAwesomeIcon icon={faEye} /></span>}
                    </div>
                    {confirmPasswordError && <p className="w-full text-[16px] text-red-500 "> {confirmPasswordMessage}</p>}
                </Label>
                <Button onClick={handleResetPassword} className={BUTTON_STYLE + " w-full "}>{t("resetPasswordPage.submitButton")}</Button>
            </div>
        </>
    )
}
