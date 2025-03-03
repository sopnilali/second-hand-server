import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import { categoryServices } from "./category.service";
import sendResponse from "../../utils/sendResponse";
import { IImageFile, } from "../../interface/IImageFIle";


const createCategory = catchAsync(async (req, res) => {
    // TODO: Implement category creation logic
    const result = await categoryServices.createCategoryFromDB(req.body, req.file as IImageFile)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Category created successfully',
        data: result,
    })
 });

 const getAllCategories = catchAsync(async (req, res) => {
    // TODO: Implement category retrieved logic
    const result = await categoryServices.getAllCategoriesFromDB(req.query)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'All Categories retrieved successfully',
        data: result,
    })
 })

 const singleCategorybyId = catchAsync(async (req, res) => {
    // TODO: Implement category retrieved by id logic
    const result = await categoryServices.singleCategoryFromDB(req.params.id)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Category Details retrieved successfully',
        data: result,
    })
 })

 const updateCategory = catchAsync(async (req, res) => {
    // TODO: Implement category update logic
    const result = await categoryServices.updateCategoryFromDB(req.params.id, req.body, req.file as IImageFile)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Category updated successfully',
        data: result,
    })
 })

 const deleteCategory = catchAsync(async (req, res) => {
    // TODO: Implement category deletion logic
    await categoryServices.deleteCategoryFromDB(req.params.id)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Category deleted successfully',
    })
 })

 export const categoryController = {
    createCategory,
    getAllCategories,
    updateCategory,
    deleteCategory,
    singleCategorybyId
 }