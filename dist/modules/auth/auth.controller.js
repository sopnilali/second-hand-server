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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const auth_service_1 = require("./auth.service");
const config_1 = __importDefault(require("../../config"));
const loginUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield auth_service_1.AuthServices.loginUser(req.body);
    const { refreshToken, accessToken } = result;
    res.cookie('refreshToken', refreshToken, {
        secure: config_1.default.node_env === 'production',
        httpOnly: true,
        expires: new Date(Date.now() + 3600000 * 24 * 7),
    });
    // Send response with accessToken
    (0, sendResponse_1.default)(res, {
        success: true,
        message: 'Login successful',
        statusCode: http_status_1.default.OK,
        data: {
            accessToken: accessToken,
        },
    });
}));
//   res.status(200).json({
//     success: true,
//     message: 'Login successful',
//     statusCode: 200,
// });
const refreshToken = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { refreshToken } = req.cookies;
    const result = yield auth_service_1.AuthServices.refreshToken(refreshToken);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Access token is retrieved succesfully!',
        data: result,
    });
}));
const changePassword = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const passwordData = __rest(req.body, []);
    const result = yield auth_service_1.AuthServices.changePassword(req.user, passwordData);
    (0, sendResponse_1.default)(res, {
        success: true,
        message: 'Password changed successfully',
        statusCode: http_status_1.default.OK,
        data: result,
    });
}));
const forgetPassword = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    const result = yield auth_service_1.AuthServices.forgetPassword(email);
    (0, sendResponse_1.default)(res, {
        success: true,
        message: 'Password reset link has been sent to your email',
        statusCode: http_status_1.default.OK,
        data: result,
    });
}));
const restPassword = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let token = null;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(" ")[1];
    }
    const result = yield auth_service_1.AuthServices.restPassword(req.body, token);
    (0, sendResponse_1.default)(res, {
        success: true,
        message: 'Password reset successful',
        statusCode: http_status_1.default.OK,
        data: result,
    });
}));
const UserLogout = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.clearCookie('refreshToken', {
        secure: config_1.default.node_env === 'production',
        httpOnly: true,
    });
    (0, sendResponse_1.default)(res, {
        success: true,
        message: 'Logout successful',
        statusCode: http_status_1.default.OK,
    });
}));
exports.AuthController = {
    loginUser,
    refreshToken,
    changePassword,
    forgetPassword,
    restPassword,
    UserLogout,
};
