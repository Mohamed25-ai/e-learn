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
    <div className="flex min-h-screen">

        {/* Left — Forms */}
        <div className="w-full md:w-1/2 flex gab-0 flex-col px-6 md:px-12 py-10 overflow-y-auto">

            {/* Header */}
            <header className="w-full md:w-3/4 mx-auto mb-8">
                <h2 className="text-2xl font-bold text-foreground">
                    {t(`${toggleAuth}Page.title`)}
                </h2>
                <p className="text-sm mt-1 text-(--text-secondary)">
                    {t(`${toggleAuth}Page.subtitle`)}
                </p>
            </header>

            {/* Toggle tabs */}
            <div className="w-full md:w-3/4 mx-auto mb-6">
                <div className="flex gap-1 rounded-xl px-2 py-1.5 bg-(--primary-light)">
                    {(['login', 'register'] as const).map((tab) => (
                        <button
                            key={tab}
                            type="button"
                            onClick={() => settoggleAuth(tab)}
                            className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 cursor-pointer
                                ${toggleAuth === tab
                                    ? "bg-(--primary-color) text-white shadow-sm"
                                    : "bg-transparent text-(--text-secondary) hover:text-(--primary-color)"
                                }`}
                        >
                            {t(`common.${tab}`)}
                        </button>
                    ))}
                </div>
            </div>

            {/* Form */}
            <div className="w-full md:w-3/4 mx-auto  md:flex-1 ">
                {toggleAuth === 'login'    && <LoginForm />}
                {toggleAuth === 'register' && <RegisterForm />}
            </div>

            {/* Switch link */}
            <div className="w-full md:w-3/4 mx-auto  text-center">
                <span
                    onClick={() => settoggleAuth(toggleAuth === 'login' ? 'register' : 'login')}
                    className="text-sm cursor-pointer select-none text-(--text-secondary) hover:text-(--primary-color) transition-colors"
                >
                    {toggleAuth === 'login'
                        ? <>{t("common.goToRegister")} <span className="font-semibold text-(--primary-color)">{t("common.register")}</span></>
                        : <>{t("common.goToLogin")} <span className="font-semibold text-(--primary-color)">{t("common.login")}</span></>
                    }
                </span>
            </div>
        </div>

        {/* Right — Image */}
        <div className="hidden md:block w-1/2 fixed ltr:right-0 rtl:left-0 top-0 h-full">
            <Image
                src={AUTH_PHOTO}
                alt="auth illustration"
                className="w-full h-full object-cover rounded-s-3xl"
                priority
            />
        </div>
    </div>
);
}
