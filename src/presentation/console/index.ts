import { CreateUserDto } from "../../domain/dtos/user.dto";
import { UserService } from "../../domain/service/user-service";
import { Gender } from "../../domain/types/gender";
import { UserRepository } from "../../infrastructure/repositories/user-repository";

const repository = new UserRepository()

const user:CreateUserDto = {
    name: "Jhon Doe",
    phone: "jhon.doe@yopmail.com",
    age: 20,
    gender:Gender.M
}

const userService = new UserService(repository)

const result = userService.create(user)

console.log(result)

const update = userService.update(1,{
    name:'new Name'
})

console.log(update)

const findOne = userService.findOne(1)

console.log(findOne)

const getAll = userService.getAll()

console.log(getAll)

const deleteU = userService.delete(1)

console.log(deleteU)