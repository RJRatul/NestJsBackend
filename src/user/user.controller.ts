/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Param, Body, Delete, Patch, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.interface';
import { CreateUserDto } from './dto/create-user.dto';
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll(): User[] {
    return this.userService.findAll();
  }

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  create(@Body() createUserDto: CreateUserDto): User {
    return this.userService.create(createUserDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string): User | undefined {
    return this.userService.findOne(Number(id));
  }

  @Delete(':id')
  delete(@Param('id') id: string): string {
    const result = this.userService.delete(Number(id));
    return result;
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserDto: Partial<User> 
  ): User | undefined {
    const updatedUser = this.userService.update(Number(id), updateUserDto);
    return updatedUser; 
  }
}
