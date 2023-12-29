import { CreateUserDto,UpdateUserDto } from "../dtos/user.dto";
import { UserEntity } from "../entities/user-entity";
import { User } from "./user.model";

export interface IUserService{
    create(dto:CreateUserDto):UserEntity | Promise<UserEntity>
    update(id:UserEntity['id'],changes:UpdateUserDto):UserEntity | Promise<UserEntity>
    findOne(id:UserEntity['id']):UserEntity | undefined | Promise<UserEntity | undefined>
    getAll():UserEntity[] | Promise<UserEntity[]>
    delete(id:UserEntity['id']): UserEntity[] | Promise<UserEntity[]>
}