import { AppDataSource } from '../config/database.config'
import { CreateProductDto } from '../dto/create-product.dto'
import { UpdateProductDto } from '../dto/update-product.dto'
import { Product } from '../entities/product.entity'
import { Repository } from 'typeorm'

export class ProductRepository {
  private readonly productRepository: Repository<Product>

  constructor() {
    this.productRepository = AppDataSource.getRepository(Product)
  }

  findAll() {
    return this.productRepository.find({
      relations: {
        category: true,
      },
    })
  }

  findById(productId: number) {
    return this.productRepository.findOne({
      where: {
        id: productId,
      },
      relations: {
        category: true,
      },
    })
  }

  create(productDto: CreateProductDto) {
    const { categoryId, ...restProductDto } = productDto

    const product = this.productRepository.create({
      ...restProductDto,
      category: {
        id: categoryId,
      },
    })

    return this.productRepository.save(product)
  }

  async update(productId: number, productDto: UpdateProductDto) {
    const productToUpdate = await this.productRepository.findOne({
      where: {
        id: productId,
      },
      relations: {
        category: true,
      },
    })

    if (!productToUpdate) return null

    const { categoryId, ...restProductDto } = productDto

    this.productRepository.merge(productToUpdate, {
      ...restProductDto,
      category: {
        id: categoryId,
      },
    })

    return this.productRepository.save(productToUpdate)
  }
}
