'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useStore } from '@nanostores/react'
import {
  increaseQuantity,
  decreaseQuantity,
  cartStore,
  ProductCart,
  removeProduct,
  updatePaymentMethodId,
} from '@/stores/cart'
import { usePaymentMutation } from '@/hooks/mutations/use-payment-mutation'

export default function Cart() {
  const router = useRouter()

  const {
    paymentDetails: productsStore,
    totalPrice: totalPriceStore,
    paymentMethodId,
  } = useStore(cartStore)

  const [products, setProducts] = useState<ProductCart[]>([])
  const [totalPrice, setTotalPrice] = useState<number>(0)
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState<number>(paymentMethodId)

  const { registerPaymentAsync } = usePaymentMutation()

  const handlePay = async () => {
    if (products.length === 0) {
      alert('Your cart is empty. Add products before proceeding.')
      return
    }

    if (!selectedPaymentMethod) {
      alert('Please select a payment method before proceeding.')
      return
    }

    const confirmPayment = confirm(
      `Are you sure you want to pay $${totalPrice} with payment method ID ${selectedPaymentMethod}?`,
    )
    if (confirmPayment) {
      alert('Payment successful!')

      await registerPaymentAsync(cartStore.get())

      cartStore.set({
        ...cartStore.get(),
        paymentMethodId: selectedPaymentMethod,
        totalPrice: 0,
        paymentDetails: [],
      })

      router.push('/thank-you')
    }
  }

  const handlePaymentMethodChange = (methodId: number) => {
    setSelectedPaymentMethod(methodId)
    updatePaymentMethodId(methodId)
  }

  useEffect(() => {
    setProducts(productsStore)
    setTotalPrice(totalPriceStore)
  }, [productsStore, totalPriceStore])

  return (
    <div className="container mx-auto py-8 grid grid-cols-1 md:grid-cols-[1fr_480px] gap-8">
      <div>
        <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

        {products.length === 0 ? (
          <p className="text-center text-gray-500">Your cart is empty.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border rounded-lg">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b text-left font-medium text-gray-600">
                    Product Name
                  </th>
                  <th className="py-2 px-4 border-b text-left font-medium text-gray-600">
                    Quantity
                  </th>
                  <th className="py-2 px-4 border-b text-left font-medium text-gray-600">
                    Price
                  </th>
                  <th className="py-2 px-4 border-b text-left font-medium text-gray-600">
                    Total
                  </th>
                  <th className="py-2 px-4 border-b text-left font-medium text-gray-600">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {products.map(product => (
                  <tr key={product.productId}>
                    <td className="py-2 px-4 border-b">{`Product ${product.productId}`}</td>
                    <td className="py-2 px-4 border-b flex items-center gap-2">
                      <button
                        onClick={() =>
                          decreaseQuantity(
                            product.productId,
                            product.totalPrice / product.quantity,
                          )
                        }
                        className="text-gray-600 hover:text-gray-800 font-medium"
                      >
                        -
                      </button>
                      {product.quantity}
                      <button
                        onClick={() =>
                          increaseQuantity(
                            product.productId,
                            product.totalPrice / product.quantity,
                          )
                        }
                        className="text-gray-600 hover:text-gray-800 font-medium"
                      >
                        +
                      </button>
                    </td>
                    <td className="py-2 px-4 border-b">
                      ${(product.totalPrice / product.quantity).toFixed(2)}
                    </td>
                    <td className="py-2 px-4 border-b">
                      ${product.totalPrice.toFixed(2)}
                    </td>
                    <td className="py-2 px-4 border-b">
                      <button
                        onClick={() => removeProduct(product.productId)}
                        className="text-red-500 hover:text-red-700 font-medium"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Checkout</h2>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Payment Method
          </label>
          <select
            value={selectedPaymentMethod}
            onChange={e => handlePaymentMethodChange(Number(e.target.value))}
            className="w-full border rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value={0}>-- Select Payment Method --</option>
            <option value={1}>Credit Card</option>
            <option value={2}>PayPal</option>
            <option value={3}>Bank Transfer</option>
          </select>
        </div>

        <div className="mb-6">
          <p className="text-xl font-bold">
            Total: <span className="text-green-600">${totalPrice}</span>
          </p>
        </div>

        <button
          onClick={handlePay}
          className="w-full bg-indigo-500 text-white py-2 px-4 rounded-lg hover:bg-indigo-600 focus:outline-none focus:ring focus:ring-indigo-300"
        >
          Pay
        </button>
      </div>
    </div>
  )
}
