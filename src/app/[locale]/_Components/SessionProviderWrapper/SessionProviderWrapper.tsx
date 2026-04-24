'use client'
import { SessionProvider } from "next-auth/react"
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

import { Provider } from 'react-redux'
import { store } from "@/store/redux/reduxstore";
export default function SessionProviderWrapper({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient();
  return (

    <SessionProvider>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </Provider>
    </SessionProvider>
  )
}
