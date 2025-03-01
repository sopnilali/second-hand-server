import { Types } from "mongoose"

export interface TListings {
    title: string
    description: string
    price: number
    condition: string
    images: string[]
    userID: Types.ObjectId;
    status: string
}