import Payment from "./Payment";
import { PaymentUiProps } from "./payment.types";

export default function PaymentUi({ clientSecret, onClose }: PaymentUiProps) {
  return (
    <section className="fixed inset-0 z-50 overflow-y-auto bg-black/50">
      <div className="flex min-h-full items-center justify-center p-6">
        <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl">
          <Payment clientSecret={clientSecret} onClose={onClose} />
        </div>
      </div>
    </section>
  );
}
