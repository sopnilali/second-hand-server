import { Types } from "mongoose"

export interface TListings {
    title: string
    description: string
    price: number
    condition: string
    category: Types.ObjectId;
    images: string[]
    userID: Types.ObjectId;
    status: string
}

export interface TMeta {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}