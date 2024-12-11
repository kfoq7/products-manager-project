import { Request, Response } from 'express'
import { handleReponseError } from '../handler/error.handler'
import { PaymentService } from '../service/payment.service'

const paymentService = new PaymentService()

export const getAllPayments = async (_req: Request, res: Response) => {
  try {
    const orders = await paymentService.findAllPayments()

    res.status(200).json(orders)
  } catch (error) {
    handleReponseError(res, error)
  }
}

export const getPayemntById = async (req: Request, res: Response) => {
  try {
    const orders = await paymentService.findPaymentById(
      Number(req.params.paymentId),
    )

    res.status(200).json(orders)
  } catch (error) {
    handleReponseError(res, error)
  }
}

export const createPayment = async (req: Request, res: Response) => {
  try {
    const paymentMethods = await paymentService.createPayment(req.body)

    res.status(200).json(paymentMethods)
  } catch (error) {
    handleReponseError(res, error)
  }
}
