"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const listingSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    condition: {
        type: String,
        required: true,
    },
    images: {
        type: [String],
        required: true,
    },
    userID: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'users',
        required: true,
    },
    status: {
        type: String,
        enum: ['available', 'sold'],
        default: 'available'
    },
}, { timestamps: true });
const Listings = (0, mongoose_1.model)('listings', listingSchema);
exports.default = Listings;
