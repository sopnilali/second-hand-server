import { Types } from "mongoose";


export interface IWish {
    product:Types.ObjectId
    email: string
}