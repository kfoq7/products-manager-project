import { ProductRepository } from '../repositories/product.repository'
import { CreateProductDto } from '../dto/create-product.dto'
import { UpdateProductDto } from '../dto/update-product.dto'

export class ProductService {
  private readonly productRepository: ProductRepository

  constructor() {
    this.productRepository = new ProductRepository()
  }

  getAllProducts() {
    return this.productRepository.findAll()
  }

  getProductById(productId: number) {
    return this.productRepository.findById(productId)
  }

  createProduct(productDto: CreateProductDto) {
    return this.productRepository.create(productDto)
  }

  async updateProduct(productId: number, productDto: UpdateProductDto) {
    const product = await this.productRepository.update(productId, productDto)

    if (!product) throw new Error('Product not found')

    return product
  }
}
