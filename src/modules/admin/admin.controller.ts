import { RequestHandler } from "express";
import { AdminService } from "./admin.service";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";
import sendResponse from "../../utils/sendResponse";
import catchAsync from "../../utils/catchAsync";




const AdminBlockUser: RequestHandler = catchAsync(async (req, res) => {
    const userId = req.params.userId;
    const user = await AdminService.UserBlockFromAdmininDB(userId)

    
    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, 'User not found');
    }

    if (user.isBlocked === true ) {
        throw new AppError(httpStatus.BAD_REQUEST, "User already blocked")
    }


    // Update the isBlocked property
    user.isBlocked = true;
    await user.save();
    sendResponse(res, {
        success: true,
        message: 'User blocked successfully',
        statusCode: httpStatus.OK,
    })

})

export const adminController = {
    AdminBlockUser,
}