import { Model } from "mongoose";
import { USER_ROLE } from "./user.constant";


export type TUser = {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: 'user' | 'admin'
  phonenumber: string;
  isBlocked: boolean,
  createdAt: Date;
  updatedAt: Date;
}


export interface UserModel extends Model<TUser> {
  //instance methods for checking if the user exist
  isUserExistsByCustomEmail(email: string): Promise<TUser>;
  //instance methods for checking if passwords are matched
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;
  isJWTIssuedBeforePasswordChanged(
    passwordChangedTimestamp: Date,
    jwtIssuedTimestamp: number,
  ): boolean;
}


export type TUserRole = keyof typeof USER_ROLE;