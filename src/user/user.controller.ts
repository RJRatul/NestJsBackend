/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Param, Body, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.interface';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll(): User[] {
    return this.userService.findAll();
  }

  @Post()
  create(@Body() user: User): User {
    return this.userService.create(user);
  }

  @Get(':id')
  findOne(@Param('id') id: string): User | undefined {
    return this.userService.findOne(Number(id));
  }

  @Delete(':id')
  delete(@Param('id') id: string): void {
    this.userService.delete(Number(id));
  }
}
