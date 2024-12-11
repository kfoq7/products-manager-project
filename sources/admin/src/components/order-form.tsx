'use client'

import { useForm, useFieldArray } from 'react-hook-form'
import Select, { SingleValue } from 'react-select'
import { CreateOrder } from '@/types/order'
import { useListProducts } from '@/hook/use-list-product'
import { useState } from 'react'
import { toast } from 'react-toastify'

interface OrderModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (order: CreateOrder) => void
}

export default function OrderModal({
  isOpen,
  onClose,
  onSubmit,
}: OrderModalProps) {
  const { register, handleSubmit, control, reset, watch } =
    useForm<CreateOrder>({
      defaultValues: {
        userId: 1,
        total: 0,
        items: [{ productId: 0, quantity: 0, price: 0 }],
      },
    })

  const [selectedOption, setSelectedOption] = useState<
    SingleValue<{ value: number; label: string; price: number }>
  >({
    value: 0,
    label: '',
    price: 0,
  })

  const { products, isLodingProducts } = useListProducts()

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'items',
  })

  const items = watch('items')

  const calculateTotal = () => {
    return items.reduce((total, item) => total + item.quantity * item.price, 0)
  }

  const handleFormSubmit = (data: CreateOrder) => {
    const user = (localStorage.getItem('user') ?? {}) as { id: number }

    if (!user.id) {
      toast.error('No estas logueado')
      return
    }

    const order = {
      ...data,
      userId: user.id,
      total: calculateTotal(),
    }

    onSubmit(order)
    reset()
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-md w-1/2">
        <h2 className="text-lg font-semibold mb-4">Crear Orden</h2>
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
          {/* <div>
            <label
              htmlFor="userId"
              className="block text-sm font-medium text-gray-700"
            >
              ID de Usuario
            </label>
            <input
              id="userId"
              type="number"
              {...register('userId', { required: true })}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              placeholder="Ingrese el ID del usuario"
            />
          </div> */}

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Productos
            </label>
            {fields.map((field, index) => (
              <div key={field.id} className="flex items-center gap-x-2 mb-2">
                <div className="flex-1">
                  <Select
                    placeholder="Seleccionar producto"
                    isLoading={isLodingProducts}
                    value={selectedOption}
                    onChange={selectedOption => {
                      const newProductId = selectedOption?.value ?? 0
                      const newPrice = selectedOption?.price ?? 0
                      const newItems = [...items]
                      newItems[index] = {
                        ...newItems[index],
                        productId: newProductId,
                        price: newPrice,
                      }
                      reset({ items: newItems })
                      setSelectedOption(selectedOption)
                    }}
                    options={products.map(({ id, name, price }) => ({
                      value: id,
                      label: name,
                      price,
                    }))}
                  />
                </div>
                <input
                  type="number"
                  placeholder="Cantidad"
                  {...register(`items.${index}.quantity`, {
                    required: true,
                    min: 1,
                    setValueAs: v => parseInt(v),
                  })}
                  className="w-24 p-2 border border-gray-300 rounded-md"
                />
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  Eliminar
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => append({ productId: 0, quantity: 0, price: 0 })}
              className="text-blue-500 hover:underline"
            >
              Agregar Producto
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Total: ${calculateTotal().toFixed(2)}
            </label>
          </div>

          <div className="flex items-center justify-end gap-x-2">
            <button
              type="button"
              onClick={() => {
                reset()
                onClose()
              }}
              className="bg-gray-400 text-white py-2 px-4 rounded-md transition-colors hover:bg-gray-500"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-md transition-colors hover:bg-blue-600"
            >
              Guardar Orden
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
