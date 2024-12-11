import { Router } from 'express'
import {
  createPayment,
  getAllPayments,
  getPayemntById,
} from '../controllers/payment.controller'

const router = Router()

router.get('/', getAllPayments)

router.get('/:paymentId', getPayemntById)

router.post('/', createPayment)

export { router }
