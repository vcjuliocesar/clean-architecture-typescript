import { Gender } from "../types/gender"

export interface User{
    id:number
    name:string
    phone:string
    email:string
    age:number
    gender:Gender
    password:string
}