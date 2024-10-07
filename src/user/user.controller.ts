import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { UsersService } from './user.service';
import { User } from './user.entity';
import { CreateUserDto } from './user.dto';
import { UpdateUserDto } from './updateUser.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // Create a new user
  @Post()
  async createUser(@Body() createUserdto: CreateUserDto): Promise<User> {
    return await this.usersService.createUser(createUserdto);
  }

  // Retrieve a user by ID
  @Get(':id')
  async getUserById(@Param('id') id: number): Promise<User> {
    return await this.usersService.getUserById(id);
  }

  // Update user information
  @Put(':id')
  async updateUser(
    @Param('id') id: number,
    @Body() updateuserdto: UpdateUserDto,
  ): Promise<User> {
    return await this.usersService.updateUser(id, updateuserdto);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: number): Promise<any> {
    return await this.usersService.deleteUser(id);
  }
}
