import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { TUser } from "./user.interface";
import { User } from "./user.model";


const createUserFromDB = async (userData: TUser) => {
    const result = await User.create(userData)
    return result;
}

const getUserFromDB = async () => {
    const result = await User.find()
    return result;

}


const getUserByIDFromDB = async (id: string,) => {
    const userdata = await User.findById(id)
    if (!userdata){
        throw new AppError(httpStatus.NOT_FOUND, 'User not found');
    }
    const result = await User.findOne({ _id: id })
    return result;

}

const updateUserContentFromDB = async (
    id: string,
    payload: TUser
) => {
    const userdata = await User.findById(id)
    if (!userdata){
        throw new AppError(httpStatus.NOT_FOUND, 'User not found');
    }
    const result = await User.findByIdAndUpdate(id, payload, {
        new: true,
    })
    return result
}

const deleteUserFromDB = async (id: string) => {
    const userdata = await User.findById(id)
    if (!userdata){
        throw new AppError(httpStatus.NOT_FOUND, 'User not found');
    }
    const result = await User.findByIdAndDelete(id)
    return result
}



export const userServices = {
    createUserFromDB,
    getUserFromDB,
    getUserByIDFromDB,
    updateUserContentFromDB,
    deleteUserFromDB
}