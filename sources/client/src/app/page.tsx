import Image from 'next/image'
import Link from 'next/link'
import { Header } from '@/components/header'

const FEATURED_PRODUCTS = [
  {
    id: 1,
    name: 'Wireless Headphones',
    price: 59.99,
    image: '/images/headphones.jpg',
  },
  {
    id: 2,
    name: 'Gaming Laptop',
    price: 999.99,
    image: '/images/laptop.jpg',
  },
  {
    id: 3,
    name: 'Smartphone',
    price: 699.99,
    image: '/images/smartphone.jpg',
  },
]

export default function Home() {
  return (
    <>
      <Header />

      <div className="text-center mt-20 pt-10 pb-16 mb-12">
        <h2 className="text-7xl font-bold text-gray-800 mb-4">
          Bienvendio a ShopEasy!
        </h2>
        <p className="text-gray-600 ">
          Descubre los mejores precio en los producto que más quieres. Compra
          ahora y disfruta de los increibles precios!
        </p>
      </div>

      <main className="container mx-auto px-4 py-8">
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Example Featured Products */}
          {FEATURED_PRODUCTS.map(product => (
            <div
              key={product.id}
              className="bg-white shadow rounded-lg p-4 flex flex-col items-center"
            >
              <Image
                src={product.image}
                alt={product.name}
                width={100}
                height={100}
                className="w-32 h-32 object-cover mb-4"
              />
              <h3 className="text-lg font-bold text-gray-800">
                {product.name}
              </h3>
              <p className="text-gray-600">${product.price.toFixed(2)}</p>
              <Link
                href={`/products/${product.id}`}
                className="mt-4 bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600"
              >
                View Details
              </Link>
            </div>
          ))}
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6">
        <div className="container mx-auto text-center">
          <p>
            &copy; {new Date().getFullYear()} ShopEasy. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  )
}
