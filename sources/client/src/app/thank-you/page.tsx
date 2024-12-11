'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function ThankYouPage() {
  const router = useRouter()

  useEffect(() => {
    // Clear cart data or perform any post-payment cleanup if needed
    localStorage.removeItem('cart') // Example: Clear cart stored in localStorage
  }, [])

  const handleGoToHome = () => {
    router.push('/')
  }

  const handleViewOrders = () => {
    router.push('/orders') // Redirect to user's order history
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800">
      <div className="bg-white p-8 shadow-md rounded-md text-center">
        <h1 className="text-3xl font-bold mb-4 text-green-600">
          Gracias por comprar!
        </h1>
        <p className="text-lg mb-6">
          Tu pago fue exitoso. Se ha enviado un correo de confirmación a tu
          dirección de correo electrónico registrada.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={handleGoToHome}
            className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Regresar a inicio
          </button>
          <button
            onClick={handleViewOrders}
            className="px-6 py-3 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
          >
            Ver mis compras
          </button>
        </div>
      </div>
    </div>
  )
}
