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
const listing_model_1 = __importDefault(require("../listing/listing.model"));
const transaction_model_1 = __importDefault(require("./transaction.model"));
const createTransationFromDB = (payload, authUser) => __awaiter(void 0, void 0, void 0, function* () {
    const { itemID } = payload;
    const items = yield listing_model_1.default.find({ _id: { $in: itemID } }).exec();
    const transationData = {
        buyerID: authUser._id,
        sellerID: items[0].userID,
        itemID: itemID
    };
    const result = yield transaction_model_1.default.create(transationData);
    return result;
});
const getAllTransactionFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield transaction_model_1.default.find().populate({
        path: 'buyerID',
    }).populate({
        path: 'sellerID',
    }).populate({
        path: 'itemID',
    });
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
exports.transactionServices = {
    createTransationFromDB,
    getAllTransactionFromDB,
    getSalesByIdFromDB,
    updateTransactionStatusFromDB,
    getPurchasesByIdFromDB
};
