"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const wishSchema = new mongoose_1.Schema({
    product: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'listings',
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
});
const WishModel = (0, mongoose_1.model)('wish', wishSchema);
exports.default = WishModel;
