"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.transactionRoutes = void 0;
const express_1 = __importDefault(require("express"));
const transaction_controller_1 = require("./transaction.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_constant_1 = require("../user/user.constant");
const router = express_1.default.Router();
router.get('/transactions', transaction_controller_1.transactionController.getAllTransactions);
router.post('/transactions', (0, auth_1.default)(user_constant_1.USER_ROLE.user), transaction_controller_1.transactionController.createTransation);
router.put('/transactions/:id', (0, auth_1.default)(user_constant_1.USER_ROLE.user), transaction_controller_1.transactionController.updateTransactionStatus);
router.get('/sales/:userId', (0, auth_1.default)(user_constant_1.USER_ROLE.user), transaction_controller_1.transactionController.getSalesById);
router.get('/purchases/:userId', (0, auth_1.default)(user_constant_1.USER_ROLE.user), transaction_controller_1.transactionController.getPurchasesById);
exports.transactionRoutes = router;
