import { Router } from 'express'
import {
  createCategory,
  getAllCategories,
  getCategoryById,
} from '../controllers/category.controller'

const router = Router()

router.get('/', getAllCategories)

router.get('/:categoryId', getCategoryById)

router.post('/', createCategory)

router.put('/:categoryId', createCategory)

export { router }
