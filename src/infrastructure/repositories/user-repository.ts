import { CreateUserDto, FindByEmailDto, FindUserDto, UpdateUserDto } from "../../domain/dtos/user.dto";
import { UserEntity } from "../../domain/entities/user-entity";
import { Database } from "../config/database";

export class UserRepository {
    private users: UserEntity[] = [];

    constructor(private client: Database){}

    async create(user: CreateUserDto) {
        
        const sql = 'INSERT INTO users (name,phone,email,age,gender,password) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *'
        
        const values = Object.values(user)
        
        const query = await this.client.query(sql,values)

        const newUser = {
            ...user,
            id:<number>query.rows[0].id
        }
        
        //console.log("USer",newUser)
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

    async findByEmail(dto:FindByEmailDto){
        const query = await this.client.query('SELECT * FROM users WHERE email = $1',[dto.email])
        if (query.rows.length == 0) {
            return undefined
        }
        console.log("ROWS",query.rows[0])
        return query.rows[0]
    }

    findOne(dto:FindUserDto){
        // const query = await this.client.query('SELECT * FROM users WHERE id = $1',[id])
        // console.log(query)
        // return query
        //return this.users.find(item => item.id === id)
    }

    getAll(){
        return this.users
    }

    async delete(id:UserEntity['id']){
        const text = 'DELETE FROM users WHERE id = $1'
        const query = await this.client.query(text,[id])
    
        const index = this.users.findIndex(item => item.id === id)
        this.users.splice(index,1)
        return this.users
    }
}