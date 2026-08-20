// components/payment/SuccessScreen.tsx
import { Link } from "@/i18n/navigation";

export function SuccessScreen({ locale }: { locale: string }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 text-center">
      <h1 className="text-2xl font-semibold">Payment Successful 🎉</h1>
      <p className="text-gray-600">Your course access is being set up — this usually takes a few seconds.</p>
      <Link href="/courses" className="BUTTON_STYLE rounded-2xl px-6 py-3">
        Go to My Courses
      </Link>
    </div>
  );
}