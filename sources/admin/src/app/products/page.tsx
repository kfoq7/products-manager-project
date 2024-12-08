'use client'

import { TableStack } from '@/components/table-stack'
import { useListProducts } from '@/hook/use-list-product'
import { Product } from '@/types/product'
import { ColumnDef } from '@tanstack/react-table'

const columns: ColumnDef<Product>[] = [
  {
    header: 'ID',
    accessorKey: 'id',
    size: 50,
    cell: ({ row }) => <div className="text-center">{row.original.id}</div>,
  },
  {
    header: 'Nombre',
    accessorKey: 'name',
    size: 100,
    cell: ({ row }) => <div className="text-left">{row.original.name}</div>,
  },
  {
    header: 'Descripción',
    accessorKey: 'description',
    cell: ({ row }) => (
      <div className="text-left">{row.original.description}</div>
    ),
  },
  {
    header: 'Acciones',
    cell: () => {
      // TODO: Add button action to edit selected product.
      return (
        <button className="py-2 px-3 bg-yellow-400 text-white rounded-md transition-colors hover:bg-yellow-500">
          Editar
        </button>
      )
    },
  },
]

export default function Products() {
  const { products, isLodingProducts } = useListProducts()

  return (
    <main>
      <div className="px-4">
        <TableStack
          data={products}
          columns={columns}
          isLoding={isLodingProducts}
        />
      </div>
    </main>
  )
}
