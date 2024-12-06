import { Router } from 'express'
import {
  createCategory,
  getAllCategories,
} from '../controllers/category.controller'

const router = Router()

router.get('/', getAllCategories)

router.post('/', createCategory)

export { router }
