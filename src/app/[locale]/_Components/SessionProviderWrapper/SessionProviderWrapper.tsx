'use client'
import { SessionProvider } from "next-auth/react"
import { Provider } from 'react-redux'
import { persistor, store } from "@/store/redux/reduxstore";
import { PersistGate } from "redux-persist/integration/react";
import {useQuery,useMutation,useQueryClient,QueryClient,QueryClientProvider,} from '@tanstack/react-query'
export default function SessionProviderWrapper({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient();
  return (

    <SessionProvider>
      <Provider store={store}>
        <PersistGate persistor={persistor} >
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
        </PersistGate>
      </Provider>
    </SessionProvider>
  )
}
