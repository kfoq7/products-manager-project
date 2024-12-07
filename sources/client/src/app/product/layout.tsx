'use client'

import { Header } from '@/components/header'

export default function Layout({
  children,
}: {
  readonly children: React.ReactNode
}) {
  return (
    <>
      <Header />

      {children}
    </>
  )
}
