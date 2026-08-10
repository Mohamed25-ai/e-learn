"use client";

import { Elements } from "@stripe/react-stripe-js";
import { stripePromise } from "./loadStripe";
import PaymentForm from "./PaymentForm";

type PaymentProps = {
  clientSecret: string;
  onClose: () => void;
};

export default function Payment({
  clientSecret,
  onClose,
}: PaymentProps) {
  return (
    <Elements
      stripe={stripePromise}
      options={{
        clientSecret,
      }}
    >
      <PaymentForm onClose={onClose} />
    </Elements>
  );
}
