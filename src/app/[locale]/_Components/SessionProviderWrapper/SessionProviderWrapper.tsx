"use client";
import { Provider } from "react-redux";
import { persistor, store } from "@/store/redux/reduxstore";
import { PersistGate } from "redux-persist/integration/react";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { SessionProvider } from "next-auth/react";
import { useState } from "react";
export default function SessionProviderWrapper({ children }: { children: React.ReactNode }) {
const [queryClient] = useState(() => new QueryClient());
  return (
    <SessionProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <QueryClientProvider client={queryClient}>
            <Toaster position="top-right" />
            {children}
          </QueryClientProvider>
        </PersistGate>
      </Provider>
    </SessionProvider>
  );
}
