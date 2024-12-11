'use client'

import { useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { ColumnDef } from '@tanstack/react-table'
import { TableStack } from '@/components/table-stack'
import { useListPayment } from '@/hook/queries/use-list-payment'
import { Payment } from '@/types/payment'

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

const columns: ColumnDef<Payment>[] = [
  {
    header: 'ID',
    accessorKey: 'id',
    size: 50,
    cell: ({ row }) => <div className="text-center">{row.original.id}</div>,
  },
  {
    header: 'Total Precio en venta',
    accessorKey: 'totalPrice',
    cell: ({ row }) => (
      <div className="text-center">{row.original.totalPrice}</div>
    ),
  },
  {
    header: 'Fecha creacion',
    accessorKey: 'createdAt',
    cell: ({ row }) => (
      <div className="text-center">{row.original.createdAt}</div>
    ),
  },
  {
    header: 'Acciones',
    cell: ({ row }) => {
      return <Actions productId={row.original.id} />
    },
  },
]

export default function Sales() {
  const { payments, isLoadingPayments } = useListPayment()
  const [startDate, setStartDate] = useState<string>('')
  const [endDate, setEndDate] = useState<string>('')
  const [filteredPayments, setFilteredPayments] = useState<Payment[] | null>(
    null,
  )

  const handleFilter = () => {
    if (payments) {
      const filtered = payments.filter(payment => {
        const createdAt = new Date(payment.createdAt)
        const start = startDate ? new Date(startDate) : null
        const end = endDate ? new Date(endDate) : null

        return (!start || createdAt >= start) && (!end || createdAt <= end)
      })
      setFilteredPayments(filtered)
    }
  }

  return (
    <div className="p-4">
      <div className="border-b border-gray-700/20 mb-8">
        <h1 className="text-5xl font-bold mb-2">Ventas</h1>
      </div>

      <div className="py-5 mt-4">
        <h2 className="text-2xl font-semibold mb-4">Filtrar por Fechas</h2>
        <div className="flex gap-4 items-center mb-4">
          <input
            type="date"
            value={startDate}
            onChange={e => setStartDate(e.target.value)}
            className="border border-gray-300 rounded-md p-2"
          />
          <input
            type="date"
            value={endDate}
            onChange={e => setEndDate(e.target.value)}
            className="border border-gray-300 rounded-md p-2"
          />
          <button
            onClick={handleFilter}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Filtrar
          </button>
        </div>

        <div className="px-4">
          <TableStack
            data={filteredPayments ?? payments ?? []}
            columns={columns}
            isLoding={isLoadingPayments}
          />
        </div>
      </div>
    </div>
  )
}
