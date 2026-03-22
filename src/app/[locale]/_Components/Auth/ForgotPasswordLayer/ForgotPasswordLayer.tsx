'use client'
import AUTH_PHOTO from "@/assets/images/vecteezy_close-up-of-asian-woman-writing-on-notebook-on-a-table-with_2594151.jpg"
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import ForgotPassword from "../ForgotPassword/ForgotPassword"
import { usePathname } from "next/navigation"
import ConfirmResetPassword from "../ConfirmResetPassword/ConfirmResetPassword";
import ResetPassword from "../ResetPassword/ResetPassword";

export default function ForgotPasswordLayer() {
    const path = usePathname()
    const pathQuery = useSearchParams().get('email');
    const resetPath = useSearchParams().get('reset');
    console.log("Forgotpath", path, pathQuery, resetPath)
    return (
        <div className="flex gap-10 justify-between  ">
            <div className=" md:w-1/2 w-full md:my-10 md:py-10  ">
                
                {!pathQuery && !resetPath && <ForgotPassword />}
                {pathQuery && !resetPath && <ConfirmResetPassword email={pathQuery} />}
                {resetPath && <ResetPassword email={pathQuery!} />}
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
