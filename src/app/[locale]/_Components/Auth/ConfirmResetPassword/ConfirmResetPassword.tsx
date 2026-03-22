'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useRouter } from '@/i18n/navigation'
import { BUTTON_STYLE, INPUT_STYLE, LABEL_STYLE } from '@/utils/utils'
import { ChangeEvent, useRef, useState } from 'react'
import toast from 'react-hot-toast';
import { Progress } from "@/components/ui/progress"
import { useTranslations } from 'next-intl'
import { confirmResetPasswordAction, forgotPasswordAction } from '@/actions/auth/auth.actions'
const LENGTH = 6;

export default function ConfirmResetPassword({ email }: { email: string }) {
    const [otp, setOtp] = useState<string[]>(Array(LENGTH).fill(''));
    const t=useTranslations("Auth");
    const router = useRouter();
    const codeInput = useRef<(HTMLInputElement | null)[]>([]);
    const realLeangth = otp.filter((code) => code).length;
    const percentage = (realLeangth / 6) * 100;
    function handleChange(e: ChangeEvent<HTMLInputElement>, index: number) {
        const val = e.target.value.replace(/\D/g, "");
        if (!val) return;
        const newOtp = [...otp];
        console.log(e)
        // console.log(e)
        // if (val.length > 1&&e.nativeEvent.inputType== "insertFromPaste") {
        //     const chars = val.split("").slice(0, LENGTH - index);
        //     chars.forEach((char, i) => { newOtp[index+i] = char; });
        //     console.log("chars",chars)
        //     setOtp(newOtp);
        //     const nextIndex = Math.min(index + chars.length, LENGTH - 1);12345
        //     codeInput.current[nextIndex]?.focus();
        //     return;
        // }
        //  if(val.length >= 2&&e.type=='change'){
        //     // const chars = val.split("").slice(0,  index);
        //     // chars.forEach((char, i) => { newOtp[index+i] = char; });
        //     console.log("chars",val)
        //     newOtp[index] = val[val.length-1];
        //     setOtp(newOtp);
        //     // const nextIndex = Math.min(index + chars.length, LENGTH - 1);
        //     codeInput.current[index+1]?.focus();
        //     return;
        // }
        if (val.length == 2 && e.type == 'change') {
            newOtp[index] = val[1];
            console.log("paste and change")
            setOtp(newOtp);
            if (index < LENGTH - 1) codeInput.current[index + 1]?.focus(); //1234
            return
        }
        if (val.length == 1) {
            newOtp[index] = val;
            setOtp(newOtp)
            if (index < LENGTH - 1) codeInput.current[index + 1]?.focus(); //1234
            return
        }
    }
    function handlePaste(e: React.ClipboardEvent<HTMLInputElement>, index: number) {
        const val = e.clipboardData.getData("text").replace(/\D/g, "");
        if (!val) return;
        const newOtp = [...otp];
        console.log(e, e.clipboardData.getData("text").replace(/\D/g, ""))
        if (val.length > 1 && e.type == 'paste') {
            const chars = val.split("").slice(0, LENGTH - index);
            chars.forEach((char, i) => { newOtp[index + i] = char; });
            console.log("chars", chars)
            setOtp(newOtp);
            const nextIndex = Math.min(index + chars.length, LENGTH - 1);
            codeInput.current[nextIndex]?.focus();
            return;
        }
        return;
    }
    function handleFocusInputs(e: React.KeyboardEvent<HTMLInputElement>, index: number) {
        if (e.key === "Backspace") {
            const newOtp = [...otp];
            if (otp[index]) {
                newOtp[index] = "";
                setOtp(newOtp);
            } else if (index > 0) {
                newOtp[index - 1] = "";
                setOtp(newOtp);
                codeInput.current[index - 1]?.focus();
            }
        } else if (e.key === "ArrowLeft" && index > 0) {
            codeInput.current[index - 1]?.focus();
        } else if (e.key === "ArrowRight" && index < LENGTH - 1) {
            codeInput.current[index + 1]?.focus();
        }
    }
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
        toast.error("Please,Enter your Email")
    }
    async function handleConfirmResetPassword() {
        const code = codeInput.current.map((val => val?.value));
        const copyCode = [...code];
        const firstEmpty = copyCode.findIndex(code => code === '');
        if (firstEmpty !== -1) {
            codeInput.current[firstEmpty]?.focus();
            toast.error("Please,enter a valid code");
            return
        }
        const payload = copyCode.toString().split(",").join('');
        console.log(payload, copyCode, firstEmpty)
        const res = await confirmResetPasswordAction(email,payload);
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
        <>
            <header className='md:w-3/4 px-5 mx-auto'>
                <h1 className="text-3xl font-bold text-foreground mb-2">{t("verifyCodePage.title")}</h1>
                <p className="text-(--text-secondry) mb-8">
                    {t("verifyCodePage.subtitle")}<br />
                    <span className="font-semibold text-foreground">{email}</span>
                </p>
            </header>
            <div className="px-5 flex flex-col md:w-3/4  mx-auto justify-center">
                <Label className={LABEL_STYLE + " flex w-full flex-col items-start  gap-5"}> {t("verifyCodePage.codeLabel")}
                    <div className=" gap-5 flex ">
                        {otp.map((digit, index) => (
                            <Input
                                key={index}
                                ref={(el) => { (codeInput.current[index] = el) }}
                                type="text"
                                maxLength={LENGTH}
                                value={digit}
                                onPaste={(e) => handlePaste(e, index)}
                                onChange={(e) => handleChange(e, index)}
                                onKeyDown={(e) => handleFocusInputs(e, index)}
                                className={INPUT_STYLE + "   text-center h-15  selection:bg-blue-500"}
                            />
                        ))}
                    </div>
                </Label>
                <Progress value={percentage} className='mt-5' />
                <p className='text-center text-foreground italic mt-2'>{t(`verifyCodePage.digitsEntered`,{count:realLeangth})}</p>
                <Button onClick={handleConfirmResetPassword} className={BUTTON_STYLE + " w-full "}>{t("verifyCodePage.submitButton")}</Button>
                <div className="text-center">
                    <p onClick={handleResendCode} className="text-sm text-(--text-secondry) cursor-pointer hover:text-(--text-hover) transition-color">
                        {t("verifyCodePage.didNotReceiveCode")}
                        <Button
                        
                            type="button"
                            className="ps-0.5 text-sm text-(--text-secondry) cursor-pointer hover:text-(--text-hover) transition-colors"
                        >
                            {t("verifyCodePage.resendCode")}
                        </Button>
                    </p>
                </div>
            </div>
        </>
    )
}

