'use client'

import Link from 'next/link'
import { useStore } from '@nanostores/react'
import { cartStore } from '@/stores/cart'

export function Header() {
  const { products } = useStore(cartStore)

  const totalQuantity = products.reduce(
    (sum, product) => sum + product.quantity,
    0,
  )

  return (
    <header className="bg-indigo-600 text-white py-4 shadow-md">
      <div className="container mx-auto flex items-center justify-between px-4">
        <Link href="/">
          <h1 className="text-xl font-bold cursor-pointer">My Store</h1>
        </Link>

        <nav className="flex items-center gap-4">
          <Link
            href="/product"
            className="text-white hover:text-gray-200 font-medium"
          >
            Products
          </Link>
          <Link
            href="/about"
            className="text-white hover:text-gray-200 font-medium"
          >
            About
          </Link>
        </nav>

        <Link href="/cart" className="relative group">
          <button className="flex items-center gap-2 text-white hover:text-gray-200 font-medium">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 3h2l.401 2m0 0a1.5 1.5 0 001.465 1.21h9.269a1.5 1.5 0 001.465-1.21l.401-2m-13 0h12.196m-6.098 6.5a4.5 4.5 0 100 9 4.5 4.5 0 000-9zm6-3.5v.5a3.5 3.5 0 01-3.5 3.5h-7a3.5 3.5 0 01-3.5-3.5V6a2.5 2.5 0 012.5-2.5h9A2.5 2.5 0 0117 6v.5z"
              />
            </svg>
            Cart
          </button>

          {totalQuantity > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
              {totalQuantity}
            </span>
          )}
        </Link>
      </div>
    </header>
  )
}
