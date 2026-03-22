'use client'
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { RegisterFormValues, registerSchema } from "./RegisterFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import  { BUTTON_STYLE, INPUT_STYLE, LABEL_STYLE } from "@/utils/utils";
import toast from "react-hot-toast";
import { Label } from "@/components/ui/label";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { Link, useRouter } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { registerAction } from "@/actions/auth/auth.actions";



export default function RegisterForm() {
    const t=useTranslations("Auth");
    const router = useRouter()
    const [isPasswordShown, setisPasswordShown] = useState(false);
    const [isConfirmPasswordShown, setisConfirmPasswordShown] = useState(false);
    const registerForm = useForm<RegisterFormValues>({
        resolver: zodResolver(registerSchema),
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
        formData.append("FullName", data.FullName);
        formData.append("UserName", data.UserName);
        formData.append("Email", data.Email);
        formData.append("Password", data.Password);
        formData.append("ConfirmPassword", data.ConfirmPassword);
        if (data.ProfilePicture) {
            formData.append("ProfilePicture", data.ProfilePicture);
        }
        const res = await registerAction(formData);
        if (res.succeeded) {
            toast.success(res.message);
            router.replace(`/confirmemail/${encodeURIComponent(data.Email)}`)
            console.log('resres', res)
        }
        else {
            toast.error(res.data.message)
            console.log('reserr', res)
        }
    }

    return (
        <Form {...registerForm} >
            <form onSubmit={handleSubmit(registerFormSubmit)} className="w-full mx-auto">
                <div className="md:w-3/4  mx-auto">
                    <FormField
                        control={control}
                        name="FullName"
                        render={({ field }) => (
                            <FormItem className="flex flex-col items-center">
                                <div className="w-full">

                                    <FormLabel className={LABEL_STYLE + " mt-1.25"}>{t("fields.fullName")}</FormLabel>
                                </div>
                                <FormControl >
                                    <Input className={INPUT_STYLE} placeholder={t("placeholders.fullName")} {...field} />
                                </FormControl>
                                <FormMessage className="block w-full" />
                            </FormItem>
                        )} />
                    <FormField
                        control={control}
                        name="UserName"
                        render={({ field }) => (
                            <FormItem className="flex flex-col items-center">
                                <div className="w-full">

                                    <FormLabel className={LABEL_STYLE + " mt-1.25"}>{t("fields.userName")}</FormLabel>
                                </div>
                                <FormControl >
                                    <Input className={INPUT_STYLE} placeholder={t("placeholders.userName")} {...field} />
                                </FormControl>
                                <FormMessage className="block w-full" />
                            </FormItem>
                        )} />
                    <FormField
                        control={control}
                        name="Email"
                        render={({ field }) => (
                            <FormItem className="flex flex-col items-center">
                                <div className="w-full">

                                    <FormLabel className={LABEL_STYLE + " mt-1.25"}>{t("fields.email")}</FormLabel>
                                </div>
                                <FormControl >
                                    <Input className={INPUT_STYLE} type="email" placeholder={t("placeholders.fullName")} {...field} />
                                </FormControl>
                                <FormMessage className="block w-full" />
                            </FormItem>
                        )} />
                    <FormField
                        control={control}
                        name="Password"
                        render={({ field }) => (
                            <FormItem className="flex flex-col items-center">
                                <div className="w-full">

                                    <FormLabel htmlFor="password" className={LABEL_STYLE + " mt-1.25"}>{t("fields.password")}</FormLabel>
                                </div>
                                <FormControl >
                                    <div className="w-full relative">
                                        <Input  id="password" className={formState.errors.Password?`${INPUT_STYLE} focus-visible:border-[#e7000b] focus-visible:ring-[#D2473833] border-red-500  w-full `:`${INPUT_STYLE}   w-full`} type={isPasswordShown?"text":"password"} placeholder={t("placeholders.password")} {...field} />
                                        {!isPasswordShown&&<span onClick={()=>{setisPasswordShown(true)}} className={`${formState.errors.Password&&"text-red-500 "} text-(--primary-color) cursor-pointer absolute top-1/2 end-2  -translate-y-1/2  select-none w-fit px-2  `}><FontAwesomeIcon icon={faEyeSlash}   /></span>}
                                        {isPasswordShown&&<span onClick={()=>{setisPasswordShown(false)}} className={`${formState.errors.Password&&"text-red-500 "} text-(--primary-color) cursor-pointer absolute top-1/2 end-2  -translate-y-1/2  select-none w-fit px-2  `}><FontAwesomeIcon icon={faEye}  /></span>}
                                    </div>
                                </FormControl>
                                <FormMessage className="block w-full" />
                            </FormItem>
                        )} />
                    <FormField
                        control={control}
                        name="ConfirmPassword"
                        render={({ field }) => (
                            <FormItem className="flex flex-col items-center">
                                <div className="w-full">
                                    <FormLabel htmlFor="confirmPassword" className={LABEL_STYLE + " mt-1.25"}>{t("fields.confirmPassword")}</FormLabel>
                                </div>
                                <FormControl > 
                                    <div className="w-full relative">
                                        <Input id="confirmPassword" className={formState.errors.ConfirmPassword?`${INPUT_STYLE} focus-visible:border-[#e7000b] focus-visible:ring-[#D2473833] border-red-500  w-full `:`${INPUT_STYLE}   w-full`} type={isConfirmPasswordShown?"text":"password"} placeholder={t("placeholders.confirmPassword")} {...field} />
                                        {!isConfirmPasswordShown&&<span onClick={()=>{setisConfirmPasswordShown(true)}} className={`${formState.errors.ConfirmPassword&&"text-red-500 "} text-(--primary-color) cursor-pointer absolute top-1/2 end-2 select-none  -translate-y-1/2   w-fit px-2  `}><FontAwesomeIcon icon={faEyeSlash}  /></span>}                                  
                                        {isConfirmPasswordShown&&<span onClick={()=>{setisConfirmPasswordShown(false)}} className={`${formState.errors.ConfirmPassword&&"text-red-500 "} text-(--primary-color) cursor-pointer absolute top-1/2 end-2 select-none  -translate-y-1/2   w-fit px-2  `}><FontAwesomeIcon icon={faEye}  /></span>}                                  
                                        </div>
                                </FormControl>
                                <FormMessage className="block w-full" />
                            </FormItem>
                        )} />
                    <FormField
                        control={control}
                        name="ProfilePicture"
                        render={({ field }) => (
                            <FormItem className="flex flex-col items-center">

                                <div className="w-full bg-transparent">
                                    <Label className={LABEL_STYLE + " mt-1.25 w-full  block bg-transparent "}>{t("fields.profilePicture")}

                                        <div className={" bg-[#F6F7FB] border-2 outline-1 relative outline-(--primary-light) focus-visible:ring-(--primary-light) focus-visible:border-(--primary-color)  border-(--primary-light) shadow-xl  rounded-xl  placeholder:text-(--text-secondary)  w-full mt-1.25 cursor-pointer p-2.5"}>
                                            <FormControl >
                                                <Input type="file" className="hidden bg-input " placeholder={t("placeholders.profilePicture")} onChange={(e) => {
                                                    const file = e.target.files?.[0];
                                                    field.onChange(file ?? null);
                                                }} />
                                            </FormControl>
                                                {field.value&&<span className={` bg-input text-(--primary-color) cursor-pointer absolute top-1/2 end-0 rtl:left-6 -translate-1/2  `}><FontAwesomeIcon icon={faCheck} /></span>}
                                            <span className="ms-3 bg-input text-(--text-primary) font-medium">{field.value?t("placeholders.profilePicture"):t("placeholders.profilePicture")}</span>
                                        </div>
                                        <FormMessage className="block w-full" />

                                    </Label>
                                </div>
                            </FormItem>
                        )} />
                    <div className="flex justify-center bg-input">
                        {formState.isValid && <Button type="submit" className={BUTTON_STYLE + " w-full md:w-3/4"}>{t("registerPage.submitButton")} </Button>}
                        {!formState.isValid && <Button type="submit" disabled className={BUTTON_STYLE + " w-full md:w-3/4"}>{t("registerPage.submitButton")} </Button>}
                    </div>
                </div>
            </form>
        </Form >
    )
}
