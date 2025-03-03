"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryRoute = void 0;
const express_1 = __importDefault(require("express"));
const category_controller_1 = require("./category.controller");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const category_validation_1 = require("./category.validation");
const bodyParser_1 = require("../../middlewares/bodyParser");
const multer_config_1 = require("../../config/multer.config");
const router = express_1.default.Router();
router.post('/', multer_config_1.multerUpload.single('image'), bodyParser_1.parseBody, (0, validateRequest_1.default)(category_validation_1.categoryValidation.createCategoryValidationSchema), category_controller_1.categoryController.createCategory);
router.get('/', category_controller_1.categoryController.getAllCategories);
router.put('/:id', multer_config_1.multerUpload.single('image'), bodyParser_1.parseBody, (0, validateRequest_1.default)(category_validation_1.categoryValidation.updateCategoryValidationSchema), category_controller_1.categoryController.updateCategory);
router.delete('/:id', category_controller_1.categoryController.deleteCategory);
router.get('/:id', category_controller_1.categoryController.singleCategorybyId);
exports.categoryRoute = router;
