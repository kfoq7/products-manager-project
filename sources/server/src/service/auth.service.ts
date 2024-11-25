import bcrypt from 'bcrypt'
import { CreateUserDto } from '../dto/create-user.dto'
import { LoginDto } from '../dto/login.dto'
import { UserRepository } from '../repositories/user.repository'

export class AuthService {
  private readonly userRepository: UserRepository

  constructor() {
    this.userRepository = new UserRepository()
  }

  async register(userDto: CreateUserDto) {
    const { password, ...restUserDto } = userDto

    const hashedPassword = await bcrypt.hash(password, 5)

    const { password: _, ...resUserData } = await this.userRepository.create({
      ...restUserDto,
      password: hashedPassword,
    })

    return resUserData
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto

    const user = await this.userRepository.findByEmail(email)

    if (!user) {
      throw new Error('User does not exist!')
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      throw new Error('Wrong password')
    }

    const { password: _, ...restUserDat } = user

    return {
      ...restUserDat,
    }
  }
}
