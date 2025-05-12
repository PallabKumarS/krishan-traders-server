import { Request, Response } from "express";
import { UserService } from "./user.service";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";

// get all user
const getAllUser = catchAsync(async (req: Request, res: Response) => {
  const data = await UserService.getAllUserFromDB(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Users retrieved successfully",
    data: data.data,
    meta: data.meta,
  });
});

// get me
const getMe = catchAsync(async (req: Request, res: Response) => {
  const user = await UserService.getMeFromDB(req.user?.userId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User retrieved successfully",
    data: user,
  });
});

// update user
const updateUser = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await UserService.updateUserInDB(id!, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User updated successfully",
    data: user,
  });
});

// update user status
const updateUserStatus = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await UserService.updateUserStatusIntoDB(id!);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User status updated successfully",
    data: user,
  });
});

// update user role
const updateUserRole = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await UserService.updateUserRoleIntoDB(id!, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User role updated successfully",
    data: user,
  });
});

// delete user
const deleteUser = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  await UserService.deleteUserFromDB(id!);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User deleted successfully",
    data: null,
  });
});

export const UserController = {
  getAllUser,
  getMe,
  updateUser,
  deleteUser,
  updateUserStatus,
  updateUserRole,
};
