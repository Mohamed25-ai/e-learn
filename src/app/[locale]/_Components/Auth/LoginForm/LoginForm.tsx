'use client'
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { BUTTON_STYLE, INPUT_STYLE, LABEL_STYLE } from "@/utils/utils";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginFormType, loginSchema } from "./LoginFormSchema";
import toast from "react-hot-toast";
import { getUserToken } from "@/utils/getAuthenticatedUserToken/getAuthenticatedUserToken";
import { Link } from "@/i18n/navigation";
import { useLocale, useTranslations } from "next-intl";
export default function LoginForm() {
  const [isPasswordShown, setisPasswordShown] = useState(false);
  const t = useTranslations("Auth");
  const locale = useLocale();
  const loginForm = useForm({
    defaultValues: {
      Email: "",
      Password: "",
    },
    resolver: zodResolver(loginSchema),
    mode: "onChange"
  });
  const { control, formState, handleSubmit } = loginForm;

  async function handleLoginForm(data: LoginFormType) {

    const res = await signIn("credentials", {
      Email: data?.Email,
      Password: data?.Password,
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
      <form onSubmit={handleSubmit(handleLoginForm)} className=" w-full md:w-3/4 mx-auto  ">
        <FormField
          control={control}
          name="Email"
          render={({ field }) => (
            <FormItem className="flex flex-col items-center">
              <div className="w-full">
                <FormLabel className={LABEL_STYLE + " mt-1.25"}>{t("fields.email")}</FormLabel>
              </div>
              <FormControl >
                <Input className={INPUT_STYLE} placeholder={t("placeholders.email")} {...field} />
              </FormControl>
              <FormMessage className="block w-full " />
            </FormItem>
          )} />
        <FormField
          control={control}
          name="Password"
          render={({ field }) => (
            <FormItem className="flex flex-col items-center mt-7">
              <div className="w-full">
                <FormLabel htmlFor="password" className={LABEL_STYLE + " mt-1.25"}>{t("fields.password")}</FormLabel>
              </div>
              <FormControl >
                <div className="w-full relative">
                  <Input id="password" className={formState.errors.Password ? `${INPUT_STYLE} focus-visible:border-[#e7000b] focus-visible:ring-[#D2473833] border-red-500  w-full ` : `${INPUT_STYLE}   w-full`} type={isPasswordShown ? "text" : "password"} placeholder={t("placeholders.password")} {...field} />
                  {!isPasswordShown && <span onClick={() => { setisPasswordShown(true) }} className={`${formState.errors.Password && "text-red-500 "} text-(--primary-color) cursor-pointer absolute top-1/2 end-2  -translate-y-1/2  select-none w-fit px-2  `}><FontAwesomeIcon icon={faEyeSlash} /></span>}
                  {isPasswordShown && <span onClick={() => { setisPasswordShown(false) }} className={`${formState.errors.Password && "text-red-500 "} text-(--primary-color) cursor-pointer absolute top-1/2 end-2  -translate-y-1/2  select-none w-fit px-2  `}><FontAwesomeIcon icon={faEye} /></span>}
                </div>
              </FormControl>
              <FormMessage className="   w-full " />
            </FormItem>
          )} />
        <div className="forot-password flex justify-end rtl:justify-start mt-5 underline">
          <Link href={'/forgot-password'}>{t("loginPage.forgotPassword")}</Link>
        </div>
        <div className="flex justify-center   ">
          {formState.isValid && <Button type="submit" className={BUTTON_STYLE + " w-full md:w-3/4"}>{t("loginPage.submitButton")} </Button>}
          {!formState.isValid && <Button type="submit" disabled className={BUTTON_STYLE + " w-full md:w-3/4"}>{t("loginPage.submitButton")} </Button>}
        </div>
      </form>
    </Form>
  )
}
