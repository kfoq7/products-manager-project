import { Request, Response } from 'express'
import { handleReponseError } from '../handler/error.handler'
import { OrderService } from '../service/order.service'

const orderService = new OrderService()

export const getAllOrders = async (_req: Request, res: Response) => {
  try {
    const orders = await orderService.getAllOrders()

    res.status(200).json(orders)
  } catch (error) {
    handleReponseError(res, error)
  }
}

export const getOrderById = async (req: Request, res: Response) => {
  const { orderId } = req.params

  try {
    const order = await orderService.getOrderById(Number(orderId))

    res.status(200).json(order)
  } catch (error) {
    handleReponseError(res, error)
  }
}

export const createOrder = async (req: Request, res: Response) => {
  try {
    const order = await orderService.createOrder(req.body)

    res.status(201).json(order)
  } catch (error) {
    handleReponseError(res, error)
  }
}
