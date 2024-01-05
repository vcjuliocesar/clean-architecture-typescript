import { CreateUserDto } from "../../../domain/dtos/user.dto";
import { UserService } from "../../../domain/service/user-service";

export class CreateUser{
    
    constructor(private userService:UserService){}

    execute(dto:CreateUserDto){
        try {
            return this.userService.create(dto)
        } catch (error) {
            throw Error(`${error}`)
        }
    }
}