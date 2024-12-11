'use client'

import { TableStack } from './table-stack'
import { useOrderById } from '@/hook/queries/use-order-by-id'
// import { useRouter } from 'next/navigation'
import { Item } from '@/types/order'
import { ColumnDef } from '@tanstack/react-table'

interface Props {
  orderId: string
}

const columns: ColumnDef<Item>[] = [
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
    accessorKey: 'total',
    cell: ({ row }) => <div className="text-left">{row.original.price}</div>,
  },
  {
    header: 'Total Productos Vendidos',
    accessorKey: 'items',
    cell: ({ row }) => <div className="text-left">{row.original.quantity}</div>,
  },
  // {
  //   header: 'Acciones',
  //   cell: ({ row }) => {
  //     return <Actions productId={row.original.id} />
  //   },
  // },
]

export function OrderPage({ orderId }: Props) {
  // const router = useRouter()

  const { order, isLoadingOrder } = useOrderById(orderId)

  if (!order) {
    // router.push('/404')
    return
  }

  return (
    <div className="p-4">
      <div className="border-b border-gray-700/20 mb-8">
        <h1 className="text-5xl font-bold mb-2">Ordenes</h1>
      </div>

      <div className="space-y-2 text-gray-700">
        <div className="flex items-center gap-2">
          <span className="font-medium">ID:</span>
          <span>{order.id}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-medium">Total:</span>
          <span>${order.total}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-medium">Estado:</span>
          <span
            className={`px-2 py-1 rounded-full text-sm ${
              order.status === 'completed'
                ? 'bg-green-100 text-green-800'
                : order.status === 'pending'
                  ? 'bg-yellow-100 text-yellow-800'
                  : 'bg-red-100 text-red-800'
            }`}
          >
            {order.status}
          </span>
        </div>
      </div>
      <div className="py-5 mt-4">
        <div className="px-4">
          <TableStack
            data={order.items}
            columns={columns}
            isLoding={isLoadingOrder}
          />
        </div>
      </div>
    </div>
  )
}
