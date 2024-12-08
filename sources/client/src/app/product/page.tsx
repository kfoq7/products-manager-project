'use client'

// import Image from 'next/image'
import { useListProduct } from '@/hooks/queries/use-list-product'
import { addProduct } from '@/stores/cart'

export default function ProductsPage() {
  const { products, isLoadingProducts } = useListProduct()

  if (isLoadingProducts) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-xl text-gray-500">Loading products...</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8 text-center">All Products</h1>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products &&
          products.map(product => (
            <li
              key={product.id}
              className="bg-white shadow-lg rounded-lg p-4 hover:shadow-xl transition-shadow"
            >
              {/* <Image
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover rounded-t-lg"
            /> */}
              <h2 className="text-lg font-bold mt-4">{product.name}</h2>
              <p className="text-gray-600 mt-2">{product.description}</p>
              <p className="text-indigo-500 font-bold mt-4">${product.price}</p>
              <button
                onClick={() => addProduct(product.id, product.price)}
                className="py-2 px-3 bg-indigo-400 rounded-md text-white hover:bg-indigo-600"
              >
                Agregar a carrito
              </button>
            </li>
          ))}
      </ul>
    </div>
  )
}
