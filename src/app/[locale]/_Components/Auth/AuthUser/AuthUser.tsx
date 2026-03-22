'use client'
import { Button } from "@/components/ui/button"
import { useState } from "react"
import LoginForm from "../LoginForm/LoginForm"
import RegisterForm from "../RegisterForm/RegisterForm"
import AUTH_PHOTO from "@/assets/images/vecteezy_close-up-of-asian-woman-writing-on-notebook-on-a-table-with_2594151.jpg"
import Image from "next/image"
import { useTranslations } from "next-intl"
import { Link } from "@/i18n/navigation"
export default function AuthUser() {
    const [toggleAuth, settoggleAuth] = useState('login');
    const t = useTranslations('Auth');

    return (
        <div className="flex gap-10 justify-between  ">
            <div className={`${toggleAuth=='login'&&"md:my-10 py-10 overflow-auto"} " forms-buttons md:w-1/2 w-full    "`}>
                {<header className=" mx-auto md:w-3/4 my-5">
                    <h2>{t("loginPage.title")}</h2>
                    <p>{t("loginPage.subtitle")}</p>
                </header>}
                <div className="flex flex-col items-center  justify-center ">
                    <div className="  flex w-full md:w-3/4 gap-1 rounded-xl px-2 py-1.5 justify-center bg-(--primary-light) ">
                        <Button onClick={() => { settoggleAuth('login') }} className={`${toggleAuth === 'login' ? " rounded-xl bg-(--primary-color) text-white  transition-colors   hover:bg-(--primary-hover) border hover:border hover:border-(--primary-color)  cursor-pointer  w-1/2  py-5  " : " rounded-xl bg-transparent text-(--text-secondry)  transition-colors   hover:bg-(--primary-hover)  hover:text-white hover:border-(--primary-color)  cursor-pointer  w-1/2  py-5  "}`} >
                            {t("common.login")}
                        </Button>
                        <Button onClick={() => { settoggleAuth('register') }} className={`${toggleAuth === 'register' ? " rounded-xl bg-(--primary-color) text-white  transition-colors   hover:bg-(--primary-hover) border hover:border hover:border-(--primary-color)  cursor-pointer  w-1/2  py-5 " : "rounded-xl bg-transparent text-(--text-secondry)  transition-colors   hover:bg-(--primary-hover)  hover:text-white hover:border-(--primary-color)  cursor-pointer  w-1/2  py-5 "}`} >
                            {t("common.register")}

                        </Button>
                    </div>
                    {toggleAuth === 'login' && <LoginForm />}
                    {toggleAuth === 'register' && <RegisterForm />}
                    <div className="mb-10">
                        <span className="cursor-pointer text-foreground select-none hover:text-(--primary-hover)" onClick={() => {toggleAuth=='login'?settoggleAuth('register'):settoggleAuth('login') }}>{toggleAuth==='login'?t("common.goToRegister")+t("common.register"):t("common.goToLogin")+t("common.login")}</span>
                    </div>
                </div>
            </div>

            <div className="logo hidden md:block  relative   ">
                <Image
                    src={AUTH_PHOTO}
                    alt="login picture"
                    className=" left-1/2 w-1/2 rtl:left-0  fixed  h-full rounded-2xl"
                    priority
                />
            </div>
        </div>

    )
}
