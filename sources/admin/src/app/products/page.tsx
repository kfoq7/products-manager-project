'use client'

import dynamic from 'next/dynamic'
import { TableStack } from '@/components/table-stack'
import { useListProducts } from '@/hook/use-list-product'
import { useQueryParams } from '@/hook/use-query-params'
import { Product } from '@/types/product'
import { ColumnDef } from '@tanstack/react-table'

const ProductForm = dynamic(() => import('@/components/product-form'), {
  ssr: false,
})

const Actions = ({ productId }: { productId: number }) => {
  const { addQueryParam } = useQueryParams()

  return (
    <button
      onClick={() => addQueryParam('productId', `${productId}`)}
      className="py-2 px-3 bg-yellow-400 text-white rounded-md transition-colors hover:bg-yellow-500"
    >
      Editar
    </button>
  )
}

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
    header: 'Precio',
    accessorKey: 'price',
    cell: ({ row }) => <div className="text-left">{row.original.price}</div>,
  },
  {
    header: 'Stock',
    accessorKey: 'stock',
    cell: ({ row }) => <div className="text-left">{row.original.stock}</div>,
  },
  {
    header: 'Acciones',
    cell: ({ row }) => {
      return <Actions productId={row.original.id} />
    },
  },
]

export default function Products() {
  const { products, isLodingProducts } = useListProducts()

  // }

  return (
    <div className="p-4">
      <div className="border-b border-gray-700/20 mb-8">
        <h1 className="text-5xl font-bold mb-2">Productos</h1>
      </div>

      <ProductForm />

      <div className="py-5 mt-4">
        <div className="px-4">
          <TableStack
            data={products}
            columns={columns}
            isLoding={isLodingProducts}
          />
        </div>
      </div>
    </div>
  )
}
