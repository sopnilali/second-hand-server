"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.wisheRoutes = void 0;
const express_1 = __importDefault(require("express"));
const wish_controller_1 = require("./wish.controller");
const router = express_1.default.Router();
router.post('/', wish_controller_1.wishControllers.createWishe);
router.get('/', wish_controller_1.wishControllers.getAllWishes);
router.get('/:id', wish_controller_1.wishControllers.getSingleWish);
router.delete('/:id', wish_controller_1.wishControllers.deleteWish);
exports.wisheRoutes = router;
