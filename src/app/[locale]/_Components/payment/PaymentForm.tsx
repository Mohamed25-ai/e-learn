"use client";
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { PaymentFormType } from "./payment.types";
import { useState } from "react";
import { useRouter } from "@/i18n/navigation";
import { removeAllItemsCartAction } from "@/actions/cart/cart.actions";
import { useAppDispatch } from "@/hooks/hooks";
import { setNumberOfCartItems } from "@/store/redux/cart/cart.slice";

export default function PaymentForm({ onClose }: PaymentFormType) {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const dispatch = useAppDispatch()
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    try {
      setIsLoading(true);
      setErrorMessage(null);

      const stripeRes = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/en/payment/return`, // or your locale-aware equivalent
        },
        redirect: "if_required",
      });

      console.log("StripeResult:", stripeRes);

      if (stripeRes.error) {
        console.error("Stripe payment error:", stripeRes.error);
        setErrorMessage(
          stripeRes.error.message || "Payment failed. Please try again."
        );
        setIsLoading(false);
        return;
      }
      if (stripeRes.paymentIntent?.status === "succeeded") {
        onClose();
        dispatch(setNumberOfCartItems(0));
        router.push("/courses");
        return;
      }

      setIsLoading(false);


    } catch (error) {
      console.error("Payment error:", error);
      setErrorMessage("Something went wrong. Please try again.");
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 ">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Complete Payment</h2>

        <button
          type="button"
          onClick={onClose}
          disabled={isLoading}
          className="text-gray-500 hover:text-black disabled:opacity-50"
        >
          ✕
        </button>
      </div>

      <PaymentElement className="" />

      {errorMessage && (
        <p className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
          {errorMessage}
        </p>
      )}

      <div className="flex gap-3">
        <button
          type="button"
          onClick={onClose}
          disabled={isLoading}
          className="flex-1 rounded-2xl bg-(--primary-light) py-4 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={!stripe || !elements || isLoading}
          className="BUTTON_STYLE flex-1 rounded-2xl py-4 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isLoading ? "Processing..." : "Pay Now"}
        </button>
      </div>
    </form>
  );
}
