"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("./auth.controller");
const user_controller_1 = require("../user/user.controller");
const user_constant_1 = require("../user/user.constant");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const user_validation_1 = require("../user/user.validation");
const router = express_1.default.Router();
router.post('/register', (0, validateRequest_1.default)(user_validation_1.authValidationSchema.createUserValidationSchema), user_controller_1.UserController.createUser);
router.post('/login', auth_controller_1.AuthController.loginUser);
router.post('/logout', auth_controller_1.AuthController.UserLogout);
router.post('/refresh-token', auth_controller_1.AuthController.refreshToken);
router.post('/changed-password', (0, auth_1.default)(user_constant_1.USER_ROLE.admin), (0, auth_1.default)(user_constant_1.USER_ROLE.user), auth_controller_1.AuthController.changePassword);
// router.post('/forget-password', auth(USER_ROLE.admin, USER_ROLE.user), AuthController.forgetPassword)
// router.post('/rest-password', auth(USER_ROLE.admin, USER_ROLE.user), AuthController.restPassword)
exports.authRoutes = router;
