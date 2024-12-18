'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const client = new QueryClient()

export function ReactQueryProvider({
  children,
}: {
  readonly children: React.ReactNode
}) {
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>
}
