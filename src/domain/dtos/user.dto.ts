import { User } from "../models/user.model";

export interface CreateUserDto extends Omit<User,'id'>{}

export interface UpdateUserDto extends Partial<CreateUserDto>{}