import { CreateCategoryDto } from 'src/dto/create-category.dto'
import { CategoryRepository } from '../repositories/category.repository'

export class CategoryService {
  private readonly categoryRepository: CategoryRepository

  constructor() {
    this.categoryRepository = new CategoryRepository()
  }

  findAllCategories() {
    return this.categoryRepository.findAll()
  }

  findCategoryById(categoryId: number) {
    return this.categoryRepository.findById(categoryId)
  }

  createCategory(data: CreateCategoryDto) {
    return this.categoryRepository.create(data)
  }
}
