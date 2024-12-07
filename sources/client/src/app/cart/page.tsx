'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useStore } from '@nanostores/react'
import {
  cartStore,
  type ProductCart,
  removeProduct,
  updatePaymentMethodId,
} from '@/stores/cart'

export default function Cart() {
  const router = useRouter()

  const { products: productsStore, paymentMethodId } = useStore(cartStore)
  const [products, setProduts] = useState<ProductCart[]>([])

  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState<number>(paymentMethodId)

  const totalPrice = products.reduce(
    (sum, product) => sum + product.price * product.quantity,
    0,
  )

  const handlePay = () => {
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

      cartStore.set({
        ...cartStore.get(),
        paymentMethodId: selectedPaymentMethod,
        products: [],
      })

      router.push('/thank-you')
    }
  }

  // Handle payment method selection
  const handlePaymentMethodChange = (methodId: number) => {
    setSelectedPaymentMethod(methodId)
    updatePaymentMethodId(methodId)
  }

  useEffect(() => {
    setProduts(productsStore)
  }, [productsStore])

  return (
    <div className="container mx-auto py-8 grid grid-cols-1 md:grid-cols-[1fr_480px] gap-8">
      {/* Cart Items Table */}
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
                    <td className="py-2 px-4 border-b">{product.quantity}</td>
                    <td className="py-2 px-4 border-b">${product.price}</td>
                    <td className="py-2 px-4 border-b">
                      ${product.price * product.quantity}
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

      {/* Payment Method and Total Section */}
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
