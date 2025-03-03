import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { wishServices } from "./wish.service";
import WishModel from "./wish.model";


const createWishe = catchAsync (async (req, res) => {

    const data = req.body

    const wishData = {product : data?.product, email: data?.email }

    const existData = await WishModel.findOne(wishData)
    
    if(existData) {
        return sendResponse(res, {
            statusCode: httpStatus.CONFLICT,
            success: false,
            message: 'You already added this product to your wishlist',
        })
    }
    // TODO: Implement wishlist logic
    const result = await wishServices.createWisheFromDB(data)
    console.log(result)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Wishlist created successfully',
        data: result,
    })
 
})

const getAllWishes = catchAsync(async (req, res) => {
    // TODO: Implement wishlist retrieved logic
    const result = await wishServices.getAllWishFromDB(req.query)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Wishlist retrieved successfully',
        data: result,
    })
})

const deleteWish = catchAsync(async (req, res) => {
    // TODO: Implement wishlist deletion logic
    const { id } = req.params
    await wishServices.deleteWishFromDB(id)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Wishlist deleted successfully',
    })
})

const getSingleWish = catchAsync(async (req, res)=> {
    // TODO: Implement wishlist retrieved logic
    const { id } = req.params
    const result = await wishServices.getSingleWisProductFromDB(id)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Wishlist retrieved successfully',
        data: result,
    })
})

export const wishControllers = {
    createWishe,
    getAllWishes,
    deleteWish,
    getSingleWish
}