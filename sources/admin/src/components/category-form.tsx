'use client'

import { useCategoryMutate } from '@/hook/mutations/use-category-mutation'
import { useCategoryUpdate } from '@/hook/mutations/use-category-update'
import { useCategoryById } from '@/hook/queries/use-category-by-id'
import { useQueryParams } from '@/hook/use-query-params'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

interface Category {
  name: string
  description: string
}

export default function CategoryForm() {
  const { searchParams, removeQueryParam } = useQueryParams()

  const categoryId = searchParams.get('categoryId')

  const { register, handleSubmit, reset, setValue } = useForm<Category>()

  const { category } = useCategoryById(categoryId)
  const { updateCategory } = useCategoryUpdate()
  const { createCategory } = useCategoryMutate()

  const onSubmit = (data: Category) => {
    if (!data.name.trim()) {
      toast.warn('El nombre de la categoría es obligatorio')
      return
    }

    if (categoryId) {
      updateCategory({
        ...data,
        id: Number(categoryId),
      })
    } else {
      // console.log(data)
      createCategory(data)
    }

    reset()
  }

  useEffect(() => {
    if (!categoryId) return
    setValue('name', category?.name ?? '')
    setValue('description', category?.description ?? '')
  }, [categoryId, category, setValue])

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white px-4 py-2 rounded-md space-y-4"
    >
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700"
        >
          Nombre de la Categoría
        </label>
        <input
          id="name"
          type="text"
          {...register('name', { required: true })}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          placeholder="Ingrese el nombre de la categoría"
        />
      </div>

      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700"
        >
          Descripción de la Categoría
        </label>
        <textarea
          id="description"
          {...register('description')}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          placeholder="Ingrese la descripción de la categoría"
        />
      </div>

      <div className="mt-4 flex items-center gap-x-2">
        <button
          type="submit"
          onClick={() => removeQueryParam('categoryId')}
          className="bg-blue-500 text-white py-2 rounded-md transition-colors hover:bg-blue-600 px-3"
        >
          {categoryId ? 'Actualizar Categoría' : 'Guardar Categoría'}
        </button>
        <button
          type="button"
          onClick={() => {
            removeQueryParam('categoryId')
            reset()
          }}
          className="bg-gray-400 text-white py-2 rounded-md transition-colors hover:bg-gray-500 px-3"
        >
          Cancelar
        </button>
      </div>
    </form>
  )
}
