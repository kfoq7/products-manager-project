import { useQuery } from '@tanstack/react-query'
import { getAllProducts } from '@/service/products.service'
import { Product } from '@/types/product'

export function useListProducts() {
  const { data, isLoading, isError } = useQuery<Product[]>({
    queryKey: ['list-products'],
    queryFn: getAllProducts,
  })

  return {
    products: data ?? [],
    isLodingProducts: isLoading,
    isErrorProducts: isError,
  }
}

// export function useSaveProduct() {
//   const [isLoading, setIsLoading] = useState(false)
//   const [isError, setIsError] = useState(false)
//   const [errorMessage, setErrorMessage] = useState('')

//   const saveProduct = async product => {
//     setIsLoading(true)
//     setIsError(false)
//     setErrorMessage('')

//     try {
//       const savedProduct = await createProduct(product)
//       console.log('Producto guardado:', savedProduct)
//       return savedProduct
//     } catch (error) {
//       setIsError(true)
//       setErrorMessage(
//         error.response?.data?.message || 'Error al guardar el producto',
//       )
//       console.error('Error al guardar el producto:', error)
//       throw error
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   return {
//     saveProduct,
//     isLoading,
//     isError,
//     errorMessage,
//   }
// }
