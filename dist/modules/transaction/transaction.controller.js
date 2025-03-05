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
const mongoose_1 = require("mongoose");
const sendEmail_1 = require("../../utils/sendEmail");
const listing_model_1 = __importDefault(require("../listing/listing.model"));
const createTransation = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const transactionPayload = req.body;
    const item = yield listing_model_1.default.findById(transactionPayload.itemID).populate('userID');
    // TODO: Implement transaction logic
    const { createdOrder, paymentURL } = yield transaction_services_1.transactionServices.createTransationFromDB(transactionPayload, req.user);
    const orderData = createdOrder instanceof mongoose_1.Document ? createdOrder.toObject() : createdOrder;
    console.log({
        image: item.images[0],
        productName: item.title,
        productPrice: item.price.toString(),
        buyerName: (_a = req.user) === null || _a === void 0 ? void 0 : _a.name,
        sellerName: item.title,
        sellerEmail: item.userID.email,
    });
    (0, sendEmail_1.sendMail)({
        image: item.images[0],
        productName: item.title,
        productPrice: item.price,
        buyerName: (_b = req.user) === null || _b === void 0 ? void 0 : _b.name,
        sellerName: item.title,
        sellerEmail: item.userID.email,
    });
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Transaction created successfully',
        data: Object.assign(Object.assign({}, orderData), { paymentURL }),
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
const getSingleTransactions = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield transaction_services_1.transactionServices.getSingleTransactionFromDB(id);
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
                transactionId: p._id,
                buyerID: p.buyerID,
                itemID: p.itemID,
                status: p.status,
                createdAt: p.createdAt,
                updatedAt: p.updatedAt
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
                transactionId: p._id,
                sellerID: p.sellerID,
                itemID: p.itemID,
                status: p.status,
                createdAt: p.createdAt,
                updatedAt: p.updatedAt
            };
        }),
    });
}));
const deleteTransaction = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    yield transaction_services_1.transactionServices.deleteTransactionFromDB(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Transaction deleted successfully',
        data: []
    });
}));
const getSinglePurchasesHistory = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { _id } = req.user;
    console.log(_id);
    const result = yield transaction_services_1.transactionServices.getSinglePurchasesHistoryFromDB({ _id: id }, _id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Purchases history retrieved successfully',
        data: result,
    });
}));
exports.transactionController = {
    createTransation,
    getAllTransactions,
    getSalesById,
    updateTransactionStatus,
    getPurchasesById,
    getSingleTransactions,
    deleteTransaction,
    getSinglePurchasesHistory
};
