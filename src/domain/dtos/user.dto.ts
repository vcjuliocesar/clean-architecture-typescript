import { User } from "../models/user.model";

export interface CreateUserDto extends Omit<User, 'id'> { }

export interface UpdateUserDto extends Partial<CreateUserDto> { }

export interface FindUserDto extends Partial<User> { }

export interface FindByEmailDto extends Omit<User, 'id' | 'name' | 'phone' | 'age' | 'gender' | 'password'> { }