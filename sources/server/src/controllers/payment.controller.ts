import { Request, Response } from 'express'
import { handleReponseError } from '../handler/error.handler'
import { PaymentService } from '../service/payment.service'

const paymentService = new PaymentService()

export const createPayment = async (req: Request, res: Response) => {
  try {
    const paymentMethods = await paymentService.createPayment(req.body)

    res.status(200).json(paymentMethods)
  } catch (error) {
    handleReponseError(res, error)
  }
}
