"use client"
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { PayUserCartInvoiceProps } from "./cart.types";
import { payUserCartAction } from "@/actions/cart/cart.actions";
import { ButtonLoader } from "../Loaders/ButtonLoader/ButtonLoader";
import PaymentUi from "../payment/PaymentUi";
import { useTranslations } from "next-intl";

export default function PayUserCartInvoice({
  baskedId,
}: PayUserCartInvoiceProps) {
  const t = useTranslations();
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isPaymentOpen = !!clientSecret;
  console.log(baskedId, clientSecret)
  async function handleCheckoutPayment() {
    try {
      setIsLoading(true);
      setError(null);

      const res = await payUserCartAction(baskedId);
      console.log("ER", res);

      if (res.status !== 200 || !res.data?.clientSecret) {
        setError(t('Cart.paymentStartError'));
        setClientSecret(null)
        return;
      }

      setClientSecret(res.data.clientSecret);
    } catch (error) {
      console.error("Create payment error:", error);

      setError(t('Cart.paymentGenericError'));
    } finally {
      setIsLoading(false);
    }
  }

  function handleClosePayment() {
    setClientSecret(null);
  }

  return (
    <>
      {error && <p className="mb-3 text-sm text-red-500">{error}</p>}

      <button
        type="button"
        onClick={handleCheckoutPayment}
        disabled={isLoading || isPaymentOpen}
        className="BUTTON_STYLE flex w-full items-center justify-center gap-2 rounded-2xl py-4 text-base disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isLoading ? (
          <ButtonLoader size={30} />
        ) : (
          <>
            <span>{t('Cart.checkoutNow')}</span>

            <FontAwesomeIcon icon={faArrowRight} />
          </>
        )}
      </button>

      {clientSecret && (
        <PaymentUi clientSecret={clientSecret} onClose={handleClosePayment} />
      )}
    </>
  );
}