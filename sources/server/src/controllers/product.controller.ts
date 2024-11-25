import { Request, Response } from 'express'
import { ProductService } from '../service/product.service'
import { handleReponseError } from '../handler/error.handler'

const productService = new ProductService()

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await productService.getAllProducts()

    res.status(200).json(products)
  } catch (error) {
    handleReponseError(res, error)
  }
}

export const getProductById = async (req: Request, res: Response) => {
  const { productId } = req.params

  try {
    const product = await productService.getProductById(Number(productId))

    res.status(200).json(product)
  } catch (error) {
    handleReponseError(res, error)
  }
}

export const createProduct = async (req: Request, res: Response) => {
  try {
    const product = await productService.createProduct(req.body)

    res.status(201).json(product)
  } catch (error) {
    handleReponseError(res, error)
  }
}

export const updateProduct = async (req: Request, res: Response) => {
  const { productId } = req.params

  try {
    const product = await productService.updateProduct(
      Number(productId),
      req.body,
    )

    res.status(200).json(product)
  } catch (error) {
    handleReponseError(res, error)
  }
}
