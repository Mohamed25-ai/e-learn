// components/payment/FailedScreen.tsx
import { Link } from "@/i18n/navigation";

export function FailedScreen({ locale, message }: { locale: string; message: string }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 text-center">
      <h1 className="text-2xl font-semibold text-red-600">Payment Not Completed</h1>
      <p className="text-gray-600">{message}</p>
      <Link href="/cart" className="BUTTON_STYLE rounded-2xl px-6 py-3">
        Back to Cart
      </Link>
    </div>
  );
}