"use client";

import Image from "next/image";
import { usePathname, useSearchParams } from "next/navigation";
import AUTH_PHOTO from "@/assets/images/vecteezy_close-up-of-asian-woman-writing-on-notebook-on-a-table-with_2594151.jpg"
import ForgotPassword from "../ForgotPassword/ForgotPassword";
// import ConfirmResetPassword from "../ConfirmResetPassword/ConfirmResetPassword";
// import ResetPassword from "../ResetPassword/ResetPassword";
import ConfirmResetPassword from "../ConfirmResetPassword/ConfirmResetPassword";
import { ResetPassword } from "../ResetPassword/ResetPassword";



// ── Step derivation ────────────────────────────────────────────────────────
type Step = "forgot" | "verify" | "reset";

function deriveStep(email: string | null, reset: string | null): Step {
    if (reset && email) return "reset";
    if (email) return "verify";
    return "forgot";
}

// ── Component ──────────────────────────────────────────────────────────────
export default function ForgotPasswordLayer() {
    const pathQuery = useSearchParams().get("email");
    const resetPath = useSearchParams().get("reset");

    const step = deriveStep(pathQuery, resetPath);

    return (
        <div className="flex gap-10 justify-between min-h-screen">

            {/* Left — form area */}
            <div className="w-full md:w-1/2 flex items-center md:my-10 md:py-10">
                <div className="w-full">
                    {step === "forgot" && <ForgotPassword />}
                    {step === "verify" && <ConfirmResetPassword email={pathQuery!} />}
                    {step === "reset" && <ResetPassword email={pathQuery!} />}
                </div>
            </div>

            {/* Right — decorative image (desktop only) */}
            <div className="logo hidden md:block relative flex-1">
                <Image
                    src={AUTH_PHOTO}
                    alt="Authentication illustration"
                    className="fixed left-1/2 rtl:left-0 w-1/2 h-full object-cover rounded-2xl"
                    priority
                />
            </div>
        </div>
    );
}