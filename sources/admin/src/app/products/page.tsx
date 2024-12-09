'use client'

import { TableStack } from '@/components/table-stack'
import { useListProducts } from '@/hook/use-list-product'
import { useQueryParams } from '@/hook/use-query-params'
import { Product } from '@/types/product'
import { ColumnDef } from '@tanstack/react-table'
import dynamic from 'next/dynamic'

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
    header: 'Acciones',
    cell: ({ row }) => {
      // TODO: Add button action to edit selected product.
      return <Actions productId={row.original.id} />
    },
  },
]

// const categories = [
//   { id: 1, name: 'Categoría 1' },
//   { id: 2, name: 'Categoría 2' },
//   { id: 3, name: 'Categoría 3' },
// ]

export default function Products() {
  const { products, isLodingProducts } = useListProducts()

  // const [formData, setFormData] = useState({
  //   name: '',
  //   description: '',
  //   price: '',
  //   categoryId: '',
  // })

  // const { saveProduct, isLoading, isError, errorMessage } = useSaveProduct()

  // const handleChange = e => {
  //   const { name, value } = e.target
  //   setFormData(prevFormData => ({
  //     ...prevFormData,
  //     [name]: value,
  //   }))
  // }

  // const handleSubmit = async e => {
  //   e.preventDefault()

  //   try {
  //     await saveProduct(formData)
  //     setFormData({ name: '', price: '', description: '', categoryId: '' })
  //   } catch (error) {
  //     console.error('No se pudo guardar el producto:', error)
  //   }
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
