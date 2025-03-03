import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { IImageFiles } from "../../interface/IImageFIle";
import { TListings } from "./listing.interface";
import Listings from "./listing.model";
import { TAuthUser } from "../auth/auth.interface";
import { User } from "../user/user.model";
import QueryBuilder from "../../builder/QueryBuilder";
import { ListingSearchableFields } from "./listing.constant";



const createListingFromDB = async (listingsData: Partial<TListings>, listingImages: IImageFiles, authUser: TAuthUser) => {

    const { images }: any = listingImages;

    if (!images || images.length === 0) {
        throw new AppError(
            httpStatus.BAD_REQUEST,
            'Lising images are required.'
        );
    }

    listingsData.images = images.map((image: any) => image.path);



    const newListing = {
        ...listingsData,
        userID: authUser._id,
    }
    const result = await Listings.create(newListing)
    return result;
}

const GetAllListingFromDB = async (query: Record<string, unknown>) => {
    const listingQuery = new QueryBuilder(Listings.find().populate('userID').populate('category'), query)
    .search(ListingSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields()

    const meta = await listingQuery.countTotal();
    const result = await listingQuery.modelQuery;

    if(!result.length){
        throw new AppError(httpStatus.NOT_FOUND, 'No listings found');
    }
    return {
        meta,
        result,
    }
}

const getSingleListingFromDB = async (listingId: string) => {
    const product = await Listings.findById(listingId).populate({
        path: 'userID',
    })
    if (!product) {
        throw new AppError(httpStatus.NOT_FOUND, 'Listing not found');
    }

    return product;
}

const updateListingFromDB = async (listingId: string, payload: Partial<TListings>, listingImages: IImageFiles, authUser: TAuthUser) => {
        
    // update logic here
    const { images } = listingImages;

    const user = await User.findById(authUser._id);
    const listings = await Listings.findOne({
        _id: listingId,
        userId: authUser._id,
    })
    if (user?.isBlocked) {
        throw new AppError(httpStatus.NOT_FOUND, 'User is blocked');
    }
    if (!listings) {
        throw new AppError(httpStatus.NOT_FOUND, 'Listing not found');
    }

    if (images && images.length > 0) {
        payload.images = images.map((image) => image.path);
     }

    return await Listings.findByIdAndUpdate(listingId, payload, { new: true });

}

const deleteListingFromDB = async (listingId: string, authUser: TAuthUser) => {
    const user = await User.findById(authUser._id);
    const listings = await Listings.findOne({
        _id: listingId,
    })

    if (user?.isBlocked) {
        throw new AppError(httpStatus.NOT_FOUND, 'User is blocked');
    }
    if (!listings) {
        throw new AppError(httpStatus.NOT_FOUND, 'Listing not found');
    }
    return await Listings.findByIdAndDelete(listingId);
 
}

export const listingServices = {
    createListingFromDB,
    GetAllListingFromDB,
    updateListingFromDB,
    deleteListingFromDB,
    getSingleListingFromDB

}