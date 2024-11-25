import { Repository } from 'typeorm'
import { AppDataSource } from '../config/database.config'
import { User } from '../entities/user.entity'
import { CreateUserDto } from '../dto/create-user.dto'
import { UdpateUserDto } from '../dto/update-user.dto'

export class UserRepository {
  private readonly userRepository: Repository<User>

  constructor() {
    this.userRepository = AppDataSource.getRepository(User)
  }

  findAll() {
    return this.userRepository.find()
  }

  findById(userId: number) {
    return this.userRepository.findOne({
      where: {
        id: userId,
      },
    })
  }

  findByEmail(email: string) {
    return this.userRepository.findOne({
      where: {
        email,
      },
    })
  }

  create(userDto: CreateUserDto) {
    const user = this.userRepository.create(userDto)
    return this.userRepository.save(user)
  }

  async update(userId: number, userDto: UdpateUserDto) {
    const userToUpdate = await this.userRepository.findOne({
      where: {
        id: userId,
      },
    })

    if (!userToUpdate) return null

    this.userRepository.merge(userToUpdate, userDto)

    return this.userRepository.save(userToUpdate)
  }
}
