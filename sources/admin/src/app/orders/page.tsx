'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { usePathname, useRouter } from 'next/navigation'
import { ColumnDef } from '@tanstack/react-table'
import { TableStack } from '@/components/table-stack'
import { useListOrders } from '@/hook/queries/use-list-orders'
import { useOrderMutation } from '@/hook/mutations/use-order-mutation'
import { CreateOrder, Order } from '@/types/order'

const OrderModal = dynamic(() => import('@/components/order-form'), {
  ssr: false,
})

const Actions = ({ productId }: { productId: number }) => {
  const router = useRouter()
  const pathname = usePathname()

  return (
    <button
      onClick={() => router.push(`${pathname}/${productId}`)}
      className="py-2 px-3 bg-blue-400 text-white rounded-md transition-colors hover:bg-blue-500"
    >
      Ver detalle
    </button>
  )
}

const columns: ColumnDef<Order>[] = [
  {
    header: 'ID',
    accessorKey: 'id',
    size: 50,
    cell: ({ row }) => <div className="text-center">{row.original.id}</div>,
  },
  {
    header: 'Total',
    accessorKey: 'total',
    cell: ({ row }) => <div className="text-left">{row.original.total}</div>,
  },
  {
    header: 'Total Productos Comprados',
    accessorKey: 'items',
    cell: ({ row }) => (
      <div className="text-left">{row.original.items.length}</div>
    ),
  },
  {
    header: 'Acciones',
    cell: ({ row }) => {
      return <Actions productId={row.original.id} />
    },
  },
]

export default function Orders() {
  // const { products, isLodingProducts } = useListProducts()
  const [isModalOpen, setModalOpen] = useState(false)

  const { orders, isLoadingOrders } = useListOrders()
  const { createOrder } = useOrderMutation()

  const handleCreateOrder = (order: CreateOrder) => {
    createOrder(order)
  }

  return (
    <div className="p-4">
      <div className="border-b border-gray-700/20 mb-8">
        <h1 className="text-5xl font-bold mb-2">Ordenes</h1>
      </div>

      <div>
        <button
          onClick={() => setModalOpen(true)}
          className="bg-green-500 text-white py-2 px-4 rounded-md"
        >
          Crear Orden
        </button>
        <OrderModal
          isOpen={isModalOpen}
          onClose={() => setModalOpen(false)}
          onSubmit={handleCreateOrder}
        />
      </div>

      <div className="py-5 mt-4">
        <div className="px-4">
          <TableStack
            data={orders}
            columns={columns}
            isLoding={isLoadingOrders}
          />
        </div>
      </div>
    </div>
  )
}
