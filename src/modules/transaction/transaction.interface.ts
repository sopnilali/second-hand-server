import { Types } from "mongoose"

export interface ITransaction {
    buyerID?: string
    sellerID?: string
    itemID?: string[]
    status?: string
}

export interface ITransactionInput {
  itemID: string;
}
  