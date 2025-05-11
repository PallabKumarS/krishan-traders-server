import { Types } from "mongoose";
import QueryBuilder from "../../builder/QueryBuilder";
import UserModel from "./user.model";
import { AppError } from "../../errors/AppError";
import httpStatus from "http-status";
import { TUser } from "./user.interface";

// get all user
const getAllUserFromDB = async (query: Record<string, unknown>) => {
  const userQuery = new QueryBuilder(UserModel.find({}), query)
    .paginate()
    .sort()
    .filter();

  const data = await userQuery.modelQuery;
  const meta = await userQuery.countTotal();

  return {
    meta,
    data,
  };
};

// get me
const getMeFromDB = async (id: string) => {
  const isUserExists = await UserModel.isUserExists(new Types.ObjectId(id));

  if (!isUserExists) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }

  const user = await UserModel.findById(id);
  return user;
};

// create user
const createUserInDB = async (payload: Partial<TUser>) => {
  const user = await UserModel.create(payload);
  return user;
};

// update user
const updateUserInDB = async (id: string, payload: Partial<TUser>) => {
  const isUserExists = await UserModel.isUserExists(new Types.ObjectId(id));

  if (!isUserExists) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }

  const user = await UserModel.findByIdAndUpdate(id, payload, {
    new: true,
  });

  return user;
};

// delete user
const deleteUserFromDB = async (id: string) => {
  const isUserExists = await UserModel.isUserExists(new Types.ObjectId(id));

  if (!isUserExists) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }

  const user = await UserModel.findByIdAndDelete(id);

  return user;
};

export const UserService = {
  getAllUserFromDB,
  getMeFromDB,
  createUserInDB,
  updateUserInDB,
  deleteUserFromDB,
};
