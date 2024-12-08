'use client'

import { TableStack } from '@/components/table-stack'
import { useListProducts, useSaveProduct } from '@/hook/use-list-product'
import { Product } from '@/types/product'
import { ColumnDef } from '@tanstack/react-table'
import { useState } from 'react'

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

const categories = [
  { id: 1, name: 'Categoría 1' },
  { id: 2, name: 'Categoría 2' },
  { id: 3, name: 'Categoría 3' },
]

export default function Products() {
  const { products, isLodingProducts } = useListProducts()

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    categoryId: '',
  })

  const { saveProduct, isLoading, isError, errorMessage } = useSaveProduct()

  const handleChange = e => {
    const { name, value } = e.target
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value,
    }))
  }

  const handleSubmit = async e => {
    e.preventDefault()

    try {
      await saveProduct(formData)
      setFormData({ name: '', price: '', description: '', categoryId: '' })
    } catch (error) {
      console.error('No se pudo guardar el producto:', error)
    }
  }

  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold mb-4">Productos</h1>
      <div className="border rounded-lg p-4 w-full">
        <h2 className="text-xl font-medium mb-4">Añadir nuevo producto</h2>

        <form onSubmit={handleSubmit} className="w-full gap-4 flex flex-col">
          <div className="w-full flex flex-col gap-4">
            <input
              name="name"
              type="text"
              placeholder="Nombre de producto"
              value={formData.name}
              onChange={handleChange}
              className="py-2 rounded-lg bg-transparent border px-4 outline-gray-700"
            />
            <input
              name="price"
              type="number"
              placeholder="Precio de producto"
              value={formData.price}
              onChange={handleChange}
              className="py-2 rounded-lg bg-transparent border px-4 outline-gray-700"
            />
            <textarea
              name="description"
              cols={30}
              rows={2}
              placeholder="Descripción de producto"
              value={formData.description}
              onChange={handleChange}
              className="p-2 rounded-lg bg-transparent border px-4 outline-gray-700"
            ></textarea>
            <select
              name="categoryId"
              value={formData.categoryId}
              onChange={handleChange}
              className="py-2 rounded-lg bg-transparent border px-4 outline-gray-700"
            >
              <option value="">Selecciona una categoría</option>
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="py-2 px-4 bg-blue-400 text-white rounded-md transition-colors hover:bg-blue-500"
            >
              {isLoading ? 'Guardando...' : 'Añadir producto'}
            </button>

            {isError && <div className="text-red-500 mt-4">{errorMessage}</div>}
          </div>
        </form>
      </div>
      <div className="mt-4">
        <TableStack
          data={products}
          columns={columns}
          isLoding={isLodingProducts}
        />
      </div>
    </main>
  )
}
