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

const updateUserStatusIntoDB = async (id: string) => {
  const isUserExist = await UserModel.findOne({ _id: id });

  if (!isUserExist) {
    throw new AppError(httpStatus.NOT_FOUND, "User does not exist");
  }

  const result = await UserModel.findOneAndUpdate(
    { _id: id },
    { isActive: isUserExist.status === "active" ? "blocked" : "active" },
    {
      new: true,
    }
  );
  return result;
};

// update user role into db
const updateUserRoleIntoDB = async (
  id: string,
  data: {
    role: string;
  }
) => {
  const isUserExist = await UserModel.findOne({ _id: id });
  if (!isUserExist) {
    throw new AppError(httpStatus.NOT_FOUND, "User does not exist");
  }

  if (isUserExist.role === "admin") {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "This user is an admin. You cannot change his role."
    );
  }

  const result = await UserModel.findOneAndUpdate(
    { _id: id },
    { role: data.role },
    {
      new: true,
    }
  );

  return result;
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
  updateUserInDB,
  deleteUserFromDB,
  updateUserStatusIntoDB,
  updateUserRoleIntoDB,
};
