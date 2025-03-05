import { Types } from "mongoose"
import { TUser } from "../user/user.interface"

export interface TListings {
    title: string
    description: string
    price: number
    condition: string
    category: Types.ObjectId;
    images: string[]
    userID: TUser;
    status: string
    
} 

export interface TMeta {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}