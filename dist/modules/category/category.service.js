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
exports.categoryServices = void 0;
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const category_constant_1 = require("./category.constant");
const category_model_1 = __importDefault(require("./category.model"));
// create a new category 
//* create category into database
const createCategoryFromDB = (categoryData, categoryImages) => __awaiter(void 0, void 0, void 0, function* () {
    const category = new category_model_1.default(Object.assign(Object.assign({}, categoryData), { image: categoryImages === null || categoryImages === void 0 ? void 0 : categoryImages.path }));
    const result = yield category.save();
    return result;
});
// get all categories
const getAllCategoriesFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const categoryQuery = new QueryBuilder_1.default(category_model_1.default.find(), query)
        .search(category_constant_1.CategorySearchableFields)
        .filter()
        .sort()
        .paginate()
        .fields();
    const result = yield categoryQuery.modelQuery;
    const meta = yield categoryQuery.countTotal();
    return {
        result,
        meta,
    };
});
const updateCategoryFromDB = (categoryId, categoryData, categoryImages) => __awaiter(void 0, void 0, void 0, function* () {
    // update category
    const category = Object.assign(Object.assign({}, categoryData), { image: categoryImages === null || categoryImages === void 0 ? void 0 : categoryImages.path });
    const result = yield category_model_1.default.findByIdAndUpdate(categoryId, category, { new: true });
    return result;
});
const singleCategoryFromDB = (categoryId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield category_model_1.default.findById(categoryId);
    return result;
});
const deleteCategoryFromDB = (categoryId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield category_model_1.default.findByIdAndDelete(categoryId);
    return result;
});
exports.categoryServices = {
    createCategoryFromDB,
    getAllCategoriesFromDB,
    updateCategoryFromDB,
    singleCategoryFromDB,
    deleteCategoryFromDB
};
