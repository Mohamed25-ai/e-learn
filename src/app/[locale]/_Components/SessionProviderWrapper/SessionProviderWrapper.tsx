'use client'
import { SessionProvider } from "next-auth/react"
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

export default function SessionProviderWrapper({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient();
  return (

    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </SessionProvider>
  )
}
