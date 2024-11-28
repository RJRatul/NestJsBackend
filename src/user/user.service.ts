/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { User } from './user.interface';
import { NotFoundException } from '@nestjs/common';
@Injectable()
export class UserService {
    private users: User[] = [];

    // Fetch all users
    findAll(): User[] {
        return this.users;
    }

    // Add a new user
    create(user: User): User {
        const newUser = { ...user };
        if (!newUser.id) {
            newUser.id = Date.now();
        }
        this.users.push(newUser);
        return newUser;
    }



    // Find user by ID
    findOne(id: number): User | undefined {
        return this.users.find((user) => user.id === id);
    }

    // Remove user by ID
    delete(id: number): string {
        const userToDelete = this.users.find((user) => user.id === id);
        if (!userToDelete) {
          throw new NotFoundException('User not found');
        }
        this.users = this.users.filter((user) => user.id !== id);
        return `${userToDelete.name} deleted successfully`;
      }
      
}
