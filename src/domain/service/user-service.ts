import { UserRepository } from "../../infrastructure/repositories/user-repository";
import { CreateUserDto, UpdateUserDto } from "../dtos/user.dto";
import { UserEntity } from "../entities/user-entity";
import { IUserService } from "../models/user-service.model";
import { User } from "../models/user.model";

export class UserService implements IUserService{

    constructor(private repository:UserRepository){}

    create(dto: CreateUserDto): UserEntity {
        return this.repository.create(dto) 
    }

    update(id: UserEntity['id'], changes: UpdateUserDto): UserEntity | Promise<UserEntity> {
        return this.repository.update(id,changes)
    }

    findOne(id: UserEntity['id']): UserEntity | Promise<UserEntity | undefined> | undefined {
        return this.repository.findOne(id)
    }
    
    getAll(): UserEntity[] | Promise<UserEntity[]> {
        return this.repository.getAll()
    }

    delete(id: UserEntity['id']): UserEntity[] | Promise<UserEntity[]> {
        return this.repository.delete(id)
    }
}