import { Router } from 'express'
import {
  createOrder,
  getAllOrders,
  getOrderById,
} from '../controllers/order.controller'

const router = Router()

router.get('/', getAllOrders)

router.get('/:orderId', getOrderById)

router.post('/', createOrder)

export { router }
