"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.transactionController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const transaction_services_1 = require("./transaction.services");
const createTransation = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // TODO: Implement transaction logic
    const result = yield transaction_services_1.transactionServices.createTransationFromDB(req.body, req.user);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Transaction created successfully',
        data: result,
    });
}));
const getAllTransactions = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield transaction_services_1.transactionServices.getAllTransactionFromDB();
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Transaction retrieved successfully',
        data: result,
    });
}));
const updateTransactionStatus = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield transaction_services_1.transactionServices.updateTransactionStatusFromDB(id, req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Transaction status updated successfully',
        data: result,
    });
}));
const getSalesById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    const result = yield transaction_services_1.transactionServices.getSalesByIdFromDB(userId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Sales retrieved successfully',
        data: result.map(p => {
            return {
                transactionID: p._id,
                buyerID: p.buyerID,
                itemID: p.itemID,
                status: p.status
            };
        }),
    });
}));
const getPurchasesById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    const result = yield transaction_services_1.transactionServices.getPurchasesByIdFromDB(userId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Purchases retrieved successfully',
        data: result.map(p => {
            return {
                transactionID: p._id,
                sellerID: p.sellerID,
                itemID: p.itemID,
                status: p.status
            };
        }),
    });
}));
exports.transactionController = {
    createTransation,
    getAllTransactions,
    getSalesById,
    updateTransactionStatus,
    getPurchasesById
};
