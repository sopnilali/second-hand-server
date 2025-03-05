import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { TAuthUser } from "../auth/auth.interface";
import Listings from "../listing/listing.model";
import { ITransaction } from "./transaction.interface";
import Transaction from "./transaction.model";
import { generateTransactionId } from "./transaction.utils";
import { SSLCommerzService } from "../sslcommerz/sslcommerz.service";
import { TListings } from "../listing/listing.interface";


const createTransationFromDB = async (payload : ITransaction, authUser: TAuthUser) => {

    const { itemID } = payload;

    const items : any = await Listings.findOne({ _id: itemID }).exec();

    const existingTransaction = await Transaction.findOne({ itemID: itemID }).exec();


    if (existingTransaction) {
        throw new AppError(
            httpStatus.BAD_REQUEST,
            "Sold Out"
        );
    }

    const transactionId = generateTransactionId();
    
    const transationData = {
        transactionId : transactionId,
        buyerID: authUser._id,
        sellerID: items?.userID._id, 
        itemID: itemID
    }

    const paymentResponse = await SSLCommerzService.initiatePayment({
        total_amount: items.price,
        currency: 'BDT',
        tran_id: transactionId,
        success_url: `${process.env.CLIENT_URL}/order/${transactionId}`,
        fail_url: `${process.env.CLIENT_URL}/order/order-fail/${transactionId}`,
        cancel_url: `${process.env.CLIENT_URL}/order/order-cancel/${transactionId}`,
        shipping_method: 'Courier',
        product_name: 'N/A.',
        product_category: 'N/A',
        product_profile: 'general',
        cus_name: 'N/A',
        cus_email: 'N/A',
        cus_add1: 'Dhaka',
        cus_add2: 'Dhaka',
        cus_city: 'Dhaka',
        cus_state: 'Dhaka',
        cus_postcode: '1000',
        cus_country: 'Bangladesh',
        cus_phone: '01711111111',
        cus_fax: '01711111111',
        ship_name: 'N/A',
        ship_add1: 'Dhaka',
        ship_add2: 'Dhaka',
        ship_city: 'Dhaka',
        ship_state: 'Dhaka',
        ship_postcode: 1000,
        ship_country: 'Bangladesh',
      });



    const createdOrder = await Transaction.create(transationData)


    return {
        createdOrder,
        paymentURL : paymentResponse
    };
}




const getAllTransactionFromDB = async () => {
    const result = await Transaction.find().populate({
        path: 'buyerID',
    }).populate({
        path: 'sellerID',
    }).populate({
        path: 'itemID',
    }).sort("-createdAt")
    return result;
}

const getSingleTransactionFromDB = async (transactionId: string) => {
    const result = await Transaction.find({transactionId: transactionId}).populate({
        path: 'buyerID',
    }).populate({
        path: 'sellerID',
    }).populate({
        path: 'itemID',
    }).sort("-createdAt")
    return result;
}

const getSinglePurchasesHistoryFromDB = async (id: any, buyerId: any)=> {
    const result = await Transaction.findOne({ _id: id, buyerID: buyerId}).populate({
        path: 'buyerID',
    }).populate({
        path:'sellerID',
    }).populate({
        path: 'itemID',
    }).sort("-createdAt")
    return result;
}

const updateTransactionStatusFromDB = async (
    id: string,
    payload: { status: string }
) => {

    // check if the transaction exists

    const transaction = await Transaction.findById(id)
    const listing = await Listings.findById(transaction?.itemID)

    if (!transaction) {
        throw new Error("Transaction does not exist");
    }
    if (listing?.status === 'sold') {
        throw new Error("Transaction status is already completed");
    }

    // check if the transaction status is updated to 'completed' before updating the status
    await Listings.updateOne({ _id: transaction.itemID }, { status: "sold" }, { new: true })

    const result = await Transaction.findByIdAndUpdate(id, { status: "completed" }, {
        new: true,
    })
    return result;
}

const getSalesByIdFromDB = async (userId: string) => {
    const result = await Transaction.find({ sellerID: userId }).populate({
        path: 'buyerID',
    }).populate({
        path: 'sellerID',
    }).populate({
        path: 'itemID',
    })
    return result;
}

const getPurchasesByIdFromDB = async (userId: string) => {
    const result = await Transaction.find({ buyerID: userId }).populate({
        path: 'buyerID',
    }).populate({
        path: 'sellerID',
    }).populate({
        path: 'itemID',
    })
    return result;
}

const deleteTransactionFromDB = async (orderId: string) => {
    const result = await Transaction.findByIdAndDelete(orderId)
    return result;
}

export const transactionServices = {
    createTransationFromDB,
    getAllTransactionFromDB,
    getSalesByIdFromDB,
    updateTransactionStatusFromDB,
    getPurchasesByIdFromDB,
    getSingleTransactionFromDB,
    deleteTransactionFromDB,
    getSinglePurchasesHistoryFromDB
}