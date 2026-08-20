// app/[locale]/payment/return/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import { useLocale } from "next-intl";
import { stripePromise } from "../../_Components/payment/loadStripe";
import { SuccessScreen } from "../../_Components/payment/SuccessScreen";
import { ProcessingScreen } from "../../_Components/payment/ProcessingScreen";
import { FailedScreen } from "../../_Components/payment/FailedScreen";

type Status = "loading" | "succeeded" | "processing" | "failed" | "canceled";

export default function PaymentReturnPage() {
  const searchParams = useSearchParams();
  const locale = useLocale();
  const [status, setStatus] = useState<Status>("loading");

  useEffect(() => {
    const clientSecret = searchParams.get("payment_intent_client_secret");

    if (!clientSecret) {
      setStatus("failed");
      return;
    }

    stripePromise.then(async (stripe) => {
      if (!stripe) return;

      const { paymentIntent, error } = await stripe.retrievePaymentIntent(clientSecret);

      if (error || !paymentIntent) {
        setStatus("failed");
        return;
      }

      switch (paymentIntent.status) {
        case "succeeded":
          setStatus("succeeded");
          break;
        case "processing":
          setStatus("processing");
          break;
        case "canceled":
          setStatus("canceled");
          break;
        default:
          setStatus("failed");
      }
    });
  }, [searchParams]);

//   if (status === "loading") return <LoadingScreen />;
  if (status === "succeeded") return <SuccessScreen locale={locale} />;
  if (status === "processing") return <ProcessingScreen locale={locale} />;
  return (
    <FailedScreen
      locale={locale}
      message={status === "canceled" ? "Payment was canceled." : "Payment did not go through. Please try again."}
    />
  );
}