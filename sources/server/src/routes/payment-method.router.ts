import { Router } from 'express'
import {
  createMethodPayment,
  getAllMethodPayment,
} from '../controllers/payment-method.controller'

const router = Router()

router.get('/', getAllMethodPayment)

router.post('/', createMethodPayment)

export { router }
