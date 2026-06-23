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
import CheckSession from "../Auth/CheckSession/CheckSession";
type Props = {
  children: React.ReactNode;
  locale?: string;
};
export default function SessionProviderWrapper({ children,locale }:Props) {
const [queryClient] = useState(() => new QueryClient());
  return (
    <SessionProvider refetchInterval={4 * 60} >
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <QueryClientProvider client={queryClient}>
            <Toaster position="top-right" />
            <CheckSession >       {/* ← lives here, layout stays clean */}
              {children}
            </CheckSession>
          </QueryClientProvider>
        </PersistGate>
      </Provider>
    </SessionProvider>
  );
}
