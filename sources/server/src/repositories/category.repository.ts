import { Repository } from 'typeorm'
import { AppDataSource } from '../config/database.config'
import { Category } from '../entities/category.entity'
import { CreateCategoryDto } from '../dto/create-category.dto'

export class CategoryRepository {
  private readonly categoryRepository: Repository<Category>

  constructor() {
    this.categoryRepository = AppDataSource.getRepository(Category)
  }

  findAll() {
    return this.categoryRepository.find()
  }

  findById(categoryId: number) {
    return this.categoryRepository.findOne({
      where: {
        id: categoryId,
      },
    })
  }

  create(data: CreateCategoryDto) {
    const category = this.categoryRepository.create(data)
    return this.categoryRepository.save(category)
  }
}
