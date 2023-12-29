import { CreateUserDto, UpdateUserDto } from "../../domain/dtos/user.dto";
import { UserEntity } from "../../domain/entities/user-entity";

export class UserRepository {
    private users: UserEntity[] = [];

    create(user: CreateUserDto) {
        const newUser = {
            ...user,
            id: 1
        }
        this.users.push(newUser)
        return newUser
    }

    update(id: UserEntity['id'], changes: UpdateUserDto) {
        const index = this.users.findIndex(item => item.id === id);
        const prevData = this.users[index];
        this.users[index] = {
            ...prevData,
            ...changes
        }
        return this.users[index]
    }

    findOne(id:UserEntity['id']){
        return this.users.find(item => item.id === id)
    }

    getAll(){
        return this.users
    }

    delete(id:UserEntity['id']){
       const index = this.users.findIndex(item => item.id === id)
       this.users.splice(index,1)
       return this.users
    }
}