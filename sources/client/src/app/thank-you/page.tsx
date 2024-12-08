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
          Thank You for Your Payment!
        </h1>
        <p className="text-lg mb-6">
          Your payment was successful. A confirmation email has been sent to
          your registered email address.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={handleGoToHome}
            className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Back to Home
          </button>
          <button
            onClick={handleViewOrders}
            className="px-6 py-3 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
          >
            View My Orders
          </button>
        </div>
      </div>
    </div>
  )
}
