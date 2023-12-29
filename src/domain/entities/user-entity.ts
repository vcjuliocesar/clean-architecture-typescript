import { User } from "../models/user.model";
import { Gender } from "../types/gender";

export class UserEntity implements User {

    id: number
    name: string
    phone: string
    age: number
    gender: Gender

    constructor(
        id: number,
        name: string,
        phone: string,
        age: number,
        gender: Gender
    ) {
        this.id = id
        this.name = name
        this.phone = phone
        this.age = age
        this.gender = gender
    }
}