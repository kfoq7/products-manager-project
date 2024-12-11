import { PaymentPage } from '@/components/payment-page'

export default async function Sale({
  params,
}: {
  params: Promise<{ saleId: string }>
}) {
  const saleId = (await params).saleId

  return <PaymentPage paymentId={saleId} />
}
