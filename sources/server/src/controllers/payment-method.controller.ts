import { Request, Response } from 'express'
import { PaymentMethodService } from '../service/payment-method.service'
import { handleReponseError } from '../handler/error.handler'

const paymentMethodService = new PaymentMethodService()

export const getAllMethodPayment = async (req: Request, res: Response) => {
  try {
    const paymentMethods = await paymentMethodService.getAllMethodPayment()

    res.status(200).json(paymentMethods)
  } catch (error) {
    handleReponseError(res, error)
  }
}

export const createMethodPayment = async (req: Request, res: Response) => {
  try {
    const paymentMethods = await paymentMethodService.createPaymentMethod(
      req.body,
    )

    res.status(200).json(paymentMethods)
  } catch (error) {
    handleReponseError(res, error)
  }
}
