import { Request, Response } from 'express'
import { handleReponseError } from '../handler/error.handler'
import { CategoryService } from '../service/category.service'

const categoryService = new CategoryService()

export const getAllCategories = async (req: Request, res: Response) => {
  try {
    const categories = await categoryService.findAllCategories()

    res.status(200).json(categories)
  } catch (error) {
    handleReponseError(res, error)
  }
}

export const createCategory = async (req: Request, res: Response) => {
  try {
    const product = await categoryService.createCategory(req.body)

    res.status(201).json(product)
  } catch (error) {
    handleReponseError(res, error)
  }
}
