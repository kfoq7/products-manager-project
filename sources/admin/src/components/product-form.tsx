'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import AsyncSelect from 'react-select/async'
// import { useSearchParams } from 'next/navigation'
import { useProductMutation } from '@/hook/mutations/use-product-mutation'
import { getAllCategories } from '@/service/category.service'
import { useProductUpdateMutation } from '@/hook/mutations/use-product-update-mutation'
import { useQueryParams } from '@/hook/use-query-params'
// import { getProductById } from '@/service/product.service'

export default function ProductForm() {
  // const searchParams = useSearchParams()
  // const productId = searchParams.get('productId')
  const router = useRouter()

  // const [productId, setProductId] = useState()

  const { searchParams } = useQueryParams()

  const productId = searchParams.get('productId')

  const { register, handleSubmit, reset, setValue } = useForm()
  const [categoryId, setCategoryId] = useState<number | null>(null)

  const { saveProduct } = useProductMutation()
  const { updateProduct } = useProductUpdateMutation()

  useEffect(() => {
    const productId = searchParams.get('productId')
    console.log(productId)
  }, [searchParams])

  const onSubmit = async (data: {
    name?: string
    description?: string
    price?: string
    stock?: string
  }) => {
    const productPayload = {
      ...data,
      stock: parseInt(data.stock ?? '0', 10),
      price: parseFloat(data.price ?? '0'),
      categoryId,
    }

    if (productId) {
      // Edit mode: update the product
      await updateProduct(parseInt(productId, 10), productPayload)
    } else {
      // Create mode: save a new product
      saveProduct(productPayload)
    }

    reset()
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white px-4 py-2 rounded-md space-y-2"
    >
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700"
        >
          Nombre
        </label>
        <input
          id="name"
          type="text"
          {...register('name')}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          placeholder="Ingrese el nombre del producto"
        />
      </div>

      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700"
        >
          Descripción
        </label>
        <textarea
          id="description"
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          placeholder="Ingrese la descripción del producto"
          {...register('description')}
        />
      </div>

      <div>
        <label
          htmlFor="price"
          className="block text-sm font-medium text-gray-700"
        >
          Precio
        </label>
        <input
          id="price"
          type="number"
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          placeholder="Ingrese el precio del producto"
          {...register('price')}
        />
      </div>

      <div>
        <label
          htmlFor="stock"
          className="block text-sm font-medium text-gray-700"
        >
          Stock
        </label>
        <input
          id="stock"
          type="number"
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          placeholder="Ingrese la cantidad en stock"
          {...register('stock')}
        />
      </div>

      <div>
        <label
          htmlFor="Category"
          className="block text-sm font-medium text-gray-700"
        >
          Categoria
        </label>

        <AsyncSelect
          cacheOptions
          defaultOptions
          isSearchable={false}
          onChange={selectedOption => {
            setCategoryId(selectedOption?.value ?? null)
          }}
          loadOptions={async () => {
            const categories = await getAllCategories()
            return categories.map(({ id, name }) => ({
              label: name,
              value: id,
            }))
          }}
        />
      </div>

      <div className="mt-4 flex items-center gap-x-2">
        <button
          type="submit"
          className="self-end bg-blue-500 text-white py-2 rounded-md transition-colors hover:bg-blue-600 px-3"
        >
          {productId ? 'Actualizar Producto' : 'Guardar Producto'}
        </button>
        <button
          type="button"
          onClick={() => reset()}
          className="self-end bg-gray-400 text-white py-2 rounded-md transition-colors hover:bg-gray-500 px-3"
        >
          Cancelar
        </button>
      </div>
    </form>
  )
}
