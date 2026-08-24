"use client"
import {
    Dialog,
    DialogContent,
} from "@/components/ui/dialog"
import { PaymentModalDialogProps } from "./cart.types";
import { useRouter } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
export function PaymentModalDialog({ isDialogOpen, setisDialogOpen,
    isPaymentFailed, isPaymentSucceeded, paymentFailedMessage, closPayment }: PaymentModalDialogProps) {
    const t = useTranslations();
    const router = useRouter();
    function handleSuccessPayment() {
        setisDialogOpen(false);
        closPayment()
        router.push('/my-learning', {
            scroll: false,
        })
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
        <Dialog open={isDialogOpen} onOpenChange={isPaymentSucceeded ? handleTriggerDialog : setisDialogOpen}>
            <DialogContent showCloseButton={isPaymentSucceeded ? false : true} className="sm:max-w-md">
                {isPaymentSucceeded && (
                    <div className="flex flex-col items-center justify-center gap-5 text-center py-4">
                        <div className="w-16 h-16 rounded-full bg-(--primary-light)
                                flex items-center justify-center text-3xl">
                            🎉
                        </div>

                        <div className="flex flex-col gap-2">
                            <h1 className="text-2xl font-bold text-foreground">
                                {t('Payment.successTitle')}
                            </h1>
                            <p className="text-sm text-(--text-secondary) leading-relaxed">
                                {t('Payment.successMessage')}
                            </p>
                        </div>

                        <button
                            onClick={handleSuccessPayment}
                            className="BUTTON_STYLE w-full justify-center"
                        >
                            {t('Payment.goToMyCourses')}
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
                                {t('Payment.failedTitle')}
                            </h1>
                            <p className="text-sm text-(--text-secondary) leading-relaxed">
                                {paymentFailedMessage}
                            </p>
                        </div>
                        <button onClick={handleFailedPayment} className="MAIN_BUTTON w-full justify-center py-3">
                            {t('Payment.backToCart')}
                        </button>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    )
}