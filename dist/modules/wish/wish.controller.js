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
exports.wishControllers = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const wish_service_1 = require("./wish.service");
const wish_model_1 = __importDefault(require("./wish.model"));
const createWishe = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const wishData = { product: data === null || data === void 0 ? void 0 : data.product, email: data === null || data === void 0 ? void 0 : data.email };
    const existData = yield wish_model_1.default.findOne(wishData);
    if (existData) {
        return (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.CONFLICT,
            success: false,
            message: 'You already added this product to your wishlist',
        });
    }
    // TODO: Implement wishlist logic
    const result = yield wish_service_1.wishServices.createWisheFromDB(data);
    console.log(result);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Wishlist created successfully',
        data: result,
    });
}));
const getAllWishes = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // TODO: Implement wishlist retrieved logic
    const result = yield wish_service_1.wishServices.getAllWishFromDB(req.query);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Wishlist retrieved successfully',
        data: result,
    });
}));
const deleteWish = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // TODO: Implement wishlist deletion logic
    const { id } = req.params;
    yield wish_service_1.wishServices.deleteWishFromDB(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Wishlist deleted successfully',
    });
}));
const getSingleWish = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // TODO: Implement wishlist retrieved logic
    const { id } = req.params;
    const result = yield wish_service_1.wishServices.getSingleWisProductFromDB(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Wishlist retrieved successfully',
        data: result,
    });
}));
exports.wishControllers = {
    createWishe,
    getAllWishes,
    deleteWish,
    getSingleWish
};
