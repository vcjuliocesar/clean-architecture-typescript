import { CreateUserDto } from "../../../../src/domain/dtos/user.dto"
import { UserService } from "../../../../src/domain/service/user-service"
import { Gender } from "../../../../src/domain/types/gender"
import { ClientConfig } from "../../../../src/infrastructure/config/config"
import { Database } from "../../../../src/infrastructure/config/database"
import { UserRepository } from "../../../../src/infrastructure/repositories/user-repository"

const mockDb = async () => {
    const client = Database.getInstance(ClientConfig)

    await client.connect()

    return client
}

const repository = async () => {
    const client = await mockDb()

    return new UserRepository(client)
}

const service = async () => {
    const userRepository = await repository()
    
    return new UserService(userRepository)
}

describe('User Service: create user',()=>{
    it('can register an user',async()=> {
        const userService = await service()
        const user:CreateUserDto = {
            name: "Jhon Doe",
            phone: "4455667788",
            age: 20,
            gender:Gender.M 
        }
        userService.create(user)
    })
})