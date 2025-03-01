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
exports.listingServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const listing_model_1 = __importDefault(require("./listing.model"));
const user_model_1 = require("../user/user.model");
const createListingFromDB = (listingsData, listingImages, authUser) => __awaiter(void 0, void 0, void 0, function* () {
    const { images } = listingImages;
    if (!images || images.length === 0) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Lising images are required.');
    }
    listingsData.images = images.map((image) => image.path);
    const newListing = Object.assign(Object.assign({}, listingsData), { userID: authUser._id });
    const result = yield listing_model_1.default.create(newListing);
    return result;
});
const GetAllListingFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield listing_model_1.default.find().populate({
        path: 'userID',
    });
    return result;
});
const getSingleListingFromDB = (listingId) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield listing_model_1.default.findById(listingId).populate({
        path: 'userID',
    });
    if (!product) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Listing not found');
    }
    return product;
});
const updateListingFromDB = (listingId, payload, listingImages, authUser) => __awaiter(void 0, void 0, void 0, function* () {
    // update logic here
    const { images } = listingImages;
    const user = yield user_model_1.User.findById(authUser._id);
    const listings = yield listing_model_1.default.findOne({
        _id: listingId,
        userId: authUser._id,
    });
    if (user === null || user === void 0 ? void 0 : user.isBlocked) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'User is blocked');
    }
    if (!listings) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Listing not found');
    }
    if (images && images.length > 0) {
        payload.images = images.map((image) => image.path);
    }
    return yield listing_model_1.default.findByIdAndUpdate(listingId, payload, { new: true });
});
const deleteListingFromDB = (listingId, authUser) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findById(authUser._id);
    const listings = yield listing_model_1.default.findOne({
        _id: listingId,
    });
    if (user === null || user === void 0 ? void 0 : user.isBlocked) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'User is blocked');
    }
    if (!listings) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Listing not found');
    }
    return yield listing_model_1.default.findByIdAndDelete(listingId);
});
exports.listingServices = {
    createListingFromDB,
    GetAllListingFromDB,
    updateListingFromDB,
    deleteListingFromDB,
    getSingleListingFromDB
};
