import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './user.dto';
import { UpdateUserDto } from './updateUser.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  // Create a new user
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    console.log(createUserDto);
    const userByEmail = await this.userRepository.findOne({
      where: { email: createUserDto.email },
    });

    const userByname = await this.userRepository.findOne({
      where: { name: createUserDto.name },
    });

    // const credentialBool = (userByEmail || userByname);

    console.log(userByEmail, userByname);

    if (userByEmail || userByname) {
      throw new HttpException(
        'Email or username are taken',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const newUser = new User();
    Object.assign(newUser, createUserDto);
    console.log('newUser', newUser);
    return await this.userRepository.save(newUser);
    // const user = this.userRepository.create({ name, email, password });
    // return await this.userRepository.save(user);
  }

  // Retrieve user by ID
  async getUserById(id: number): Promise<User> {
    return await this.userRepository.findOneBy({ id });
  }

  // Update user information
  async updateUser(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.findOneBy({ id });
    Object.assign(user, updateUserDto);
    return await this.userRepository.save(user);
  }

  //delete user information
  async deleteUser(id: number): Promise<any> {
    const user = await this.userRepository.findOneBy({ id });
    console.log(user);

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return await this.userRepository.delete(id);
  }
}
