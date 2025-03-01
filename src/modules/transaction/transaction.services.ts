import { TAuthUser } from "../auth/auth.interface";
import Listings from "../listing/listing.model";
import { User } from "../user/user.model";
import { TTransaction } from "./transaction.interface";
import Transaction from "./transaction.model";


const createTransationFromDB = async (payload: TTransaction,  authUser: TAuthUser ) => {

    // check if the item is available for sale
    const item = await Listings.findById({_id: payload.itemID})
    if (!item) {
        throw new Error("Item is not available for sale");
    }

    const transationData = {
        buyerID: authUser._id,
        sellerID: item.userID,
        itemID: payload.itemID
    }

    const result = await Transaction.create(transationData)
    return result;
}

const getAllTransactionFromDB = async () => {
    const result = await Transaction.find().populate({
        path: 'buyerID',
    }).populate({
        path:'sellerID',
    }).populate({
        path:'itemID',
    })
    return result;
}

const updateTransactionStatusFromDB = async (
    id: string,
    payload: {status: string}
) => {

    // check if the transaction exists

    const transaction = await Transaction.findById(id)
    const listing = await Listings.findById(transaction?.itemID)

    if (!transaction) {
        throw new Error("Transaction does not exist");
    }
    if (listing?.status === 'sold' ) {
        throw new Error("Transaction status is already completed");
    }

    // check if the transaction status is updated to 'completed' before updating the status
    await Listings.updateOne({_id: transaction.itemID}, {status : "sold"}, { new: true })

    const result = await Transaction.findByIdAndUpdate(id, {status: "completed"}, {
        new: true,
    })
    return result;
}

const getSalesByIdFromDB = async (userId : string)=> {
    const result = await Transaction.find({ sellerID: userId }).populate({
        path: 'buyerID',
    }).populate({
        path:'sellerID',
    }).populate({
        path:'itemID',
    })
    return result;
}

const getPurchasesByIdFromDB = async (userId : string)=> {
    const result = await Transaction.find({ buyerID: userId }).populate({
        path: 'buyerID',
    }).populate({
        path:'sellerID',
    }).populate({
        path:'itemID',
    })
    return result;
}

export const transactionServices = {
    createTransationFromDB,
    getAllTransactionFromDB,
    getSalesByIdFromDB,
    updateTransactionStatusFromDB,
    getPurchasesByIdFromDB
}