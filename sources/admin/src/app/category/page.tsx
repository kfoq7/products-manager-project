'use client'

import CategoryForm from '@/components/category-form'
import { TableStack } from '@/components/table-stack'
import { useListCategory } from '@/hook/queries/use-list-category'
import { useQueryParams } from '@/hook/use-query-params'
import { Category } from '@/types/product'
import { ColumnDef } from '@tanstack/react-table'

const Actions = ({ categoryId }: { categoryId: number }) => {
  const { addQueryParam } = useQueryParams()

  return (
    <button
      onClick={() => addQueryParam('categoryId', `${categoryId}`)}
      className="py-2 px-3 bg-yellow-400 text-white rounded-md transition-colors hover:bg-yellow-500"
    >
      Editar
    </button>
  )
}

const columns: ColumnDef<Category>[] = [
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
      <div className="text-left">
        {row.original.description ?? 'No description'}
      </div>
    ),
  },
  {
    header: 'Acciones',
    cell: ({ row }) => {
      return <Actions categoryId={row.original.id} />
    },
  },
]

export default function Categories() {
  const { categories, isLoadingCategories } = useListCategory()

  return (
    <div className="p-4">
      <div className="border-b border-gray-700/20 mb-8">
        <h1 className="text-5xl font-bold mb-2">Categorias</h1>
      </div>

      <CategoryForm />

      <div className="py-5 mt-4">
        <div className="px-4">
          <TableStack
            data={categories}
            columns={columns}
            isLoding={isLoadingCategories}
          />
        </div>
      </div>
    </div>
  )
}
