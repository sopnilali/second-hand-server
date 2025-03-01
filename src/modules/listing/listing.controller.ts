import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { listingServices } from "./listing.service";
import { JwtPayload } from "jsonwebtoken";
import { IImageFiles } from "../../interface/IImageFIle";
import { TAuthUser } from "../auth/auth.interface";


const createListing = catchAsync( async (req, res) => {
    
    // TODO: Add validation for required fields and check if user exists

 
    const result = await listingServices.createListingFromDB(req.body, req.files as IImageFiles, req.user as TAuthUser );

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Listing created successfully',
        data: result,
      })
})

const GetAllListing = catchAsync( async (req, res) => {
    const result = await listingServices.GetAllListingFromDB()
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Listings retrieved successfully',
        data: result,

    })
})

const updateListing = catchAsync(async (req, res) => {
    const {
      user,
      body: payload,
      params: { id },
    } = req;
  
    const result = await listingServices.updateListingFromDB(
      id,
      payload,
      req.files as IImageFiles,
      user as TAuthUser
    );
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Listing updated successfully",
      data: result,
    });
  });

  //details listings 

  const getSingleListing = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await listingServices.getSingleListingFromDB(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Listing retrieved successfully",
        data: result,
    })
  })

  // hard delete
const deleteListing = catchAsync(async (req, res) => {
    const {
      user,
      params: { id },
    } = req;
  
    const result = await listingServices.deleteListingFromDB(
        id,
      user as TAuthUser
    );
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Listing deleted successfully",
      data: result,
    });
  });


export const ListingController = {
    createListing,
    GetAllListing,
    updateListing,
    deleteListing,
    getSingleListing
}