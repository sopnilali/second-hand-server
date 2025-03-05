import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import Transaction from "./transaction.model";
import { transactionServices } from "./transaction.services";
import { TAuthUser } from "../auth/auth.interface";
import { Document } from "mongoose";
import { sendMail } from "../../utils/sendEmail";
import Listings from "../listing/listing.model";
import { TListings } from "../listing/listing.interface";


const createTransation = catchAsync( async (req, res) => {

    const transactionPayload = req.body

    const item : any = await Listings.findById(transactionPayload.itemID).populate('userID')


    // TODO: Implement transaction logic

    const {createdOrder, paymentURL} = await transactionServices.createTransationFromDB(transactionPayload, req.user as TAuthUser)

    const orderData = createdOrder instanceof Document ? createdOrder.toObject() : createdOrder;

    console.log({
        image: item.images[0],
        productName: item.title,
        productPrice: item.price.toString(),
        buyerName: req.user?.name,
        sellerName: item.title,
        sellerEmail: item.userID.email,
    })

    sendMail({
        image: item.images[0],
        productName: item.title,
        productPrice: item.price,
        buyerName: req.user?.name,
        sellerName: item.title,
        sellerEmail: item.userID.email,
    })
    
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Transaction created successfully',
        data: {
            ...orderData,
            paymentURL
        },
    });
})

const getAllTransactions = catchAsync(async (req, res) => {
    const result = await transactionServices.getAllTransactionFromDB()
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Transaction retrieved successfully',
        data: result,
    });
})

const getSingleTransactions = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await transactionServices.getSingleTransactionFromDB(id)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Transaction retrieved successfully',
        data: result,
    });
})

const updateTransactionStatus = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await transactionServices.updateTransactionStatusFromDB(id, req.body)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Transaction status updated successfully',
        data: result,
    });
})

const getSalesById = catchAsync(async (req, res) => {
    const { userId } = req.params;
    const result = await transactionServices.getSalesByIdFromDB(userId)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Sales retrieved successfully',
        data: result.map(p => {
            return {
                transactionId: p._id,
                buyerID: p.buyerID,
                itemID: p.itemID,
                status: p.status,
                createdAt: p.createdAt,
                updatedAt: p.updatedAt
            }
        }),
    });
});

const getPurchasesById = catchAsync(async (req, res) => {
    const { userId } = req.params;
    const result = await transactionServices.getPurchasesByIdFromDB(userId)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Purchases retrieved successfully',
        data: result.map(p => {
            return {
                transactionId: p._id,
                sellerID: p.sellerID,
                itemID: p.itemID,
                status: p.status,
                createdAt: p.createdAt,
                updatedAt: p.updatedAt
            }
        }),
    });
})

const deleteTransaction = catchAsync(async (req, res) => {
    const { id } = req.params;
    await transactionServices.deleteTransactionFromDB(id)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Transaction deleted successfully',
        data: []
    });
})

const getSinglePurchasesHistory = catchAsync(async (req, res) => {
    const { id } = req.params;
    const {_id} = req.user

    console.log(_id)
    const result = await transactionServices.getSinglePurchasesHistoryFromDB({_id: id}, _id )
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Purchases history retrieved successfully',
        data: result,
    });
});

export const transactionController = {
    createTransation,
    getAllTransactions,
    getSalesById,
    updateTransactionStatus,
    getPurchasesById,
    getSingleTransactions,
    deleteTransaction,
    getSinglePurchasesHistory
}