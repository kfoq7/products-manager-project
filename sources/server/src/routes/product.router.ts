import { Router } from 'express'
import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
} from '../controllers/product.controller'

const router = Router()

router.get('/', getAllProducts)

router.get('/:productId', getProductById)

router.post('/', createProduct)

router.put('/:productId', updateProduct)

export { router }
