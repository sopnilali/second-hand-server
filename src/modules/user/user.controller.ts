import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { userServices } from "./user.sevice";
import { RequestHandler } from "express";

const createUser = catchAsync(async (req, res) => {
  const result = await userServices.createUserFromDB(req.body)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User registered successfully',
    data: {
      _id: result._id,
      name: result.name,
      email: result.email,
      phonenumber: result.phonenumber,
      role: result.role
    },
  })

})

const GetUsers = catchAsync(async (req, res) => {
  const result = await userServices.getUserFromDB()
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Users are retrieved succesfully',
    data: result,
  })
})

const getUserById = catchAsync(async (req, res) => {
  const result = await userServices.getUserByIDFromDB(req.params.id)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User retrieved successfully',
    data: result,
  })
})

const updateUserContent = catchAsync(async (req, res) => {
  const userData = req.body
  const userId = req.params.id
  const result = await userServices.updateUserContentFromDB(
    userId,
    userData
  )
  if (result) {
    sendResponse(res, {
      success: true,
      message: 'User updated successfully',
      statusCode: httpStatus.OK,
      data: result,
    });
}
})

const deleteUser = catchAsync(async (req, res) => {
  const userId = req.params.id
  await userServices.deleteUserFromDB(userId)
  sendResponse(res, {
    success: true,
    message: 'User deleted successfully',
    statusCode: httpStatus.OK,
    data: [],
  })
})


export const UserController = {
  createUser,
  GetUsers,
  updateUserContent,
  getUserById,
  deleteUser
}