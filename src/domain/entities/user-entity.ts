import { User } from "../models/user.model";
import { Gender } from "../types/gender";

export class UserEntity implements User {

    id: number
    name: string
    phone: string
    email:string
    age: number
    gender: Gender
    password: string

    constructor(
        id: number,
        name: string,
        phone: string,
        email:string,
        age: number,
        gender: Gender,
        password:string
    ) {
        this.id = id
        this.name = name
        this.phone = phone
        this.email = email
        this.age = age
        this.gender = gender
        this.password = password
    }
}