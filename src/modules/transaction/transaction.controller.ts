import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import Transaction from "./transaction.model";
import { transactionServices } from "./transaction.services";
import { TAuthUser } from "../auth/auth.interface";


const createTransation = catchAsync( async (req, res) => {


    // TODO: Implement transaction logic

    const result = await transactionServices.createTransationFromDB(req.body, req.user as TAuthUser)
    
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Transaction created successfully',
        data: result,
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
                transactionID: p._id,
                buyerID: p.buyerID,
                itemID: p.itemID,
                status: p.status
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
                transactionID: p._id,
                sellerID: p.sellerID,
                itemID: p.itemID,
                status: p.status
            }
        }),
    });
})

export const transactionController = {
    createTransation,
    getAllTransactions,
    getSalesById,
    updateTransactionStatus,
    getPurchasesById
}