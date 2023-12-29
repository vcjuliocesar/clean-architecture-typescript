import { Gender } from "../types/gender"

export interface User{
    id:number
    name:string
    phone:string
    age:number
    gender:Gender
}