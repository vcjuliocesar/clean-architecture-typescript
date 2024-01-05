import { UserRepository } from "../../infrastructure/repositories/user-repository";
import { CreateUserDto, FindByEmailDto, UpdateUserDto } from "../dtos/user.dto";
import { UserEntity } from "../entities/user-entity";
import { IUserService } from "../models/user-service.model";
import { User } from "../models/user.model";

export class UserService implements IUserService{

    constructor(private repository:UserRepository){}

    create(dto: CreateUserDto): UserEntity | Promise<UserEntity> {
        const exists = this.findByEmail(dto)

        if (exists) {
            throw Error(`"El usuario ${dto.name} ya está registrado`)
        }
        return this.repository.create(dto) 
    }

    update(id: UserEntity['id'], changes: UpdateUserDto): UserEntity | Promise<UserEntity> {
        return this.repository.update(id,changes)
    }

    findByEmail(dto: FindByEmailDto): UserEntity | Promise<UserEntity | undefined> | undefined {
        return this.repository.findByEmail(dto)
    }
    // findOne(dto:FindUserDto): UserEntity | Promise<UserEntity | undefined> | undefined {
    //     return this.repository.findOne(dto)
    // }
    
    getAll(): UserEntity[] | Promise<UserEntity[]> {
        return this.repository.getAll()
    }

    delete(id: UserEntity['id']): UserEntity[] | Promise<UserEntity[]> {
        return this.repository.delete(id)
    }
}