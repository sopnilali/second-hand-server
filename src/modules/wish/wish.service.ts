import httpStatus from "http-status";
import QueryBuilder from "../../builder/QueryBuilder";
import AppError from "../../errors/AppError";
import { IWish } from "./wish.interface";
import WishModel from "./wish.model";


const createWisheFromDB = async (payload: IWish) => {

    const { product } = payload;

    const existWish = await WishModel.findOne({ product: product }).exec();
    if (existWish) {
        throw new AppError(
            httpStatus.BAD_REQUEST,
            "You've already added this product to your wishlist"
        );
    }
    const result = await WishModel.create(payload);
    return result;
}

const getAllWishFromDB = async (query: Record<string, unknown>) => {
    const wishQuery = new QueryBuilder(WishModel.find().populate(
        {
            path: 'product',
            populate: {
                path: 'category'
            }
        }), query)
        .search(['email'])
        .filter()
        .sort()
        .paginate()
        .fields()

    const result = await wishQuery.modelQuery
    const meta = await wishQuery.countTotal();
    return {
        result,
        meta,
    };
}

const getSingleWisProductFromDB = async (id: string) => {
    const result = await WishModel.findById(id).populate('product');
    if (!result) {
        throw new AppError(httpStatus.NOT_FOUND, 'No wish found');
    }
    return result;
}

const deleteWishFromDB = async (id: string) => {
    const result = await WishModel.findByIdAndDelete({_id: id});
    if (!result) {
        throw new AppError(httpStatus.NOT_FOUND, 'No wish found');
    }
    return result;
}


export const wishServices = {
    createWisheFromDB,
    getAllWishFromDB,
    getSingleWisProductFromDB,
    deleteWishFromDB
};