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
exports.transactionServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const listing_model_1 = __importDefault(require("../listing/listing.model"));
const transaction_model_1 = __importDefault(require("./transaction.model"));
const transaction_utils_1 = require("./transaction.utils");
const sslcommerz_service_1 = require("../sslcommerz/sslcommerz.service");
const createTransationFromDB = (payload, authUser) => __awaiter(void 0, void 0, void 0, function* () {
    const { itemID } = payload;
    const items = yield listing_model_1.default.findOne({ _id: itemID }).exec();
    const existingTransaction = yield transaction_model_1.default.findOne({ itemID: itemID }).exec();
    if (existingTransaction) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Sold Out");
    }
    const transactionId = (0, transaction_utils_1.generateTransactionId)();
    const transationData = {
        transactionId: transactionId,
        buyerID: authUser._id,
        sellerID: items === null || items === void 0 ? void 0 : items.userID._id,
        itemID: itemID
    };
    const paymentResponse = yield sslcommerz_service_1.SSLCommerzService.initiatePayment({
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
    const createdOrder = yield transaction_model_1.default.create(transationData);
    return {
        createdOrder,
        paymentURL: paymentResponse
    };
});
const getAllTransactionFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield transaction_model_1.default.find().populate({
        path: 'buyerID',
    }).populate({
        path: 'sellerID',
    }).populate({
        path: 'itemID',
    }).sort("-createdAt");
    return result;
});
const getSingleTransactionFromDB = (transactionId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield transaction_model_1.default.find({ transactionId: transactionId }).populate({
        path: 'buyerID',
    }).populate({
        path: 'sellerID',
    }).populate({
        path: 'itemID',
    }).sort("-createdAt");
    return result;
});
const getSinglePurchasesHistoryFromDB = (id, buyerId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield transaction_model_1.default.findOne({ _id: id, buyerID: buyerId }).populate({
        path: 'buyerID',
    }).populate({
        path: 'sellerID',
    }).populate({
        path: 'itemID',
    }).sort("-createdAt");
    return result;
});
const updateTransactionStatusFromDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    // check if the transaction exists
    const transaction = yield transaction_model_1.default.findById(id);
    const listing = yield listing_model_1.default.findById(transaction === null || transaction === void 0 ? void 0 : transaction.itemID);
    if (!transaction) {
        throw new Error("Transaction does not exist");
    }
    if ((listing === null || listing === void 0 ? void 0 : listing.status) === 'sold') {
        throw new Error("Transaction status is already completed");
    }
    // check if the transaction status is updated to 'completed' before updating the status
    yield listing_model_1.default.updateOne({ _id: transaction.itemID }, { status: "sold" }, { new: true });
    const result = yield transaction_model_1.default.findByIdAndUpdate(id, { status: "completed" }, {
        new: true,
    });
    return result;
});
const getSalesByIdFromDB = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield transaction_model_1.default.find({ sellerID: userId }).populate({
        path: 'buyerID',
    }).populate({
        path: 'sellerID',
    }).populate({
        path: 'itemID',
    });
    return result;
});
const getPurchasesByIdFromDB = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield transaction_model_1.default.find({ buyerID: userId }).populate({
        path: 'buyerID',
    }).populate({
        path: 'sellerID',
    }).populate({
        path: 'itemID',
    });
    return result;
});
const deleteTransactionFromDB = (orderId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield transaction_model_1.default.findByIdAndDelete(orderId);
    return result;
});
exports.transactionServices = {
    createTransationFromDB,
    getAllTransactionFromDB,
    getSalesByIdFromDB,
    updateTransactionStatusFromDB,
    getPurchasesByIdFromDB,
    getSingleTransactionFromDB,
    deleteTransactionFromDB,
    getSinglePurchasesHistoryFromDB
};
