'use client'

import { ColumnDef } from '@tanstack/react-table'
import { TableStack } from './table-stack'
import { usePaymentById } from '@/hook/queries/use-payment-id'
import { PaymentDetail } from '@/types/payment'

interface Props {
  paymentId: string
}

const columns: ColumnDef<PaymentDetail>[] = [
  {
    header: 'ID',
    accessorKey: 'id',
    size: 50,
    cell: ({ row }) => <div className="text-center">{row.original.id}</div>,
  },
  {
    header: 'Cantidad',
    accessorKey: 'quantity',
    cell: ({ row }) => <div className="text-left">{row.original.quantity}</div>,
  },
  {
    header: 'Total',
    accessorKey: 'totalPrice',
    cell: ({ row }) => (
      <div className="text-left">{row.original.totalPrice}</div>
    ),
  },
  {
    header: 'Producto',
    accessorKey: 'product.name',
    cell: ({ row }) => (
      <div className="text-left">{row.original.product?.name}</div>
    ),
  },
]

export function PaymentPage({ paymentId }: Props) {
  const { payment, isLoadingPayment } = usePaymentById(paymentId)

  if (!payment) {
    return null
  }

  return (
    <div className="p-4">
      <div className="border-b border-gray-700/20 mb-8">
        <h1 className="text-5xl font-bold mb-2">Detalles de la Venta</h1>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <span className="font-medium">ID:</span>
          <span>{payment.id}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-medium">Total Price:</span>
          <span>${payment.totalPrice}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-medium">Created At:</span>
          <span>{new Date(payment.createdAt).toLocaleString()}</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="font-medium">Payment Method:</span>
          <span>{payment.paymentMethod.name}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-medium">User Email:</span>
          <span>{payment.user.email}</span>
        </div>
      </div>

      <div className="py-5 mt-4">
        <h2 className="text-2xl font-semibold mb-4">Detalles de Productos</h2>
        <div className="px-4">
          <TableStack
            data={payment.paymetDetail ?? []}
            columns={columns}
            isLoding={isLoadingPayment}
          />
        </div>
      </div>
    </div>
  )
}
