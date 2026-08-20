// components/payment/ProcessingScreen.tsx
export function ProcessingScreen({ locale }: { locale: string }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 text-center">
      <h1 className="text-2xl font-semibold">Confirming Your Payment</h1>
      <p className="text-gray-600">
        This can take a moment for some payment methods. We'll email you once it's confirmed.
      </p>
    </div>
  );
}