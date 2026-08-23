"use client"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { useEffect, useState } from "react";
import { PaymentModalDialogProps } from "./cart.types";
import { Link } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "@/i18n/navigation";
export function PaymentModalDialog({ isDialogOpen, setisDialogOpen,
    isPaymentFailed, isPaymentSucceeded, paymentFailedMessage,closPayment }: PaymentModalDialogProps) {
    const router = useRouter();
    function handleSuccessPayment() {
        setisDialogOpen(false);
        closPayment()
        router.push('/courses')
    }
    function handleFailedPayment() {
        setisDialogOpen(false);
        closPayment()
        router.push('/cart')
    }
    function handleTriggerDialog(open: boolean) {
        if (isDialogOpen && !open) {
            return;
        }
        setisDialogOpen(open);
    }
    
return (
    <Dialog open={isDialogOpen} onOpenChange={isPaymentSucceeded?handleTriggerDialog:setisDialogOpen}>
        <DialogContent showCloseButton={isPaymentSucceeded?false:true} className="sm:max-w-md">
            {isPaymentSucceeded && (
                <div className="flex flex-col items-center justify-center gap-5 text-center py-4">

                    <div className="w-16 h-16 rounded-full bg-(--primary-light)
                                flex items-center justify-center text-3xl">
                        🎉
                    </div>

                    <div className="flex flex-col gap-2">
                        <h1 className="text-2xl font-bold text-foreground">
                            Payment Successful
                        </h1>
                        <p className="text-sm text-(--text-secondary) leading-relaxed">
                            Your course access is being set up — this usually takes a few seconds.
                        </p>
                    </div>

                    <button
                        onClick={handleSuccessPayment}
                        className="BUTTON_STYLE w-full justify-center"
                    >
                        Go to My Courses
                    </button>
                </div>
            )}
            {isPaymentFailed && (
                <div className="flex flex-col items-center justify-center gap-5 text-center py-4">
                    <div className="w-16 h-16 rounded-full bg-red-50
                                flex items-center justify-center text-3xl">
                        ❌
                    </div>

                    <div className="flex flex-col gap-2">
                        <h1 className="text-2xl font-bold text-(--error)">
                            Payment Not Completed
                        </h1>
                        <p className="text-sm text-(--text-secondary) leading-relaxed">
                            {paymentFailedMessage}
                        </p>
                    </div>
                    <button onClick={handleFailedPayment} className="MAIN_BUTTON w-full justify-center py-3">
                        Back to Cart
                    </button>
                </div>
            )}
        </DialogContent>
    </Dialog>
)
}