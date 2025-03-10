"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const transactionSchema = new mongoose_1.Schema({
    itemID: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'listings',
    },
    buyerID: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'users',
    },
    sellerID: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'users',
    },
    status: {
        type: String,
        enum: ['pending', 'completed'],
        default: 'pending'
    },
    transactionId: { type: String, required: true, unique: true },
}, { timestamps: true });
const Transaction = (0, mongoose_1.model)('transactions', transactionSchema);
exports.default = Transaction;
