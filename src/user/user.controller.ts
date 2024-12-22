/* eslint-disable prettier/prettier */
import { Controller, Post, Body, UsePipes, ValidationPipe, HttpException, HttpStatus, Get } from '@nestjs/common';
import { UserService } from './user.service';
// import { User } from './user.interface';
import { CreateUserDto } from './dto/create-user.dto';
// import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './user.schema';
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get()
  findAll(): Promise<User[]> {
    try{
      return this.userService.findAll();
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: 'There was a problem while procerssing the request',
      }, HttpStatus.INTERNAL_SERVER_ERROR, {
        cause: error
      });
    }
  }

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    try {
      return await this.userService.create(createUserDto);
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: 'There was a problem while procerssing the request',
      }, HttpStatus.INTERNAL_SERVER_ERROR, {
        cause: error
      });
    }

  }

  // @Get(':id')
  // findOne(@Param('id') id: string): User | undefined {
  //   return this.userService.findOne(Number(id));
  // }

  // @Delete(':id')
  // delete(@Param('id') id: string): string {
  //   const result = this.userService.delete(Number(id));
  //   return result;
  // }

  // @Patch(':id')
  // @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  // update(
  //   @Param('id') id: string,
  //   @Body() updateUserDto: UpdateUserDto
  // ): User {
  //   const updatedUser = this.userService.update(Number(id), updateUserDto);
  //   if (!updatedUser) {
  //     throw new NotFoundException(`User with ID ${id} not found`);
  //   }
  //   return updatedUser;
  // }

}
