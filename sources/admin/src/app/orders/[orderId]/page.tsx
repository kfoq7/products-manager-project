import { OrderPage } from '@/components/order-page'

export default async function OrderDetail({
  params,
}: {
  params: Promise<{ orderId: string }>
}) {
  const orderId = (await params).orderId

  return <OrderPage orderId={orderId} />
}
