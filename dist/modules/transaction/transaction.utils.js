"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateTransactionId = generateTransactionId;
const crypto_1 = __importDefault(require("crypto"));
function generateTransactionId() {
    const timestamp = Date.now().toString(); // Current timestamp in milliseconds
    const randomPart = crypto_1.default.randomBytes(4).toString('hex');
    return `TXN-${timestamp}-${randomPart}`;
}
