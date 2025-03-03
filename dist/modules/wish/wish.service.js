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
exports.wishServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const wish_model_1 = __importDefault(require("./wish.model"));
const createWisheFromDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { product } = payload;
    const existWish = yield wish_model_1.default.findOne({ product: product }).exec();
    if (existWish) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "You've already added this product to your wishlist");
    }
    const result = yield wish_model_1.default.create(payload);
    return result;
});
const getAllWishFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const wishQuery = new QueryBuilder_1.default(wish_model_1.default.find().populate({
        path: 'product',
        populate: {
            path: 'category'
        }
    }), query)
        .search(['email'])
        .filter()
        .sort()
        .paginate()
        .fields();
    const result = yield wishQuery.modelQuery;
    const meta = yield wishQuery.countTotal();
    return {
        result,
        meta,
    };
});
const getSingleWisProductFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield wish_model_1.default.findById(id).populate('product');
    if (!result) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'No wish found');
    }
    return result;
});
const deleteWishFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield wish_model_1.default.findByIdAndDelete({ _id: id });
    if (!result) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'No wish found');
    }
    return result;
});
exports.wishServices = {
    createWisheFromDB,
    getAllWishFromDB,
    getSingleWisProductFromDB,
    deleteWishFromDB
};
